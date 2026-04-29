
-- Pipeline stage enum
CREATE TYPE public.lead_stage AS ENUM ('new','qualified','consultation','proposal','won','lost');

-- Leads table
CREATE TABLE public.leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  location text,
  project_type text,
  service text,
  budget text,
  notes text,
  stage public.lead_stage NOT NULL DEFAULT 'new',
  score integer NOT NULL DEFAULT 0 CHECK (score >= 0 AND score <= 100),
  estimated_revenue numeric(12,2) NOT NULL DEFAULT 0,
  follow_up_at timestamptz,
  source text NOT NULL DEFAULT 'quote_form',
  owner_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX leads_stage_idx ON public.leads(stage);
CREATE INDEX leads_follow_up_idx ON public.leads(follow_up_at);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_set_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto lead-scoring trigger based on budget/project_type
CREATE OR REPLACE FUNCTION public.score_lead()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  s integer := 30;
  rev numeric := 0;
BEGIN
  -- Budget weighting
  CASE NEW.budget
    WHEN 'Under $10k'    THEN s := s + 5;  rev := 7500;
    WHEN '$10k – $25k'   THEN s := s + 15; rev := 17500;
    WHEN '$25k – $75k'   THEN s := s + 30; rev := 50000;
    WHEN '$75k – $200k'  THEN s := s + 45; rev := 137500;
    WHEN '$200k+'        THEN s := s + 55; rev := 275000;
    ELSE s := s + 0;
  END CASE;

  -- Project type
  IF NEW.project_type IN ('Commercial','Hospitality','Office') THEN
    s := s + 10;
  ELSIF NEW.project_type = 'Residential' THEN
    s := s + 5;
  END IF;

  -- Notes engagement
  IF NEW.notes IS NOT NULL AND length(NEW.notes) > 80 THEN
    s := s + 5;
  END IF;

  IF NEW.phone IS NOT NULL AND length(NEW.phone) >= 6 THEN
    s := s + 5;
  END IF;

  IF s > 100 THEN s := 100; END IF;
  IF s < 0 THEN s := 0; END IF;

  -- Only auto-set on insert or if values not explicitly provided as non-defaults
  IF TG_OP = 'INSERT' THEN
    IF NEW.score = 0 THEN NEW.score := s; END IF;
    IF NEW.estimated_revenue = 0 THEN NEW.estimated_revenue := rev; END IF;
    IF NEW.follow_up_at IS NULL THEN NEW.follow_up_at := now() + interval '1 day'; END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER leads_score_trigger
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.score_lead();

-- RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Anyone (anon + authenticated) can submit a lead via the public Quote form
CREATE POLICY "Public can submit leads"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (CRM staff) can read/update/delete
CREATE POLICY "Authenticated can view leads"
ON public.leads FOR SELECT
TO authenticated
USING (true);

CREATE POLICY "Authenticated can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Authenticated can delete leads"
ON public.leads FOR DELETE
TO authenticated
USING (true);

-- Lead activity log (notes/calls)
CREATE TABLE public.lead_activities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id uuid NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  kind text NOT NULL DEFAULT 'note',
  body text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX lead_activities_lead_idx ON public.lead_activities(lead_id);

ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can view activities"
ON public.lead_activities FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert activities"
ON public.lead_activities FOR INSERT TO authenticated
WITH CHECK (auth.uid() = author_id OR author_id IS NULL);

CREATE POLICY "Authenticated can delete own activities"
ON public.lead_activities FOR DELETE TO authenticated
USING (auth.uid() = author_id);
