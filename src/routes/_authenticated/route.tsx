import { createFileRoute, Outlet } from "@tanstack/react-router";
import { authenticatedBeforeLoad } from "@/lib/auth/guards";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: authenticatedBeforeLoad,
  component: () => <Outlet />,
});
