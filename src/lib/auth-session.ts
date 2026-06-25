import { authClient } from "@/lib/auth-client";

export type AuthSession = Awaited<ReturnType<typeof authClient.getSession>>["data"];

export const sessionQueryKey = ["auth", "session"] as const;

export const sessionQueryOptions = {
  queryKey: sessionQueryKey,
  queryFn: (): Promise<AuthSession> => authClient.getSession().then(({ data }) => data ?? null),
  staleTime: 5 * 60 * 1000,
  gcTime: Infinity,
  retry: false,
};
