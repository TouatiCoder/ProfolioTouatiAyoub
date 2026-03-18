-- Table for 2FA verification codes
CREATE TABLE public.two_fa_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  code text NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.two_fa_codes ENABLE ROW LEVEL SECURITY;

-- Only the system (service role) manages these codes
-- No RLS policies needed for anon/authenticated - edge function uses service role
CREATE POLICY "Service role manages 2fa codes" ON public.two_fa_codes
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Allow authenticated users to read their own codes (for verification)
CREATE POLICY "Users can read own codes" ON public.two_fa_codes
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

-- Cleanup old codes automatically
CREATE OR REPLACE FUNCTION public.cleanup_expired_2fa_codes()
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  DELETE FROM public.two_fa_codes WHERE expires_at < now() OR used = true;
$$;