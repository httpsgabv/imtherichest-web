import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PublicProfileView } from "@/components/public-profile-view";
import { useAppStore, selectCurrentUser } from "@/store/app-store";
import { getUserRank } from "@/services/leaderboard-service";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "My profile — ImTheRichest" }] }),
  component: MyProfilePage,
});

function MyProfilePage() {
  useAppStore((s) => s.users);
  const currentUser = useAppStore(selectCurrentUser);
  if (!currentUser) return null;
  const rank = getUserRank(currentUser.id);
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <PublicProfileView user={{ ...currentUser, rank }} isOwner />
      <SiteFooter />
    </div>
  );
}