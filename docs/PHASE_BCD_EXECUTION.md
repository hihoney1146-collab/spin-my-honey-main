# Phase B–D execution summary

**Date:** 2026-07-27  
**Owner amendments:** applied (chain audit, prize keyword absorb, features reconciliation, Tier split, hat after Tier 1).

## Final indexed shape

| Surface | Count |
|---------|-------|
| Indexed wheels | **21** |
| Pages (legal/guides/team/hub/home) | **22** |
| Indexed blog | **1** |
| **Sitemap URL total** | **44** |

## Phase C (done)
- 16 NOINDEX wheels: live + `noindex,follow`; removed from sitemaps/llms
- 6 MERGE 301s (incl. deferred hat): single-hop; `wheel-of-fortune-zodiac` → `zodiac-sign-wheel`
- Raffle absorbs prize-wheel keyword + **Prize labels** mode
- Redirect chain audit: **0 issues**

## Phase B.0 (done)
- `wheelModeFeatures.ts` only describes shipped UI; removed unbuilt prize-only claims

## Phase B Tier 1 (done) — real modes
abcd (projector + remove-after-pick), should-i-text-him (context pools + cooldown), chinese-zodiac (birth-year), self-care (filters), pokemon (challenge pools), outfit (occasion/weather), random-name-picker (remove-after-pick + history + proof)

## Hat merge (done)
`pick-out-of-a-hat-generator` → `random-name-picker-wheel`

## Phase B Tier 2 (done)
yes-or-no (weights + best-of), dinner (filters incl. chains), movie (mood + watchlist paste), date-night (budget/location), zodiac-sign (month/day helper)

## Phase D
- Counts/copy no longer claim “40+” clone inventory
- Sitemaps + llms regenerated at **21** wheels
- `audit-redirects` + identity PASS
- Run `npm run build` then `npm run audit:all` before deploy (SSR audit needs fresh `dist/`)

## Deploy checklist
1. Deploy (Vercel picks up `vercel.json` 301s)
2. Purge Cloudflare cache if needed
3. GSC: leave protect-list URLs alone; expect soft 404/noindex drop for NOINDEX set over time
4. Resubmit AdSense after crawl has time to see smaller indexed footprint + real modes
