import { useQuery } from "@tanstack/react-query";
import { publicProfileQueryOptions, publicUserAchievementsQueryOptions } from "@/lib/api/users";
import { StatCard } from "@/components/stat-card";
import { formatCurrency, formatNumber } from "@/lib/format";

interface Props {
  username: string;
}

export function ProfileStats({ username }: Props) {
  const { data: profile } = useQuery(publicProfileQueryOptions(username));
  const { data: achievements } = useQuery(publicUserAchievementsQueryOptions(username));
  if (!profile) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current rank" value={`#${profile.rank}`} accent />
        <StatCard label="Total points" value={formatNumber(profile.points)} accent />
        <StatCard
          label="Total paid"
          value={profile.totalPaid != null ? formatCurrency(profile.totalPaid) : "—"}
        />
        <StatCard label="Achievements" value={achievements?.unlockedIds.length ?? "—"} />
      </div>
    </section>
  );
}
