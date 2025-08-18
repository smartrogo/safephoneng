import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface DeviceInfo {
  imei: string;
  serialNumber?: string;
  model: string;
  manufacturer?: string;
  notes?: string;
}

interface OwnerInfo {
  name: string;
  email: string;
  phone: string;
}

interface IncidentInfo {
  type: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  policeReportNumber?: string;
}

interface ReporterInfo {
  name: string;
  email: string;
  phone: string;
}

export const useBlockchain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const registerDevice = useCallback(async (deviceInfo: DeviceInfo, ownerInfo: OwnerInfo) => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful registration
      const result = {
        transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000),
        deviceId: deviceInfo.imei,
        timestamp: new Date().toISOString(),
        status: 'success'
      };

      toast({
        title: "Device Registered Successfully!",
        description: `IMEI ${deviceInfo.imei} has been registered on the blockchain.`,
      });

      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "Failed to register device on blockchain. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const reportTheft = useCallback(async (
    deviceInfo: Pick<DeviceInfo, 'imei'>, 
    incidentInfo: IncidentInfo, 
    reporterInfo: ReporterInfo
  ) => {
    setIsLoading(true);
    try {
      // Simulate blockchain transaction
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful theft report
      const result = {
        transactionId: `0x${Math.random().toString(16).substr(2, 64)}`,
        blockNumber: Math.floor(Math.random() * 1000000),
        deviceId: deviceInfo.imei,
        timestamp: new Date().toISOString(),
        status: 'stolen'
      };

      toast({
        title: "Theft Report Filed",
        description: `Device ${deviceInfo.imei} has been marked as stolen on the blockchain.`,
        variant: "destructive",
      });

      return result;
    } catch (error) {
      console.error('Report failed:', error);
      toast({
        title: "Report Failed",
        description: "Failed to file theft report on blockchain. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const verifyDevice = useCallback(async (imei: string) => {
    setIsLoading(true);
    try {
      // Simulate blockchain query
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock device verification with some sample data
      const mockDevices = {
        '123456789012345': {
          found: true,
          deviceId: '123456789012345',
          status: 'active',
          registrationDate: '2024-01-15',
          lastUpdate: '2024-01-15',
          metadata: {
            model: 'iPhone 15 Pro',
            owner: { name: 'John Doe' },
            notes: 'Personal device, blue color'
          }
        },
        '987654321098765': {
          found: true,
          deviceId: '987654321098765',
          status: 'stolen',
          registrationDate: '2024-02-01',
          lastUpdate: '2024-02-10',
          metadata: {
            model: 'Samsung Galaxy S24',
            owner: { name: 'Jane Smith' }
          },
          theftReports: [{
            incident: {
              location: 'New York, NY',
              policeReportNumber: 'NYP-2024-001234'
            }
          }]
        }
      };

      const result = mockDevices[imei as keyof typeof mockDevices] || {
        found: false,
        deviceId: imei,
        status: 'unknown'
      };

      return result;
    } catch (error) {
      console.error('Verification failed:', error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify device on blockchain. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  return {
    registerDevice,
    reportTheft,
    verifyDevice,
    isLoading,
  };
};