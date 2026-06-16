import { useAppStore } from "@/store/app-store";

export interface EvalContext {
  event: "login" | "payment";
}

const BTC_USD_EQUIVALENT = 60000;

export const evaluateAchievements = (userId: string, ctx: EvalContext): string[] => {
  const state = useAppStore.getState();
  const user = state.users[userId];
  if (!user) return [];
  const userPayments = state.payments.filter((p) => p.userId === userId);
  const now = new Date();
  const unlocked: string[] = [];
  const tryUnlock = (id: string, condition: boolean): void => {
    if (!condition) return;
    if (useAppStore.getState().unlockAchievement(userId, id)) unlocked.push(id);
  };

  tryUnlock("verified-email", true);
  tryUnlock("first-login", ctx.event === "login");
  tryUnlock("first-purchase", userPayments.length >= 1);
  tryUnlock("spent-100", user.totalPaid >= 100);
  tryUnlock("spent-1000", user.totalPaid >= 1000);
  tryUnlock("spent-10000", user.totalPaid >= 10000);

  const ranked = Object.values(state.users).sort((a, b) => b.points - a.points);
  const rank = ranked.findIndex((u) => u.id === userId) + 1;
  tryUnlock("top-100", rank > 0 && rank <= 100);
  tryUnlock("top-10", rank > 0 && rank <= 10);
  tryUnlock("top-3", rank > 0 && rank <= 3);
  tryUnlock("rank-1", rank === 1);

  const hour = now.getHours();
  tryUnlock("night-owl", ctx.event === "login" && hour === 3);
  tryUnlock("bitcoin-whale", user.totalPaid >= BTC_USD_EQUIVALENT);

  const dayOfWeek = new Set(userPayments.map((p) => new Date(p.createdAt).getDay()));
  tryUnlock("weekend-warrior", dayOfWeek.has(0) && dayOfWeek.has(6));

  const month = now.getMonth() + 1;
  const date = now.getDate();
  tryUnlock("lucky-seven", ctx.event === "login" && month === 7 && date === 7);

  const dayKeys = Array.from(
    new Set(userPayments.map((p) => new Date(p.createdAt).toISOString().slice(0, 10))),
  ).sort();
  let streak = dayKeys.length > 0 ? 1 : 0;
  let maxStreak = streak;
  for (let i = 1; i < dayKeys.length; i++) {
    const prev = new Date(dayKeys[i - 1]).getTime();
    const cur = new Date(dayKeys[i]).getTime();
    if (cur - prev === 86400000) {
      streak++;
      maxStreak = Math.max(maxStreak, streak);
    } else {
      streak = 1;
    }
  }
  tryUnlock("serial-spender", maxStreak >= 30);
  tryUnlock("millionaire-mindset", state.leaderboardOpens >= 1000);

  const joined = new Date(user.joinDate).getTime();
  const firstPay = userPayments[0]?.createdAt;
  tryUnlock(
    "speed-runner",
    !!firstPay && new Date(firstPay).getTime() - joined <= 5 * 60_000,
  );

  tryUnlock("tax-collector", user.points === 404);
  tryUnlock("nice", user.points === 69);
  tryUnlock("over-9000", user.points > 9000);

  tryUnlock("based", user.points === 420);
  tryUnlock("certified-baller", userPayments.some((p) => p.amount >= 500));
  tryUnlock("goblin-mode", ctx.event === "payment" && hour === 2);
  tryUnlock("perfect-score", userPayments.length === 10);
  tryUnlock("say-less", rank > 0 && rank <= 50 && (!user.bio || user.bio.trim() === ""));
  tryUnlock("vibe-check", new Date(user.joinDate).getDay() === 5);
  tryUnlock("rents-due", userPayments.some((p) => p.amount === 1));
  tryUnlock(
    "fr-fr",
    userPayments.some((p) => {
      const d = new Date(p.createdAt);
      return d.getDay() === 5 && d.getDate() === 13;
    }),
  );
  const normalIds = [
    "verified-email",
    "first-login",
    "first-purchase",
    "spent-100",
    "spent-1000",
    "spent-10000",
    "top-100",
    "top-10",
    "top-3",
    "rank-1",
  ];
  tryUnlock(
    "understood-assignment",
    normalIds.every((id) => user.achievements.includes(id)),
  );
  tryUnlock("sheesh", userPayments.some((p) => p.amount >= 100));

  return unlocked;
};