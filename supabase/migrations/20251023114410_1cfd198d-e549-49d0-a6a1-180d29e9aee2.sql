-- Drop the existing function
DROP FUNCTION IF EXISTS public.verify_device_status(text);

-- Recreate the function with owner's full name
CREATE OR REPLACE FUNCTION public.verify_device_status(device_imei text)
RETURNS TABLE(
  is_registered boolean,
  device_status text,
  device_model text,
  device_brand text,
  registration_date timestamp with time zone,
  owner_full_name text,
  is_stolen boolean,
  incident_date date,
  incident_type text,
  incident_location text,
  police_report_number text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE WHEN pr.id IS NOT NULL THEN true ELSE false END as is_registered,
    COALESCE(pr.status, 'unknown') as device_status,
    pr.device_model,
    pr.device_brand,
    pr.registration_date,
    p.full_name as owner_full_name,
    CASE WHEN tr.id IS NOT NULL THEN true ELSE false END as is_stolen,
    tr.incident_date as incident_date,
    tr.incident_type as incident_type,
    tr.location as incident_location,
    tr.police_report_number as police_report_number
  FROM public.phone_registrations pr
  LEFT JOIN public.profiles p ON p.user_id = pr.user_id
  LEFT JOIN LATERAL (
    SELECT t.id, t.incident_date, t.incident_type, t.location, t.police_report_number
    FROM public.theft_reports t
    WHERE t.imei_number = device_imei
    ORDER BY t.created_at DESC
    LIMIT 1
  ) tr ON true
  WHERE pr.imei_number = device_imei
  LIMIT 1;
  
  -- If no registration found, check if there's a theft report
  IF NOT FOUND THEN
    RETURN QUERY
    SELECT 
      false as is_registered,
      'unknown'::text as device_status,
      null::text as device_model,
      null::text as device_brand,
      null::timestamp with time zone as registration_date,
      null::text as owner_full_name,
      true as is_stolen,
      t.incident_date as incident_date,
      t.incident_type as incident_type,
      t.location as incident_location,
      t.police_report_number as police_report_number
    FROM public.theft_reports t
    WHERE t.imei_number = device_imei
    ORDER BY t.created_at DESC
    LIMIT 1;
  END IF;
END;
$$;