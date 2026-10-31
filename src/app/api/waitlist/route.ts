import { NextResponse } from "next/server";
import { registerSignup, validateSignup } from "@/lib/waitlist.mjs";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const respond = (body: object, status: number) =>
    NextResponse.json(body, { status, headers });
  const origin = request.headers.get("origin");
  const requestUrl = new URL(request.url);
  // Next may use its bound hostname in request.url (for example 0.0.0.0).
  // The browser-facing Host header preserves the actual same-origin address.
  const requestHost = request.headers.get("host") || requestUrl.host;
  let sameOrigin = !origin;
  if (origin) {
    try {
      const originUrl = new URL(origin);
      sameOrigin =
        originUrl.host === requestHost &&
        originUrl.protocol === requestUrl.protocol;
    } catch {
      sameOrigin = false;
    }
  }
  if (!sameOrigin)
    return respond(
      {
        accepted: false,
        message: "Please submit the form from the Deck website.",
      },
      403,
    );
  if (!request.headers.get("content-type")?.includes("application/json"))
    return respond(
      { accepted: false, message: "Please use the early access form." },
      415,
    );
  if (Number(request.headers.get("content-length")) > 2048)
    return respond(
      { accepted: false, message: "Please check your email and try again." },
      413,
    );
  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > 2048)
      return respond(
        { accepted: false, message: "Please check your email and try again." },
        413,
      );
    const signup = validateSignup(JSON.parse(raw));
    if (!signup)
      return respond(
        {
          accepted: false,
          message: "Enter a valid email and choose your card interest.",
        },
        400,
      );
    const result = await registerSignup(signup, {
      url: process.env.WAITLIST_WEBHOOK_URL,
      token: process.env.WAITLIST_WEBHOOK_TOKEN,
    });
    return respond(
      { accepted: result.accepted, message: result.message },
      result.status,
    );
  } catch {
    return respond(
      { accepted: false, message: "Please check your email and try again." },
      400,
    );
  }
}
