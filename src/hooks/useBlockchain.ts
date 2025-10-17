import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Interface definitions for device information
interface DeviceInfo {
  imei: string;
  serialNumber?: string;
  model: string;
  manufacturer?: string;
  notes?: string;
}

// Interface for device owner information
interface OwnerInfo {
  name: string;
  email: string;
  phone: string;
}

// Interface for theft incident information
interface IncidentInfo {
  type: string;
  date: string;
  time?: string;
  location: string;
  description: string;
  policeReportNumber?: string;
}

// Interface for theft reporter information
interface ReporterInfo {
  name: string;
  email: string;
  phone: string;
}

/**
 * Custom hook for blockchain/database operations
 * Handles device registration, theft reporting, and device verification
 */
export const useBlockchain = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  /**
   * Register a device in the database
   * Saves device and owner information to phone_registrations table
   */
  const registerDevice = useCallback(async (deviceInfo: DeviceInfo, ownerInfo: OwnerInfo) => {
    setIsLoading(true);
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Insert device registration into database
      const { data, error } = await supabase
        .from('phone_registrations')
        .insert({
          user_id: user.id,
          phone_number: ownerInfo.phone,
          imei_number: deviceInfo.imei,
          device_model: deviceInfo.model,
          device_brand: deviceInfo.manufacturer || 'Unknown',
          status: 'active'
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Device Registered Successfully!",
        description: `IMEI ${deviceInfo.imei} has been registered in the system.`,
      });

      return {
        transactionId: data.id,
        deviceId: deviceInfo.imei,
        timestamp: data.created_at,
        status: 'success'
      };
    } catch (error) {
      console.error('Registration failed:', error);
      toast({
        title: "Registration Failed",
        description: "Failed to register device. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Report a device as stolen
   * Creates a theft report in the theft_reports table
   * Updates the device status to 'stolen' in phone_registrations
   */
  const reportTheft = useCallback(async (
    deviceInfo: Pick<DeviceInfo, 'imei'>, 
    incidentInfo: IncidentInfo, 
    reporterInfo: ReporterInfo
  ) => {
    setIsLoading(true);
    try {
      // Get current user (optional for theft reports)
      const { data: { user } } = await supabase.auth.getUser();

      // Insert theft report
      const { data: report, error: reportError } = await supabase
        .from('theft_reports')
        .insert({
          user_id: user?.id,
          imei_number: deviceInfo.imei,
          incident_type: incidentInfo.type,
          incident_date: incidentInfo.date,
          incident_time: incidentInfo.time,
          location: incidentInfo.location,
          description: incidentInfo.description,
          police_report_number: incidentInfo.policeReportNumber,
          reporter_name: reporterInfo.name,
          reporter_email: reporterInfo.email,
          reporter_phone: reporterInfo.phone,
          status: 'reported'
        })
        .select()
        .single();

      if (reportError) throw reportError;

      // Update device status to stolen if it exists in registrations
      await supabase
        .from('phone_registrations')
        .update({ status: 'stolen' })
        .eq('imei_number', deviceInfo.imei);

      toast({
        title: "Theft Report Filed",
        description: `Device ${deviceInfo.imei} has been marked as stolen.`,
        variant: "destructive",
      });

      return {
        transactionId: report.id,
        deviceId: deviceInfo.imei,
        timestamp: report.created_at,
        status: 'stolen'
      };
    } catch (error) {
      console.error('Report failed:', error);
      toast({
        title: "Report Failed",
        description: "Failed to file theft report. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  /**
   * Verify a device by IMEI
   * Checks if device is registered and if there are any theft reports
   */
  const verifyDevice = useCallback(async (imei: string) => {
    setIsLoading(true);
    try {
      // Query device registration
      const { data: registration, error: regError } = await supabase
        .from('phone_registrations')
        .select('*')
        .eq('imei_number', imei)
        .maybeSingle();

      // Query theft reports
      const { data: theftReports, error: theftError } = await supabase
        .from('theft_reports')
        .select('*')
        .eq('imei_number', imei)
        .order('created_at', { ascending: false });

      if (regError) console.error('Registration query error:', regError);
      if (theftError) console.error('Theft reports query error:', theftError);

      // If device is not registered
      if (!registration) {
        return {
          found: false,
          deviceId: imei,
          status: 'unknown'
        };
      }

      // Determine status
      const status = registration.status === 'stolen' || (theftReports && theftReports.length > 0) 
        ? 'stolen' 
        : 'active';

      // Build result object
      const result = {
        found: true,
        deviceId: imei,
        status: status,
        registrationDate: registration.registration_date?.split('T')[0],
        lastUpdate: registration.updated_at?.split('T')[0],
        metadata: {
          model: registration.device_model,
          owner: { name: 'Registered Owner' },
          notes: ''
        },
        ...(theftReports && theftReports.length > 0 && {
          theftReports: theftReports.map(report => ({
            incident: {
              location: report.location,
              policeReportNumber: report.police_report_number
            }
          }))
        })
      };

      return result;
    } catch (error) {
      console.error('Verification failed:', error);
      toast({
        title: "Verification Failed",
        description: "Failed to verify device. Please try again.",
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