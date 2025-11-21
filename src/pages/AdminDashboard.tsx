import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Search, AlertTriangle, CheckCircle, Loader2, Users, Smartphone } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAdmin } from '@/hooks/useAdmin';
import { useToast } from '@/hooks/use-toast';

interface DeviceRegistration {
  id: string;
  imei_number: string;
  device_model: string;
  device_brand: string;
  phone_number: string;
  status: string;
  registration_date: string;
  user_id: string;
  owner_name?: string;
}

interface TheftReport {
  id: string;
  imei_number: string;
  incident_type: string;
  incident_date: string;
  location: string;
  reporter_name: string;
  reporter_phone: string;
  police_report_number: string;
  status: string;
  created_at: string;
}

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading: adminLoading } = useAdmin();
  const { toast } = useToast();
  const [devices, setDevices] = useState<DeviceRegistration[]>([]);
  const [theftReports, setTheftReports] = useState<TheftReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    if (!adminLoading && !isAdmin) {
      toast({
        title: "Access Denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [isAdmin, adminLoading, navigate, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // Fetch all device registrations
      const { data: devicesData, error: devicesError } = await supabase
        .from('phone_registrations')
        .select('*')
        .order('registration_date', { ascending: false });

      if (devicesError) throw devicesError;

      // Fetch profiles separately to get owner names
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, full_name');

      // Create a map of user_id to full_name
      const profilesMap = new Map(
        profilesData?.map(p => [p.user_id, p.full_name]) || []
      );

      // Combine device data with owner names
      const devicesWithOwners = devicesData?.map(device => ({
        ...device,
        owner_name: profilesMap.get(device.user_id) || 'Unknown'
      })) || [];

      setDevices(devicesWithOwners);

      // Fetch all theft reports
      const { data: reportsData, error: reportsError } = await supabase
        .from('theft_reports')
        .select('*')
        .order('created_at', { ascending: false });

      if (reportsError) throw reportsError;
      setTheftReports(reportsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredDevices = devices.filter((device) => {
    const matchesSearch = 
      device.imei_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.device_model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      device.owner_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || device.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const filteredReports = theftReports.filter((report) =>
    report.imei_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.reporter_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-primary">Active</Badge>;
      case 'stolen':
        return <Badge variant="destructive">Stolen</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (adminLoading || !isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-hero rounded-full">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage devices and theft reports</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Devices</p>
                  <p className="text-2xl font-bold text-foreground">{devices.length}</p>
                </div>
                <Smartphone className="h-8 w-8 text-primary" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Theft Reports</p>
                  <p className="text-2xl font-bold text-destructive">{theftReports.length}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-destructive" />
              </div>
            </Card>
            <Card className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Devices</p>
                  <p className="text-2xl font-bold text-primary">
                    {devices.filter(d => d.status === 'active').length}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
            </Card>
          </div>

          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by IMEI, model, owner, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={statusFilter === 'all' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={statusFilter === 'active' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={statusFilter === 'stolen' ? 'default' : 'outline'}
                  onClick={() => setStatusFilter('stolen')}
                >
                  Stolen
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="devices" className="space-y-4">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="devices">Device Registrations</TabsTrigger>
            <TabsTrigger value="reports">Theft Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="devices">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IMEI</TableHead>
                      <TableHead>Device Model</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Registration Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        </TableCell>
                      </TableRow>
                    ) : filteredDevices.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                          No devices found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredDevices.map((device) => (
                        <TableRow key={device.id}>
                          <TableCell className="font-mono">{device.imei_number}</TableCell>
                          <TableCell>{device.device_brand} {device.device_model}</TableCell>
                          <TableCell>{device.owner_name || 'N/A'}</TableCell>
                          <TableCell>{device.phone_number}</TableCell>
                          <TableCell>{getStatusBadge(device.status)}</TableCell>
                          <TableCell>
                            {new Date(device.registration_date).toLocaleDateString()}
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>IMEI</TableHead>
                      <TableHead>Incident Type</TableHead>
                      <TableHead>Reporter</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Police Report</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" />
                        </TableCell>
                      </TableRow>
                    ) : filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                          No theft reports found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-mono">{report.imei_number}</TableCell>
                          <TableCell>{report.incident_type}</TableCell>
                          <TableCell>
                            <div>
                              <div>{report.reporter_name}</div>
                              <div className="text-xs text-muted-foreground">
                                {report.reporter_phone}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{report.location}</TableCell>
                          <TableCell>{report.police_report_number || 'N/A'}</TableCell>
                          <TableCell>
                            {new Date(report.incident_date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(report.status)}</TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
