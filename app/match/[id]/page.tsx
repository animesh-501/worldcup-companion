"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getMatch, getMatchTeams } from "@/lib/data/matches";
import { supabase } from "@/lib/supabase/client";

// FUTURE: replace with live match API

export default function MatchPage() {
  const params = useParams<{ id: string }>();
  const match = getMatch(params.id);
  const [winner, setWinner] = useState("");
  const [homeScore, setHomeScore] = useState("");
  const [awayScore, setAwayScore] = useState("");
  const [firstScorer, setFirstScorer] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);

  if (!match) {
    return (
      <AppShell>
        <Card>
          <h1 className="text-2xl font-black">Match not found</h1>
          <Link className="mt-4 inline-flex font-semibold text-coral" href="/home">
            Back to home
          </Link>
        </Card>
      </AppShell>
    );
  }

  const activeMatch = match;
  const { home, away } = getMatchTeams(activeMatch);
  const kickoff = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short"
  }).format(new Date(activeMatch.kickoff));

  async function savePrediction(event: FormEvent) {
    event.preventDefault();
    const predictedHomeScore = Number(homeScore);
    const predictedAwayScore = Number(awayScore);
    const { data } = await supabase.auth.getSession();
    const payload = {
      match_id: activeMatch.id,
      predicted_winner_id: winner,
      predicted_home_score: Number.isFinite(predictedHomeScore) ? predictedHomeScore : null,
      predicted_away_score: Number.isFinite(predictedAwayScore) ? predictedAwayScore : null,
      predicted_scorer: firstScorer,
      points_earned: 0
    };

    if (data.session?.user) {
      const { error } = await supabase.from("predictions").upsert({
        ...payload,
        user_id: data.session.user.id
      }, {
        onConflict: "user_id,match_id"
      });

      if (!error) {
        setStatus("Prediction saved to Supabase.");
        return;
      }
    }

    const existing = JSON.parse(localStorage.getItem("predictions") ?? "[]");
    localStorage.setItem("predictions", JSON.stringify([...existing, payload]));
    setShowSignInPrompt(true);
    setStatus("Prediction saved locally.");
  }

  return (
    <AppShell>
      <section className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <Card className="bg-pitch p-6 text-white">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">{activeMatch.venue}</p>
          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-4 text-center">
            <div>
              <div className="text-6xl">{home?.flag}</div>
              <h1 className="mt-2 text-2xl font-black">{home?.name}</h1>
            </div>
            <span className="text-xl font-black text-white/70">vs</span>
            <div>
              <div className="text-6xl">{away?.flag}</div>
              <h1 className="mt-2 text-2xl font-black">{away?.name}</h1>
            </div>
          </div>
          <p className="mt-6 text-center font-semibold text-white/85">{kickoff}</p>
        </Card>
        <Card>
          <h2 className="text-xl font-black">3 things to know</h2>
          <ul className="mt-4 space-y-3">
            {activeMatch.facts.map((fact) => (
              <li key={fact} className="rounded-md bg-slate-100 p-3 text-sm font-medium text-slate-700">
                {fact}
              </li>
            ))}
          </ul>
        </Card>
      </section>
      <Card className="mt-6">
        <h2 className="text-xl font-black">Make your prediction</h2>
        <form className="mt-5 grid gap-4 md:grid-cols-4" onSubmit={savePrediction}>
          <fieldset className="md:col-span-4">
            <legend className="text-sm font-semibold text-slate-600">Winner</legend>
            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {[home, away].map((team) => (
                <button
                  key={team?.id}
                  type="button"
                  onClick={() => setWinner(team?.id ?? "")}
                  className={`rounded-md border p-4 text-left transition ${
                    winner === team?.id ? "border-coral bg-red-50 ring-2 ring-coral" : "border-slate-200 hover:border-coral"
                  }`}
                >
                  <span className="text-4xl">{team?.flag}</span>
                  <span className="mt-2 block text-lg font-black">{team?.name}</span>
                </button>
              ))}
            </div>
          </fieldset>
          <label>
            <span className="text-sm font-semibold text-slate-600">{home?.name} score</span>
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-3"
              value={homeScore}
              onChange={(event) => setHomeScore(event.target.value)}
              required
            />
          </label>
          <label>
            <span className="text-sm font-semibold text-slate-600">{away?.name} score</span>
            <input
              type="number"
              min="0"
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-3"
              value={awayScore}
              onChange={(event) => setAwayScore(event.target.value)}
              required
            />
          </label>
          <label className="md:col-span-2">
            <span className="text-sm font-semibold text-slate-600">First scorer</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-3"
              placeholder="Player name"
              value={firstScorer}
              onChange={(event) => setFirstScorer(event.target.value)}
              required
            />
          </label>
          <div className="md:col-span-4">
            <Button type="submit" disabled={!winner}>Save prediction</Button>
            {status && <p className="mt-3 text-sm font-semibold text-slate-600">{status}</p>}
            {showSignInPrompt && (
              <p className="mt-3 rounded-md bg-slate-100 p-3 text-sm font-semibold text-slate-700">
                Sign in to save your score.{" "}
                <Link href="/login" className="text-coral">
                  Go to login
                </Link>
              </p>
            )}
          </div>
        </form>
      </Card>
    </AppShell>
  );
}
