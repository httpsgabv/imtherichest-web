import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/auth/session";
import { profileQueryOptions, userRankQueryOptions } from "@/lib/api/users";
import { formatNumber } from "@/lib/format";

export function RankProgressionSection() {
  const { data: session } = useQuery(sessionQueryOptions);
  const { data: profile } = useQuery(profileQueryOptions);
  const { data: rankData } = useQuery(userRankQueryOptions(session?.user?.name ?? ""));
  if (!profile || !rankData) return null;

  const rival =
    rankData.nextRivalDelta != null
      ? { pointsNeeded: rankData.nextRivalDelta, rivalRank: rankData.rank - 1 }
      : null;

  const progress = rival
    ? Math.max(5, Math.min(95, (profile.points / (profile.points + rival.pointsNeeded)) * 100))
    : 100;

  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <div className="bg-zinc-900 ring-1 ring-white/5 p-8">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Rank progression</p>
        {rival ? (
          <>
            <p className="mt-3 text-xl text-zinc-100">
              You need{" "}
              <span className="text-gold font-bold">+{formatNumber(rival.pointsNeeded)}</span>{" "}
              points to pass
              <span className="text-zinc-100"> #{rival.rivalRank}</span>.
            </p>
            <div className="mt-6 h-2 w-full bg-zinc-800">
              <div className="h-full bg-gold transition-all" style={{ width: `${progress}%` }} />
            </div>
          </>
        ) : (
          <p className="mt-3 text-xl text-zinc-100">
            You are <span className="text-gold font-bold">#1</span>. Defend the throne.
          </p>
        )}
      </div>
    </section>
  );
}
