import 'express-session';

declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      profileImage?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      [key: string]: any;
    };
  }
}
