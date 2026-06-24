import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { LegalText } from "@/components/legal-text";

export const Route = createFileRoute("/(public)/payments/")({
  head: () => ({
    meta: [
      { title: "Payment & Points Policy — ImTheRichest" },
      {
        name: "description",
        content: "Payment and Points Policy for ImTheRichest. How points work, refunds, and terms.",
      },
      { property: "og:title", content: "Payment & Points Policy — ImTheRichest" },
      { property: "og:description", content: "Payment and Points Policy for ImTheRichest." },
    ],
  }),
  component: PaymentsPolicyPage,
});

function PaymentsPolicyPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
          Payment & Points Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {new Date().getFullYear()}</p>

        <section className="mt-12 space-y-10">
          <div>
            <LegalText.Title>1. How Points Work</LegalText.Title>
            <LegalText.Text>
              Every $1 paid earns 1 point on the leaderboard. Points appear on your public profile
              and determine your ranking position. The more you contribute, the higher you rank.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>2. No Monetary Value</LegalText.Title>
            <LegalText.Text>
              Points do not possess any financial value. They cannot be exchanged for cash, redeemed
              for goods or services, or converted into any form of currency. Points are a
              representation of your contribution to the platform community.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>3. No Transfers</LegalText.Title>
            <LegalText.Text>
              Points cannot be sold, traded, or transferred between users. Each user's points are
              tied to their individual account and payment history. Any attempt to transfer or sell
              points is a violation of our Terms of Service.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>4. No Investment Relationship</LegalText.Title>
            <LegalText.Text>
              Points do not represent shares, equity, ownership, or any form of investment in
              ImTheRichest. Making a payment does not grant you any proprietary interest, voting
              rights, or financial stake in the platform or its operators.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>5. Refunds</LegalText.Title>
            <LegalText.Text>
              All charges are final and non-refundable except where required by applicable law or at
              our sole discretion. Refund requests are evaluated on a case-by-case basis. In
              exceptional circumstances, such as duplicate charges or technical errors, we may issue
              a refund at our discretion.
            </LegalText.Text>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
