import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import FacebookLogo from "@/components/facebook-logo";
import PostCard from "@/components/post-card";
import CreatePost from "@/components/create-post";
import { apiRequest } from "@/lib/queryClient";
import { Search, Home, Youtube, Users, MessageCircle, Bell } from "lucide-react";

export default function WelcomePage() {
  const { user, logout } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { data: posts = [] } = useQuery({ 
    queryKey: ['/api/posts'], 
    staleTime: 60000 
  });

  const handleLogout = async () => {
    try {
      await apiRequest('POST', '/api/auth/logout', {});
      logout();
      setLocation('/');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col font-facebook">
      {/* Header */}
      <header className="bg-white shadow-md z-10">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center">
            <div className="h-10">
              <FacebookLogo small />
            </div>
            <div className="ml-2 relative">
              <input 
                type="text" 
                placeholder="Search Facebook" 
                className="bg-facebook-gray rounded-full py-2 px-4 pl-10 text-sm w-full md:w-60 focus:outline-none"
              />
              <Search className="h-4 w-4 text-gray-500 absolute left-3 top-2.5" />
            </div>
          </div>
          
          {/* Navigation Icons */}
          <div className="hidden md:flex space-x-2">
            <div className="p-2 hover:bg-facebook-gray rounded-full cursor-pointer">
              <Home className="h-6 w-6 text-[#1877F2]" />
            </div>
            <div className="p-2 hover:bg-facebook-gray rounded-full cursor-pointer">
              <Youtube className="h-6 w-6 text-gray-600" />
            </div>
            <div className="p-2 hover:bg-facebook-gray rounded-full cursor-pointer">
              <Users className="h-6 w-6 text-gray-600" />
            </div>
            <div className="p-2 hover:bg-facebook-gray rounded-full cursor-pointer">
              <MessageCircle className="h-6 w-6 text-gray-600" />
            </div>
            <div className="p-2 hover:bg-facebook-gray rounded-full cursor-pointer">
              <Bell className="h-6 w-6 text-gray-600" />
            </div>
          </div>
          
          {/* User Profile */}
          <div className="flex items-center">
            <div className="relative border-2 border-[#1877F2] rounded-full cursor-pointer">
              <img 
                src={user.profileImage || "https://i.pravatar.cc/40?img=12"} 
                alt="Profile" 
                className="h-9 w-9 rounded-full"
              />
            </div>
            <span className="ml-2 font-semibold block md:hidden">
              {user.firstName || user.username.split('@')[0]}
            </span>
            <button 
              onClick={handleLogout}
              className="ml-4 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md text-sm font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="flex-1 bg-facebook-gray">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow p-4 mb-4">
            <h1 className="text-2xl font-bold mb-4">Welcome to Facebook!</h1>
            <p className="text-lg">
              Hello {user.firstName || user.username.split('@')[0]}, you have successfully logged in.
            </p>
            
            <CreatePost user={user} />
          </div>
          
          {/* Posts */}
          {posts.map((post: any) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
