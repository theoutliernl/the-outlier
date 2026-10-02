-- Herstel van de drie formuliertabellen (kwijtgeraakt bij de Payload schema-push)
-- Payload-tabellen blijven onaangeroerd; PAYLOAD_DB_PUSH blijft uit op Vercel.

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  message text,
  source text default 'site',
  status text default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.assessment_submissions (
  id uuid primary key default gen_random_uuid(),
  bureau_type text,
  bureau_size text,
  friction text[],
  tooling text,
  ambition text[],
  ambition_extra text,
  name text not null,
  email text not null,
  phone text,
  score int,
  outcome text,
  source text default 'site',
  created_at timestamptz not null default now()
);

create table if not exists public.newsletter_optins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'footer',
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;
alter table public.assessment_submissions enable row level security;
alter table public.newsletter_optins enable row level security;
