"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/ui/AppShell";
import { Card } from "@/components/ui/Card";
import { MatchCard } from "@/components/match/MatchCard";
import { matches } from "@/lib/data/matches";
import { getTeam, teams } from "@/lib/data/teams";

function readCookie(name: string) {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`))
    ?.split("=")[1];
}

export default function HomePage() {
  const [favoriteTeamId, setFavoriteTeamId] = useState<string | null>(null);

  useEffect(() => {
    setFavoriteTeamId(readCookie("favorite_team") ?? localStorage.getItem("favorite_team") ?? "usa");
  }, []);

  const favoriteTeam = getTeam(favoriteTeamId) ?? teams[0];

  return (
    <AppShell>
      <section className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="bg-midnight p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Favorite team</p>
          <div className="mt-6 flex items-center gap-4">
            <span className="text-6xl">{favoriteTeam.flag}</span>
            <div>
              <h1 className="text-4xl font-black">{favoriteTeam.name}</h1>
              <p className="mt-1 text-slate-300">Group {favoriteTeam.group}</p>
            </div>
          </div>
          <Link className="mt-6 inline-flex rounded-md bg-white px-4 py-2 text-sm font-black text-midnight" href="/onboarding">
            Change team
          </Link>
        </Card>
        <Card>
          <h2 className="text-xl font-black">Your match center</h2>
          <p className="mt-2 text-slate-600">
            Make predictions, play the quiz, and watch standings update as points land.
          </p>
          <div className="mt-5 grid grid-cols-3 gap-3 text-center">
            <div className="rounded-md bg-slate-100 p-3">
              <p className="text-2xl font-black text-coral">4</p>
              <p className="text-xs font-semibold text-slate-600">Matches</p>
            </div>
            <div className="rounded-md bg-slate-100 p-3">
              <p className="text-2xl font-black text-coral">10</p>
              <p className="text-xs font-semibold text-slate-600">Quiz Qs</p>
            </div>
            <div className="rounded-md bg-slate-100 p-3">
              <p className="text-2xl font-black text-coral">20</p>
              <p className="text-xs font-semibold text-slate-600">Max pts</p>
            </div>
          </div>
        </Card>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-black">Upcoming matches</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {matches.slice(0, 4).map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
