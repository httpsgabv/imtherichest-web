import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { LoginForm } from "./components/-login-form";

export const Route = createFileRoute("/(public)/login/")({
  head: () => ({
    meta: [
      { title: "Sign in — ImTheRichest" },
      { name: "description", content: "Sign in to ImTheRichest and climb the leaderboard." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto flex max-w-md flex-col items-center px-6 pt-24 pb-32">
        <h1 className="text-3xl font-medium text-zinc-100">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-500">
          Sign in with your username to continue your ascent.
        </p>
        <LoginForm onLogin={() => navigate({ to: "/dashboard" })} />
      </div>
      <SiteFooter />
    </div>
  );
}
