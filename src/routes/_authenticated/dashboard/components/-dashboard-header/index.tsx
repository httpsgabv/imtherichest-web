import { useQuery } from "@tanstack/react-query";
import { profileQueryOptions } from "@/lib/api/users";

export function DashboardHeader() {
  const { data: profile } = useQuery(profileQueryOptions);
  if (!profile) return null;

  return (
    <header className="mx-auto max-w-7xl px-6 pt-16 pb-10">
      <p className="text-xs uppercase tracking-widest text-zinc-500">Welcome back</p>
      <h1 className="mt-2 text-4xl font-medium text-zinc-100">
        {profile.displayName ?? profile.username}
      </h1>
    </header>
  );
}
