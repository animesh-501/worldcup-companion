import { Card } from "@/components/ui/Card";
import Link from "next/link";

export function QuizResult({ score, total }: { score: number; total: number }) {
  return (
    <Card className="text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Final score</p>
      <h2 className="mt-3 text-5xl font-black text-coral">{score}</h2>
      <p className="mt-2 text-slate-600">You answered {score / 10} of {total} correctly.</p>
      <Link className="mt-6 inline-flex rounded-md bg-coral px-4 py-2 text-sm font-black text-white" href="/home">
        Back to Home
      </Link>
    </Card>
  );
}
