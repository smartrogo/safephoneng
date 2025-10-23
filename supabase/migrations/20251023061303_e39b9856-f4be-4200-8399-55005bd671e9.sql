-- Allow public read access to phone_registrations for device verification
-- This only exposes device information, not owner personal data
CREATE POLICY "Anyone can verify device status"
ON public.phone_registrations
FOR SELECT
TO public
USING (true);

-- Grant execute permission on verify_device_status to anonymous users
GRANT EXECUTE ON FUNCTION public.verify_device_status(text) TO anon;

-- Also ensure authenticated users can execute it
GRANT EXECUTE ON FUNCTION public.verify_device_status(text) TO authenticated;