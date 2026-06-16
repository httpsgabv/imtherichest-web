export type AchievementCategory = "normal" | "weird" | "meme";

export interface AchievementDef {
  id: string;
  title: string;
  description: string;
  category: AchievementCategory;
}

export const achievementDefs: AchievementDef[] = [
  { id: "verified-email", title: "Verified Email", description: "Confirmed your email address.", category: "normal" },
  { id: "first-login", title: "First Login", description: "Signed in for the first time.", category: "normal" },
  { id: "first-purchase", title: "First Purchase", description: "Made your first contribution.", category: "normal" },
  { id: "spent-100", title: "Spent $100", description: "Committed $100 to the ledger.", category: "normal" },
  { id: "spent-1000", title: "Spent $1,000", description: "Committed $1,000 to the ledger.", category: "normal" },
  { id: "spent-10000", title: "Spent $10,000", description: "Committed $10,000 to the ledger.", category: "normal" },
  { id: "top-100", title: "Top 100", description: "Reached the global top 100.", category: "normal" },
  { id: "top-10", title: "Top 10", description: "Reached the global top 10.", category: "normal" },
  { id: "top-3", title: "Top 3", description: "Stood on the podium.", category: "normal" },
  { id: "rank-1", title: "Number One", description: "Claimed the throne.", category: "normal" },

  { id: "night-owl", title: "Night Owl", description: "Signed in at 3:00 AM.", category: "weird" },
  { id: "bitcoin-whale", title: "Bitcoin Whale", description: "Paid the equivalent of 1 BTC lifetime.", category: "weird" },
  { id: "weekend-warrior", title: "Weekend Warrior", description: "Paid on both Saturday and Sunday.", category: "weird" },
  { id: "lucky-seven", title: "Lucky Seven", description: "Logged in on 07/07.", category: "weird" },
  { id: "serial-spender", title: "Serial Spender", description: "Paid 30 consecutive days.", category: "weird" },
  { id: "millionaire-mindset", title: "Millionaire Mindset", description: "Opened the leaderboard 1,000 times.", category: "weird" },
  { id: "insomniac", title: "Insomniac", description: "Signed in between 3–4 AM, ten times.", category: "weird" },
  { id: "speed-runner", title: "Speed Runner", description: "Registered and paid within 5 minutes.", category: "weird" },
  { id: "tax-collector", title: "Tax Collector", description: "Reached exactly 404 points.", category: "weird" },
  { id: "nice", title: "Nice", description: "Reached exactly 69 points.", category: "weird" },
  { id: "over-9000", title: "Over 9000", description: "Crossed 9,000 points.", category: "weird" },

  { id: "based", title: "Based", description: "Reached exactly 420 points. No cap.", category: "meme" },
  { id: "certified-baller", title: "Certified Baller", description: "Made a single payment of $500+. Big flex energy.", category: "meme" },
  { id: "goblin-mode", title: "Goblin Mode", description: "Paid at exactly 2:00 AM. Unhinged financial decisions.", category: "meme" },
  { id: "perfect-score", title: "10/10", description: "Made exactly 10 payments. Perfect score, no notes.", category: "meme" },
  { id: "say-less", title: "Say Less", description: "Reached top 50 with an empty bio. Let the money talk.", category: "meme" },
  { id: "vibe-check", title: "Vibe Check", description: "Account created on a Friday. Weekend starts now.", category: "meme" },
  { id: "rents-due", title: "Rent's Due", description: "Made a payment of exactly $1.00. Every penny counts.", category: "meme" },
  { id: "fr-fr", title: "Fr Fr", description: "Paid on Friday the 13th. Legendary or cursed?", category: "meme" },
  { id: "understood-assignment", title: "Understood the Assignment", description: "Unlocked every normal achievement. Scholar.", category: "meme" },
  { id: "sheesh", title: "Sheesh", description: "Spent $100 in a single payment. That's fire.", category: "meme" },
];

export const achievementById = (id: string): AchievementDef | undefined =>
  achievementDefs.find((a) => a.id === id);