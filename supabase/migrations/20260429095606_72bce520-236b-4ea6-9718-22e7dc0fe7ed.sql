
ALTER FUNCTION public.set_updated_at() SET search_path = public;
ALTER FUNCTION public.score_lead() SET search_path = public;

DROP POLICY "Authenticated can update leads" ON public.leads;
DROP POLICY "Authenticated can delete leads" ON public.leads;
DROP POLICY "Authenticated can insert activities" ON public.lead_activities;

CREATE POLICY "Authenticated can update leads"
ON public.leads FOR UPDATE
TO authenticated
USING (auth.uid() IS NOT NULL)
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can delete leads"
ON public.leads FOR DELETE
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated can insert activities"
ON public.lead_activities FOR INSERT TO authenticated
WITH CHECK (auth.uid() IS NOT NULL AND (author_id IS NULL OR author_id = auth.uid()));
