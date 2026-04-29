create extension if not exists "pgcrypto";

create table if not exists public.teams (
  id text primary key,
  name text not null,
  code text not null unique,
  flag_emoji text not null,
  group_stage text not null check (group_stage in ('A','B','C','D','E','F','G','H')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text,
  favorite_team_id text references public.teams(id),
  total_points int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.matches (
  id text primary key,
  home_team_id text not null references public.teams(id),
  away_team_id text not null references public.teams(id),
  kickoff_at timestamptz not null,
  stage text not null default 'Group stage',
  home_score int,
  away_score int,
  status text not null default 'scheduled',
  facts jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.predictions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  match_id text not null references public.matches(id) on delete cascade,
  predicted_winner_id text references public.teams(id),
  predicted_home_score int,
  predicted_away_score int,
  predicted_scorer text,
  points_earned int not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, match_id)
);

create table if not exists public.quiz_questions (
  id text primary key,
  question text not null,
  options jsonb not null,
  correct_index int not null check (correct_index between 0 and 3),
  category text not null default 'World Cup',
  created_at timestamptz not null default now(),
  constraint quiz_options_has_four check (jsonb_array_length(options) = 4)
);

create table if not exists public.quiz_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  question_id text not null references public.quiz_questions(id) on delete cascade,
  chosen_index int not null check (chosen_index between 0 and 3),
  is_correct boolean not null,
  points_earned int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text not null unique check (invite_code ~ '^[A-Z0-9]{6}$'),
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.group_members (
  group_id uuid not null references public.groups(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (group_id, user_id)
);

create or replace view public.leaderboard_totals as
select
  p.id as user_id,
  coalesce(p.username, 'Anonymous fan') as username,
  p.favorite_team_id,
  t.flag_emoji,
  coalesce(sum(points.points_earned), 0)::int as total_points
from public.profiles p
left join public.teams t on t.id = p.favorite_team_id
left join (
  select user_id, points_earned from public.predictions
  union all
  select user_id, points_earned from public.quiz_answers
) points on points.user_id = p.id
group by p.id, p.username, p.favorite_team_id, t.flag_emoji;

alter table public.teams enable row level security;
alter table public.profiles enable row level security;
alter table public.matches enable row level security;
alter table public.predictions enable row level security;
alter table public.quiz_questions enable row level security;
alter table public.quiz_answers enable row level security;
alter table public.groups enable row level security;
alter table public.group_members enable row level security;

create policy "Teams are publicly readable" on public.teams for select using (true);
create policy "Matches are publicly readable" on public.matches for select using (true);
create policy "Quiz questions are publicly readable" on public.quiz_questions for select using (true);
create policy "Profiles are publicly readable for leaderboard" on public.profiles for select using (true);
create policy "Users insert own profile" on public.profiles for insert to authenticated with check (auth.uid() = id);
create policy "Users update own profile" on public.profiles for update to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "Users read own predictions" on public.predictions for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own predictions" on public.predictions for insert to authenticated with check (auth.uid() = user_id);
create policy "Users update own predictions" on public.predictions for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "Users read own quiz answers" on public.quiz_answers for select to authenticated using (auth.uid() = user_id);
create policy "Users insert own quiz answers" on public.quiz_answers for insert to authenticated with check (auth.uid() = user_id);

create policy "Group data readable by members" on public.groups
  for select to authenticated
  using (created_by = auth.uid() or exists (
    select 1 from public.group_members gm where gm.group_id = groups.id and gm.user_id = auth.uid()
  ));
create policy "Authenticated users can find invite codes" on public.groups for select to authenticated using (true);
create policy "Users create groups" on public.groups for insert to authenticated with check (auth.uid() = created_by);

create policy "Group memberships readable by members" on public.group_members
  for select to authenticated
  using (user_id = auth.uid() or exists (
    select 1 from public.group_members gm where gm.group_id = group_members.group_id and gm.user_id = auth.uid()
  ));
create policy "Users join groups as themselves" on public.group_members for insert to authenticated with check (auth.uid() = user_id);

grant select on public.leaderboard_totals to anon, authenticated;

alter publication supabase_realtime add table public.predictions;
alter publication supabase_realtime add table public.quiz_answers;
