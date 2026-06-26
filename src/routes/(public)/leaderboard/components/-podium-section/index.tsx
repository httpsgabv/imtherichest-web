import { useQuery } from "@tanstack/react-query";
import { PodiumTop3 } from "@/components/podium-top-3";
import { leaderboardQueryOptions } from "@/lib/api/leaderboard";

export function PodiumSection() {
  const { data } = useQuery(leaderboardQueryOptions());
  if (!data) return null;
  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      <PodiumTop3 users={data.users.slice(0, 3)} />
    </section>
  );
}
