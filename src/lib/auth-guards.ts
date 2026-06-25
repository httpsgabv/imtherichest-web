import { redirect } from "@tanstack/react-router";
import { getSession } from "@/lib/auth.functions";

/**
 * beforeLoad for routes that must only be accessible to unauthenticated users
 * (login, register). Redirects to /dashboard if a session already exists.
 */
export const guestOnlyBeforeLoad = async () => {
  const session = await getSession();
  if (session) throw redirect({ to: "/dashboard" });
};

/**
 * validateSearch for routes that accept a post-login redirect destination.
 * Used on the login route so the auth guard can bounce users back after sign-in.
 */
export const validateRedirectSearch = (
  search: Record<string, unknown>,
): { redirect?: string } => ({
  redirect: typeof search.redirect === "string" ? search.redirect : undefined,
});
