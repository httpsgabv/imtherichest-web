import { useQuery } from "@tanstack/react-query";
import { publicUserAchievementsQueryOptions } from "@/lib/api/users";
import { AchievementCard } from "@/components/achievement-card";

interface Props {
  username: string;
}

export function ProfileAchievements({ username }: Props) {
  const { data } = useQuery(publicUserAchievementsQueryOptions(username));
  if (!data) return null;

  const unlockedSet = new Set(data.unlockedIds);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-12">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-zinc-100">Achievements</h2>
        <div className="mt-2 h-px w-12 bg-gold" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {data.definitions.map((a) => (
          <AchievementCard key={a.id} achievement={a} unlocked={unlockedSet.has(a.id)} />
        ))}
      </div>
    </section>
  );
}
