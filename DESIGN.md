---
name: Deck Cards — Riff
description: 'An editorial Deck campaign: expansive medium-weight typography, tactile cards and precise product
  information.'
colors:
  canvas: '#FDFBF8'
  paper: '#FFF8ED'
  ink: '#3D1C2E'
  campaign: '#28121E'
  ember: '#FF6B3D'
  action: '#AE341A'
  lilac: '#D9BCF4'
  citron: '#E7ED8B'
  stone: '#F2E8DA'
  muted: '#705665'
  line: '#DAC9CE'
  control: '#947584'
  editorial-line: '#3D1C2E26'
  personal-field: '#F6EFE5'
  product-stage: '#E8E0ED'
  controls-stage: '#EDECE1'
  controls-track: '#DFDDD1'
  button-hover: '#593047'
  button-disabled: '#D4C6C9'
  button-disabled-text: '#503942'
  segmented: '#F0EAE9'
  segmented-hover: '#E5DADB'
  phone-screen: '#FFFFFF'
  phone-shell: '#242126'
  dialog: '#FFFAF3'
  business-muted: '#D8C3CF'
  success: '#216442'
  success-soft: '#E3EFE6'
  info: '#285DA3'
  info-soft: '#E5EDF9'
  danger: '#AF2934'
  danger-soft: '#FBE7E9'
  product-ink: '#29232C'
  product-muted: '#736B78'
  product-line: '#ECE8EF'
  product-surface: '#F6F4F8'
  product-accent: '#EAE2F3'
typography:
  display:
    fontFamily: '''Hanken Grotesk'', sans-serif'
    fontSize: clamp(80px, 9.05vw, 136px)
    fontWeight: 500
    lineHeight: 0.96
    letterSpacing: -0.04em
  headline:
    fontFamily: '''Hanken Grotesk'', sans-serif'
    fontSize: clamp(52px, 6.15vw, 88px)
    fontWeight: 500
    lineHeight: 1.02
    letterSpacing: -0.04em
  conversion:
    fontFamily: '''Hanken Grotesk'', sans-serif'
    fontSize: clamp(64px, 7vw, 100px)
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: -0.04em
  body:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.65
  hero-body:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.8
  supporting-body:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.85
  button:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 13px
    fontWeight: 700
    lineHeight: 1.4
  fine-print:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.7
  product-amount:
    fontFamily: '''Noto Sans'', sans-serif'
    fontSize: 31px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: -0.035em
rounded:
  status: 4px
  field: 5px
  stage: 6px
  control: 8px
  dialog: 18px
  payment-card: 13px
  phone: 48px
  phone-screen: 42px
spacing:
  '1': 4px
  '2': 8px
  '3': 12px
  '4': 16px
  '5': 20px
  '6': 24px
  '8': 32px
  '10': 40px
  '12': 48px
  section: 140px
  section-tablet: 100px
  section-mobile: 80px
components:
  button-primary:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    typography: '{typography.button}'
    rounded: '{rounded.stage}'
    padding: 14px 22px
  button-primary-hover:
    backgroundColor: '{colors.button-hover}'
  button-primary-disabled:
    backgroundColor: '{colors.button-disabled}'
    textColor: '{colors.button-disabled-text}'
  input-email:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink}'
    rounded: '{rounded.field}'
    padding: 12px 13px
  segmented-control:
    backgroundColor: '{colors.segmented}'
    rounded: '{rounded.control}'
    padding: '{spacing.1}'
  segmented-selected:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.field}'
    padding: 8px 13px
  payment-card:
    backgroundColor: transparent
    textColor: '{colors.ink}'
    rounded: '{rounded.payment-card}'
    padding: 24px
  product-stage:
    backgroundColor: '{colors.product-stage}'
    rounded: '{rounded.stage}'
  controls-stage:
    backgroundColor: '{colors.controls-stage}'
    rounded: '{rounded.stage}'
  waitlist-wrap:
    backgroundColor: transparent
    rounded: '0'
    padding: '0'
  card-management-dialog:
    backgroundColor: '{colors.phone-screen}'
    textColor: '{colors.product-ink}'
    rounded: '{rounded.dialog}'
    padding: 27px
  status-active:
    backgroundColor: '{colors.success-soft}'
    textColor: '{colors.success}'
    rounded: '{rounded.status}'
    padding: 4px 7px
---

# Design System: Deck Cards — Riff

## Overview

**Creative North Star: "The Layered Poster"**

The established Deck Riff identity now has an editorial landing-page expression: oversized medium-weight type, asymmetric product compositions, broad warm fields and tactile card imagery. Original SVG signatures and local Hanken Grotesk/Noto Sans remain the brand anchors. The page composition and reference interpretation live in `.impeccable/cards-surface.md`.

The user requested premium layout and typography, delegated routine decisions and requested finished product demonstrations. This implementation is code-led with no approved visual comp. The user confirms Deck Cards is available, requires present-tense copy and explicitly retains “Get early access”. Authored example balances, people and organizations remain documented internally; visible prototype labels, generation captions and planned-feature footnotes were removed by explicit instruction. Local demonstrations do not change real cards or accounts.

Source authority is `globals.css`, then `redesign.css`, then `product.css`, plus current components. The product finish review resolved its four findings and returned “ship within four-finding scope”. Current product captures and browser results cover the stated widths and interactions; this is not an exhaustive accessibility or cross-browser audit. `.impeccable/product-surface.md` records the product-specific contract.

**Key Characteristics:**

- Large Hanken Grotesk headings at medium weight with deliberate editorial line breaks.
- A paper asymmetric hero, photographic/card spread and full dark business scene.
- Flat brushed/engraved card faces with live text for currency, identity and ownership.
- Flat, gently rounded stages; shadows reserved for objects and transient surfaces.
- Working illustrative controls with restrained hover and context-change motion.

## Colors

### Primary

Blackberry (`ink`) supplies main type, ordinary actions and card details. Deep Blackberry (`campaign`) fills the business section and footer. Ember supplies the integrated early-access field and the orange card face. Paper supplies action labels, fields and reversed text. The main canvas is a lighter warm near-white, distinct from Paper.

### Secondary

Lilac distinguishes the USD card and the pale product stages. Citron supports product status accents; the controls stage is a muted citron-neutral. The personal section retains its warm inherited field. Raster card materials vary tonally around their brand colors; they are imagery, not additional semantic palette tokens.

### Neutral

Muted, Line and Control retain text, divider and border roles. Editorial Line is a softer translucent Blackberry separator. Product screens and dialogs use White, neutral Product Ink, Product Muted, Product Line and Product Surface; Lilac selections stay restrained inside the campaign palette. The dark business section uses explicit light secondary text. This is a composition of light and dark fields with no theme selector.

**The Field and Figure Rule.** Use Blackberry on Ember and pale fields; use Paper and explicit light secondary tones on the dark business and footer fields.

## Typography

Hanken Grotesk is locally hosted variable type (100–900). Current public headings use (500), with compact leading and tracking of (−0.04em). Noto Sans has actual regular (400) and bold (700) files; it supplies body copy, controls and financial information. Official SVG logos remain distinct from typed headings.

The desktop hero computes from its source clamp to roughly (130px) at (1440px). Below (720px), its clamp is (`clamp(64px, 18.7vw, 110px)`), roughly (73px) at (390px), with (0.98) leading. Below (380px), a separate (58–70px) clamp applies. The personal headline has three authored lines. Major reading copy is (14–16px); labels, disclosures and scaled mockup details have their own smaller roles. Section-specific headline sizes remain in CSS rather than a single universal scale.

**The Money Face Rule.** Use Noto Sans and tabular numerals for money, explicit currency and ownership. Product screens use their own dense Noto hierarchy: the app amount is (31px), compact console card data is (11px) and narrow status labels are (9px). These scoped roles do not replace campaign typography.

## Layout

Desktop content is capped at (1320px) with (56px) side gutters. Gutters become (36px) at (720–1199px), (24px) at (720–900px), (20px) on mobile, and (18px) below (380px). Shared section padding is (140px) desktop, (100px) tablet and (80px) mobile; business, conversion, FAQs and footer have explicit exceptions.

The hero pairs a dominant left headline with overlapping cards and a tilted phone on the right. A quiet ruled baseline closes it. Personal uses a three-line heading beside supporting copy, then a two-part photograph/card spread. Business reverses the entire scene around an expansive dashboard. Unified pairs left-aligned explanation with an upright app on Lilac. Controls sit on muted citron; the Ember form is integrated into its section. The footer finishes with the monumental official wordmark.

Below (720px), hero copy precedes the artwork, image spreads and split sections stack, steps become a vertical sequence and mobile navigation opens a disclosure. Cards keep their physical overlap; body content remains in normal flow without a pinned scroll sequence. Tablet and narrow refinements are explicit source rules.

## Elevation & Depth

Fields and fine dividers carry structure. Product objects carry soft, directional shadows: hero cards (`8px 25px 40px -17px #3d1c2e55`), graphite app devices (`0 30px 50px -23px #22172b66, inset 0 0 0 1px #989399`). The business dashboard is flat. The native dialog retains its transient shadow and dim backdrop. Exact extensions are in the sidecar.

**The Object Depth Rule.** Reserve physical shadows for card/phone objects and transient UI; keep editorial fields and the integrated form flat.

Hero cards have a bounded (500ms) hover response: lift (8px) and turn slightly from settled rotations of (−14°) and (9°). There is no entrance or scroll convergence animation. Reduced motion suppresses hover movement. App context changes use a (240ms) fade/translation, explicitly disabled under reduced motion; global reduced-motion CSS also collapses transitions and disables smooth scrolling. Content is visible without animation.

## Shapes

Editorial stages retain (6px) corners; product.css gives the console (12px), settings panel (14px) and native management dialog (18px). Form fields/choices retain (5px) and campaign actions (6px). The graphite app enclosure is (344 × 728px), with (48px) outer and (42px) screen corners. Payment cards retain (1.586) proportions with (13px) corners, (24px) padding and (18px) compact padding; app/inspector instances have scoped corner overrides.

Current card rasters use flat brushed satin and shallow engraved Riff channels, replacing the puffy relief. Container-relative labels stay legible across sizes; currency sits bottom-right clear of engraving. Currency, masked ending, holder and ownership remain HTML above the image. Exact prompts/source paths are retained. Official navigation/footer signatures still use supplied SVG geometry.

## Components

### Actions, navigation and fields

Primary buttons use Blackberry/Paper and a (50px) base minimum height; hero buttons are (52px), then (49px) on mobile. Hover and disabled colors remain explicit. The header uses the dark official signature on the warm canvas; desktop links underline on hover. The mobile disclosure exposes its state, closes after selection and supports Escape with trigger focus restoration.

The email field uses Paper, a translucent Blackberry border and a (54px) minimum height; text is (15px) desktop and (16px) mobile. Interest choices use Paper with a Blackberry selected state. The form has no nested panel background. Keyboard focus is a Deep Ember (2px) outline offset by (5px), with Ember on the dark business field and Deep Ember restored inside its dashboard.

### Product app, console and settings

The app has working Personal/Work and NGN/USD selection, independent personal-card freeze states, Cards/Activity navigation, and details/limits/settings sheets with Escape/close handling and trigger focus restoration. Work ownership/restrictions remain explicit. Its selected context is a White segment on a neutral track, distinct from campaign segmented controls.

The business console has Cards/Activity/Team navigation, search, status filters, derived summary values, a selected-card inspector with proportional monthly spending and a native settings dialog. Below (1200px), selecting a compact row opens the dialog when its inspector is hidden. Below (720px), a compact view selector replaces the sidebar. Mobile row actions have (32 × 40px) targets; narrow data remains (11px) with (9px) status text. The external app-switch hint is hidden through (1199px).

Management dialogs use a (390px) maximum width, browser focus containment and inertness, Escape/close and restored launcher focus. The controls section uses settings rows and an explicit pressed freeze switch with state feedback; limits/activity remain functional. All state is local authored demonstration data. Signup success still requires actual provider acceptance; browser success feedback uses a controlled fixture.

### Image assets

The current brushed/engraved card faces are fresh image_gen outputs at the existing `public/cards/` filenames. WebP exports, PNG originals, exact new prompts and original generation paths are retained with embedded/sidecar provenance. The campaign photograph remains a fictional generated brand study with provenance under `public/photography/`; its visible generation caption was removed per the user's copy instruction. The social SVG/PNG combines official logos and outlined typography with the actual current raster cards in a paper editorial composition. Provenance scanning passed for eight rasters with none missing. Preserve this metadata without restoring the removed public labels.

## Do's and Don'ts

### Do:

- **Do** preserve official Riff SVG signatures and the established palette.
- **Do** give medium-weight headings clear scale, deliberate lines and generous space.
- **Do** keep currency and ownership explicit in live text.
- **Do** retain generated-asset provenance and follow the current public-copy contract.
- **Do** preserve working demos, keyboard focus and reduced-motion behavior.

### Don't:

- **Don't** recreate official logos with type or distort their geometry.
- **Don't** add unsupported financial claims, network marks, social proof or launch promises.
- **Don't** treat generated card lettering as replacement official logo artwork.
- **Don't** replace the scoped product type hierarchy with campaign display styles.
- **Don't** confirm registration without durable server acceptance.
