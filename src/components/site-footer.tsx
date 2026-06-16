import { Link } from "@tanstack/react-router";

export const SiteFooter = () => {
  return (
    <footer className="border-t border-zinc-900 bg-surface py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row">
          <div className="max-w-xs">
            <span className="text-sm font-semibold tracking-tighter uppercase text-zinc-100">
              ImTheRichest
            </span>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              The world's most prestigious ranking platform. Every dollar a step toward the throne.
            </p>
          </div>
          <div className="flex gap-16">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase text-zinc-200">Platform</span>
              <Link to="/leaderboard" className="text-sm text-zinc-500 hover:text-gold">Leaderboard</Link>
              <Link to="/achievements" className="text-sm text-zinc-500 hover:text-gold">Achievements</Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-xs font-semibold uppercase text-zinc-200">Company</span>
              <Link to="/terms" className="text-sm text-zinc-500 hover:text-gold">Terms</Link>
              <Link to="/privacy" className="text-sm text-zinc-500 hover:text-gold">Privacy</Link>
              <Link to="/cookies" className="text-sm text-zinc-500 hover:text-gold">Cookies</Link>
              <Link to="/payments" className="text-sm text-zinc-500 hover:text-gold">Payments</Link>
              <Link to="/contact" className="text-sm text-zinc-500 hover:text-gold">Contact</Link>
            </div>
          </div>
        </div>
        <div className="mt-16 flex items-center justify-between border-t border-zinc-900 pt-8">
          <p className="text-xs text-zinc-600">© {new Date().getFullYear()} ImTheRichest.</p>
          <p className="text-xs text-zinc-700 tracking-widest uppercase">The ultimate ledger</p>
        </div>
      </div>
    </footer>
  );
};