-- Add missing columns to the existing 'vagas' table
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS posted_at text;
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS source text default 'linkedin';
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS type text default 'Remoto';
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS link text;
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS salary text;
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS company text;
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS location text;
ALTER TABLE public.vagas ADD COLUMN IF NOT EXISTS description text;

-- Refresh the schema cache (handled automatically by Supabase usually, but good to know)
NOTIFY pgrst, 'reload config';
