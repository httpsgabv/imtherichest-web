import { Input } from "@/components/ui/input";

interface FormFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  error?: string;
}

export const FormField = ({ label, value, onChange, placeholder, type, error }: FormFieldProps) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-zinc-500">{label}</label>
    <Input
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 bg-zinc-900 border-zinc-800 rounded-none"
    />
    {error ? <p className="mt-1 text-xs text-destructive">{error}</p> : null}
  </div>
);
