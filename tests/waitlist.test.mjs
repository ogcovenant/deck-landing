import { test } from "node:test";
import assert from "node:assert/strict";
import { validateSignup, registerSignup } from "../src/lib/waitlist.mjs";

test("signup validation normalizes email and rejects invalid requests", () => {
  assert.deepEqual(
    validateSignup({ email: " Tomi@Example.com ", interest: "both" }),
    { email: "tomi@example.com", interest: "both" },
  );
  for (const value of [
    null,
    [],
    {},
    { email: "bad", interest: "personal" },
    { email: "a@b.com", interest: "unknown" },
    { email: "a@b.com", interest: "business", website: "bot" },
    { email: "a".repeat(255) + "@example.com", interest: "both" },
  ])
    assert.equal(validateSignup(value), null);
});
const signup = { email: "tomi@example.com", interest: "both" };
test("an unconfigured integration never reports success", async () => {
  const result = await registerSignup(signup);
  assert.equal(result.status, 503);
  assert.equal(result.accepted, false);
  assert.match(result.message, /hasn’t been saved/);
});
test("only explicit durable acceptance confirms a signup", async () => {
  let firstKey;
  const fetcher = async (url, options) => {
    assert.equal(url.protocol, "https:");
    assert.deepEqual(JSON.parse(options.body), {
      ...signup,
      source: "deck-cards",
    });
    assert.equal(options.headers.Authorization, "Bearer server-secret");
    assert.equal(options.redirect, "error");
    if (firstKey) assert.equal(firstKey, options.headers["Idempotency-Key"]);
    firstKey = options.headers["Idempotency-Key"];
    return Response.json({ accepted: true });
  };
  for (let i = 0; i < 2; i++) {
    const result = await registerSignup(signup, {
      url: "https://registration.example.test",
      token: "server-secret",
      fetcher,
    });
    assert.equal(result.status, 201);
    assert.equal(result.accepted, true);
  }
});
test("provider errors, ambiguous responses, timeouts and insecure URLs fail truthfully", async () => {
  for (const fetcher of [
    async () => Response.json({}),
    async () => Response.json({ accepted: true }, { status: 500 }),
    async () => {
      throw new Error("timeout");
    },
    async () => new Response("invalid"),
  ]) {
    const result = await registerSignup(signup, {
      url: "https://registration.example.test",
      fetcher,
    });
    assert.equal(result.status, 502);
    assert.equal(result.accepted, false);
  }
  const result = await registerSignup(signup, {
    url: "http://registration.example.test",
  });
  assert.equal(result.accepted, false);
});
