import { useQuery } from "@tanstack/react-query";
import { myAchievementsQueryOptions } from "@/lib/api/users";
import { AchievementCard } from "@/components/achievement-card";

interface Props {
  title: string;
  category: "normal" | "weird" | "meme";
}

export function AchievementSection({ title, category }: Props) {
  const { data } = useQuery(myAchievementsQueryOptions);
  if (!data) return null;

  const unlockedSet = new Set(data.unlockedIds);
  const items = data.definitions.filter((a) => a.category === category);

  return (
    <section className="mx-auto max-w-7xl px-6 pb-16">
      <div className="mb-6">
        <h2 className="text-lg font-medium text-zinc-100">{title}</h2>
        <div className="mt-2 h-px w-12 bg-gold" />
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {items.map((a) => (
          <AchievementCard key={a.id} achievement={a} unlocked={unlockedSet.has(a.id)} />
        ))}
      </div>
    </section>
  );
}
