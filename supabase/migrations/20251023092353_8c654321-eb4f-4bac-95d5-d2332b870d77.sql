-- First, keep only the most recent registration for each IMEI
DELETE FROM public.phone_registrations
WHERE id NOT IN (
  SELECT DISTINCT ON (imei_number) id
  FROM public.phone_registrations
  ORDER BY imei_number, created_at DESC
);

-- Now add unique constraint to prevent duplicate IMEI registrations
ALTER TABLE public.phone_registrations 
ADD CONSTRAINT phone_registrations_imei_number_key UNIQUE (imei_number);