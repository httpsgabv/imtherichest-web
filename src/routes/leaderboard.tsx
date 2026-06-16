import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PodiumTop3 } from "@/components/podium-top-3";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { getRankedUsers } from "@/services/leaderboard-service";
import { useAppStore, selectCurrentUser } from "@/store/app-store";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/leaderboard")({
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
  useAppStore((s) => s.users);
  const currentUser = useAppStore(selectCurrentUser);
  const incOpens = useAppStore((s) => s.incLeaderboardOpens);
  useEffect(() => {
    incOpens();
  }, [incOpens]);

  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");

  const ranked = useMemo(() => getRankedUsers(), []);
  const top3 = ranked.slice(0, 3);
  const next7 = ranked.slice(3, 10);

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return ranked;
    return ranked.filter(
      (u) =>
        u.username.includes(q) || u.displayName.toLowerCase().includes(q),
    );
  }, [ranked, search]);

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <header className="mx-auto max-w-7xl px-6 pt-16 pb-10 text-center">
        <h1 className="text-4xl font-medium text-zinc-100 sm:text-5xl">
          Global <span className="gold-shimmer">leaderboard</span>
        </h1>
        <p className="mt-3 text-sm text-zinc-500">The biggest spenders compete here.</p>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <PodiumTop3 users={top3} />
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-lg font-medium text-zinc-100">Top 10 contenders</h2>
          <span className="text-xs uppercase tracking-widest text-zinc-500">Ranks 04–10</span>
        </div>
        <div className="bg-zinc-900/30 ring-1 ring-white/5">
          {next7.map((u) => (
            <LeaderboardRow
              key={u.id}
              user={u}
              highlight={currentUser?.id === u.id}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-medium text-zinc-100">Global rankings</h2>
            <p className="text-xs text-zinc-500">Search and filter the full ledger.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or @username"
              className="w-full sm:w-64 bg-zinc-900 border-zinc-800 rounded-none"
            />
            <Tabs value={tab} onValueChange={setTab}>
              <TabsList className="rounded-none bg-zinc-900">
                <TabsTrigger value="today" className="rounded-none text-xs">Today</TabsTrigger>
                <TabsTrigger value="week" className="rounded-none text-xs">Weekly</TabsTrigger>
                <TabsTrigger value="month" className="rounded-none text-xs">Monthly</TabsTrigger>
                <TabsTrigger value="all" className="rounded-none text-xs">All time</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
        <div className="bg-zinc-900/30 ring-1 ring-white/5">
          {filtered.slice(0, 50).map((u) => (
            <LeaderboardRow
              key={u.id}
              user={u}
              highlight={currentUser?.id === u.id}
            />
          ))}
          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-sm text-zinc-500">
              No contenders match that search.
            </div>
          ) : null}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}