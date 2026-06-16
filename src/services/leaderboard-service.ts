import { useAppStore, selectRankedUsers, type UserRecord } from "@/store/app-store";

export interface RankedUser extends UserRecord {
  rank: number;
}

export const getRankedUsers = (): RankedUser[] => {
  const sorted = selectRankedUsers(useAppStore.getState());
  return sorted.map((u, i) => ({ ...u, rank: i + 1 }));
};

export const getUserByUsername = (username: string): RankedUser | undefined => {
  return getRankedUsers().find((u) => u.username === username);
};

export const getUserRank = (userId: string): number => {
  const ranked = getRankedUsers();
  return ranked.find((u) => u.id === userId)?.rank ?? ranked.length + 1;
};

export const getNextRivalDelta = (userId: string): { rivalRank: number; pointsNeeded: number } | null => {
  const ranked = getRankedUsers();
  const idx = ranked.findIndex((u) => u.id === userId);
  if (idx <= 0) return null;
  const me = ranked[idx];
  const rival = ranked[idx - 1];
  return {
    rivalRank: rival.rank,
    pointsNeeded: Math.max(1, rival.points - me.points + 1),
  };
};

export const ensureRanked = (): RankedUser[] => getRankedUsers();

// Pull in for downstream typing only
void useAppStore;