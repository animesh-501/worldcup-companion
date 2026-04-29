"use client";

import { FormEvent, useEffect, useState } from "react";
import { AppShell } from "@/components/ui/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { MemberList, GroupMember } from "@/components/groups/MemberList";
import { LeaderboardList } from "@/components/leaderboard/LeaderboardList";
import type { LeaderboardRow } from "@/components/leaderboard/LeaderboardList";
import { mockLeaderboard } from "@/lib/data/mock";
import { getTeam } from "@/lib/data/teams";
import { createInviteCode } from "@/lib/utils/codes";
import { supabase } from "@/lib/supabase/client";

type LocalGroup = {
  id: string;
  name: string;
  inviteCode: string;
};

export default function GroupsPage() {
  const [groupName, setGroupName] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [activeGroup, setActiveGroup] = useState<LocalGroup | null>(null);
  const [members, setMembers] = useState<GroupMember[]>([]);
  const [groupRows, setGroupRows] = useState<LeaderboardRow[]>(mockLeaderboard.slice(0, 3));
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("active_group");
    if (stored) setActiveGroup(JSON.parse(stored));
  }, []);

  useEffect(() => {
    const favorite = getTeam(localStorage.getItem("favorite_team"));
    setMembers([
      { username: "You", teamFlag: favorite?.flag ?? "🏆" },
      { username: "Maya", teamFlag: "🇧🇷" },
      { username: "Noah", teamFlag: "🇦🇷" }
    ]);
  }, [activeGroup]);

  useEffect(() => {
    async function loadGroupLeaderboard() {
      if (!activeGroup) return;

      const membersResult = await supabase
        .from("group_members")
        .select("user_id")
        .eq("group_id", activeGroup.id);

      if (membersResult.error || !membersResult.data?.length) {
        setGroupRows(mockLeaderboard.slice(0, 3));
        return;
      }

      const userIds = membersResult.data.map((member) => member.user_id);
      const [profilesResult, predictionsResult, quizResult] = await Promise.all([
        supabase.from("profiles").select("id, username, favorite_team_id").in("id", userIds),
        supabase.from("predictions").select("user_id, points_earned").in("user_id", userIds),
        supabase.from("quiz_answers").select("user_id, points_earned").in("user_id", userIds)
      ]);

      if (profilesResult.error || predictionsResult.error || quizResult.error) {
        setGroupRows(mockLeaderboard.slice(0, 3));
        return;
      }

      const profiles = new Map((profilesResult.data ?? []).map((profile) => [profile.id, profile]));
      const totals = new Map(userIds.map((id) => [id, 0]));

      [...(predictionsResult.data ?? []), ...(quizResult.data ?? [])].forEach((row) => {
        totals.set(row.user_id, (totals.get(row.user_id) ?? 0) + (row.points_earned ?? 0));
      });

      const rows = Array.from(totals.entries())
        .map(([userId, points]) => {
          const profile = profiles.get(userId);
          return {
            username: profile?.username ?? "Group fan",
            teamFlag: getTeam(profile?.favorite_team_id)?.flag ?? "🏆",
            points
          };
        })
        .sort((a, b) => b.points - a.points);

      setGroupRows(rows.length ? rows : mockLeaderboard.slice(0, 3));
    }

    void loadGroupLeaderboard();
  }, [activeGroup]);

  async function createGroup(event: FormEvent) {
    event.preventDefault();
    const inviteCode = createInviteCode();
    const { data } = await supabase.auth.getSession();
    const localGroup = {
      id: crypto.randomUUID(),
      name: groupName || "Matchday Crew",
      inviteCode
    };

    if (data.session?.user) {
      const { data: created, error } = await supabase
        .from("groups")
        .insert({ name: localGroup.name, invite_code: inviteCode, created_by: data.session.user.id })
        .select("id, name, invite_code")
        .single();

      if (!error && created) {
        await supabase.from("group_members").insert({ group_id: created.id, user_id: data.session.user.id });
        localGroup.id = created.id;
      }
    }

    localStorage.setItem("active_group", JSON.stringify(localGroup));
    setActiveGroup(localGroup);
    setStatus(`Group ready. Invite code: ${inviteCode}`);
  }

  async function joinGroup(event: FormEvent) {
    event.preventDefault();
    const code = joinCode.toUpperCase();
    const { data } = await supabase.auth.getSession();

    if (data.session?.user) {
      const { data: group } = await supabase.from("groups").select("id, name, invite_code").eq("invite_code", code).single();
      if (group) {
        await supabase.from("group_members").insert({ group_id: group.id, user_id: data.session.user.id });
        const joined = { id: group.id, name: group.name, inviteCode: group.invite_code };
        localStorage.setItem("active_group", JSON.stringify(joined));
        setActiveGroup(joined);
        setStatus(`Joined ${group.name}.`);
        return;
      }
    }

    const joined = { id: crypto.randomUUID(), name: "Local Group", inviteCode: code };
    localStorage.setItem("active_group", JSON.stringify(joined));
    setActiveGroup(joined);
    setStatus("Joined locally. Log in to join Supabase groups.");
  }

  return (
    <AppShell>
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-coral">Groups</p>
        <h1 className="mt-2 text-3xl font-black">Private leagues</h1>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <Card>
          <h2 className="text-xl font-black">Create group</h2>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={createGroup}>
            <input
              className="min-h-11 flex-1 rounded-md border border-slate-300 px-3"
              placeholder="Group name"
              value={groupName}
              onChange={(event) => setGroupName(event.target.value)}
            />
            <Button type="submit">Create</Button>
          </form>
        </Card>
        <Card>
          <h2 className="text-xl font-black">Join by code</h2>
          <form className="mt-4 flex flex-col gap-3 sm:flex-row" onSubmit={joinGroup}>
            <input
              className="min-h-11 flex-1 rounded-md border border-slate-300 px-3 uppercase"
              placeholder="ABC123"
              maxLength={6}
              value={joinCode}
              onChange={(event) => setJoinCode(event.target.value)}
              required
            />
            <Button type="submit" variant="secondary">Join</Button>
          </form>
        </Card>
      </div>
      {status && <p className="mt-4 text-sm font-semibold text-slate-600">{status}</p>}
      {activeGroup && (
        <section className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Card className="mb-4">
              <p className="text-sm font-semibold text-slate-500">Active group</p>
              <h2 className="mt-1 text-2xl font-black">{activeGroup.name}</h2>
              <p className="mt-2 font-mono text-coral">{activeGroup.inviteCode}</p>
            </Card>
            <MemberList members={members} />
          </div>
          <div>
            <h2 className="mb-4 text-xl font-black">Group leaderboard</h2>
            <LeaderboardList rows={groupRows} />
          </div>
        </section>
      )}
    </AppShell>
  );
}
