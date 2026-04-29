import { Card } from "@/components/ui/Card";

export type LeaderboardRow = {
  username: string;
  teamFlag: string;
  points: number;
};

export function LeaderboardList({ rows }: { rows: LeaderboardRow[] }) {
  return (
    <div className="space-y-3">
      {rows.map((row, index) => (
        <Card key={`${row.username}-${index}`} className="flex items-center gap-4 p-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-slate-100 text-sm font-black">
            #{index + 1}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate font-black">{row.teamFlag} {row.username}</p>
            <p className="text-sm text-slate-500">Ranked by total points</p>
          </div>
          <p className="text-xl font-black text-coral">{row.points}</p>
        </Card>
      ))}
    </div>
  );
}
