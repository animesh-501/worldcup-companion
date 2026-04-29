"use client";

import { useEffect, useMemo, useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { Card } from "@/components/ui/Card";
import { LeaderboardList, LeaderboardRow } from "@/components/leaderboard/LeaderboardList";
import { mockLeaderboard } from "@/lib/data/mock";
import { supabase } from "@/lib/supabase/client";

type LeaderboardTotal = {
  username: string | null;
  flag_emoji: string | null;
  total_points: number | null;
};

export default function LeaderboardPage() {
  const [rows, setRows] = useState<LeaderboardRow[]>(mockLeaderboard);
  const [mode, setMode] = useState("Mock fallback");

  async function loadLeaderboard() {
    const { data, error } = await supabase
      .from("leaderboard_totals")
      .select("username, flag_emoji, total_points")
      .order("total_points", { ascending: false });

    if (error) {
      setRows(mockLeaderboard);
      setMode("Mock fallback");
      return;
    }

    const nextRows = ((data ?? []) as LeaderboardTotal[]).map((row) => ({
      username: row.username ?? "Anonymous fan",
      teamFlag: row.flag_emoji ?? "🏆",
      points: row.total_points ?? 0
    }));

    setRows(nextRows.length ? nextRows : mockLeaderboard);
    setMode(nextRows.length ? "Supabase realtime" : "Mock fallback");
  }

  useEffect(() => {
    loadLeaderboard();
    const channel = supabase
      .channel("leaderboard-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "predictions" }, () => {
        void loadLeaderboard();
      })
      .on("postgres_changes", { event: "*", schema: "public", table: "quiz_answers" }, () => {
        void loadLeaderboard();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const topScore = useMemo(() => rows[0]?.points ?? 0, [rows]);

  return (
    <AppShell>
      <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">Leaderboard</p>
          <h1 className="mt-2 text-3xl font-black">Global rankings</h1>
        </div>
        <Card className="p-4">
          <p className="text-sm font-semibold text-slate-500">{mode}</p>
          <p className="text-2xl font-black text-coral">{topScore} pts</p>
        </Card>
      </div>
      <LeaderboardList rows={rows} />
    </AppShell>
  );
}
