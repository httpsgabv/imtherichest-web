import type { ReactNode } from "react";
import { Switch } from "@/components/ui/switch";

export const SettingsCard = ({ children }: { children: ReactNode }) => (
  <div className="bg-zinc-900 ring-1 ring-white/5 p-6">{children}</div>
);

export const FieldLabel = ({ children }: { children: ReactNode }) => (
  <label className="text-xs uppercase tracking-widest text-zinc-500">{children}</label>
);

interface ToggleRowProps {
  label: string;
  hint?: string;
  checked: boolean;
  onCheckedChange: (v: boolean) => void;
}

export const ToggleRow = ({ label, hint, checked, onCheckedChange }: ToggleRowProps) => (
  <div className="flex items-center justify-between bg-zinc-900 ring-1 ring-white/5 p-6">
    <div>
      <p className="text-sm text-zinc-100">{label}</p>
      {hint ? <p className="mt-1 text-xs text-zinc-500">{hint}</p> : null}
    </div>
    <Switch checked={checked} onCheckedChange={onCheckedChange} />
  </div>
);
