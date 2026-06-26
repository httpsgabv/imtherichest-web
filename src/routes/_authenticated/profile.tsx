import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PublicProfileView } from "@/components/public-profile-view";
import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/auth/session";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({ meta: [{ title: "My profile — ImTheRichest" }] }),
  component: MyProfilePage,
});

function MyProfilePage() {
  const { data: session } = useQuery(sessionQueryOptions);
  const username = session?.user?.name ?? "";
  if (!username) return null;
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <PublicProfileView username={username} />
      <SiteFooter />
    </div>
  );
}
