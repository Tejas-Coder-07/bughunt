-- Bug Hunt: run this ONCE in Supabase → SQL Editor → New query → Run

create table if not exists public.scores (
  id          bigint generated always as identity primary key,
  player_id   text not null check (char_length(player_id) between 4 and 64),
  name        text not null check (char_length(name) between 1 and 16),
  score       int  not null check (score between 0 and 5000),
  mode        text not null check (mode in ('py', 'c', 'mix')),
  correct     int  not null default 0 check (correct between 0 and 500),
  created_at  timestamptz not null default now()
);

create index if not exists scores_score_idx on public.scores (score desc);
create index if not exists scores_created_idx on public.scores (created_at desc);

-- Row Level Security: anyone can READ and ADD scores, nobody can edit or delete from the website
alter table public.scores enable row level security;

drop policy if exists "public read scores" on public.scores;
create policy "public read scores" on public.scores for select to anon, authenticated using (true);

drop policy if exists "public add scores" on public.scores;
create policy "public add scores" on public.scores for insert to anon, authenticated with check (true);

grant select, insert on public.scores to anon, authenticated;

-- ─────────────────────────────────────────────────────────────
-- Before the event, to wipe your test scores, run just this line:
--   delete from public.scores;
-- ─────────────────────────────────────────────────────────────
