import { useQuery } from "@tanstack/react-query";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { leaderboardQueryOptions } from "@/lib/api/leaderboard";
import { sessionQueryOptions } from "@/lib/auth/session";

export function Top10Section() {
  const { data: leaderboard } = useQuery(leaderboardQueryOptions());
  const { data: session } = useQuery(sessionQueryOptions);
  if (!leaderboard) return null;
  const next7 = leaderboard.users.slice(3, 10);
  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-lg font-medium text-zinc-100">Top 10 contenders</h2>
        <span className="text-xs uppercase tracking-widest text-zinc-500">Ranks 04–10</span>
      </div>
      <div className="bg-zinc-900/30 ring-1 ring-white/5">
        {next7.map((u) => (
          <LeaderboardRow
            key={u.username}
            user={u}
            highlight={session?.user?.name === u.username}
          />
        ))}
      </div>
    </section>
  );
}
