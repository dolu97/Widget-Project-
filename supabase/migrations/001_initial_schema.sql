-- Daily Goals Tracker - real schema matching the TypeScript app model
create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id text primary key,
  locale text not null default 'fr-CA' check (locale in ('fr-CA', 'en')),
  week_start integer not null default 1 check (week_start in (0, 1)),
  timezone text not null default 'UTC',
  streak_threshold integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.goals (
  id text primary key,
  title text not null,
  category text not null,
  icon text not null,
  emoji text,
  color text,
  recurrence_type text not null default 'daily' check (recurrence_type in ('daily', 'specific_weekdays', 'one_time')),
  weekdays integer[] null,
  due_date date null,
  target_value numeric null,
  target_unit text null,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  deleted_at timestamptz null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_today boolean not null default false
);

create table if not exists public.goal_completions (
  id text primary key,
  goal_id text not null references public.goals(id) on delete cascade,
  user_id text not null,
  local_date date not null,
  is_completed boolean not null default false,
  progress_value numeric not null default 0,
  completed_at timestamptz null,
  timezone text not null default 'UTC',
  source text not null default 'app' check (source in ('app', 'api')),
  updated_at timestamptz not null default now(),
  unique (goal_id, user_id, local_date)
);

create index if not exists idx_goals_active_sort on public.goals (is_active, sort_order);
create index if not exists idx_goals_due_date on public.goals (due_date);
create index if not exists idx_goal_completions_local_date on public.goal_completions (local_date);

alter table public.profiles enable row level security;
alter table public.goals enable row level security;
alter table public.goal_completions enable row level security;

create policy if not exists "profiles are readable by all" on public.profiles
for select using (true);

create policy if not exists "goals are readable by all" on public.goals
for select using (true);

create policy if not exists "goals are writable by all" on public.goals
for all using (true) with check (true);

create policy if not exists "goal completions are readable by all" on public.goal_completions
for select using (true);

create policy if not exists "goal completions are writable by all" on public.goal_completions
for all using (true) with check (true);
