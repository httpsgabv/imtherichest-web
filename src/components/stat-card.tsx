import type { ReactNode } from "react";

interface Props {
  label: string;
  value: ReactNode;
  accent?: boolean;
  hint?: string;
}

export const StatCard = ({ label, value, accent, hint }: Props) => {
  return (
    <div className="bg-zinc-900 ring-1 ring-white/5 p-6">
      <p className="text-xs uppercase tracking-widest text-zinc-500">{label}</p>
      <p
        className={`mt-3 text-3xl font-black ${
          accent ? "text-gold" : "text-zinc-100"
        }`}
      >
        {value}
      </p>
      {hint ? <p className="mt-2 text-xs text-zinc-500">{hint}</p> : null}
    </div>
  );
};