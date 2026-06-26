import { loadStripe } from "@stripe/stripe-js";

// Initialized once at module load — Stripe.js starts collecting fraud signals immediately.
export const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string,
);
