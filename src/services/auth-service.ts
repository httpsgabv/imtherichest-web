import { useAppStore, type UserRecord } from "@/store/app-store";
import { evaluateAchievements } from "@/services/achievements-service";

export interface RegisterInput {
  username: string;
  displayName: string;
  email: string;
}

export const registerUser = (input: RegisterInput): UserRecord => {
  const id = `user-${Date.now()}`;
  const user: UserRecord = {
    id,
    username: input.username.toLowerCase().trim(),
    displayName: input.displayName.trim() || input.username,
    points: 0,
    totalPaid: 0,
    country: "—",
    joinDate: new Date().toISOString(),
    bio: "",
    avatarUrl: null,
    achievements: [],
    lastUpdated: new Date().toISOString(),
  };
  useAppStore.getState().addUser(user);
  useAppStore.getState().signIn(id);
  evaluateAchievements(id, { event: "login" });
  return user;
};

export const signInUser = (username: string): UserRecord | null => {
  const trimmed = username.toLowerCase().trim();
  const found = Object.values(useAppStore.getState().users).find(
    (u) => u.username === trimmed,
  );
  if (!found) return null;
  useAppStore.getState().signIn(found.id);
  evaluateAchievements(found.id, { event: "login" });
  return found;
};

export const signOutUser = (): void => useAppStore.getState().signOut();