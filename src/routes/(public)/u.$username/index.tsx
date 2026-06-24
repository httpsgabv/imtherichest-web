import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PublicProfileView } from "@/components/public-profile-view";
import { getUserByUsername } from "@/services/leaderboard-service";
import { useAppStore, selectCurrentUser } from "@/store/app-store";

export const Route = createFileRoute("/(public)/u/$username/")({
  head: ({ params }) => ({
    meta: [
      { title: `@${params.username} — ImTheRichest` },
      { name: "description", content: `Public profile of @${params.username} on ImTheRichest.` },
      { property: "og:title", content: `@${params.username} — ImTheRichest` },
    ],
  }),
  component: ProfilePage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto max-w-2xl px-6 py-32 text-center">
        <h1 className="text-3xl font-medium text-zinc-100">Contender not found</h1>
        <p className="mt-3 text-sm text-zinc-500">No such user on the ledger.</p>
        <Link
          to="/leaderboard"
          className="mt-6 inline-block bg-gold px-5 py-2 text-sm font-semibold text-zinc-950"
        >
          Back to leaderboard
        </Link>
      </div>
      <SiteFooter />
    </div>
  ),
});

function ProfilePage() {
  const { username } = Route.useParams();
  useAppStore((s) => s.users);
  const currentUser = useAppStore(selectCurrentUser);
  const user = getUserByUsername(username);
  if (!user) throw notFound();
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <PublicProfileView user={user} isOwner={currentUser?.id === user.id} />
      <SiteFooter />
    </div>
  );
}
