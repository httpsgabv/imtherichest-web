import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { createCheckoutSession } from "@/lib/api/payments";
import { stripePromise } from "@/lib/stripe";
import { formatCurrency, formatNumber } from "@/lib/format";

// Warm up Stripe.js from the moment this page mounts.
void stripePromise;

export const Route = createFileRoute("/_authenticated/pay")({
  head: () => ({ meta: [{ title: "Make a payment — ImTheRichest" }] }),
  component: PayPage,
});

const QUICK = [5, 10, 25, 50, 100];

function PayPage() {
  const [amount, setAmount] = useState<number>(25);
  const [custom, setCustom] = useState<string>("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const effective = custom ? Number(custom) || 0 : amount;

  const handlePay = async () => {
    if (effective <= 0 || !termsAccepted || isLoading) return;

    setIsLoading(true);
    try {
      const { checkoutUrl } = await createCheckoutSession(Math.round(effective * 100));
      window.location.href = checkoutUrl;
    } catch {
      toast.error("Could not start checkout. Please try again.");
      setIsLoading(false);
    }
  };

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
              <label className="text-xs uppercase tracking-widest text-zinc-500">
                Custom amount (USD)
              </label>
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
              <span className="text-xl font-black text-gold">
                +{formatNumber(Math.round(effective))}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-start gap-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
              className="mt-0.5 border-zinc-600 data-[state=checked]:bg-gold data-[state=checked]:text-zinc-950 data-[state=checked]:border-gold"
            />
            <Label
              htmlFor="terms"
              className="text-xs leading-relaxed text-zinc-400 font-normal cursor-pointer"
            >
              I understand that payments are voluntary, non-refundable except where required by law,
              and that points have no monetary value.
            </Label>
          </div>

          <button
            type="button"
            onClick={handlePay}
            disabled={effective <= 0 || !termsAccepted || isLoading}
            className="mt-6 w-full bg-gold py-3 text-sm font-semibold text-zinc-950 hover:bg-gold-light transition-colors disabled:bg-zinc-700 disabled:text-zinc-500"
          >
            {isLoading ? "Redirecting to checkout…" : "Complete payment"}
          </button>
          <p className="mt-4 text-center text-[11px] text-zinc-600">
            Secured by Stripe. Your card details never touch our servers.
          </p>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
