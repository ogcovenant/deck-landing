import { createHash } from "node:crypto";

export function validateSignup(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const { email, interest, website } = value;
  if (
    website ||
    typeof email !== "string" ||
    email.length > 254 ||
    !["personal", "business", "both"].includes(interest)
  )
    return null;
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return null;
  return { email: normalized, interest };
}

/**
 * @param {{email: string, interest: string}} signup
 * @param {{url?: string, token?: string, fetcher?: typeof fetch}} [options]
 */
export async function registerSignup(
  signup,
  { url, token, fetcher = fetch } = {},
) {
  if (!url)
    return {
      status: 503,
      accepted: false,
      message:
        "We couldn’t complete your signup. Your email hasn’t been saved. Please try again.",
    };
  try {
    const endpoint = new URL(url);
    if (endpoint.protocol !== "https:")
      throw new Error("Registration endpoint must use HTTPS");
    const idempotencyKey = createHash("sha256")
      .update(`deck-cards:${signup.email}:${signup.interest}`)
      .digest("hex");
    const response = await fetcher(endpoint, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": idempotencyKey,
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ ...signup, source: "deck-cards" }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) throw new Error("Registration rejected");
    const result = await response.json();
    // Require explicit confirmation of durable acceptance, not just an HTTP 200.
    if (result.accepted !== true) throw new Error("Registration unconfirmed");
    return { status: 201, accepted: true, message: "You’re on the list." };
  } catch {
    return {
      status: 502,
      accepted: false,
      message: "We couldn’t confirm your signup. Please try again shortly.",
    };
  }
}
