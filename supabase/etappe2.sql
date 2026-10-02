-- Etappe 2: telefoonveld + assessment-tabel
alter table public.contact_submissions add column if not exists phone text;

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  bureau_type text,
  bureau_size text,
  friction text[],
  tooling text,
  ambition text,
  ambition_extra text,
  name text not null,
  email text not null,
  phone text,
  score int,
  outcome text,
  source text default 'site',
  created_at timestamptz not null default now()
);
alter table public.assessment_submissions enable row level security;
-- geen publieke policies: alleen service-role schrijft en leest
