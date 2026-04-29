import { Card } from "@/components/ui/Card";

export type GroupMember = {
  username: string;
  teamFlag: string;
};

export function MemberList({ members }: { members: GroupMember[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {members.map((member) => (
        <Card key={member.username} className="flex items-center gap-3">
          <span className="text-3xl">{member.teamFlag}</span>
          <span className="font-black">{member.username}</span>
        </Card>
      ))}
    </div>
  );
}
