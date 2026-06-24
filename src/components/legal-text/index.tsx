import type { ReactNode } from "react";

function Title({ children }: { children: ReactNode }) {
  return <h2 className="text-lg font-semibold text-zinc-100">{children}</h2>;
}

function Text({ children }: { children: ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-zinc-400">{children}</p>;
}

export const LegalText = { Title, Text };
