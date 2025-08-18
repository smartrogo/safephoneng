import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Search, Shield, AlertTriangle, CheckCircle, XCircle, Loader2, Clock, User, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useBlockchain } from '@/hooks/useBlockchain';

interface DeviceRecord {
  imei: string;
  status: 'active' | 'stolen' | 'unknown';
  deviceModel: string;
  ownerName: string;
  registrationDate: string;
  lastUpdate: string;
  location?: string;
  notes?: string;
  policeReport?: string;
}

const VerifyDevice = () => {
  const { verifyDevice, isLoading } = useBlockchain();
  const [searchIMEI, setSearchIMEI] = useState('');
  const [deviceRecord, setDeviceRecord] = useState<DeviceRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchIMEI.trim()) return;

    setHasSearched(false);

    try {
      // Query blockchain for device
      const result = await verifyDevice(searchIMEI);
      
      if (result.found) {
        const deviceData: DeviceRecord = {
          imei: result.deviceId,
          status: result.status as 'active' | 'stolen' | 'unknown',
          deviceModel: result.metadata?.model || 'Unknown Model',
          ownerName: result.metadata?.owner?.name || 'Unknown Owner',
          registrationDate: result.registrationDate || 'Unknown',
          lastUpdate: result.lastUpdate || 'Unknown',
          notes: (result.metadata as any)?.notes || '',
          ...((result as any).theftReports && (result as any).theftReports.length > 0 && {
            location: (result as any).theftReports[0].incident?.location,
            policeReport: (result as any).theftReports[0].incident?.policeReportNumber
          })
        };
        
        setDeviceRecord(deviceData);
        setHasSearched(true);
        
        if (deviceData.status === 'stolen') {
          toast({
            title: "⚠️ Stolen Device Alert",
            description: "This device has been reported stolen on the blockchain. Do not purchase!",
            variant: "destructive",
          });
        } else {
          toast({
            title: "✅ Device Verified on Blockchain",
            description: "Device found with clean status in blockchain registry.",
          });
        }
      } else {
        setDeviceRecord(null);
        setHasSearched(true);
        toast({
          title: "Device Not Found",
          description: "This IMEI is not registered in the blockchain.",
        });
      }
    } catch (error) {
      console.error('Search error:', error);
      setHasSearched(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-5 w-5 text-primary" />;
      case 'stolen':
        return <AlertTriangle className="h-5 w-5 text-destructive" />;
      default:
        return <XCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-primary text-primary-foreground">Verified & Safe</Badge>;
      case 'stolen':
        return <Badge variant="destructive">STOLEN - DO NOT BUY</Badge>;
      default:
        return <Badge variant="secondary">Not Found</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-card py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-hero rounded-full shadow-elegant">
              <Search className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Verify Device Ownership
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check if a device is registered, stolen, or safe to purchase. 
            Our blockchain verification provides instant, tamper-proof results.
          </p>
        </div>

        {/* Search Form */}
        <Card className="p-8 shadow-card mb-8">
          <form onSubmit={handleSearch} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="imei" className="text-lg font-semibold">
                Enter Device IMEI Number
              </Label>
              <div className="flex gap-4">
                <Input
                  id="imei"
                  placeholder="Enter 15-digit IMEI (e.g., 123456789012345)"
                  value={searchIMEI}
                  onChange={(e) => setSearchIMEI(e.target.value)}
                  maxLength={15}
                  className="text-lg py-6"
                  required
                />
                <Button 
                  type="submit" 
                  disabled={isLoading || !searchIMEI.trim()}
                  className="px-8 py-6 bg-gradient-hero hover:shadow-elegant transition-all duration-300"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Searching Blockchain...
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-5 w-5" />
                      Verify
                    </>
                  )}
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Dial *#06# on the device to find the IMEI number
              </p>
            </div>

            {/* Quick Examples */}
            <div className="border-t pt-4">
              <p className="text-sm text-muted-foreground mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchIMEI('123456789012345')}
                >
                  Safe Device Example
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setSearchIMEI('987654321098765')}
                >
                  Stolen Device Example
                </Button>
              </div>
            </div>
          </form>
        </Card>

        {/* Search Results */}
        {hasSearched && (
          <Card className={`p-8 shadow-card ${deviceRecord?.status === 'stolen' ? 'border-destructive' : ''}`}>
            {deviceRecord ? (
              <div className="space-y-6">
                {/* Status Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(deviceRecord.status)}
                    <h2 className="text-2xl font-bold text-foreground">
                      Device Status: {getStatusBadge(deviceRecord.status)}
                    </h2>
                  </div>
                </div>

                {/* Device Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Device Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">IMEI:</span>
                        <span className="font-mono text-foreground">{deviceRecord.imei}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Model:</span>
                        <span className="text-foreground">{deviceRecord.deviceModel}</span>
                      </div>
                      <div className="flex items-center justify-between py-2 border-b border-border">
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="text-foreground">{deviceRecord.ownerName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground mb-3">Registration Info</h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 py-2 border-b border-border">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Registered:</span>
                        <span className="text-foreground">{deviceRecord.registrationDate}</span>
                      </div>
                      <div className="flex items-center space-x-2 py-2 border-b border-border">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last Update:</span>
                        <span className="text-foreground">{deviceRecord.lastUpdate}</span>
                      </div>
                      {deviceRecord.location && (
                        <div className="flex items-center space-x-2 py-2 border-b border-border">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Location:</span>
                          <span className="text-foreground">{deviceRecord.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status-specific Information */}
                {deviceRecord.status === 'stolen' && (
                  <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="h-6 w-6 text-destructive mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-destructive text-lg">
                          ⚠️ STOLEN DEVICE ALERT
                        </h4>
                        <p className="text-foreground">
                          This device has been reported as stolen and marked on the blockchain. 
                          <strong> Do not purchase this device.</strong> Contact local authorities 
                          if you encounter this device for sale.
                        </p>
                        {deviceRecord.policeReport && (
                          <p className="text-sm text-muted-foreground">
                            Police Report: {deviceRecord.policeReport}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {deviceRecord.status === 'active' && (
                  <div className="p-6 bg-primary/10 border border-primary/20 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-primary text-lg">
                          ✅ Device Verified Safe
                        </h4>
                        <p className="text-foreground">
                          This device is properly registered with verified ownership. 
                          It's safe to purchase or use.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Notes */}
                {deviceRecord.notes && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-semibold text-foreground mb-2">Additional Notes:</h4>
                    <p className="text-muted-foreground">{deviceRecord.notes}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <XCircle className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Device Not Found
                </h2>
                <p className="text-muted-foreground mb-6">
                  This IMEI is not registered in our blockchain database. 
                  This could mean:
                </p>
                <div className="text-left max-w-md mx-auto space-y-2 text-sm text-muted-foreground">
                  <p>• The device hasn't been registered with SafePhone-NG</p>
                  <p>• The IMEI number was entered incorrectly</p>
                  <p>• The device is not trackable in our system</p>
                </div>
              </div>
            )}
          </Card>
        )}

        {/* Information Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">Why Verify?</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Prevent purchasing stolen devices</li>
              <li>• Verify legitimate ownership</li>
              <li>• Access immutable blockchain records</li>
              <li>• Support device recovery efforts</li>
            </ul>
          </Card>

          <Card className="p-6">
            <div className="flex items-center space-x-3 mb-4">
              <User className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-foreground">For Sellers</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Show buyers your device is legitimate by sharing the verification results. 
              A "Verified & Safe" status increases buyer confidence and proves ownership.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifyDevice;