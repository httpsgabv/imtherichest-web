import { createFileRoute } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { LegalText } from "@/components/legal-text";

export const Route = createFileRoute("/(public)/privacy/")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — ImTheRichest" },
      { name: "description", content: "Privacy Policy for ImTheRichest. How we handle your data." },
      { property: "og:title", content: "Privacy Policy — ImTheRichest" },
      { property: "og:description", content: "Privacy Policy for ImTheRichest." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">Privacy Policy</h1>
        <p className="mt-4 text-sm text-zinc-500">Last updated: {new Date().getFullYear()}</p>

        <section className="mt-12 space-y-10">
          <div>
            <LegalText.Title>1. Information We Collect</LegalText.Title>
            <LegalText.Text>
              We collect information you provide directly, such as your username, display name, and
              email address. We also collect activity data including payments, rankings,
              achievements, and profile settings. When you make a payment, your payment details are
              processed by Stripe and are not stored on our servers.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>2. How We Use Your Information</LegalText.Title>
            <LegalText.Text>
              Your information is used to operate the leaderboard, display public profiles, track
              achievements, and personalize your experience. Rankings and public profiles are visible
              to all users by default.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>3. Public Information</LegalText.Title>
            <LegalText.Text>
              Your username, display name, ranking position, total points, and unlocked achievements
              are publicly displayed on the platform. Do not share information you wish to keep
              private in your public profile.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>4. Data Storage</LegalText.Title>
            <LegalText.Text>
              We store information necessary to operate the platform on secure systems and take
              reasonable measures to protect personal information against unauthorized access,
              disclosure, alteration, or destruction.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>5. Data Retention</LegalText.Title>
            <LegalText.Text>
              We retain personal information for as long as necessary to provide the service, comply
              with legal obligations, resolve disputes, and enforce our agreements.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>6. Cookies and Tracking</LegalText.Title>
            <LegalText.Text>
              We may use local storage and similar technologies to remember your preferences,
              maintain your session, and analyze platform usage. These technologies help us improve
              the user experience.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>7. Third-Party Services</LegalText.Title>
            <LegalText.Text>
              We do not sell or rent your personal information to third parties. Payments are
              processed by Stripe, which operates under its own privacy policy and terms. We may
              also use third-party analytics services to understand platform usage.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>8. Your Rights</LegalText.Title>
            <LegalText.Text>
              You have the right to access, update, or delete your account information. You may also
              request a copy of the data we hold about you. You may request deletion of your account
              and associated personal information, subject to legal and operational retention
              requirements. Contact us to exercise these rights.
            </LegalText.Text>
          </div>

          <div>
            <LegalText.Title>9. Changes to This Policy</LegalText.Title>
            <LegalText.Text>
              We may update this Privacy Policy from time to time. We will notify you of significant
              changes by posting the new policy on this page with an updated effective date.
            </LegalText.Text>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
