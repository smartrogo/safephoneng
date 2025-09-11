import { SignIn, SignUp, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useMetaMaskWallet } from "@/hooks/useMetaMaskWallet";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { Shield, Smartphone, Wallet } from "lucide-react";

const Auth = () => {
  const { wallet, connectWallet, isConnecting } = useMetaMaskWallet();
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if wallet is connected or user is signed in
    if (wallet.isConnected || user) {
      navigate("/dashboard");
    }
  }, [wallet.isConnected, user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 flex items-center justify-center p-4">
      <SignedIn>
        <div className="text-center">
          <p>Redirecting to dashboard...</p>
        </div>
      </SignedIn>
      
      <SignedOut>
        <div className="w-full max-w-md">
          <Card className="shadow-2xl border-primary/10">
            <CardHeader className="text-center pb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">SafePhone NG</CardTitle>
              <CardDescription className="text-muted-foreground">
                Secure blockchain-based phone protection and recovery system
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* MetaMask Wallet Connection */}
              <div className="space-y-4">
                <Button
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full h-12 text-base font-semibold bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white border-0"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isConnecting ? "Connecting..." : "Connect MetaMask"}
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="signin" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="signin" className="space-y-4 mt-6">
                  <SignIn 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-primary hover:bg-primary/90",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                      }
                    }}
                    fallbackRedirectUrl="/dashboard"
                  />
                </TabsContent>
                
                <TabsContent value="signup" className="space-y-4 mt-6">
                  <SignUp 
                    appearance={{
                      elements: {
                        formButtonPrimary: "bg-primary hover:bg-primary/90",
                        card: "shadow-none border-0 bg-transparent",
                        headerTitle: "hidden",
                        headerSubtitle: "hidden",
                      }
                    }}
                    fallbackRedirectUrl="/dashboard"
                  />
                </TabsContent>
              </Tabs>

              <div className="flex items-center justify-center pt-4">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Smartphone className="h-4 w-4" />
                  <span>Secure • Decentralized • Trusted</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SignedOut>
    </div>
  );
};

export default Auth;