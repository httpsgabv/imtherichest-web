import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { myAchievementsQueryOptions } from "@/lib/api/users";
import { AchievementCard } from "@/components/achievement-card";

export function AchievementsSection() {
  const { data: achievementsData } = useQuery(myAchievementsQueryOptions);
  if (!achievementsData) return null;

  const recent = achievementsData.unlockedIds
    .slice(-4)
    .reverse()
    .map((id) => achievementsData.definitions.find((d) => d.id === id))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="mb-6 flex items-end justify-between">
        <h2 className="text-lg font-medium text-zinc-100">Latest achievements</h2>
        <Link
          to="/achievements"
          className="text-xs uppercase tracking-widest text-gold hover:text-gold-light"
        >
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
  );
}
