import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { StatCard } from "@/components/stat-card";
import { AchievementCard } from "@/components/achievement-card";
import { useAppStore, selectCurrentUser } from "@/store/app-store";
import { getUserRank, getNextRivalDelta } from "@/services/leaderboard-service";
import { achievementById } from "@/data/achievements";
import { formatCurrency, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ImTheRichest" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  useAppStore((s) => s.users);
  const currentUser = useAppStore(selectCurrentUser);
  if (!currentUser) return null;
  const rank = getUserRank(currentUser.id);
  const rival = getNextRivalDelta(currentUser.id);
  const recent = currentUser.achievements
    .slice(-4)
    .reverse()
    .map((id) => achievementById(id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  const progress = rival
    ? Math.max(5, Math.min(95, (currentUser.points / (currentUser.points + rival.pointsNeeded)) * 100))
    : 100;

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <p className="text-xs uppercase tracking-widest text-zinc-500">Welcome back</p>
        <h1 className="mt-2 text-4xl font-medium text-zinc-100">{currentUser.displayName}</h1>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard label="Current rank" value={`#${rank}`} accent />
          <StatCard label="Total points" value={formatNumber(currentUser.points)} accent />
          <StatCard label="Total paid" value={formatCurrency(currentUser.totalPaid)} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <Link
          to="/pay"
          className="block bg-gold p-10 text-center text-zinc-950 hover:bg-gold-light transition-colors"
        >
          <p className="text-xs uppercase tracking-[0.3em] font-semibold">Climb the ranks</p>
          <p className="mt-3 text-4xl font-black">Pay</p>
          <p className="mt-3 text-sm">Every dollar — one point closer to the throne.</p>
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="bg-zinc-900 ring-1 ring-white/5 p-8">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Rank progression</p>
          {rival ? (
            <>
              <p className="mt-3 text-xl text-zinc-100">
                You need <span className="text-gold font-bold">+{formatNumber(rival.pointsNeeded)}</span> points to pass
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

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-lg font-medium text-zinc-100">Latest achievements</h2>
          <Link to="/achievements" className="text-xs uppercase tracking-widest text-gold hover:text-gold-light">
            View all →
          </Link>
        </div>
        {recent.length === 0 ? (
          <div className="bg-zinc-900 ring-1 ring-white/5 p-10 text-center text-sm text-zinc-500">
            No achievements yet — make your first payment to begin.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {recent.map((a) => (
              <AchievementCard key={a.id} achievement={a} unlocked />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />
    </div>
  );
}