-- The Outlier site backend
create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source text default 'site',
  status text default 'new',
  created_at timestamptz not null default now()
);
alter table public.contact_submissions enable row level security;
-- geen publieke policies: alleen service-role schrijft en leest