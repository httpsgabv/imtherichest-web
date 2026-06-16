import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — ImTheRichest" },
      {
        name: "description",
        content:
          "Cookie Policy for ImTheRichest. How and why we use cookies on the platform.",
      },
      { property: "og:title", content: "Cookie Policy — ImTheRichest" },
      {
        property: "og:description",
        content: "How and why ImTheRichest uses cookies.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-3xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
          Cookie Policy
        </h1>
        <p className="mt-4 text-sm text-zinc-500">
          Last updated: {new Date().getFullYear()}
        </p>

        <section className="mt-12 space-y-10">
          <div>
            <h2 className="text-lg font-semibold text-zinc-100">1. What are cookies?</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Cookies are small text files stored on your device when you visit a website. They help the site remember your actions and preferences over time, such as keeping you signed in or remembering your consent choices.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">2. How we use cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              We use cookies and similar technologies to operate ImTheRichest, secure your account, remember your preferences, measure how the platform is used, and process payments through Stripe.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">3. Categories of cookies</h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-zinc-400">
              <li>
                <span className="font-medium text-zinc-200">Strictly necessary.</span> Required for the platform to work, such as authentication, security, and storing your cookie consent choice. These cannot be disabled.
              </li>
              <li>
                <span className="font-medium text-zinc-200">Functional.</span> Remember your preferences (for example, display settings) to personalise your experience.
              </li>
              <li>
                <span className="font-medium text-zinc-200">Analytics.</span> Help us understand how users interact with ImTheRichest so we can improve the platform. Only set when you accept cookies.
              </li>
              <li>
                <span className="font-medium text-zinc-200">Payment processing.</span> Stripe may set cookies to process payments securely and detect fraud.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">4. Your choices</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              When you first visit ImTheRichest you are asked to accept or deny non-essential cookies. You can review and update your cookie preferences at any time through the Cookie Preferences settings available on the platform. You can also block or delete cookies through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">5. Third-party cookies</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Some cookies are set by third-party services we use, including Stripe for payments. These providers operate under their own privacy and cookie policies.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">6. Updates to this policy</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              We may update this Cookie Policy from time to time. Significant changes will be announced through the platform. Continued use after an update means you accept the revised policy.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-semibold text-zinc-100">7. Contact</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-400">
              Questions about cookies? See our{" "}
              <Link to="/privacy" className="text-zinc-200 underline hover:text-gold">
                Privacy Policy
              </Link>{" "}
              or get in touch via the{" "}
              <Link to="/contact" className="text-zinc-200 underline hover:text-gold">
                contact page
              </Link>
              .
            </p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}