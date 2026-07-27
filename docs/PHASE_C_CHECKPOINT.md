# Phase C checkpoint (executed)

**Date:** 2026-07-27  
**Status:** Phase C complete per owner amendments. B Tier 1 next.

## Done

### Redirects (single-hop)
- `wheel-of-fortune-zodiac` → `/zodiac-sign-wheel` (was daily-horoscope; no chain)
- Merges: `prize-wheel`→`raffle-wheel`, `instagram-wheel-picker`→`winner-picker-wheel`, `fast-food-wheel`→`dinner-picker-wheel`, `horror-movie-picker-wheel`→`movie-picker-wheel`, `daily-horoscope-wheel`→`zodiac-sign-wheel`
- Deferred: `pick-out-of-a-hat-generator` (waits for name-picker Tier 1)
- Chain audit added in `scripts/audit-redirects.mjs` — **0 issues**

### NOINDEX (16, live + `noindex,follow`, out of sitemaps/llms)
exercise, nfl-team, random-word/country/animal/day/color/travel/hobby, what-to-draw, twister, family-game-night, bedtime-story, fortnite, roblox, truth-or-dare

### Prize → raffle absorb
- Raffle retitled for prize + ticket + multi-winner
- **Prize labels** mode shipped on `RaffleWheel` (not copy-only)
- `wheelModeFeatures` prize-only claims removed; raffle claim matches UI

### Counts / sitemap / llms
- Regenerated: **45** sitemap URLs (**22** pages + **1** blog + **22** wheels)
- Hub/about-style “40+” claims replaced; hub lists exclude merge sources
- `audit-redirects` + `identity-check` **PASS**
- `npm run audit:all` fails only on **SSR audit** until `npm run build` regenerates `dist/` (expected mid-work)

## Indexed wheels now (22)

KEEP modes + ENRICH pending + hat still indexed:  
abcd, alphabet, chinese-zodiac, classroom, coin-flip, date-night, dinner, movie, outfit, pick-out-of-a-hat, pokemon, raffle, random-name, random-number, random-student, secret-santa, self-care, should-i-text-him, team-generator, winner-picker, yes-or-no, zodiac-sign

## Next (approved order)
1. Phase B Tier 1 enrichments (7)
2. Hat → name-picker merge
3. Phase B Tier 2 (5)
4. Phase D
