import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/auth/session";
import { profileQueryOptions, userRankQueryOptions } from "@/lib/api/users";
import { StatCard } from "@/components/stat-card";
import { formatCurrency, formatNumber } from "@/lib/format";

export function StatsSection() {
  const { data: session } = useQuery(sessionQueryOptions);
  const { data: profile } = useQuery(profileQueryOptions);
  const { data: rankData } = useQuery(userRankQueryOptions(session?.user?.name ?? ""));
  if (!profile || !rankData) return null;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard label="Current rank" value={`#${rankData.rank}`} accent />
        <StatCard label="Total points" value={formatNumber(profile.points)} accent />
        <StatCard label="Total paid" value={formatCurrency(profile.totalPaid)} />
      </div>
    </section>
  );
}
