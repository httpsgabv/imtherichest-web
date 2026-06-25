import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useQuery } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/auth/session";
import { useAppStore } from "@/store/app-store";
import { makePayment, type PaymentResult } from "@/services/payments-service";
import { achievementById } from "@/data/achievements";
import { formatCurrency, formatNumber } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/pay")({
  head: () => ({ meta: [{ title: "Make a payment — ImTheRichest" }] }),
  component: PayPage,
});

const QUICK = [5, 10, 25, 50, 100];

function PayPage() {
  const navigate = useNavigate();
  const { data: session } = useQuery(sessionQueryOptions);
  const userId = session?.user?.id;
  const currentUser = useAppStore((s) => (userId ? (s.users[userId] ?? null) : null));
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);

  if (!currentUser) return null;

  const effective = custom ? Number(custom) || 0 : amount;

  const handlePay = () => {
    if (effective <= 0) return;
    const res = makePayment(currentUser.id, effective);
    setResult(res);
  };

  if (result) {
    const unlocked = result.unlockedAchievements
      .map((id) => achievementById(id))
      .filter((a): a is NonNullable<typeof a> => Boolean(a));
    return (
      <div className="min-h-screen bg-surface text-zinc-300">
        <AppNav />
        <div className="mx-auto max-w-2xl px-6 pt-20 pb-32 text-center">
          <div className="mx-auto size-24 bg-gold gold-pulse grid place-items-center text-zinc-950">
            <span className="text-3xl font-black">★</span>
          </div>
          <h1 className="mt-8 text-4xl font-medium text-zinc-100">
            You gained <span className="gold-shimmer">+{formatNumber(Math.round(result.payment.amount))}</span> points
          </h1>
          <p className="mt-3 text-sm text-zinc-500">
            New rank: <span className="text-gold font-bold">#{result.newRank}</span>
          </p>
          {unlocked.length > 0 ? (
            <div className="mt-10">
              <p className="text-xs uppercase tracking-widest text-zinc-500">Achievements unlocked</p>
              <div className="mt-4 flex flex-wrap justify-center gap-3">
                {unlocked.map((a) => (
                  <span key={a.id} className="bg-zinc-900 ring-1 ring-gold/30 px-3 py-1.5 text-xs text-gold">
                    {a.title}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/leaderboard" className="bg-gold px-5 py-2.5 text-sm font-semibold text-zinc-950 hover:bg-gold-light">
              View leaderboard
            </Link>
            <button
              type="button"
              onClick={() => navigate({ to: "/dashboard" })}
              className="bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800"
            >
              Back to dashboard
            </button>
          </div>
        </div>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <div className="mx-auto max-w-2xl px-6 pt-16 pb-24">
        <h1 className="text-3xl font-medium text-zinc-100">Make a payment</h1>
        <p className="mt-2 text-sm text-zinc-500">Every dollar becomes one point.</p>

        <div className="mt-10 bg-zinc-900 ring-1 ring-white/5 p-8">
          <p className="text-xs uppercase tracking-widest text-zinc-500">Quick amounts</p>
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
            {QUICK.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => {
                  setAmount(q);
                  setCustom("");
                }}
                className={`py-3 text-sm font-semibold ring-1 transition-colors ${
                  amount === q && !custom
                    ? "bg-gold text-zinc-950 ring-gold"
                    : "bg-zinc-950 text-zinc-300 ring-zinc-800 hover:bg-zinc-800"
                }`}
              >
                ${q}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setCustom(custom || "0")}
              className={`py-3 text-sm font-semibold ring-1 transition-colors ${
                custom
                  ? "bg-gold text-zinc-950 ring-gold"
                  : "bg-zinc-950 text-zinc-300 ring-zinc-800 hover:bg-zinc-800"
              }`}
            >
              Custom
            </button>
          </div>

          {custom !== "" ? (
            <div className="mt-6">
              <label className="text-xs uppercase tracking-widest text-zinc-500">Custom amount (USD)</label>
              <Input
                type="number"
                min={1}
                max={1000000}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="mt-2 bg-zinc-950 border-zinc-800 rounded-none"
              />
            </div>
          ) : null}

          <div className="mt-8 border-t border-zinc-800 pt-6">
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-500">Amount paid</span>
              <span className="text-xl font-medium text-zinc-100">{formatCurrency(effective)}</span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm text-zinc-500">Points earned</span>
              <span className="text-xl font-black text-gold">+{formatNumber(Math.round(effective))}</span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5 border-zinc-600 data-[state=checked]:bg-gold data-[state=checked]:text-zinc-950 data-[state=checked]:border-gold"
            />
            <Label htmlFor="terms" className="text-xs leading-relaxed text-zinc-400 font-normal cursor-pointer">
              I understand that payments are voluntary, non-refundable except where required by law, and that points have no monetary value.
            </Label>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={effective <= 0 || !termsAccepted}
            className="mt-6 w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:bg-zinc-700 disabled:text-zinc-500"
          >
            Complete payment
          </button>
          <p className="mt-4 text-center text-[11px] text-zinc-600">
            Demo mode — no card is charged. Points and rankings persist in your browser.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}