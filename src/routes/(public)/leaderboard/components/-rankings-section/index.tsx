import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LeaderboardRow } from "@/components/leaderboard-row";
import { leaderboardQueryOptions } from "@/lib/api/leaderboard";
import { sessionQueryOptions } from "@/lib/auth/session";

export function RankingsSection() {
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState("all");
  const { data: leaderboard } = useQuery(leaderboardQueryOptions(search));
  const { data: session } = useQuery(sessionQueryOptions);
  const users = leaderboard?.users ?? [];

  return (
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
              <TabsTrigger value="today" className="rounded-none text-xs">
                Today
              </TabsTrigger>
              <TabsTrigger value="week" className="rounded-none text-xs">
                Weekly
              </TabsTrigger>
              <TabsTrigger value="month" className="rounded-none text-xs">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="all" className="rounded-none text-xs">
                All time
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      <div className="bg-zinc-900/30 ring-1 ring-white/5">
        {users.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-zinc-500">
            No contenders match that search.
          </div>
        ) : (
          users.map((u) => (
            <LeaderboardRow
              key={u.username}
              user={u}
              highlight={session?.user?.name === u.username}
            />
          ))
        )}
      </div>
    </section>
  );
}
