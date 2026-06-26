import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/_authenticated/payment-cancel/")({
  head: () => ({ meta: [{ title: "Payment cancelled — ImTheRichest" }] }),
  component: PaymentCancelPage,
});

function PaymentCancelPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto max-w-2xl px-6 pt-20 pb-32 text-center">
        <div className="mx-auto size-24 bg-zinc-800 ring-1 ring-zinc-700 grid place-items-center text-zinc-500">
          <span className="text-3xl font-black">✕</span>
        </div>
        <h1 className="mt-8 text-4xl font-medium text-zinc-100">
          Payment cancelled
        </h1>
        <p className="mt-3 text-sm text-zinc-500">
          No charge was made. You can try again whenever you're ready.
        </p>
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/pay" })}
            className="bg-gold px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-gold-light"
          >
            Try again
          </button>
          <Link
            to="/dashboard"
            className="bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
