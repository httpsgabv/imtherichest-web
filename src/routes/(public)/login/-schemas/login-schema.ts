import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required").max(40),
});

export type LoginSchema = z.infer<typeof loginSchema>;
