import { initialsOf } from "@/lib/format";

interface AvatarCircleProps {
  name: string;
  size?: "sm" | "md" | "lg" | "xl";
  tone?: "gold" | "silver" | "bronze" | "neutral";
  src?: string | null;
}

const sizeClasses: Record<NonNullable<AvatarCircleProps["size"]>, string> = {
  sm: "size-10 text-xs",
  md: "size-16 text-sm",
  lg: "size-20 text-base",
  xl: "size-28 text-lg",
};

const toneClasses: Record<NonNullable<AvatarCircleProps["tone"]>, string> = {
  gold: "ring-4 ring-gold gold-pulse",
  silver: "ring-2 ring-zinc-400/60",
  bronze: "ring-2 ring-amber-700/60",
  neutral: "ring-1 ring-zinc-800",
};

export const AvatarCircle = ({
  name,
  size = "md",
  tone = "neutral",
  src,
}: AvatarCircleProps) => {
  return (
    <div
      className={`relative grid place-items-center bg-zinc-900 text-zinc-300 font-semibold uppercase tracking-wider overflow-hidden ${sizeClasses[size]} ${toneClasses[tone]}`}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span>{initialsOf(name) || "?"}</span>
      )}
    </div>
  );
};