import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAppStore } from "@/store/app-store";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: () => {
    if (typeof window === "undefined") return;
    const id = useAppStore.getState().currentUserId;
    if (!id) throw redirect({ to: "/login" });
  },
  component: () => <Outlet />,
});