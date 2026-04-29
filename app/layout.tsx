import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BottomTabBar } from "@/components/ui/BottomTabBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "WorldCup Companion",
  description: "Predictions, quizzes, groups, and live-ish leaderboard energy for World Cup fans."
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="pb-16 sm:pb-0">
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
