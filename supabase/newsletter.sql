create table if not exists public.newsletter_optins (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  source text default 'footer',
  created_at timestamptz not null default now()
);
alter table public.newsletter_optins enable row level security;