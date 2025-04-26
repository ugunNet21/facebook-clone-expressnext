import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { loginUserSchema, insertUserSchema } from "@shared/schema";
import session from "express-session";
import MemoryStore from "memorystore";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

// Setup session store
const MemStoreSession = MemoryStore(session);

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup session middleware
  app.use(
    session({
      store: new MemStoreSession({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      secret: process.env.SESSION_SECRET || "facebook-clone-secret",
      resave: false,
      saveUninitialized: false,
      cookie: { 
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000 // 24 hours
      }
    })
  );

  // User authentication routes
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const loginData = loginUserSchema.parse(req.body);
      const user = await storage.getUserByUsername(loginData.username);

      if (!user || user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Set user in session
      const { password, ...userWithoutPassword } = user;
      req.session.user = userWithoutPassword;

      return res.json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const userData = insertUserSchema.parse(req.body);

      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(409).json({ message: "Username already exists" });
      }

      const newUser = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = newUser;

      // Set user in session
      req.session.user = userWithoutPassword;

      return res.status(201).json({ user: userWithoutPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: fromZodError(error).message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/auth/session", (req: Request, res: Response) => {
    if (req.session.user) {
      return res.json({ user: req.session.user });
    }
    return res.status(401).json({ message: "Not authenticated" });
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("connect.sid");
      return res.json({ message: "Logged out successfully" });
    });
  });

  // Posts routes
  app.get("/api/posts", async (req: Request, res: Response) => {
    // Mock data for posts
    const posts = [
      {
        id: 1,
        userId: 2,
        username: "Sarah Johnson",
        profileImage: "https://i.pravatar.cc/48?img=33",
        content: "Just got back from an amazing vacation! The views were incredible! 🏖️ #vacation #summer",
        imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
        createdAt: "3 hours ago",
        likes: 124,
        comments: 45,
        shares: 3
      },
      {
        id: 2,
        userId: 3,
        username: "Michael Chen",
        profileImage: "https://i.pravatar.cc/48?img=59",
        content: "Just finished this amazing book! Highly recommend to anyone interested in technology and AI.",
        imageUrl: "",
        createdAt: "Yesterday at 10:43 AM",
        likes: 98,
        comments: 23,
        shares: 5
      }
    ];
    
    return res.json(posts);
  });

  const httpServer = createServer(app);

  return httpServer;
}
