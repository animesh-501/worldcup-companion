"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, HelpCircle, Home, Shield, Trophy } from "lucide-react";
import { clsx } from "clsx";

const tabs = [
  { href: "/home", label: "Home", icon: Home },
  { href: "/match/match-001", label: "Match", icon: Shield },
  { href: "/quiz", label: "Quiz", icon: HelpCircle },
  { href: "/leaderboard", label: "Leaderboard", icon: BarChart3 },
  { href: "/groups", label: "Groups", icon: Trophy }
];

export function BottomTabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-slate-200 bg-white sm:hidden">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = pathname === tab.href || (tab.href.startsWith("/match") && pathname.startsWith("/match"));

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={clsx(
              "flex min-h-16 flex-col items-center justify-center gap-1 px-1 text-[11px] font-semibold",
              active ? "text-coral" : "text-slate-600"
            )}
          >
            <Icon size={18} />
            <span className="max-w-full truncate">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
