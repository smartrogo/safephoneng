-- Create theft_reports table for storing device theft reports
CREATE TABLE public.theft_reports (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id),
  imei_number text NOT NULL,
  incident_type text NOT NULL,
  incident_date date NOT NULL,
  incident_time time,
  location text NOT NULL,
  description text NOT NULL,
  police_report_number text,
  reporter_name text NOT NULL,
  reporter_email text,
  reporter_phone text,
  status text NOT NULL DEFAULT 'reported',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.theft_reports ENABLE ROW LEVEL SECURITY;

-- Create policies for theft_reports
CREATE POLICY "Anyone can view theft reports"
ON public.theft_reports
FOR SELECT
USING (true);

CREATE POLICY "Authenticated users can create theft reports"
ON public.theft_reports
FOR INSERT
WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own theft reports"
ON public.theft_reports
FOR UPDATE
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates on theft_reports
CREATE TRIGGER update_theft_reports_updated_at
BEFORE UPDATE ON public.theft_reports
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Add index for faster IMEI lookups
CREATE INDEX idx_theft_reports_imei ON public.theft_reports(imei_number);
CREATE INDEX idx_theft_reports_user ON public.theft_reports(user_id);