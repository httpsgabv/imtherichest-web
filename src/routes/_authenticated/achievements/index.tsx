import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { AchievementsHeader } from "./components/-achievements-header";
import { AchievementSection } from "./components/-achievement-section";

export const Route = createFileRoute("/_authenticated/achievements/")({
  head: () => ({ meta: [{ title: "Achievements — ImTheRichest" }] }),
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <AchievementsHeader />
      <AchievementSection title="Normal accolades" category="normal" />
      <AchievementSection title="Weird accolades" category="weird" />
      <AchievementSection title="Meme accolades" category="meme" />
      <SiteFooter />
    </div>
  );
}
