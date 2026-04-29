"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { clsx } from "clsx";
import { BarChart3, HelpCircle, Home, Shield, Trophy } from "lucide-react";

const nav = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/match/match-001", label: "Match", icon: Shield },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/groups", label: "Groups", icon: Trophy }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 text-midnight">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link href="/home" className="flex items-center gap-2 font-black tracking-normal">
            <span className="grid h-9 w-9 place-items-center rounded-md bg-pitch text-white">
              <Trophy size={18} />
            </span>
            <span>WorldCup Companion</span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  "rounded-md px-3 py-2 text-sm font-semibold",
                  pathname === item.href || (item.href.startsWith("/match") && pathname.startsWith("/match"))
                    ? "bg-slate-100 text-coral"
                    : "text-slate-600 hover:text-midnight"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 sm:py-8">{children}</main>
    </div>
  );
}
