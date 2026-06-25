import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAppStore, type UserRecord } from "@/store/app-store";
import { sessionQueryKey } from "@/lib/auth-session";
import { getSession } from "@/lib/auth.functions";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ context, location }) => {
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
  },
  component: () => <Outlet />,
});
