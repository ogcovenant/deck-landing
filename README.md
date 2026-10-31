# Deck Cards landing page

Next.js App Router, TypeScript, Tailwind CSS, Framer Motion and Lucide. The approved Riff identity, original SVG logos, Hanken Grotesk and Noto Sans are copied from `../deck brand/`. Font licenses are retained in `public/fonts/`. The reference brand presentation is untouched.

## Current direction

The landing is an editorial Deck campaign: a paper asymmetric hero with oversized medium-weight Hanken Grotesk, generated cards and a phone composition; a three-line personal headline with a photographic/card spread; a full dark business scene; a light split app section; muted citron controls; an integrated Ember waitlist; and a monumental official footer wordmark. `DESIGN.md` records current tokens; `.impeccable/cards-surface.md` records the composition. `redesign.css`, loaded after `globals.css`, is the final surface authority.

## Run

Use Node.js 24 or newer.

```sh
cd deck-landing
npm install
npm run dev
```

Open http://localhost:3000. Production: `npm run build` then `npm start`.

## Checks

```sh
npm run typecheck
npm test
npm run build
npm run verify:production
npm run test:browser
```

The browser check requires Playwright Chromium (`npx playwright install chromium`) and a running production or development server. It checks navigation, card context and currency switching, business card management, freeze/unfreeze, spending controls, setup tabs, FAQs, registration failure handling, keyboard behavior and overflow at desktop/tablet/mobile widths. Screenshots go to `.impeccable/review/`.

The social image is included at `public/og-deck.png`, with an editable SVG composition beside it that embeds the actual current generated raster cards. To regenerate it, use `npm run social:generate` (requires Python fontTools with WOFF2 support and ffmpeg with librsvg).

## Verification and handoff

The current production build, four unit tests and nine API-boundary checks pass. The expanded Chromium suite passes at 1440, 1024, 768, 390 and 320, including context/currency, independent personal-card freezes, app sheets and focus restoration, Activity navigation, console views/search/filtering, compact view navigation and row dialogs, action sizes, settings/limits, setup tabs and form feedback. Current captures and detail companions are `.impeccable/review/product-*.png`; measured overflow, target and runtime results are in `product-results.json`. The stable production preview is http://localhost:3113. A fixture success response exercises feedback without registering a signup.

The product finish reviewer resolved its initial four findings and returned **ship within four-finding scope**. This is not a broader visual, accessibility or cross-browser verdict. `product-detector.json` reports zero primary and 173 advisory findings against previous token records; there was no second detector run. Provenance scanning passed for seven rasters with none missing.

## Waitlist integration

Copy `.env.example` to `.env.local`. With no `WAITLIST_WEBHOOK_URL`, `POST /api/waitlist` returns HTTP 503 and an honest “your email hasn’t been saved” message. There is no local-storage fallback or simulated signup success.

To enable registration, configure a server-only HTTPS webhook. It receives:

```json
{ "email": "you@example.com", "interest": "personal", "source": "deck-cards" }
```

`interest` is `personal`, `business` or `both`. An optional `WAITLIST_WEBHOOK_TOKEN` is sent as a Bearer token. The request includes an `Idempotency-Key` derived from the normalized email and interest. The provider must enforce idempotency, apply durable rate limits/abuse protection, persist data securely and return `{ "accepted": true }` only after durable acceptance. A plain HTTP 200 is insufficient. Upstream rejection, malformed results and timeouts remain unconfirmed errors. PII is never logged by the application.

The route validates email/interest, rejects honeypots, limits request size and rejects cross-origin browser requests. Deploy behind a host-level request size/rate limiter. Configure `NEXT_PUBLIC_SITE_URL` with the real origin for canonical/Open Graph URLs and sitemap. Configure `CONTACT_EMAIL` only with a verified team address.

## Integration handoff

The user confirms Deck Cards is available and requires present-tense marketing/support copy while retaining “Get early access”. Do not restore coming-soon text, planned-feature/eligibility footnotes, prototype labels or generation captions. Internal demo data and asset provenance stay documented. `/privacy` and `/terms` remain informational pages; approved legal policies and verified contact details are still needed for the registration integration. Do not invent legal entities, network affiliations, partners or testimonials.

## Structure

- `src/components/sections/`: page narrative, conversion and FAQs.
- `src/components/product/`: reusable card designs, app preview, business dashboard and interactive controls.
- `src/components/ui/`: accessible shared segmented control.
- `src/app/api/waitlist/route.ts`: server integration boundary.
- `src/lib/waitlist.mjs`: validation and provider acceptance contract, directly covered by Node tests.
- `src/app/globals.css`: shared brand tokens and product component styling.
- `src/app/redesign.css`: editorial campaign composition and responsive typography.
- `src/app/product.css`: final scoped card/app/console/settings system, loaded after the campaign stylesheet.

The product app uses a graphite 344×728 device, independent personal-card freezes, functional context/currency and Activity navigation, plus details/limits/settings sheets. The console has Cards/Activity/Team, search/filter, selected-card spending inspector and native management dialogs. A compact selector replaces the sidebar below 720px; selecting a card opens its dialog when the inspector is hidden through 1199px. The controls surface uses settings rows and a pressed freeze switch.

Marketing sections render on the server. Client JavaScript is limited to navigation, the card composition, interactive previews, setup tabs and registration. Hero cards have a bounded hover response; content is present without entrance animation. Reduced motion suppresses that response and the brief app-card swap. Product screens use authored example names, organizations and financial values; their local controls do not change real accounts or cards.


## Generated assets and motion

The current flat brushed/engraved card faces are fresh built-in image_gen outputs: `public/cards/deck-ember.png`, `deck-lilac.png`, and `deck-blackberry.png`. Transparent 1200px WebP exports are used by the page; original PNGs are retained. Exact fresh prompts, original generation paths and reference provenance are in `public/cards/provenance.json`; embedded metadata and sidecars are retained. Dynamic card identifiers/currency/ownership remain accessible product text over these images.

The personal section reuses `public/photography/deck-campaign.webp`, an existing AI-generated Deck brand study, with source/prompt in `public/photography/provenance.json`. The visible generation caption was removed by explicit user instruction. Its person and architecture are fictional. Original SVG signatures remain the authority for navigation and footer logos; generated card lettering does not replace them. Asset metadata and provenance sidecars are retained.

Hero card hover lifts the card by 8px and changes its settled rotation over 500ms. The phone stays in its composed position. Personal/Work and currency changes use a keyed 240ms app-card transition. Reduced motion omits hover movement, disables that transition and smooth scrolling, and preserves all content and controls. The local Stack Pay reference informed exploration; the current implementation uses the editorial composition recorded above.
