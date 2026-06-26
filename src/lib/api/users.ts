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

export interface PublicProfile {
  id: string;
  username: string;
  displayName: string | null;
  bio: string | null;
  country: string | null;
  avatarUrl: string | null;
  points: number;
  totalPaid: number | null;
  rank: number;
  isOwner: boolean;
  createdAt: string;
  updatedAt: string | null;
  privacySettings: {
    publicProfile: boolean;
    showTotalPaid: boolean;
    showAchievements: boolean;
    showActivity: boolean;
  } | null;
}

export interface Payment {
  id: string;
  amount: number;
  points: number;
  createdAt: string;
}

export interface PrivacySettings {
  publicProfile: boolean;
  showTotalPaid: boolean;
  showAchievements: boolean;
  showActivity: boolean;
}

export interface NotificationSettings {
  achievementAlerts: boolean;
  rankAlerts: boolean;
  paymentConfirmations: boolean;
  marketingEmails: boolean;
}

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

export const publicProfileQueryOptions = (username: string) => ({
  queryKey: ["users", username] as const,
  queryFn: () => apiFetch<PublicProfile>(`/api/v1/users/${username}`),
  staleTime: 60_000,
  enabled: !!username,
});

export const publicUserAchievementsQueryOptions = (username: string) => ({
  queryKey: ["users", username, "achievements"] as const,
  queryFn: () => apiFetch<UserAchievements>(`/api/v1/users/${username}/achievements`),
  staleTime: 60_000,
  enabled: !!username,
});

export const publicUserPaymentsQueryOptions = (username: string) => ({
  queryKey: ["users", username, "payments"] as const,
  queryFn: () =>
    apiFetch<{ payments: Payment[]; nextCursor: string | null }>(
      `/api/v1/users/${username}/payments?limit=8`,
    ),
  staleTime: 60_000,
  enabled: !!username,
});

export const privacySettingsQueryOptions = {
  queryKey: ["users", "me", "privacy"] as const,
  queryFn: () => apiFetch<PrivacySettings>("/api/v1/users/me/settings/privacy"),
  staleTime: 60_000,
};

export const notificationSettingsQueryOptions = {
  queryKey: ["users", "me", "notifications"] as const,
  queryFn: () => apiFetch<NotificationSettings>("/api/v1/users/me/settings/notifications"),
  staleTime: 60_000,
};
