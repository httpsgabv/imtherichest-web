import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildSeedUsers } from "@/data/seed-users";

export interface PaymentRecord {
  id: string;
  userId: string;
  amount: number;
  createdAt: string;
}

export interface UserRecord {
  id: string;
  username: string;
  displayName: string;
  points: number;
  totalPaid: number;
  country: string;
  joinDate: string;
  bio: string;
  avatarUrl: string | null;
  achievements: string[];
  lastUpdated: string;
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

export interface AppState {
  users: Record<string, UserRecord>;
  payments: PaymentRecord[];
  privacy: PrivacySettings;
  notifications: NotificationSettings;
  leaderboardOpens: number;
  setUser: (id: string, patch: Partial<UserRecord>) => void;
  addUser: (user: UserRecord) => void;
  addPayment: (payment: PaymentRecord) => void;
  setPrivacy: (patch: Partial<PrivacySettings>) => void;
  setNotifications: (patch: Partial<NotificationSettings>) => void;
  incLeaderboardOpens: () => void;
  unlockAchievement: (userId: string, achievementId: string) => boolean;
  reset: () => void;
}

const buildInitial = () => {
  const seeded = buildSeedUsers();
  const users: Record<string, UserRecord> = {};
  for (const u of seeded) users[u.id] = u;
  return users;
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      users: buildInitial(),
      payments: [],
      privacy: {
        publicProfile: true,
        showTotalPaid: true,
        showAchievements: true,
        showActivity: true,
      },
      notifications: {
        achievementAlerts: true,
        rankAlerts: true,
        paymentConfirmations: true,
        marketingEmails: false,
      },
      leaderboardOpens: 0,
      setUser: (id, patch) =>
        set((state) => {
          const existing = state.users[id];
          if (!existing) return state;
          return {
            users: {
              ...state.users,
              [id]: { ...existing, ...patch, lastUpdated: new Date().toISOString() },
            },
          };
        }),
      addUser: (user) =>
        set((state) => ({ users: { ...state.users, [user.id]: user } })),
      addPayment: (payment) =>
        set((state) => ({ payments: [...state.payments, payment] })),
      setPrivacy: (patch) => set((state) => ({ privacy: { ...state.privacy, ...patch } })),
      setNotifications: (patch) =>
        set((state) => ({ notifications: { ...state.notifications, ...patch } })),
      incLeaderboardOpens: () =>
        set((state) => ({ leaderboardOpens: state.leaderboardOpens + 1 })),
      unlockAchievement: (userId, achievementId) => {
        const user = get().users[userId];
        if (!user) return false;
        if (user.achievements.includes(achievementId)) return false;
        set((state) => ({
          users: {
            ...state.users,
            [userId]: {
              ...user,
              achievements: [...user.achievements, achievementId],
              lastUpdated: new Date().toISOString(),
            },
          },
        }));
        return true;
      },
      reset: () => set({ users: buildInitial(), payments: [] }),
    }),
    {
      name: "imtherichest-store-v1",
    },
  ),
);

export const selectRankedUsers = (state: AppState): UserRecord[] =>
  Object.values(state.users).sort((a, b) => b.points - a.points);