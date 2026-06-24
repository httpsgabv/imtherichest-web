import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { toast } from "sonner";

export const Route = createFileRoute("/(public)/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ImTheRichest" },
      {
        name: "description",
        content:
          "Get in touch with the ImTheRichest team.",
      },
      { property: "og:title", content: "Contact — ImTheRichest" },
      {
        property: "og:description",
        content: "Get in touch with the ImTheRichest team.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    setSubmitted(true);
    toast.success("Message sent. We'll get back to you soon.");
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <main className="mx-auto max-w-2xl px-6 pt-16 pb-32">
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-100">
          Contact
        </h1>
        <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
          Questions, feedback, or partnership inquiries? Reach out and we'll respond as soon as possible.
        </p>

        <div className="mt-12 space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded border border-zinc-800 bg-card p-5">
              <span className="text-xs font-semibold uppercase text-zinc-500">
                Email
              </span>
              <p className="mt-2 text-sm text-zinc-300">hello@imtherichest.app</p>
            </div>
            <div className="rounded border border-zinc-800 bg-card p-5">
              <span className="text-xs font-semibold uppercase text-zinc-500">
                Response Time
              </span>
              <p className="mt-2 text-sm text-zinc-300">Within 48 hours</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold uppercase text-zinc-500">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full rounded border border-zinc-800 bg-card px-4 py-2.5 text-sm text-zinc-100 outline-none ring-gold placeholder:text-zinc-600 focus:ring-1"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase text-zinc-500">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 w-full rounded border border-zinc-800 bg-card px-4 py-2.5 text-sm text-zinc-100 outline-none ring-gold placeholder:text-zinc-600 focus:ring-1"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-xs font-semibold uppercase text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-2 w-full resize-none rounded border border-zinc-800 bg-card px-4 py-2.5 text-sm text-zinc-100 outline-none ring-gold placeholder:text-zinc-600 focus:ring-1"
                placeholder="How can we help?"
              />
            </div>
            <button
              type="submit"
              className="bg-gold px-6 py-2.5 text-sm font-semibold text-zinc-950 ring-1 ring-gold hover:bg-gold-light transition-colors"
            >
              Send Message
            </button>
            {submitted && (
              <p className="text-xs text-gold">Thanks for reaching out. We'll be in touch.</p>
            )}
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
