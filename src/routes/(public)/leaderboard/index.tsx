import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PodiumSection } from "./components/-podium-section";
import { Top10Section } from "./components/-top10-section";
import { RankingsSection } from "./components/-rankings-section";

export const Route = createFileRoute("/(public)/leaderboard/")({
  head: () => ({
    meta: [
      { title: "Global leaderboard — ImTheRichest" },
      { name: "description", content: "The biggest spenders compete here. Live global rankings." },
      { property: "og:title", content: "Global leaderboard — ImTheRichest" },
      { property: "og:description", content: "Live global rankings on ImTheRichest." },
    ],
  }),
  component: LeaderboardPage,
});

function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-medium text-zinc-100 sm:text-5xl">
          Global <span className="gold-shimmer">leaderboard</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-500">The biggest spenders compete here.</p>
      </header>
      <PodiumSection />
      <Top10Section />
      <RankingsSection />
      <SiteFooter />
    </div>
  );
}
