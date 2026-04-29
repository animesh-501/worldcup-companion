# WorldCup Companion

WorldCup Companion is a mobile-first MVP for fans to pick a favorite national team, preview seeded World Cup matches, submit predictions, play a trivia quiz, compete on realtime leaderboards, and create private groups with invite codes. It is built with Next.js 14 App Router, TypeScript, Tailwind CSS, and Supabase.

## Required Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Then set:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://wxeoomogotcicronjkxb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

The app includes the provided Supabase URL and publishable anon key as development fallbacks in `lib/supabase/client.ts`, but production deployments should use environment variables.

## Install And Run

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

Run the SQL manually in the Supabase SQL editor:

1. Open your Supabase project.
2. Go to SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Paste and run `supabase/seed.sql`.
5. In Authentication settings, confirm magic-link email auth is enabled.
6. In Realtime settings, confirm `predictions` and `quiz_answers` are enabled if your project does not apply the publication statements automatically.

The schema creates:

- `teams`
- `profiles`
- `matches`
- `predictions`
- `quiz_questions`
- `quiz_answers`
- `groups`
- `group_members`
- `leaderboard_totals` view

RLS keeps predictions and quiz answers user-owned, keeps group data readable by members, and exposes leaderboard totals through the public view.

## Features

- `/onboarding`: 32 national teams as tappable cards, stored in `favorite_team` cookie and localStorage.
- `/home`: favorite team hero and four upcoming match cards.
- `/match/[id]`: team header, kickoff time, three match facts, and prediction form with local fallback.
- `/quiz`: one question at a time, instant answer feedback, progress, and final score.
- `/leaderboard`: public ranked totals with Supabase Realtime refresh and mock fallback.
- `/groups`: create invite-code groups, join by code, and view group leaderboard.
- `/login`: Supabase magic-link email login redirecting back to `/home`.

All team, match, and quiz data is seeded/mock data for now. No paid APIs are used.
