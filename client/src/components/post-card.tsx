import { useState } from "react";
import { ThumbsUp, MessageCircle, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PostCardProps {
  post: {
    id: number;
    userId: number;
    username: string;
    profileImage: string;
    content: string;
    imageUrl?: string;
    createdAt: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

export default function PostCard({ post }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  return (
    <Card className="bg-white rounded-lg shadow mb-4">
      <CardContent className="p-0">
        <div className="p-4">
          {/* Post Header */}
          <div className="flex items-center mb-3">
            <img 
              src={post.profileImage} 
              alt={post.username} 
              className="h-10 w-10 rounded-full mr-3 object-cover" 
            />
            <div>
              <p className="font-semibold">{post.username}</p>
              <p className="text-xs text-gray-500">{post.createdAt}</p>
            </div>
          </div>
          
          {/* Post Content */}
          <p className="mb-4">{post.content}</p>
          
          {/* Post Image (if available) */}
          {post.imageUrl && (
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="w-full h-[300px] object-cover rounded-md" 
            />
          )}
          
          {/* Post Stats */}
          <div className="flex justify-between text-sm text-gray-500 py-2 border-b border-[#DDDFE2]">
            <div>
              {liked ? '❤️' : '👍'} {likesCount}
            </div>
            <div>
              <span>{post.comments} comments • {post.shares} shares</span>
            </div>
          </div>
          
          {/* Post Actions */}
          <div className="flex justify-between py-1">
            <Button 
              onClick={handleLike}
              variant="ghost" 
              className={cn(
                "flex items-center justify-center p-2 rounded-md hover:bg-[#F0F2F5] w-1/3",
                liked && "text-[#1877F2]"
              )}
            >
              <ThumbsUp className="h-5 w-5 mr-1" />
              Like
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center justify-center p-2 rounded-md hover:bg-[#F0F2F5] w-1/3"
            >
              <MessageCircle className="h-5 w-5 mr-1" />
              Comment
            </Button>
            <Button 
              variant="ghost" 
              className="flex items-center justify-center p-2 rounded-md hover:bg-[#F0F2F5] w-1/3"
            >
              <Share2 className="h-5 w-5 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
