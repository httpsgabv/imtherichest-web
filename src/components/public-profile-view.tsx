import { Link } from "@tanstack/react-router";
import { AvatarCircle } from "@/components/avatar-circle";
import { StatCard } from "@/components/stat-card";
import { AchievementCard } from "@/components/achievement-card";
import { achievementDefs } from "@/data/achievements";
import { getUserPayments } from "@/services/payments-service";
import type { RankedUser } from "@/services/leaderboard-service";
import { formatCurrency, formatDate, formatNumber } from "@/lib/format";

interface PublicProfileViewProps {
  user: RankedUser;
  isOwner?: boolean;
}

export const PublicProfileView = ({ user, isOwner = false }: PublicProfileViewProps) => {
  const payments = getUserPayments(user.id).slice(0, 8);
  const tone =
    user.rank <= 3
      ? user.rank === 1
        ? "gold"
        : user.rank === 2
          ? "silver"
          : "bronze"
      : "neutral";

  return (
    <>
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
          <AvatarCircle name={user.displayName} src={user.avatarUrl} size="xl" tone={tone} />
          <div className="flex-1">
            <h1 className="text-3xl font-medium text-zinc-100">{user.displayName}</h1>
            <p className="text-sm text-zinc-500">
              @{user.username} · Joined {formatDate(user.joinDate)}
            </p>
            {user.bio ? <p className="mt-3 max-w-xl text-sm text-zinc-400">{user.bio}</p> : null}
            {isOwner ? (
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/settings"
                  className="border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:border-gold hover:text-gold"
                >
                  Edit profile
                </Link>
                <Link
                  to="/u/$username"
                  params={{ username: user.username }}
                  className="border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:border-gold hover:text-gold"
                >
                  View as public
                </Link>
              </div>
            ) : null}
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-widest text-zinc-500">Current rank</p>
            <p className="text-5xl font-black text-gold">#{user.rank}</p>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Current rank" value={`#${user.rank}`} accent />
          <StatCard label="Total points" value={formatNumber(user.points)} accent />
          <StatCard label="Total paid" value={formatCurrency(user.totalPaid)} />
          <StatCard label="Achievements" value={user.achievements.length} />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-zinc-100">Achievements</h2>
          <div className="mt-2 h-px w-12 bg-gold" />
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {achievementDefs.map((a) => (
            <AchievementCard
              key={a.id}
              achievement={a}
              unlocked={user.achievements.includes(a.id)}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6">
          <h2 className="text-lg font-medium text-zinc-100">Recent activity</h2>
          <div className="mt-2 h-px w-12 bg-gold" />
        </div>
        <div className="bg-zinc-900/30 ring-1 ring-white/5">
          {payments.length === 0 ? (
            <div className="px-6 py-10 text-center text-sm text-zinc-500">No recent activity.</div>
          ) : (
            payments.map((p) => (
              <div
                key={p.id}
                className="flex items-center justify-between border-b border-zinc-900 px-6 py-4"
              >
                <div>
                  <p className="text-sm text-zinc-100">Paid {formatCurrency(p.amount)}</p>
                  <p className="text-xs text-zinc-500">{formatDate(p.createdAt)}</p>
                </div>
                <span className="text-sm font-semibold text-gold">
                  +{formatNumber(Math.round(p.amount))} pts
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </>
  );
};