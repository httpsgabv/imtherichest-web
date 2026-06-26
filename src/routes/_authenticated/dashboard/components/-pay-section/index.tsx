import { Link } from "@tanstack/react-router";

export function PaySection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-10">
      <Link
        to="/pay"
        className="block bg-gold p-10 text-center text-zinc-950 hover:bg-gold-light transition-colors"
      >
        <p className="text-xs uppercase tracking-[0.3em] font-semibold">Climb the ranks</p>
        <p className="mt-3 text-4xl font-black">Pay</p>
        <p className="mt-3 text-sm">Every dollar — one point closer to the throne.</p>
      </Link>
    </section>
  );
}
