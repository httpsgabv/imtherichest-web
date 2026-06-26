import { useQuery } from "@tanstack/react-query";
import { AchievementCard } from "@/components/achievement-card";
import { achievementsQueryOptions } from "@/lib/api/achievements";

export function LandingAchievementsSection() {
  const { data } = useQuery(achievementsQueryOptions);
  if (!data) return null;
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      {data.achievements.slice(0, 6).map((a) => (
        <AchievementCard key={a.id} achievement={a} unlocked={true} />
      ))}
    </div>
  );
}
