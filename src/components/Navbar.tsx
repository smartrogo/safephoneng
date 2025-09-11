import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { User, Smartphone } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/fb031023-916f-410c-a0bc-3e4bbfccdefd.png" 
              alt="SafePhone NG Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-primary">SafePhone NG</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <SignedIn>
              <Link to="/dashboard">
                <Button variant="ghost" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            
            <SignedOut>
              <Link to="/auth">
                <Button variant="outline" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Sign In
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;