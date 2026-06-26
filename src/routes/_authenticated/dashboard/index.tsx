import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { DashboardHeader } from "./components/-dashboard-header";
import { StatsSection } from "./components/-stats-section";
import { PaySection } from "./components/-pay-section";
import { RankProgressionSection } from "./components/-rank-progression";
import { AchievementsSection } from "./components/-achievements-section";

export const Route = createFileRoute("/_authenticated/dashboard/")({
  head: () => ({ meta: [{ title: "Dashboard — ImTheRichest" }] }),
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <DashboardHeader />
      <StatsSection />
      <PaySection />
      <RankProgressionSection />
      <AchievementsSection />
      <SiteFooter />
    </div>
  );
}
