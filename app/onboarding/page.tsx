"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { teams } from "@/lib/data/teams";

export default function OnboardingPage() {
  const router = useRouter();
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

  function continueToHome() {
    if (!selectedTeam) return;
    localStorage.setItem("favorite_team", selectedTeam);
    document.cookie = `favorite_team=${selectedTeam}; path=/; max-age=31536000; SameSite=Lax`;
    router.push("/home");
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-midnight">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">Onboarding</p>
          <h1 className="mt-2 text-3xl font-black sm:text-5xl">Pick your team</h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Your selection powers the home screen, groups, and leaderboard identity.
          </p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className="text-left"
            >
              <Card className={`relative h-full transition ${selectedTeam === team.id ? "border-coral ring-2 ring-coral" : "hover:border-slate-300"}`}>
                {selectedTeam === team.id && (
                  <span className="absolute right-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-coral text-white">
                    <Check size={16} />
                  </span>
                )}
                <div className="text-4xl">{team.flag}</div>
                <h2 className="mt-3 text-lg font-black">{team.name}</h2>
                <p className="text-sm font-semibold text-slate-500">Group {team.group}</p>
              </Card>
            </button>
          ))}
        </div>
        <div className="sticky bottom-0 mt-6 border-t border-slate-200 bg-slate-50/95 py-4 backdrop-blur">
          <Button className="w-full sm:w-auto" disabled={!selectedTeam} onClick={continueToHome}>
            Continue
          </Button>
        </div>
      </div>
    </main>
  );
}
