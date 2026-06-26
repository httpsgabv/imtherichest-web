import { apiFetch } from "./client";

export interface CheckoutSessionResponse {
  checkoutUrl: string;
}

export function createCheckoutSession(
  amountInCents: number,
): Promise<CheckoutSessionResponse> {
  return apiFetch<CheckoutSessionResponse>("/api/v1/payments/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amountInCents }),
  });
}
