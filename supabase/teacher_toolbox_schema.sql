-- Run in Supabase SQL editor
-- This creates the issue + review tables for /teacher-toolbox

create extension if not exists pgcrypto;

create table if not exists public.issue_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  type text not null check (type in ('bug', 'question', 'feature')),
  status text not null default 'new',
  name text,
  email text not null,
  tool text not null default 'GradeBridge',
  extension_version text,
  source_mode text,
  page_url text,
  repro_steps text,
  expected_behavior text,
  actual_behavior text,
  details text not null,
  no_pii_confirmed boolean not null default false
);

create index if not exists issue_reports_created_at_idx
  on public.issue_reports (created_at desc);

create index if not exists issue_reports_status_idx
  on public.issue_reports (status);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text,
  role text,
  tool text not null default 'GradeBridge',
  rating int not null check (rating between 1 and 5),
  body text not null,
  approved boolean not null default false,
  no_pii_confirmed boolean not null default false
);

create index if not exists reviews_approved_created_at_idx
  on public.reviews (approved, created_at desc);

-- RLS: keep direct public reads/writes locked down.
-- API routes use service-role key server-side.
alter table public.issue_reports enable row level security;
alter table public.reviews enable row level security;

drop policy if exists "deny_all_issue_reports" on public.issue_reports;
create policy "deny_all_issue_reports"
  on public.issue_reports
  for all
  using (false)
  with check (false);

drop policy if exists "deny_all_reviews" on public.reviews;
create policy "deny_all_reviews"
  on public.reviews
  for all
  using (false)
  with check (false);
