import { apiFetch } from "./client";

export interface LeaderboardUser {
  rank: number;
  username: string;
  displayName: string | null;
  points: number;
  totalPaid: number | null;
  country: string | null;
  avatarUrl: string | null;
  achievements: string[];
}

export interface LeaderboardResponse {
  users: LeaderboardUser[];
  total: number;
  nextCursor: number | null;
}

export const leaderboardQueryOptions = (search = "") => ({
  queryKey: ["leaderboard", search] as const,
  queryFn: () => {
    const params = new URLSearchParams({ limit: "200" });
    if (search) params.set("search", search);
    return apiFetch<LeaderboardResponse>(`/api/v1/leaderboard?${params}`);
  },
  staleTime: 30_000,
});
