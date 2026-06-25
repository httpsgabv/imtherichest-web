import { redirect } from "@tanstack/react-router";
import type { QueryClient } from "@tanstack/react-query";
import { getSession } from "@/lib/auth/functions";
import { sessionQueryKey } from "@/lib/auth/session";
import { useAppStore, type UserRecord } from "@/store/app-store";

interface AuthenticatedBeforeLoadCtx {
  context: { queryClient: QueryClient };
  location: { href: string };
}

/**
 * beforeLoad for protected routes. Redirects to /login (with ?redirect back)
 * if there is no active session, and provisions a UserRecord on first login.
 */
export const authenticatedBeforeLoad = async ({
  context,
  location,
}: AuthenticatedBeforeLoadCtx) => {
  const session = await getSession();
  if (!session) throw redirect({ to: "/login", search: { redirect: location.href } });

  context.queryClient.setQueryData(sessionQueryKey, session);

  const store = useAppStore.getState();
  if (!store.users[session.user.id]) {
    const joinDate =
      session.user.createdAt instanceof Date
        ? session.user.createdAt.toISOString()
        : ((session.user.createdAt as string | undefined) ?? new Date().toISOString());
    const newUser: UserRecord = {
      id: session.user.id,
      username: session.user.name,
      displayName: session.user.name,
      points: 0,
      totalPaid: 0,
      country: "—",
      joinDate,
      bio: "",
      avatarUrl: session.user.image ?? null,
      achievements: [],
      lastUpdated: new Date().toISOString(),
    };
    store.addUser(newUser);
  }
};

/**
 * beforeLoad for guest-only routes (login, register).
 * Redirects to /dashboard if a session already exists.
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
