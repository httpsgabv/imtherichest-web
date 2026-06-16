import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { registerUser } from "@/services/auth-service";
import { useAppStore } from "@/store/app-store";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Register — ImTheRichest" },
      { name: "description", content: "Create an ImTheRichest account and start climbing." },
    ],
  }),
  component: RegisterPage,
});

const schema = z.object({
  username: z
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters")
    .max(30, "Username must be at most 30 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Use letters, numbers, dashes, and underscores"),
  displayName: z.string().trim().min(1, "Display name is required").max(60),
  email: z.string().trim().email("Enter a valid email").max(255),
});

function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ username, displayName, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const taken = Object.values(useAppStore.getState().users).some(
      (u) => u.username === parsed.data.username.toLowerCase(),
    );
    if (taken) {
      setError("That username is already taken.");
      return;
    }
    registerUser(parsed.data);
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto flex max-w-md flex-col items-center px-6 pt-24 pb-32">
        <h1 className="text-3xl font-medium text-zinc-100">Claim your name</h1>
        <p className="mt-2 text-sm text-zinc-500 text-center">
          Reserve a username and begin your ascent on the global ledger.
        </p>
        <form onSubmit={handleSubmit} className="mt-10 w-full space-y-4">
          <Field label="Username" value={username} onChange={setUsername} placeholder="your-name" />
          <Field label="Display name" value={displayName} onChange={setDisplayName} placeholder="Your Name" />
          <Field label="Email" value={email} onChange={setEmail} placeholder="you@example.com" type="email" />
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors"
          >
            Create account
          </button>
        </form>
        <p className="mt-6 text-xs text-zinc-500">
          Already have one? <Link to="/login" className="text-gold hover:text-gold-light">Sign in</Link>
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}

const Field = ({ label, value, onChange, placeholder, type }: FieldProps) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-zinc-500">{label}</label>
    <Input
      value={value}
      type={type}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="mt-2 bg-zinc-900 border-zinc-800 rounded-none"
    />
  </div>
);