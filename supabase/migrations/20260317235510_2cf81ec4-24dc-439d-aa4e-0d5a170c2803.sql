
-- The leads INSERT policy with true is intentional for public contact forms.
-- Tighten it by adding basic validation (name and email must not be empty).
DROP POLICY "Anyone can submit leads" ON public.leads;
CREATE POLICY "Anyone can submit leads" ON public.leads
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(trim(name)) > 0 AND
    length(trim(email)) > 3 AND
    email ~ '^[^@]+@[^@]+\.[^@]+$'
  );
