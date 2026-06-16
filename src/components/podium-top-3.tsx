import { Link } from "@tanstack/react-router";
import { AvatarCircle } from "@/components/avatar-circle";
import { formatNumber } from "@/lib/format";
import type { RankedUser } from "@/services/leaderboard-service";

interface Props {
  users: RankedUser[];
}

export const PodiumTop3 = ({ users }: Props) => {
  const [first, second, third] = [users[0], users[1], users[2]];
  return (
    <div className="flex flex-col items-end justify-center gap-0 md:flex-row">
      {second ? (
        <PodiumSlot user={second} tone="silver" tier="Silver" height="short" />
      ) : null}
      {first ? <PodiumSlot user={first} tone="gold" tier="Imperial Gold" height="tall" /> : null}
      {third ? (
        <PodiumSlot user={third} tone="bronze" tier="Bronze" height="short" />
      ) : null}
    </div>
  );
};

interface SlotProps {
  user: RankedUser;
  tone: "gold" | "silver" | "bronze";
  tier: string;
  height: "short" | "tall";
}

const PodiumSlot = ({ user, tone, tier, height }: SlotProps) => {
  const isTall = height === "tall";
  return (
    <div
      className={`relative flex w-full flex-col items-center ${
        isTall ? "md:w-80 z-10" : "md:w-64"
      }`}
    >
      <div className="flex flex-col items-center pb-8">
        <AvatarCircle
          name={user.displayName}
          src={user.avatarUrl}
          size={isTall ? "xl" : "md"}
          tone={tone}
        />
        <Link
          to="/u/$username"
          params={{ username: user.username }}
          className="mt-3 text-base font-semibold text-zinc-100 hover:text-gold transition-colors"
        >
          {user.displayName}
        </Link>
      </div>
      <div
        className={`w-full bg-zinc-900 ring-1 ${
          isTall ? "ring-gold/40 p-10 shadow-2xl shadow-gold/10" : "ring-white/5 p-6"
        }`}
      >
        <div className="text-center">
          <span
            className={`block font-black ${
              isTall ? "text-7xl text-gold" : tone === "silver" ? "text-4xl text-zinc-500" : "text-4xl text-amber-800/80"
            }`}
          >
            {String(user.rank).padStart(2, "0")}
          </span>
          <p
            className={`mt-2 text-xs font-semibold tracking-[0.2em] uppercase ${
              isTall ? "text-gold" : "text-zinc-500"
            }`}
          >
            {tier}
          </p>
          <p className={`mt-${isTall ? "6" : "4"} text-lg font-medium text-zinc-100`}>
            {formatNumber(user.points)} pts
          </p>
        </div>
      </div>
    </div>
  );
};