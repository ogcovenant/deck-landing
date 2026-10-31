import { createRequire } from "node:module";
import { readFile, access } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { routeModule } = require("../.next/server/app/api/waitlist/route.js");
const post = routeModule.userland.POST;
const request = (body, headers = {}) =>
  new Request("http://localhost:3000/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
const signup = { email: "preview@example.com", interest: "both" };
assert.equal(
  (await post(request(signup, { origin: "https://external.example" }))).status,
  403,
);
assert.equal(
  (await post(request(signup, { "Content-Type": "text/plain" }))).status,
  415,
);
assert.equal((await post(request("{"))).status, 400);
assert.equal(
  (await post(request({ email: "bad", interest: "personal" }))).status,
  400,
);
assert.equal((await post(request({ ...signup, website: "bot" }))).status, 400);
assert.equal((await post(request("x".repeat(2049)))).status, 413);
if (!process.env.WAITLIST_WEBHOOK_URL) {
  const result = await post(
    request(signup, { origin: "http://localhost:3000" }),
  );
  assert.equal(result.status, 503);
  assert.equal(result.headers.get("cache-control"), "no-store");
  const body = await result.json();
  assert.equal(body.accepted, false);
  assert.match(body.message, /hasn’t been saved/);
  const boundHostRequest = new Request("http://0.0.0.0:3000/api/waitlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      host: "127.0.0.1:3000",
      origin: "http://127.0.0.1:3000",
    },
    body: JSON.stringify(signup),
  });
  assert.equal((await post(boundHostRequest)).status, 503);
  assert.equal(
    (await post(request(signup, { origin: "https://localhost:3000" }))).status,
    403,
  );
}
const html = await readFile(".next/server/app/index.html", "utf8");
for (const id of [
  "main",
  "personal",
  "business",
  "how-it-works",
  "early-access",
  "faqs",
])
  assert(html.includes(`id="${id}"`), `Section missing: ${id}`);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
for (const src of new Set(
  [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map((match) => match[1]),
))
  if (src.startsWith("/_next/image?")) {
    const source = new URL(src, "http://localhost").searchParams.get("url");
    assert(source?.startsWith("/photography/"));
    await access(`public${source}`);
  } else if (src.startsWith("/")) await access(`public${src}`);
for (const page of ["contact", "privacy", "terms"])
  await access(`.next/server/app/${page}.html`);
await access("public/og-deck.png");
assert(html.includes("og-deck.png"));
console.log(
  "Production HTML, local assets, support routes and 9 API boundary cases passed.",
);
