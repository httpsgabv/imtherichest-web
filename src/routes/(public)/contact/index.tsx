import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { ContactForm } from "./-contact-form";

export const Route = createFileRoute("/(public)/contact/")({
  head: () => ({
    meta: [
      { title: "Contact — ImTheRichest" },
      { name: "description", content: "Get in touch with the ImTheRichest team." },
      { property: "og:title", content: "Contact — ImTheRichest" },
      { property: "og:description", content: "Get in touch with the ImTheRichest team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-2xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">Contact</h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Questions, feedback, or partnership inquiries? Reach out and we'll respond as soon as
          possible.
        </p>

        <div className="mt-12 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded border border-zinc-800 bg-card p-5">
              <span className="text-xs font-semibold uppercase text-zinc-500">Email</span>
              <p className="mt-2 text-sm text-zinc-300">hello@imtherichest.app</p>
            </div>
            <div className="rounded border border-zinc-800 bg-card p-5">
              <span className="text-xs font-semibold uppercase text-zinc-500">Response Time</span>
              <p className="mt-2 text-sm text-zinc-300">Within 48 hours</p>
            </div>
          </div>

          {submitted ? (
            <p className="mt-10 text-sm text-gold">Thanks for reaching out. We'll be in touch.</p>
          ) : (
            <ContactForm onSubmitted={() => setSubmitted(true)} />
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
