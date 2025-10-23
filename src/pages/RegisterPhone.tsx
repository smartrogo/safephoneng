import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Smartphone, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useBlockchain } from '@/hooks/useBlockchain';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const RegisterPhone = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [existingDevice, setExistingDevice] = useState<any>(null);
  const { checkIMEIExists } = useBlockchain();
  const [formData, setFormData] = useState({
    imei: '',
    serialNumber: '',
    deviceModel: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    ownerNIN: '',
    ownerPicture: null as File | null,
    notes: ''
  });
  const { toast } = useToast();

  const handleInputChange = async (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Check if IMEI already exists when IMEI field is changed
    if (field === 'imei' && value.length === 15) {
      const existing = await checkIMEIExists(value);
      setExistingDevice(existing);
      
      if (existing) {
        toast({
          title: "IMEI Already Registered",
          description: "This device is already registered in the system.",
          variant: "destructive",
        });
      }
    } else if (field === 'imei') {
      setExistingDevice(null);
    }
  };

  const handleFileChange = (file: File | null) => {
    setFormData(prev => ({
      ...prev,
      ownerPicture: file
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      
      // Validate form data
      if (!formData.imei || !formData.deviceModel || !formData.ownerName || !formData.ownerEmail || !formData.ownerPhone || !formData.ownerNIN) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        });
        return;
      }

      // Store form data in session storage for payment page
      sessionStorage.setItem('registrationData', JSON.stringify(formData));
      
      toast({
        title: "Registration Ready",
        description: "Please complete payment to secure your device on the blockchain.",
      });
      
      // Navigate to payment page
      navigate('/payment');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: "Registration Error",
        description: "There was an error preparing your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-card py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-hero rounded-full shadow-elegant">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Register Your Device
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure your mobile device with blockchain-based ownership verification. 
            Once registered, your device ownership will be immutably recorded.
          </p>
        </div>

        {/* Registration Form */}
        <Card className="p-8 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Device Information */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Smartphone className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-semibold text-foreground">Device Information</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="imei">IMEI Number *</Label>
                  <Input
                    id="imei"
                    placeholder="Enter 15-digit IMEI"
                    value={formData.imei}
                    onChange={(e) => handleInputChange('imei', e.target.value)}
                    maxLength={15}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Dial *#06# to find your IMEI
                  </p>
                </div>

                {/* Show alert if IMEI already exists */}
                {existingDevice && (
                  <div className="md:col-span-2">
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>⚠️ IMEI Already Registered</AlertTitle>
                      <AlertDescription>
                        <div className="mt-2 space-y-2">
                          <p className="font-semibold text-sm">Device Status: <span className="text-primary">{existingDevice.status?.toUpperCase()}</span></p>
                          <div className="border-t pt-2 space-y-1">
                            <p><strong>Device Model:</strong> {existingDevice.device_model || 'Unknown'}</p>
                            <p><strong>Device Brand:</strong> {existingDevice.device_brand || 'Unknown'}</p>
                            <p><strong>Owner:</strong> {existingDevice.profiles?.full_name || 'Not Available'}</p>
                            <p><strong>Phone:</strong> {existingDevice.profiles?.phone_number || 'Not Available'}</p>
                            <p><strong>Registration Date:</strong> {new Date(existingDevice.registration_date).toLocaleDateString()}</p>
                          </div>
                          <p className="mt-2 text-sm font-semibold">⚠️ This device is already registered. Each IMEI can only be registered once in the system.</p>
                        </div>
                      </AlertDescription>
                    </Alert>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="serialNumber">Serial Number</Label>
                  <Input
                    id="serialNumber"
                    placeholder="Device serial number"
                    value={formData.serialNumber}
                    onChange={(e) => handleInputChange('serialNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="deviceModel">Device Model *</Label>
                  <Input
                    id="deviceModel"
                    placeholder="e.g., iPhone 15 Pro, Samsung Galaxy S24"
                    value={formData.deviceModel}
                    onChange={(e) => handleInputChange('deviceModel', e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Owner Information */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Owner Information</h2>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="ownerPicture">Owner Picture</Label>
                  <div className="flex items-center space-x-4">
                    {formData.ownerPicture && (
                      <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-border">
                        <img 
                          src={URL.createObjectURL(formData.ownerPicture)} 
                          alt="Owner preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <Input
                      id="ownerPicture"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                      className="flex-1"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Upload a clear photo of yourself for identity verification
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerName">Full Name *</Label>
                  <Input
                    id="ownerName"
                    placeholder="Your full name"
                    value={formData.ownerName}
                    onChange={(e) => handleInputChange('ownerName', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerEmail">Email Address *</Label>
                  <Input
                    id="ownerEmail"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.ownerEmail}
                    onChange={(e) => handleInputChange('ownerEmail', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerPhone">Phone Number *</Label>
                  <Input
                    id="ownerPhone"
                    type="tel"
                    placeholder="+234 812 030 4001"
                    value={formData.ownerPhone}
                    onChange={(e) => handleInputChange('ownerPhone', e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ownerNIN">NIN Number *</Label>
                  <Input
                    id="ownerNIN"
                    placeholder="Enter 11-digit NIN"
                    value={formData.ownerNIN}
                    onChange={(e) => handleInputChange('ownerNIN', e.target.value)}
                    maxLength={11}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about your device..."
                value={formData.notes}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                rows={3}
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  By registering your device, you agree that the information will be stored 
                  on the blockchain and cannot be deleted. This creates an immutable 
                  record of ownership for security purposes.
                </p>
              </div>


              <Button 
                type="submit" 
                disabled={isLoading || existingDevice || !formData.imei || !formData.deviceModel || !formData.ownerName || !formData.ownerEmail || !formData.ownerPhone || !formData.ownerNIN}
                className="w-full py-6 text-lg bg-gradient-hero hover:shadow-elegant transition-all duration-300"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Preparing Registration...
                  </>
                ) : (
                  <>
                    <Shield className="mr-2 h-5 w-5" />
                    Continue to Payment
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

export default RegisterPhone;