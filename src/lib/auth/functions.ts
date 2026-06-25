import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { authClient } from "@/lib/auth/client";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const cookie = headers.get("cookie") ?? "";

  const { data } = await authClient.getSession({
    fetchOptions: { headers: { cookie } },
  });

  return data ?? null;
});
