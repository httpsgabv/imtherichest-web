import { useAppStore, type PaymentRecord } from "@/store/app-store";
import { evaluateAchievements } from "@/services/achievements-service";

export interface PaymentResult {
  payment: PaymentRecord;
  newPoints: number;
  newRank: number;
  unlockedAchievements: string[];
}

export const makePayment = (userId: string, amount: number): PaymentResult => {
  const store = useAppStore.getState();
  const user = store.users[userId];
  if (!user) throw new Error("User not found");
  const points = Math.round(amount);
  const payment: PaymentRecord = {
    id: `pay-${Date.now()}`,
    userId,
    amount,
    createdAt: new Date().toISOString(),
  };
  store.addPayment(payment);
  store.setUser(userId, {
    points: user.points + points,
    totalPaid: user.totalPaid + amount,
  });
  const unlocked = evaluateAchievements(userId, { event: "payment" });
  const ranked = Object.values(useAppStore.getState().users).sort(
    (a, b) => b.points - a.points,
  );
  const rank = ranked.findIndex((u) => u.id === userId) + 1;
  return {
    payment,
    newPoints: user.points + points,
    newRank: rank,
    unlockedAchievements: unlocked,
  };
};

export const getUserPayments = (userId: string): PaymentRecord[] => {
  return useAppStore
    .getState()
    .payments.filter((p) => p.userId === userId)
    .slice()
    .reverse();
};