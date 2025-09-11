import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useMetaMaskWallet } from '@/hooks/useMetaMaskWallet';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { useToast } from '@/hooks/use-toast';
import { Wallet, Chrome, Facebook, Twitter } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { signUp, signIn, user } = useAuth();
  const { wallet, connectWallet, isConnecting } = useMetaMaskWallet();
  const { signInWithGoogle, signInWithFacebook, signInWithTwitter, isConnecting: firebaseConnecting } = useFirebaseAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated or wallet connected
  useEffect(() => {
    if (user || wallet.isConnected) {
      navigate('/dashboard');
    }
  }, [user, wallet.isConnected, navigate]);

  const handleFirebaseAuth = async (provider: 'google' | 'facebook' | 'twitter') => {
    let result;
    switch (provider) {
      case 'google':
        result = await signInWithGoogle();
        break;
      case 'facebook':
        result = await signInWithFacebook();
        break;
      case 'twitter':
        result = await signInWithTwitter();
        break;
    }
    
    if (result?.user) {
      toast({
        title: "Welcome!",
        description: `Successfully signed in with ${provider}.`,
      });
      navigate('/dashboard');
    } else if (result?.error) {
      toast({
        title: "Authentication failed",
        description: result.error.message,
        variant: "destructive"
      });
    }
  };

  const handleSignUp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('signup-email') as string;
    const password = formData.get('signup-password') as string;
    const fullName = formData.get('full-name') as string;

    const { error } = await signUp(email, password, fullName);

    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Account created successfully!",
        description: "Please check your email to verify your account.",
      });
    }
    setIsLoading(false);
  };

  const handleSignIn = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('signin-email') as string;
    const password = formData.get('signin-password') as string;

    const { error } = await signIn(email, password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/lovable-uploads/fb031023-916f-410c-a0bc-3e4bbfccdefd.png" 
            alt="SafePhone NG Logo" 
            className="h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">SafePhone NG</CardTitle>
          <CardDescription>
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Authentication Options */}
          <div className="space-y-3 mb-6">
            <Button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Wallet className="h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
            </Button>
            
            <Button 
              onClick={() => handleFirebaseAuth('google')}
              disabled={firebaseConnecting}
              className="w-full flex items-center gap-2"
              variant="outline"
              size="lg"
            >
              <Chrome className="h-5 w-5" />
              {firebaseConnecting ? "Connecting..." : "Continue with Google"}
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button 
                onClick={() => handleFirebaseAuth('facebook')}
                disabled={firebaseConnecting}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Facebook className="h-4 w-4" />
                Facebook
              </Button>
              
              <Button 
                onClick={() => handleFirebaseAuth('twitter')}
                disabled={firebaseConnecting}
                className="flex items-center gap-2"
                variant="outline"
              >
                <Twitter className="h-4 w-4" />
                Twitter
              </Button>
            </div>
            
            <p className="text-xs text-muted-foreground text-center">
              Quick access with your preferred platform
            </p>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with email
              </span>
            </div>
          </div>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="full-name">Full Name</Label>
                  <Input
                    id="full-name"
                    name="full-name"
                    type="text"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="signup-password"
                    type="password"
                    placeholder="Create a password"
                    minLength={6}
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;