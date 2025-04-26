import { useEffect } from "react";
import { useLocation } from "wouter";
import LoginForm from "@/components/login-form";
import FacebookLogo from "@/components/facebook-logo";
import { useAuth } from "@/hooks/use-auth";

export default function LoginPage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (user) {
      setLocation("/welcome");
    }
  }, [user, setLocation]);

  return (
    <div className="min-h-screen bg-facebook-gray font-facebook flex flex-col items-center justify-center p-4 md:py-20">
      <div className="w-full max-w-[980px] flex flex-col md:flex-row items-center justify-between md:px-10">
        {/* Left Section with Logo and Tagline */}
        <div className="flex flex-col mb-10 md:mb-0 md:w-1/2 md:mr-8 items-center md:items-start">
          <div className="-ml-8 md:mb-4">
            <FacebookLogo />
          </div>
          <h2 className="text-xl md:text-3xl leading-8 text-center md:text-left max-w-md mt-4">
            Facebook helps you connect and share with the people in your life.
          </h2>
        </div>
        
        {/* Login Form */}
        <div className="md:w-[396px] w-full">
          <LoginForm />
          
          <div className="text-center text-sm mt-5">
            <p><strong>Create a Page</strong> for a celebrity, brand or business.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
