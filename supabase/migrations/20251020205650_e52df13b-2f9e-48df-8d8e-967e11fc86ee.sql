-- Update theft_reports SELECT policy to restrict access to own reports only
DROP POLICY IF EXISTS "Anyone can view theft reports" ON public.theft_reports;

CREATE POLICY "Users can view their own theft reports"
ON public.theft_reports
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Create a secure function for device verification
CREATE OR REPLACE FUNCTION public.verify_device_status(device_imei text)
RETURNS TABLE (
  is_registered boolean,
  device_status text,
  device_model text,
  device_brand text,
  registration_date timestamp with time zone,
  is_stolen boolean,
  incident_date date,
  incident_type text,
  incident_location text,
  police_report_number text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE WHEN pr.id IS NOT NULL THEN true ELSE false END as is_registered,
    COALESCE(pr.status, 'unknown') as device_status,
    pr.device_model,
    pr.device_brand,
    pr.registration_date,
    CASE WHEN tr.id IS NOT NULL THEN true ELSE false END as is_stolen,
    tr.incident_date,
    tr.incident_type,
    tr.location as incident_location,
    tr.police_report_number
  FROM public.phone_registrations pr
  LEFT JOIN LATERAL (
    SELECT id, incident_date, incident_type, location, police_report_number
    FROM public.theft_reports
    WHERE imei_number = device_imei
    ORDER BY created_at DESC
    LIMIT 1
  ) tr ON true
  WHERE pr.imei_number = device_imei
  LIMIT 1;
  
  -- If no registration found, check if there's a theft report
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      false as is_registered,
      'unknown' as device_status,
      null::text as device_model,
      null::text as device_brand,
      null::timestamp with time zone as registration_date,
      true as is_stolen,
      tr.incident_date,
      tr.incident_type,
      tr.location as incident_location,
      tr.police_report_number
    FROM public.theft_reports tr
    WHERE tr.imei_number = device_imei
    ORDER BY tr.created_at DESC
    LIMIT 1;
  END IF;
END;
$$;

-- Grant execute permission to authenticated users
GRANT EXECUTE ON FUNCTION public.verify_device_status(text) TO authenticated;