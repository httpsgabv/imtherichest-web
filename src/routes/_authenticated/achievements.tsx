import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { AchievementCard } from "@/components/achievement-card";
import { achievementDefs, type AchievementDef } from "@/data/achievements";
import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/auth/session";
import { useAppStore } from "@/store/app-store";

export const Route = createFileRoute("/_authenticated/achievements")({
  head: () => ({ meta: [{ title: "Achievements — ImTheRichest" }] }),
  component: AchievementsPage,
});

function AchievementsPage() {
  const { data: session } = useQuery(sessionQueryOptions);
  useAppStore((s) => s.users);
  const userId = session?.user?.id;
  const currentUser = useAppStore((s) => (userId ? (s.users[userId] ?? null) : null));
  const unlockedSet = new Set(currentUser?.achievements ?? []);
  const normal = achievementDefs.filter((a) => a.category === "normal");
  const weird = achievementDefs.filter((a) => a.category === "weird");
  const meme = achievementDefs.filter((a) => a.category === "meme");

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <h1 className="text-4xl font-medium text-zinc-100">
          Hall of <span className="gold-shimmer">prestige</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          {unlockedSet.size} of {achievementDefs.length} unlocked.
        </p>
      </header>

      <Section title="Normal accolades" items={normal} unlockedSet={unlockedSet} />
      <Section title="Weird accolades" items={weird} unlockedSet={unlockedSet} />
      <Section title="Meme accolades" items={meme} unlockedSet={unlockedSet} />

      <SiteFooter />
    </div>
  );
}

interface SectionProps {
  title: string;
  items: AchievementDef[];
  unlockedSet: Set<string>;
}

const Section = ({ title, items, unlockedSet }: SectionProps) => (
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