import { createAuthClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3333",
  basePath: "/api/v1/auth",
});
