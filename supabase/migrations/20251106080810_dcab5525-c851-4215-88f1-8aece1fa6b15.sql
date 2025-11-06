-- Drop the public verification policy
DROP POLICY IF EXISTS "Anyone can verify device status" ON public.phone_registrations;

-- Create new policy requiring authentication to verify any device
CREATE POLICY "Authenticated users can verify any device"
ON public.phone_registrations
FOR SELECT
TO authenticated
USING (true);

-- Keep the existing policy for users to view their own registrations
-- (This is already in place: "Users can view their own phone registrations")