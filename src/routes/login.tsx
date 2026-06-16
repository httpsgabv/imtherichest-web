import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { signInUser } from "@/services/auth-service";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — ImTheRichest" },
      { name: "description", content: "Sign in to ImTheRichest and climb the leaderboard." },
    ],
  }),
  component: LoginPage,
});

const schema = z.object({
  username: z.string().trim().min(1, "Username is required").max(40),
});

function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse({ username });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Invalid input");
      return;
    }
    const user = signInUser(parsed.data.username);
    if (!user) {
      setError("No contender with that username. Try registering.");
      return;
    }
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto flex max-w-md flex-col items-center px-6 pt-24 pb-32">
        <h1 className="text-3xl font-medium text-zinc-100">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-500">Sign in with your username to continue your ascent.</p>
        <form onSubmit={handleSubmit} className="mt-10 w-full space-y-4">
          <div>
            <label className="text-xs uppercase tracking-widest text-zinc-500">Username</label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="arthur-sterling"
              className="mt-2 bg-zinc-900 border-zinc-800 rounded-none"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <button
            type="submit"
            className="w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors"
          >
            Sign in
          </button>
        </form>
        <p className="mt-6 text-xs text-zinc-500">
          No account yet? <Link to="/register" className="text-gold hover:text-gold-light">Register</Link>
        </p>
        <p className="mt-4 text-[11px] text-zinc-600 text-center">
          Demo tip: try signing in as <span className="text-gold">arthur-sterling</span> to inhabit the top contender.
        </p>
      </div>
      <SiteFooter />
    </div>
  );
}