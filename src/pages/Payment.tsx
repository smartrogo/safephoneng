import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, CreditCard, Wallet, Smartphone, CheckCircle, Loader2, ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMetaMaskWallet } from '@/hooks/useMetaMaskWallet';
import { useBlockchain } from '@/hooks/useBlockchain';
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();
  const { wallet, connectWallet, isConnecting } = useMetaMaskWallet();
  const { registerDevice, isLoading: blockchainLoading } = useBlockchain();
  const { toast } = useToast();
  
  const [registrationData, setRegistrationData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'metamask' | 'card' | 'ussd' | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Card payment form
  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: ''
  });
  
  // USSD data
  const [selectedBank, setSelectedBank] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Get registration data from session storage
    const data = sessionStorage.getItem('registrationData');
    if (data) {
      setRegistrationData(JSON.parse(data));
    } else {
      // Redirect back to registration if no data
      navigate('/register-phone');
    }
  }, [navigate]);

  const handleMetaMaskPayment = async () => {
    try {
      setIsLoading(true);
      
      if (!wallet.isConnected) {
        await connectWallet();
      }
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Register device on blockchain after payment
      const deviceInfo = {
        imei: registrationData.imei,
        serialNumber: registrationData.serialNumber,
        model: registrationData.deviceModel,
        manufacturer: 'Unknown',
        notes: registrationData.notes
      };

      const ownerInfo = {
        name: registrationData.ownerName,
        email: registrationData.ownerEmail,
        phone: registrationData.ownerPhone
      };

      await registerDevice(deviceInfo, ownerInfo);
      
      toast({
        title: "Payment Successful",
        description: "Your device has been registered on the blockchain!",
      });
      
      sessionStorage.removeItem('registrationData');
      setIsSuccess(true);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardPayment = async () => {
    try {
      setIsLoading(true);
      
      // Validate card data
      if (!cardData.cardNumber || !cardData.expiryMonth || !cardData.expiryYear || !cardData.cvv || !cardData.cardholderName) {
        toast({
          title: "Missing Card Information",
          description: "Please fill in all card details.",
          variant: "destructive",
        });
        return;
      }
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Register device on blockchain after payment
      const deviceInfo = {
        imei: registrationData.imei,
        serialNumber: registrationData.serialNumber,
        model: registrationData.deviceModel,
        manufacturer: 'Unknown',
        notes: registrationData.notes
      };

      const ownerInfo = {
        name: registrationData.ownerName,
        email: registrationData.ownerEmail,
        phone: registrationData.ownerPhone
      };

      await registerDevice(deviceInfo, ownerInfo);
      
      toast({
        title: "Payment Successful",
        description: "Your device has been registered on the blockchain!",
      });
      
      sessionStorage.removeItem('registrationData');
      setIsSuccess(true);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUSSDPayment = async () => {
    try {
      setIsLoading(true);
      
      if (!selectedBank || !phoneNumber) {
        toast({
          title: "Missing Information",
          description: "Please select a bank and enter your phone number.",
          variant: "destructive",
        });
        return;
      }
      
      toast({
        title: "USSD Code Generated",
        description: `Dial *737*1*1000# on ${phoneNumber} to complete payment with ${selectedBank}`,
      });
      
      // Simulate USSD payment confirmation
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      // Register device on blockchain after payment
      const deviceInfo = {
        imei: registrationData.imei,
        serialNumber: registrationData.serialNumber,
        model: registrationData.deviceModel,
        manufacturer: 'Unknown',
        notes: registrationData.notes
      };

      const ownerInfo = {
        name: registrationData.ownerName,
        email: registrationData.ownerEmail,
        phone: registrationData.ownerPhone
      };

      await registerDevice(deviceInfo, ownerInfo);
      
      toast({
        title: "Payment Confirmed",
        description: "Your device has been registered on the blockchain!",
      });
      
      sessionStorage.removeItem('registrationData');
      setIsSuccess(true);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-card py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center shadow-card">
            <div className="space-y-6">
              <div className="flex justify-center">
                <div className="p-4 bg-primary rounded-full shadow-elegant">
                  <CheckCircle className="h-12 w-12 text-primary-foreground" />
                </div>
              </div>
              
              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Payment Successful!
                </h1>
                <p className="text-lg text-muted-foreground">
                  Your device has been successfully registered and secured on the blockchain.
                </p>
              </div>

              {registrationData && (
                <div className="bg-muted p-4 rounded-lg text-left space-y-2">
                  <h3 className="font-semibold text-foreground">Device Details:</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <span className="text-muted-foreground">IMEI:</span>
                    <span className="font-mono">{registrationData.imei}</span>
                    <span className="text-muted-foreground">Model:</span>
                    <span>{registrationData.deviceModel}</span>
                    <span className="text-muted-foreground">Owner:</span>
                    <span>{registrationData.ownerName}</span>
                    <span className="text-muted-foreground">Status:</span>
                    <span className="text-primary font-semibold">Active & Protected</span>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.print()}
                  variant="outline"
                >
                  Print Certificate
                </Button>
                <Button 
                  onClick={() => navigate('/dashboard')}
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  if (!registrationData) {
    return (
      <div className="min-h-screen bg-gradient-card flex items-center justify-center py-12 px-4">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading registration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-card py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Button
            variant="outline"
            onClick={() => navigate('/register-phone')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Registration
          </Button>
          
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gradient-hero rounded-full shadow-elegant">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Complete Payment
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose your preferred payment method to secure your device registration on the blockchain.
            Registration fee: ₦1,000
          </p>
        </div>

        {/* Registration Summary */}
        <Card className="p-6 mb-8 shadow-card">
          <h3 className="text-lg font-semibold text-foreground mb-4">Registration Summary</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">IMEI:</span>
                <span className="font-mono">{registrationData.imei}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Device:</span>
                <span>{registrationData.deviceModel}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Owner:</span>
                <span>{registrationData.ownerName}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span className="text-muted-foreground">Amount:</span>
                <span className="text-primary">₦1,000</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* MetaMask Payment */}
          <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${paymentMethod === 'metamask' ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={() => setPaymentMethod('metamask')}>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Wallet className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">MetaMask Wallet</h3>
              <p className="text-sm text-muted-foreground">Pay with cryptocurrency using your MetaMask wallet</p>
            </div>
          </Card>

          {/* Card Payment */}
          <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${paymentMethod === 'card' ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={() => setPaymentMethod('card')}>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">Bank Card</h3>
              <p className="text-sm text-muted-foreground">Pay with your debit or credit card</p>
            </div>
          </Card>

          {/* USSD Payment */}
          <Card className={`p-6 cursor-pointer transition-all hover:shadow-lg ${paymentMethod === 'ussd' ? 'ring-2 ring-primary bg-primary/5' : ''}`}
                onClick={() => setPaymentMethod('ussd')}>
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground">USSD</h3>
              <p className="text-sm text-muted-foreground">Pay using your mobile phone USSD code</p>
            </div>
          </Card>
        </div>

        {/* Payment Forms */}
        {paymentMethod === 'metamask' && (
          <Card className="p-8 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">MetaMask Payment</h3>
            <div className="space-y-6">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Connect your MetaMask wallet and confirm the transaction to complete your payment.
                  You'll pay the equivalent of ₦1,000 in cryptocurrency.
                </p>
              </div>
              
              {!wallet.isConnected ? (
                <Button 
                  onClick={connectWallet}
                  disabled={isConnecting}
                  className="w-full py-6 text-lg bg-gradient-hero hover:shadow-elegant"
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold">Connected:</span> {wallet.address?.slice(0, 6)}...{wallet.address?.slice(-4)}
                    </p>
                  </div>
                  <Button 
                    onClick={handleMetaMaskPayment}
                    disabled={isLoading || blockchainLoading}
                    className="w-full py-6 text-lg bg-gradient-hero hover:shadow-elegant"
                  >
                    {isLoading || blockchainLoading ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing Payment...
                      </>
                    ) : (
                      <>
                        <Wallet className="mr-2 h-5 w-5" />
                        Pay with MetaMask
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </Card>
        )}

        {paymentMethod === 'card' && (
          <Card className="p-8 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">Card Payment</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    placeholder="Sulaiman Musa Abdullahi"
                    value={cardData.cardholderName}
                    onChange={(e) => setCardData(prev => ({ ...prev, cardholderName: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData(prev => ({ ...prev, cardNumber: e.target.value }))}
                    maxLength={19}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryMonth">Expiry Month</Label>
                  <Select onValueChange={(value) => setCardData(prev => ({ ...prev, expiryMonth: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Month" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                          {String(i + 1).padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="expiryYear">Expiry Year</Label>
                  <Select onValueChange={(value) => setCardData(prev => ({ ...prev, expiryYear: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Year" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 10 }, (_, i) => (
                        <SelectItem key={i} value={String(new Date().getFullYear() + i)}>
                          {new Date().getFullYear() + i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({ ...prev, cvv: e.target.value }))}
                    maxLength={4}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleCardPayment}
                disabled={isLoading || blockchainLoading}
                className="w-full py-6 text-lg bg-gradient-hero hover:shadow-elegant"
              >
                {isLoading || blockchainLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-5 w-5" />
                    Pay ₦1,000
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}

        {paymentMethod === 'ussd' && (
          <Card className="p-8 shadow-card">
            <h3 className="text-xl font-semibold text-foreground mb-6">USSD Payment</h3>
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Select Bank</Label>
                  <Select onValueChange={setSelectedBank}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gtbank">GTBank (*737#)</SelectItem>
                      <SelectItem value="accessbank">Access Bank (*901#)</SelectItem>
                      <SelectItem value="firstbank">First Bank (*894#)</SelectItem>
                      <SelectItem value="zenithbank">Zenith Bank (*966#)</SelectItem>
                      <SelectItem value="ubabank">UBA (*919#)</SelectItem>
                      <SelectItem value="fcmbbank">FCMB (*329#)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    placeholder="+234 812 345 6789"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  After clicking "Generate USSD Code", you'll receive instructions to dial 
                  the USSD code on your phone to complete the ₦5,000 payment.
                </p>
              </div>
              
              <Button 
                onClick={handleUSSDPayment}
                disabled={isLoading || blockchainLoading || !selectedBank || !phoneNumber}
                className="w-full py-6 text-lg bg-gradient-hero hover:shadow-elegant"
              >
                {isLoading || blockchainLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Smartphone className="mr-2 h-5 w-5" />
                    Generate USSD Code
                  </>
                )}
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Payment;