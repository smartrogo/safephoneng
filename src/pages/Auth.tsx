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
import { useToast } from '@/hooks/use-toast';
import { Wallet, ArrowLeft } from 'lucide-react';

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showResetPassword, setShowResetPassword] = useState(false);
  const { signUp, signIn, resetPassword, user } = useAuth();
  const { wallet, connectWallet, isConnecting } = useMetaMaskWallet();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated or wallet connected
  useEffect(() => {
    if (user || wallet.isConnected) {
      navigate('/dashboard');
    }
  }, [user, wallet.isConnected, navigate]);

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

  const handleResetPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = formData.get('reset-email') as string;

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Reset link sent!",
        description: "Please check your email for password reset instructions.",
      });
      setShowResetPassword(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <img 
            src="/logo-white.png" 
            alt="SafePhone NG Logo" 
            className="h-16 mx-auto mb-4"
          />
          <CardTitle className="text-2xl font-bold">SafePhone NG</CardTitle>
          <CardDescription>
            Choose your preferred authentication method
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Wallet Connection Option */}
          <div className="mb-6">
            <Button 
              onClick={connectWallet}
              disabled={isConnecting}
              className="w-full flex items-center gap-2 bg-primary hover:bg-primary/90"
              size="lg"
            >
              <Wallet className="h-5 w-5" />
              {isConnecting ? "Connecting..." : "Connect MetaMask Wallet"}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Quick access with your crypto wallet
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

          {showResetPassword ? (
            <div className="space-y-4">
              <Button
                variant="ghost"
                onClick={() => setShowResetPassword(false)}
                className="p-0 h-auto text-sm"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to sign in
              </Button>
              
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    name="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Sending Reset Link...' : 'Send Reset Link'}
                </Button>
              </form>
            </div>
          ) : (
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
                  <Button
                    type="button"
                    variant="link"
                    onClick={() => setShowResetPassword(true)}
                    className="w-full text-sm text-muted-foreground"
                  >
                    Forgot your password?
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;