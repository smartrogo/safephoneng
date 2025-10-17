import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Smartphone, AlertTriangle, Search, Shield, User, Plus, FileText, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

/**
 * Dashboard component
 * Displays user statistics and quick access to main features
 */
const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    registeredDevices: 0,
    theftReports: 0,
    devices: [] as any[]
  });
  const [loading, setLoading] = useState(true);

  // Fetch user statistics and devices on mount
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Fetch registered devices count and data
        const { data: devices, error: devicesError } = await supabase
          .from('phone_registrations')
          .select('*')
          .eq('user_id', user.id);

        if (devicesError) throw devicesError;

        // Fetch theft reports count
        const { count: reportsCount, error: reportsError } = await supabase
          .from('theft_reports')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (reportsError) throw reportsError;

        setStats({
          registeredDevices: devices?.length || 0,
          theftReports: reportsCount || 0,
          devices: devices || []
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-primary rounded-full shadow-glow">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            SafePhone Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Welcome back! Manage your registered devices and access all SafePhone services.
          </p>
        </div>

        {/* User Info */}
        {user && (
          <Card className="p-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <User className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-foreground">
                  {user.user_metadata?.full_name || user.email}
                </h2>
                <p className="text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </Card>
        )}

        {/* Main Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Link to="/register-phone">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-primary rounded-full shadow-glow">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Register Device
                  </h3>
                  <p className="text-muted-foreground">
                    Secure your mobile device with blockchain-based ownership verification.
                  </p>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Register New Device
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/report-theft">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-destructive rounded-full shadow-glow">
                  <AlertTriangle className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Report Theft
                  </h3>
                  <p className="text-muted-foreground">
                    Immediately report your stolen device to mark it as compromised.
                  </p>
                </div>
                <Button variant="destructive" className="w-full">
                  <FileText className="mr-2 h-4 w-4" />
                  Report Stolen Device
                </Button>
              </div>
            </Card>
          </Link>

          <Link to="/verify-device">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-4 bg-success rounded-full shadow-glow">
                  <Search className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    Verify Device
                  </h3>
                  <p className="text-muted-foreground">
                    Check if a device is registered, stolen, or safe to purchase.
                  </p>
                </div>
                <Button variant="outline" className="w-full border-success text-success hover:bg-success hover:text-success-foreground">
                  <Eye className="mr-2 h-4 w-4" />
                  Verify Ownership
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">
              {loading ? '...' : stats.registeredDevices}
            </div>
            <div className="text-sm text-muted-foreground">Registered Devices</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">
              {loading ? '...' : stats.registeredDevices}
            </div>
            <div className="text-sm text-muted-foreground">Verifications</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">
              {loading ? '...' : stats.theftReports}
            </div>
            <div className="text-sm text-muted-foreground">Reports Filed</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">Active</div>
            <div className="text-sm text-muted-foreground">Account Status</div>
          </Card>
        </div>

        {/* Registered Devices List */}
        {stats.devices.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Registered Devices</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {stats.devices.map((device) => (
                <Card key={device.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <Smartphone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{device.device_model}</h3>
                        <p className="text-sm text-muted-foreground">{device.device_brand}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      device.status === 'active' 
                        ? 'bg-primary/10 text-primary' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {device.status}
                    </span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">IMEI:</span>
                      <span className="font-mono">{device.imei_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Phone:</span>
                      <span>{device.phone_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Registered:</span>
                      <span>{new Date(device.registration_date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;