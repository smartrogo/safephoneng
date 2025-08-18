import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Smartphone, AlertTriangle, Search, Shield, User, Plus, FileText, Eye } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

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
                <div className="p-4 bg-gradient-primary rounded-full shadow-glow">
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
                <Button className="w-full bg-gradient-primary hover:shadow-glow">
                  <Plus className="mr-2 h-4 w-4" />
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
                <div className="p-4 bg-accent rounded-full shadow-glow">
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
                <Button variant="outline" className="w-full">
                  <Eye className="mr-2 h-4 w-4" />
                  Verify Ownership
                </Button>
              </div>
            </Card>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-primary">0</div>
            <div className="text-sm text-muted-foreground">Registered Devices</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-accent">0</div>
            <div className="text-sm text-muted-foreground">Verifications</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-destructive">0</div>
            <div className="text-sm text-muted-foreground">Reports Filed</div>
          </Card>
          <Card className="p-4 text-center">
            <div className="text-2xl font-bold text-muted-foreground">Active</div>
            <div className="text-sm text-muted-foreground">Account Status</div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;