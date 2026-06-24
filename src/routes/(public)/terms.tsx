import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/(public)/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — ImTheRichest" },
      {
        name: "description",
        content:
          "Terms of Service for ImTheRichest. The rules of the leaderboard.",
      },
      { property: "og:title", content: "Terms of Service — ImTheRichest" },
      {
        property: "og:description",
        content: "Terms of Service for ImTheRichest.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
          Terms of Service
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <section className="mt-12 space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              1. Acceptance of Terms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              By accessing or using ImTheRichest, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not use the platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              2. Age Requirement
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              You must be at least 18 years old, or the age of majority in your jurisdiction, to use ImTheRichest and make payments.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              3. Real Money Payments
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              All payments made on ImTheRichest involve real money. Every $1 paid earns 1 point on the leaderboard. Payments are processed securely via Stripe. Points have no monetary value and cannot be redeemed, transferred, or withdrawn.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              ImTheRichest is an entertainment and social ranking platform. Payments do not constitute an investment, gambling activity, deposit, financial product, crowdfunding contribution, or any form of ownership interest. Users should not expect any financial return, prize, reward, or compensation from payments made on the platform.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              4. Payment Processing and Refunds
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Payments are processed by Stripe. By making a payment, you authorise us to charge your payment method. All charges are final and non-refundable except where required by law or at our sole discretion. You are responsible for any taxes, fees, or charges imposed by your payment provider.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              5. User Conduct
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Users agree not to manipulate rankings through automated means, create multiple accounts to inflate scores, or engage in any behavior that disrupts the competitive integrity of the platform. Violations may result in account suspension or permanent ban.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              ImTheRichest reserves the right to remove leaderboard positions, points, achievements, or accounts associated with fraudulent, abusive, or prohibited activity. Payments made before suspension or termination are not refundable.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              6. Leaderboard Changes
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              We may modify, reset, archive, reorganise, or discontinue leaderboards, achievements, scoring systems, seasons, or ranking methodologies at any time.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              7. Accounts
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Usernames are licensed for use on the platform and remain under the control of ImTheRichest. We may rename, reclaim, or remove usernames that violate these Terms or are otherwise deemed inappropriate.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              8. Intellectual Property
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              All content, branding, and materials on ImTheRichest are the property of ImTheRichest and may not be reproduced without permission. User-generated content remains the property of the user, but by posting you grant ImTheRichest a licence to display such content.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              9. Disclaimer of Warranties
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              ImTheRichest is provided "as is" without warranties of any kind. We do not guarantee uninterrupted access, accuracy of rankings, or availability of the platform at all times.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              10. Limitation of Liability
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              ImTheRichest shall not be liable for any indirect, incidental, or consequential damages arising from the use or inability to use the platform. Our total liability for any claim arising from your use of the platform shall not exceed the total amount you have paid to us in the 12 months preceding the claim.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              11. Changes to Terms
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              We reserve the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">
              12. Contact
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              For questions about these terms, please reach out through our contact page.
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
