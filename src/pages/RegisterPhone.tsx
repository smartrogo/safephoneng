import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Smartphone, Shield, LogOut } from 'lucide-react';

const RegisterPhone = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [registrations, setRegistrations] = useState<any[]>([]);
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    } else {
      fetchRegistrations();
    }
  }, [user, navigate]);

  const fetchRegistrations = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('phone_registrations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching registrations:', error);
    } else {
      setRegistrations(data || []);
    }
  };

  const handleRegisterPhone = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const phoneNumber = formData.get('phone-number') as string;
    const imeiNumber = formData.get('imei-number') as string;
    const deviceModel = formData.get('device-model') as string;
    const deviceBrand = formData.get('device-brand') as string;

    if (!user) {
      setError('You must be logged in to register a phone');
      setIsLoading(false);
      return;
    }

    const { error } = await supabase
      .from('phone_registrations')
      .insert({
        user_id: user.id,
        phone_number: phoneNumber,
        imei_number: imeiNumber,
        device_model: deviceModel,
        device_brand: deviceBrand,
      });

    if (error) {
      setError(error.message);
    } else {
      toast({
        title: "Phone registered successfully!",
        description: "Your phone is now secured with blockchain technology.",
      });
      // Reset form
      (event.target as HTMLFormElement).reset();
      // Refresh registrations
      fetchRegistrations();
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-card">
      {/* Header */}
      <div className="bg-background border-b">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/lovable-uploads/57f7445f-ccaa-4b25-98fe-8cf026399711.png" 
              alt="SafePhone NG Logo" 
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold text-primary">SafePhone NG</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.email}
            </span>
            <Button variant="outline" onClick={handleSignOut} className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Registration Form */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                  <Smartphone className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <CardTitle>Register Your Phone</CardTitle>
                  <CardDescription>
                    Secure your device with blockchain protection
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleRegisterPhone} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-number">Phone Number</Label>
                  <Input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    placeholder="+234 XXX XXX XXXX"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="imei-number">IMEI Number</Label>
                  <Input
                    id="imei-number"
                    name="imei-number"
                    type="text"
                    placeholder="Dial *#06# to get IMEI"
                    required
                    minLength={15}
                    maxLength={15}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="device-brand">Brand</Label>
                    <Input
                      id="device-brand"
                      name="device-brand"
                      type="text"
                      placeholder="e.g., Samsung, iPhone"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="device-model">Model</Label>
                    <Input
                      id="device-model"
                      name="device-model"
                      type="text"
                      placeholder="e.g., Galaxy S23, iPhone 15"
                    />
                  </div>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? 'Registering...' : 'Register Phone'}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Registered Phones */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-success">
                  <Shield className="h-5 w-5 text-success-foreground" />
                </div>
                <div>
                  <CardTitle>Your Protected Devices</CardTitle>
                  <CardDescription>
                    Phones secured with SafePhone NG
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Smartphone className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No phones registered yet</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Register your first device to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <div
                      key={registration.id}
                      className="p-4 border rounded-lg bg-gradient-card"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{registration.phone_number}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          registration.status === 'active' 
                            ? 'bg-success/10 text-success' 
                            : 'bg-destructive/10 text-destructive'
                        }`}>
                          {registration.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p><strong>IMEI:</strong> {registration.imei_number}</p>
                        {registration.device_brand && (
                          <p><strong>Device:</strong> {registration.device_brand} {registration.device_model}</p>
                        )}
                        <p><strong>Registered:</strong> {new Date(registration.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RegisterPhone;