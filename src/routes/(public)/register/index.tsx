import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { RegisterForm } from "./components/-register-form";
import { guestOnlyBeforeLoad } from "@/lib/auth/guards";

export const Route = createFileRoute("/(public)/register/")({
  beforeLoad: guestOnlyBeforeLoad,
  head: () => ({
    meta: [
      { title: "Register — ImTheRichest" },
      { name: "description", content: "Create an ImTheRichest account and start climbing." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto flex max-w-md flex-col items-center px-6 pt-24 pb-32">
        <h1 className="text-3xl font-medium text-zinc-100">Claim your name</h1>
        <p className="mt-2 text-sm text-zinc-500 text-center">
          Reserve a username and begin your ascent on the global ledger.
        </p>
        <RegisterForm onRegister={() => navigate({ to: "/dashboard" })} />
      </div>
      <SiteFooter />
    </div>
  );
}
