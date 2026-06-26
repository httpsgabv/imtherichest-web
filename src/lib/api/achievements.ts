import { apiFetch } from "./client";
import type { AchievementDefinition } from "./users";

export interface AchievementsResponse {
  achievements: AchievementDefinition[];
}

export const achievementsQueryOptions = {
  queryKey: ["achievements"] as const,
  queryFn: () => apiFetch<AchievementsResponse>("/api/v1/achievements"),
  staleTime: 60_000,
};
