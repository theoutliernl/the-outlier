-- Assessment v2 (Oct 2026): additive only. Existing rows and columns stay untouched.
alter table public.assessment_submissions add column if not exists answers jsonb;
alter table public.assessment_submissions add column if not exists company text;
alter table public.assessment_submissions add column if not exists role text;
alter table public.assessment_submissions add column if not exists timing text;
alter table public.assessment_submissions add column if not exists interest text;
alter table public.assessment_submissions add column if not exists profile text;
-- RLS stays enabled with no public policies: only the service role reads and writes.
