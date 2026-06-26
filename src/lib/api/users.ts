import { apiFetch } from "./client";

export interface Profile {
  id: string;
  userId: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  country: string | null;
  avatarUrl: string | null;
  points: number;
  totalPaid: number;
  privacySettings: {
    publicProfile: boolean;
    showTotalPaid: boolean;
    showAchievements: boolean;
    showActivity: boolean;
  } | null;
  notificationSettings: {
    achievementAlerts: boolean;
    rankAlerts: boolean;
    paymentConfirmations: boolean;
    marketingEmails: boolean;
  } | null;
  createdAt: string;
  updatedAt: string | null;
}

export interface UserRank {
  rank: number;
  points: number;
  nextRivalDelta: number | null;
}

export interface UserAchievements {
  unlockedIds: string[];
  definitions: Array<{
    id: string;
    title: string;
    description: string;
    category: "normal" | "weird" | "meme";
  }>;
}

export type AchievementDefinition = UserAchievements["definitions"][number];

export const profileQueryOptions = {
  queryKey: ["users", "me"] as const,
  queryFn: () => apiFetch<Profile>("/api/v1/users/me"),
  staleTime: 60_000,
};

export const userRankQueryOptions = (username: string) => ({
  queryKey: ["users", username, "rank"] as const,
  queryFn: () => apiFetch<UserRank>(`/api/v1/users/${username}/rank`),
  staleTime: 60_000,
  enabled: !!username,
});

export const myAchievementsQueryOptions = {
  queryKey: ["users", "me", "achievements"] as const,
  queryFn: () => apiFetch<UserAchievements>("/api/v1/users/me/achievements"),
  staleTime: 60_000,
};
