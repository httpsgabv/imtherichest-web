import { createFileRoute, Link } from "@tanstack/react-router";
import { AppNav } from "@/components/app-nav";
import { SiteFooter } from "@/components/site-footer";
import { PodiumSection } from "@/components/podium-section";
import { LandingAchievementsSection } from "@/components/landing-achievements-section";

export const Route = createFileRoute("/(public)/")({
  head: () => ({
    meta: [
      { title: "ImTheRichest — Money talks. Rankings listen." },
      {
        name: "description",
        content:
          "The competitive leaderboard where every dollar becomes a point of prestige. Climb the ranks and become the richest player.",
      },
      { property: "og:title", content: "ImTheRichest" },
      {
        property: "og:description",
        content: "Every dollar becomes a point. Climb the global leaderboard.",
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <div className="min-h-screen bg-surface text-zinc-300">
      <AppNav />
      <section className="relative flex flex-col items-center justify-center px-6 pt-24 pb-32 text-center">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_-20%,_#1e1b15_0%,_transparent_50%)]" />
        <h1 className="max-w-3xl text-balance text-5xl font-medium tracking-tight text-zinc-100 leading-tight sm:text-6xl md:text-7xl">
          Money Talks. <span className="gold-shimmer">Rankings Listen.</span>
        </h1>
        <p className="mt-6 max-w-[56ch] text-pretty text-base text-zinc-400 sm:text-lg">
          The definitive global ledger for the world's most ambitious. Every dollar committed is a
          step toward immortality on the immutable podium of prestige.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-gold px-6 py-3 text-sm font-semibold text-zinc-950 ring-1 ring-gold hover:bg-gold-light transition-colors"
          >
            Start climbing
          </Link>
          <Link
            to="/leaderboard"
            className="bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-100 ring-1 ring-zinc-800 hover:bg-zinc-800 transition-colors"
          >
            View leaderboard
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100">Live top 3</h2>
            <div className="mt-2 h-px w-12 bg-gold" />
          </div>
          <Link
            to="/leaderboard"
            className="text-xs uppercase tracking-widest text-gold hover:text-gold-light"
          >
            See full rankings →
          </Link>
        </div>
        <PodiumSection />
      </section>

      <section className="bg-zinc-950 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16">
            <h2 className="text-2xl font-medium text-zinc-100">The path to prestige</h2>
            <div className="mt-2 h-px w-12 bg-gold" />
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="border-l border-zinc-900 pl-6">
                <span className="text-xs font-semibold text-gold uppercase tracking-tighter">
                  {s.num}
                </span>
                <h3 className="mt-4 text-lg font-medium text-zinc-100">{s.title}</h3>
                <p className="mt-2 max-w-[35ch] text-sm text-zinc-400 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="text-3xl font-medium text-zinc-100">Rare accolades</h2>
          <Link
            to="/achievements"
            className="text-xs uppercase tracking-widest text-gold hover:text-gold-light"
          >
            View all badges →
          </Link>
        </div>
        <LandingAchievementsSection />
      </section>

      <SiteFooter />
    </div>
  );
}

const steps = [
  {
    num: "01",
    title: "Establish entry",
    body: "Create your account and claim your username to begin your ascent.",
  },
  {
    num: "02",
    title: "Acquire points",
    body: "Every dollar contributed becomes one immutable point on the global ledger.",
  },
  {
    num: "03",
    title: "Secure rank",
    body: "Watch the leaderboard shift in real time as you overtake your rivals.",
  },
  {
    num: "04",
    title: "Claim legacy",
    body: "Unlock exclusive achievements that mark your presence in history.",
  },
];
