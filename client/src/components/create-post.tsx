import { useState } from "react";
import { Button } from "@/components/ui/button";
import { User } from "@shared/schema";

interface CreatePostProps {
  user: Partial<User>;
}

export default function CreatePost({ user }: CreatePostProps) {
  const [postContent, setPostContent] = useState("");

  const handleCreatePost = () => {
    // This would normally send the post to the server
    console.log("Creating post:", postContent);
    setPostContent("");
  };

  return (
    <div className="mt-6 flex justify-between items-center">
      <div className="flex items-center">
        <img 
          src={user.profileImage || "https://i.pravatar.cc/60?img=12"} 
          alt="Profile" 
          className="h-12 w-12 rounded-full mr-3 object-cover" 
        />
        <div className="flex-1">
          <p className="font-semibold">
            {user.firstName ? `${user.firstName} ${user.lastName || ''}` : user.username?.split('@')[0]}
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="What's on your mind?"
              className="text-sm text-gray-500 bg-transparent focus:outline-none w-full"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />
          </div>
        </div>
      </div>
      <Button 
        onClick={handleCreatePost}
        disabled={!postContent.trim()} 
        className="px-4 py-1.5 bg-[#F0F2F5] hover:bg-gray-300 rounded-full text-sm font-medium transition-colors"
      >
        Create Post
      </Button>
    </div>
  );
}
