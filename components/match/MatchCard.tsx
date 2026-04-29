import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Match, getMatchTeams } from "@/lib/data/matches";

export function MatchCard({ match }: { match: Match }) {
  const { home, away } = getMatchTeams(match);
  const kickoff = new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(match.kickoff));

  return (
    <Link href={`/match/${match.id}`} className="block">
      <Card className="h-full transition hover:-translate-y-0.5 hover:border-coral">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-500">{match.venue}</p>
            <h3 className="mt-2 text-lg font-black">
              {home?.flag} {home?.name} vs {away?.flag} {away?.name}
            </h3>
          </div>
          <CalendarClock className="shrink-0 text-coral" />
        </div>
        <p className="mt-4 text-sm font-semibold text-slate-600">{kickoff}</p>
      </Card>
    </Link>
  );
}
