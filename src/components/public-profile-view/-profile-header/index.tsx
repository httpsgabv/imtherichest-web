import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { publicProfileQueryOptions } from "@/lib/api/users";
import { AvatarCircle } from "@/components/avatar-circle";
import { formatDate } from "@/lib/format";

interface Props {
  username: string;
}

export function ProfileHeader({ username }: Props) {
  const { data: profile } = useQuery(publicProfileQueryOptions(username));
  if (!profile) return null;

  const tone =
    profile.rank <= 3
      ? profile.rank === 1
        ? "gold"
        : profile.rank === 2
          ? "silver"
          : "bronze"
      : "neutral";

  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
        <AvatarCircle name={profile.displayName ?? profile.username} src={profile.avatarUrl} size="xl" tone={tone} />
        <div className="flex-1">
          <h1 className="text-3xl font-medium text-zinc-100">{profile.displayName ?? profile.username}</h1>
          <p className="text-sm text-zinc-500">
            @{profile.username} · Joined {formatDate(profile.createdAt)}
          </p>
          {profile.bio ? <p className="mt-3 max-w-xl text-sm text-zinc-400">{profile.bio}</p> : null}
          {profile.isOwner ? (
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to="/settings"
                className="border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:border-gold hover:text-gold"
              >
                Edit profile
              </Link>
              <Link
                to="/u/$username"
                params={{ username: profile.username }}
                className="border border-zinc-700 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-zinc-300 hover:border-gold hover:text-gold"
              >
                View as public
              </Link>
            </div>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Current rank</p>
          <p className="text-5xl font-black text-gold">#{profile.rank}</p>
        </div>
      </div>
    </header>
  );
}
