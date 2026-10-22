create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  locale text not null default 'fr-CA',
  week_start integer not null default 1,
  timezone text not null default 'America/Toronto',
  streak_threshold integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists goals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  category text not null default 'Other',
  icon text not null default 'sparkles',
  emoji text,
  color text,
  recurrence_type text not null check (recurrence_type in ('daily', 'specific_weekdays', 'one_time')),
  weekdays integer[] default '{}',
  due_date date,
  target_value numeric,
  target_unit text,
  sort_order integer not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create table if not exists goal_completions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  goal_id uuid not null references goals(id) on delete cascade,
  local_date date not null,
  is_completed boolean not null default false,
  progress_value numeric not null default 0,
  completed_at timestamptz,
  timezone text not null default 'America/Toronto',
  source text not null default 'app' check (source in ('app', 'api')),
  updated_at timestamptz not null default now(),
  unique (user_id, goal_id, local_date)
);

create table if not exists daily_snapshots (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  local_date date not null,
  scheduled_goal_ids uuid[] not null default '{}',
  total_count integer not null default 0,
  completed_count integer not null default 0,
  completion_pct numeric,
  is_finalized boolean not null default false,
  updated_at timestamptz not null default now(),
  unique (user_id, local_date)
);

create table if not exists api_tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references profiles(id) on delete cascade,
  name text not null,
  token_hash text not null unique,
  created_at timestamptz not null default now(),
  last_used_at timestamptz,
  revoked_at timestamptz
);

create index if not exists idx_goals_user_active on goals (user_id, is_active);
create index if not exists idx_goal_completions_user_date on goal_completions (user_id, local_date);
create index if not exists idx_daily_snapshots_user_date on daily_snapshots (user_id, local_date);
create index if not exists idx_api_tokens_hash on api_tokens (token_hash);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at before update on profiles
for each row execute procedure set_updated_at();

create trigger goals_updated_at before update on goals
for each row execute procedure set_updated_at();

create trigger goal_completions_updated_at before update on goal_completions
for each row execute procedure set_updated_at();

create trigger daily_snapshots_updated_at before update on daily_snapshots
for each row execute procedure set_updated_at();

alter table profiles enable row level security;
alter table goals enable row level security;
alter table goal_completions enable row level security;
alter table daily_snapshots enable row level security;
alter table api_tokens enable row level security;

create policy "profiles_access_self" on profiles
  for all using (auth.uid() = id) with check (auth.uid() = id);

create policy "goals_access_self" on goals
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "goal_completions_access_self" on goal_completions
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "daily_snapshots_access_self" on daily_snapshots
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "api_tokens_access_self" on api_tokens
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
