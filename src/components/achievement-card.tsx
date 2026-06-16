import type { AchievementDef } from "@/data/achievements";

interface Props {
  achievement: AchievementDef;
  unlocked: boolean;
  unlockedAt?: string;
}

export const AchievementCard = ({ achievement, unlocked, unlockedAt }: Props) => {
  return (
    <div
      className={`flex flex-col items-center bg-zinc-900 p-8 text-center ring-1 transition-colors ${
        unlocked
          ? "ring-gold/30 hover:bg-zinc-800/60"
          : "ring-white/5 opacity-40"
      }`}
    >
      <div
        className={`mb-4 flex size-12 items-center justify-center bg-zinc-950 ring-1 ${
          unlocked ? "ring-gold/40" : "ring-zinc-800"
        }`}
      >
        <div className={`size-4 ${unlocked ? "bg-gold" : "bg-zinc-700"}`} />
      </div>
      <span className="text-sm font-medium text-zinc-100">
        {achievement.title}
      </span>
      <span className="mt-2 text-xs text-zinc-500 leading-relaxed">
        {achievement.description}
      </span>
      {unlocked && unlockedAt ? (
        <span className="mt-3 text-[10px] uppercase tracking-widest text-gold/70">
          Unlocked
        </span>
      ) : null}
    </div>
  );
};