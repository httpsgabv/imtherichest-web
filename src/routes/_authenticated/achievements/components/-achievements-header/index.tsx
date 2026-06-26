import { useQuery } from "@tanstack/react-query";
import { myAchievementsQueryOptions } from "@/lib/api/users";

export function AchievementsHeader() {
  const { data } = useQuery(myAchievementsQueryOptions);
  if (!data) return null;

  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <h1 className="text-4xl font-medium text-zinc-100">
        Hall of <span className="gold-shimmer">prestige</span>
      </h1>
      <p className="mt-3 text-sm text-zinc-500">
        {data.unlockedIds.length} of {data.definitions.length} unlocked.
      </p>
    </header>
  );
}
