# Deck product demonstrations

Mode: Operate, inside a Persuade marketing surface. Scope: generated card faces, mobile app preview, business console and card-settings demonstration. The surrounding editorial landing remains in its established identity.

User feedback: "Redesign the cards and the app and web demo design, looks like an html + css app". The intent is a finished financial product experience with credible screen hierarchy and controls, not an ornamental dashboard.

## Direction contract

Precision and familiarity: brushed satin card faces with fine engraved Riff channels; restrained ember, lilac and blackberry variants generated with image_gen. No puffy relief, network logos, chips, fake PANs or issuer claims. Card artwork is raster. Actual currency, ending, cardholder and ownership remain semantic HTML. Generation prompts and source paths live in public/cards/provenance.json.

Mobile: neutral white screen inside a thin graphite device enclosure, strong Noto financial numerals, local Hanken title, a calm two-context switch, clear NGN/USD selection, one dominant card, real details/freeze/limit interactions, a transaction list and usable Cards/Activity/Settings navigation. Detail sheets remain within the device. Frozen states are independent for personal NGN/USD; organization ownership and restrictions stay explicit. No personal/business money movement or funding promise.

Web: a complete business workspace with branded sidebar, workspace identity, Cards/Activity/Team views, summary figures derived from illustrative card data, searchable/filterable card table, selected-card inspector with proportional monthly spending, and native card-management dialog. Table density and a restrained neutral system take priority over decorative dashboard tiles. The inspector/sidebar collapse structurally at smaller widths. Search, selected card, sidebar views, reset, freeze/terminate and focus restoration must actually work.

Controls: same product settings language, with a clear card identity, freeze switch, honest status feedback, spending limit and activity. Replace the previous large centered success symbol with realistic settings rows.

System: product.css loaded after redesign.css owns this surface; selectors are scoped to deck-app, deck-console and product-controls. Product ink #29232C, muted #736B78, line #ECE8EF, surface #F6F4F8 and restrained lilac selections. Graphite device #242126; white product screens. Standard product actions retain Blackberry. Labels and money use Noto Sans. Motion is limited to state feedback and existing card swap; reduced motion resolves immediately.

## Truth and verification

The user confirms Deck Cards is available and explicitly requires present-tense product language while retaining “Get early access”. Remove visible prototype/illustrative labels and planned-feature/issuer-availability footnotes; generation provenance stays in project metadata. Local product screens still use authored example people, organizations, limits, transactions and balances and do not change real accounts/cards. Work ownership and permissions remain separate. Waitlist errors must remain truthful and success requires actual provider acceptance.

Current verification: production build, four unit tests and nine API-boundary checks pass. The expanded live suite passes five widths, including compact navigation, row dialogs, focus restoration, action sizes and no overflow/runtime errors. Current full-page/hero/app/console/settings captures are `.impeccable/review/product-*`; measurements are in `product-results.json`. The product finish reviewer resolved four findings and returned ship within that scope. Detector: zero primary and 173 advisory findings against previous token records, with no second run. Eight raster provenance records pass with none missing. Stable production preview: http://localhost:3113.
