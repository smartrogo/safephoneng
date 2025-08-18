import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AlertTriangle, MapPin, Clock, CheckCircle, Loader2, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMetaMaskWallet } from '@/hooks/useMetaMaskWallet';
import { useBlockchain } from '@/hooks/useBlockchain';

const ReportTheft = () => {
  const { wallet, connectWallet, isConnecting } = useMetaMaskWallet();
  const { reportTheft, isLoading } = useBlockchain();
  const [formData, setFormData] = useState({
    imei: '',
    incidentType: '',
    incidentDate: '',
    incidentTime: '',
    location: '',
    description: '',
    policeReport: '',
    contactInfo: ''
  });
  const [isReported, setIsReported] = useState(false);
  const [reportData, setReportData] = useState(null);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Connect wallet if not connected
      if (!wallet.isConnected) {
        await connectWallet();
      }

      // Prepare report data
      const deviceInfo = {
        imei: formData.imei
      };

      const incidentInfo = {
        type: formData.incidentType,
        date: formData.incidentDate,
        time: formData.incidentTime,
        location: formData.location,
        description: formData.description,
        policeReportNumber: formData.policeReport
      };

      const reporterInfo = {
        name: formData.contactInfo.split('@')[0] || 'Anonymous', // Extract name from email
        email: formData.contactInfo.includes('@') ? formData.contactInfo : '',
        phone: !formData.contactInfo.includes('@') ? formData.contactInfo : ''
      };

      // Submit theft report to blockchain
      const result = await reportTheft(deviceInfo, incidentInfo, reporterInfo);
      
      setReportData(result);
      setIsReported(true);
    } catch (error) {
      console.error('Report error:', error);
    }
  };

  if (isReported) {
    return (
      <div className="min-h-screen bg-gradient-card py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center shadow-card border-destructive">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-destructive rounded-full shadow-elegant">
                  <CheckCircle className="h-12 w-12 text-destructive-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Theft Report Filed
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your device has been marked as stolen on the blockchain. 
                  This record is now immutable and publicly verifiable.
                </p>
              </div>

              <div className="bg-destructive/10 p-4 rounded-lg text-left space-y-2">
                <h3 className="font-semibold text-foreground">Report Details:</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">IMEI:</span>
                  <span className="font-mono">{formData.imei}</span>
                  <span className="text-muted-foreground">Incident:</span>
                  <span>{formData.incidentType}</span>
                  <span className="text-muted-foreground">Date:</span>
                  <span>{formData.incidentDate}</span>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="text-destructive font-semibold">STOLEN - DO NOT PURCHASE</span>
                </div>
              </div>

              <div className="p-4 bg-warning/10 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Important:</strong> Anyone can now verify this device's stolen status 
                  using our verification system. Consider filing a police report and providing 
                  the report number for additional legal protection.
                </p>
              </div>

              <Button 
                onClick={() => {
                  setIsReported(false);
                  setFormData({
                    imei: '',
                    incidentType: '',
                    incidentDate: '',
                    incidentTime: '',
                    location: '',
                    description: '',
                    policeReport: '',
                    contactInfo: ''
                  });
                }}
                variant="outline"
              >
                Report Another Device
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-destructive rounded-full shadow-elegant">
              <AlertTriangle className="h-8 w-8 text-destructive-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Report Device Theft
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Immediately report your stolen device to mark it as compromised on the blockchain. 
            This creates an immutable record that can help prevent resale and aid recovery.
          </p>
        </div>

        {/* Warning Alert */}
        <Card className="p-6 mb-8 border-warning bg-warning/5">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-6 w-6 text-warning mt-1 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-foreground">Important Notice</h3>
              <p className="text-sm text-muted-foreground">
                Once reported as stolen, this record cannot be reversed. Only file this report 
                if your device has actually been stolen or lost. False reports may have legal consequences.
              </p>
            </div>
          </div>
        </Card>

        {/* Report Form */}
        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Device Identification */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Device Identification</h2>
              
              <div className="space-y-2">
                <Label htmlFor="imei">IMEI Number *</Label>
                <Input
                  id="imei"
                  placeholder="Enter 15-digit IMEI of stolen device"
                  value={formData.imei}
                  onChange={(e) => handleInputChange('imei', e.target.value)}
                  maxLength={15}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  This should match the IMEI of your registered device
                </p>
              </div>
            </div>

            {/* Incident Details */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Clock className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Incident Details</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incidentType">Type of Incident *</Label>
                  <Select onValueChange={(value) => handleInputChange('incidentType', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select incident type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="theft">Theft</SelectItem>
                      <SelectItem value="robbery">Robbery</SelectItem>
                      <SelectItem value="burglary">Burglary</SelectItem>
                      <SelectItem value="lost">Lost/Misplaced</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentDate">Date of Incident *</Label>
                  <Input
                    id="incidentDate"
                    type="date"
                    value={formData.incidentDate}
                    onChange={(e) => handleInputChange('incidentDate', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="incidentTime">Approximate Time</Label>
                  <Input
                    id="incidentTime"
                    type="time"
                    value={formData.incidentTime}
                    onChange={(e) => handleInputChange('incidentTime', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    placeholder="City, State/Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description of Incident *</Label>
                <Textarea
                  id="description"
                  placeholder="Please provide details about how the device was stolen or lost..."
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  required
                />
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Additional Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policeReport">Police Report Number</Label>
                  <Input
                    id="policeReport"
                    placeholder="If you filed a police report"
                    value={formData.policeReport}
                    onChange={(e) => handleInputChange('policeReport', e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended for legal protection
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactInfo">Contact Information *</Label>
                  <Input
                    id="contactInfo"
                    placeholder="Email or phone for recovery contact"
                    value={formData.contactInfo}
                    onChange={(e) => handleInputChange('contactInfo', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
                <p className="text-sm text-foreground">
                  <strong>Final Warning:</strong> By submitting this report, you confirm that the 
                  information is accurate and that your device has been stolen or lost. This action 
                  will permanently mark the device as compromised on the blockchain.
                </p>
              </div>

              {!wallet.isConnected && (
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full mb-4" 
                  onClick={connectWallet}
                  disabled={isConnecting}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask Wallet'}
                </Button>
              )}

              <Button 
                type="submit" 
                disabled={isLoading || !formData.imei || !formData.incidentType || !formData.incidentDate || !formData.location || !formData.description || !formData.contactInfo}
                className="w-full py-6 text-lg bg-destructive hover:bg-destructive/90 transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Recording on Blockchain...
                  </>
                ) : (
                  <>
                    <AlertTriangle className="mr-2 h-5 w-5" />
                    Submit Theft Report
                  </>
                )}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ReportTheft;