import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Wallet } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/57f7445f-ccaa-4b25-98fe-8cf026399711.png" 
              alt="SafePhone NG Logo" 
              className="h-10 w-auto"
            />
            <span className="text-2xl font-bold text-primary">SafePhone NG</span>
          </div>
          
          <div></div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Connect MetaMask Wallet
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;