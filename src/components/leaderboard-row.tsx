import { Link } from "@tanstack/react-router";
import { AvatarCircle } from "@/components/avatar-circle";
import { formatNumber, formatCurrency } from "@/lib/format";
import type { RankedUser } from "@/services/leaderboard-service";

interface Props {
  user: RankedUser;
  highlight?: boolean;
  showPaid?: boolean;
}

export const LeaderboardRow = ({ user, highlight, showPaid = true }: Props) => {
  return (
    <Link
      to="/u/$username"
      params={{ username: user.username }}
      className={`flex items-center gap-4 border-b border-zinc-900 px-6 py-4 transition-colors hover:bg-zinc-900/40 ${
        highlight ? "bg-gold/5" : ""
      }`}
    >
      <span
        className={`w-10 font-mono text-sm ${
          user.rank <= 3 ? "text-gold" : "text-zinc-600"
        }`}
      >
        {String(user.rank).padStart(2, "0")}
      </span>
      <AvatarCircle name={user.displayName} src={user.avatarUrl} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="truncate text-sm font-medium text-zinc-100">
          {user.displayName}
        </p>
        <p className="truncate text-xs text-zinc-500">@{user.username}</p>
      </div>
      <div className="hidden md:block text-right">
        <p className="text-xs text-zinc-500 uppercase tracking-widest">
          Achievements
        </p>
        <p className="text-sm font-medium text-zinc-300">
          {user.achievements.length}
        </p>
      </div>
      {showPaid ? (
        <div className="hidden md:block text-right">
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Paid</p>
          <p className="text-sm font-medium text-zinc-300">
            {formatCurrency(user.totalPaid)}
          </p>
        </div>
      ) : null}
      <div className="text-right min-w-[100px]">
        <p className="text-xs text-zinc-500 uppercase tracking-widest">Points</p>
        <p className="text-base font-black text-gold">
          {formatNumber(user.points)}
        </p>
      </div>
    </Link>
  );
};