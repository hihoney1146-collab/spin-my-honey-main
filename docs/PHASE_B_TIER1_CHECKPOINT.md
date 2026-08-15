# Phase B Tier 1 checkpoint

**Date:** 2026-08-12  
**Project:** onlinespinwheel.fun (`spin-my-honey-main`)

## Shipped differentiators

| Page | Differentiator | Evidence |
|------|----------------|----------|
| `/random-name-picker-wheel` | remove-after-pick + session history + optional `Name:weight` entries + proof/streamer | `RandomNamePickerWheel.tsx`; SSR FAQs updated; `wheelModeFeatures` updated |
| `/abcd-spin-wheel` | locked A-D + remove-after-pick + projector fullscreen + answers-called history | `AbcdSpinWheel.tsx`; SSR FAQs updated |
| `/chinese-zodiac-wheel` | birth-year → animal calculator reorders wheel | `ChineseZodiacWheel.tsx`; SSR FAQs updated (calculator, not "does not know year") |
| `/self-care-wheel` | filter chips rebuild pool (5-min / no-spend / evening / movement) | `SelfCareWheel.tsx`; SSR FAQs updated |
| `/outfit-picker-wheel` | **separate** occasion + weather toggles over tagged dataset | `OutfitPickerWheel.tsx` rewritten; SSR FAQs updated |
| `/pokemon-randomizer-wheel` | challenge pools (starters / types / nuzlocke-style / gen vibe), generic-safe labels | `PokemonRandomizerWheel.tsx`; SSR FAQs updated |
| `/should-i-text-him-wheel` | context chips swap pools + 60s cooldown | `ShouldITextHimWheel.tsx`; SSR FAQs updated |

## Hat merge (deferred item)

- Client: `App.tsx` Navigate `/pick-out-of-a-hat-generator` → `/random-name-picker-wheel`
- Server: `vercel.json` permanent redirect
- Policy: `WHEEL_MERGE_REDIRECTS` includes hat → name-picker
- Name-picker copy absorbs hat framing (FAQ + controls copy)
- Sitemaps / llms regenerated at **21 wheels** (hat not listed)

## Verification

- `npm run build`: **PASS**
- `npm run audit:all`: **PASS** — Routes: 45 | below 400: 0 | missing: 0; dup/meta/jsonld/redirects/identity clean
- Sitemap regen: **21 wheels** in `wheels-sitemap.xml`; hat slug **absent** from `public/` sitemaps + `llms.txt`
- `npx playwright test e2e/tier1-modes.spec.ts`: **7 passed** (2026-08-12)
- Hat merge: `vercel.json` permanent redirect + `App.tsx` client Navigate; name-picker FAQ absorbs hat framing

## Not started

- Phase B Tier 2
- AdSense resubmission (owner decision)
