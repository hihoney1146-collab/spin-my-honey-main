# AdSense root cause — Phases A–D final report

**Status:** Phase D complete (code + local audits). **Deploy this commit before treating production as Phase-D-clean.**  
**Date:** 2026-08-20  
**Metric of success:** AdSense approval (not rankings alone).  
**Indexed footprint (target):** **47 URLs** — 22 pages, 4 blog, 21 wheels.

---

## 1. Executive summary (post Phase D)

Phase A correctly identified the rejection driver: **too many indexed URLs that were the same spinner with different default labels**. Phases B/C shipped real modes and cut the indexed wheel set from 43 → **21**. Phase D asks whether the **remaining** site reads as a focused randomization product with distinct utilities and supporting expertise — and fixes claims, hub presentation, and internal links so a skeptical reviewer is not pulled back into “clone farm” signals.

**Verdict after D (skeptical reviewer lens):** The **wheel layer** now passes a fresh click test: home → hub → random wheels show real controls (filters, weights, birth helpers, classroom hub, proof links). The **supporting content layer** (indexed guides, comparisons, case studies) is still generic long-form SEO in places and is now the **weakest indexed surface** relative to the tools — not because it is thin, but because several pages read like keyword-capture articles from the pre-consolidation era while the product story has moved on.

Infrastructure (ads.txt, Cloudflare, sitemap plumbing, SSR, legal, team) remains out of scope as a rejection cause — verified clean in prior passes and re-audited here.

---

## 2. Phase A recap (unchanged diagnosis)

| Rank | Cause | Confidence |
|------|--------|------------|
| 1 | Indexed inventory was mostly one tool × many presets | High |
| 2 | Page count vs substance mismatch (~40+ wheels indexed) | High |
| 3 | “Unique text” treated a structural clone problem as a copy problem | High |
| 4 | Overlapping intents indexed side-by-side | Medium |
| 5 | Mode marketing ahead of mode reality (prize-wheel, etc.) | Medium (resolved by merge/noindex + Tier 1/2) |

Phase A verdict table (43 wheels → KEEP / ENRICH / MERGE / NOINDEX) drove Phases B and C. See git history for the full A-table; counts were **9 KEEP + 12 ENRICH + 6 MERGE + 16 NOINDEX**.

---

## 3. Everything changed — Phases B, C, D

### Phase B — ENRICH differentiators (Tier 1 + Tier 2)

All **12 ENRICH** wheels plus name-picker parity received shipped UI modes documented in `src/data/wheelModeFeatures.ts`. Production Playwright Tier 2 verification: **5/5 flows PASS**, default chips own the pool on load (deploy `ffcfdd6`).

| Route | Action | Evidence |
|-------|--------|----------|
| `/abcd-spin-wheel` | A–D lock, remove-after-pick, projector fullscreen | `AbcdSpinWheel` mode; e2e tier1 |
| `/should-i-text-him-wheel` | Context chips + cooldown | `ShouldITextHimWheel`; e2e tier1 |
| `/chinese-zodiac-wheel` | Birth-year → animal highlight | `ChineseZodiacWheel`; e2e tier1 |
| `/self-care-wheel` | Filter chips rebuild pool | `SelfCareWheel`; e2e tier1 |
| `/pokemon-randomizer-wheel` | Challenge-pool filters | `PokemonRandomizerWheel`; e2e tier1 |
| `/outfit-picker-wheel` | Occasion + weather filters | `OutfitPickerWheel`; e2e tier1 |
| `/random-name-picker-wheel` | History, weights, remove-after-pick, proof | `RandomNamePickerWheel`; Tier 1 |
| `/yes-or-no-wheel` | Weighted slices + best-of-3 | `YesOrNoWheel`; e2e tier2 |
| `/dinner-picker-wheel` | Cuisine/delivery/chains filters (absorbs fast-food) | `DinnerPickerWheel`; e2e tier2 |
| `/movie-picker-wheel` | Mood/length/watchlist (absorbs horror) | `MoviePickerWheel`; e2e tier2 |
| `/date-night-wheel` | Budget + at-home/out filters | `DateNightWheel`; e2e tier2 |
| `/zodiac-sign-wheel` | Birth-date → sign helper | `ZodiacSignWheel`; e2e tier2 |

### Phase C — NOINDEX + MERGE consolidation

| Route(s) | Action | Evidence |
|----------|--------|----------|
| 16 NOINDEX slugs (see `scripts/wheel-index-policy.mjs`) | `noindex,follow`; excluded from sitemaps / llms / IndexNow | `WheelProgrammaticPage` robots; `audit-redirects.mjs` PASS |
| `/prize-wheel` | 301 → `/raffle-wheel` | `WHEEL_MERGE_REDIRECTS`; prize mode on raffle |
| `/pick-out-of-a-hat-generator` | 301 → `/random-name-picker-wheel` | single-hop redirect audit |
| `/instagram-wheel-picker` | 301 → `/winner-picker-wheel` | redirect audit |
| `/fast-food-wheel` | 301 → `/dinner-picker-wheel` | chains filter on dinner wheel |
| `/horror-movie-picker-wheel` | 301 → `/movie-picker-wheel` | horror mood on movie wheel |
| `/daily-horoscope-wheel` | 301 → `/zodiac-sign-wheel` | fortune cluster collapsed |
| Sitemap / llms | **47** indexable URLs | `generate-sitemap.mjs` output: 22 pages + 4 blog + 21 wheels |

### Phase D — Substance, claims, link mesh (this pass)

| Area | Action | Evidence |
|------|--------|----------|
| `/all-spin-wheels` hub | Split **Indexed tools (21)** vs **More tools — live but not in search (16)**; drop merge URLs from extras | `AllSpinWheelsPage.tsx`; SSR `allSpinWheelsContent()` |
| `/` directory | Homepage directory lists **indexed wheels only**; copy no longer says “full collection” of all CSV rows | `WheelDirectory.tsx` + `getWheelsGroupedByCategory({ indexableOnly: true })` |
| Related wheels (SSR + React) | `getRelatedWheelLinks` / `relatedWheelLinksFromUnique` filter **`isWheelIndexableSlug` only** | `wheelPages.ts`, `static-content.mjs`, `generate-static-pages.mjs` |
| Blog related tools | Removed noindex/merge slugs; icebreaker post retargeted off truth-or-dare | `BlogPost.tsx`, `best-icebreaker-games-office-meetings.ts` |
| Homepage featured blogs | Four **indexed** posts (was draft slugs) | `Index.tsx` `FEATURED_BLOG_SLUGS` |
| Footer featured wheels | Fixed slug list (indexed only), not CSV slice(0,6) | `siteInternalLinks.ts` |
| Count claims | Removed stale **“40+ specialty pages”**; hub/meta/comparison/llms say **21 indexed tools** | `static-page-meta.mjs`, `WheelOfNamesAlternative.tsx`, `seo-routes.mjs` llms blurb |
| `/wheel-of-names-alternative` | Comparison table rows for Tier 1/2 capabilities (weights, filters, birth helpers, name-picker history) | React + SSR table in `static-content.mjs` |
| Case study school SSR | Replaced noindex `/random-word-generator-wheel` with `/abcd-spin-wheel` | `static-content.mjs` |
| 10 legacy guide URLs | **`noindex,follow`** (keyword-capture leftovers not in sitemap) | `NoindexFollow.tsx` + `generate-static-pages.mjs` legacy list |
| Internal link audit | New `scripts/audit-internal-links.mjs`; wired into `audit:all` | `docs/INTERNAL_LINK_AUDIT.md` PASS |
| SSR explore nav | Expanded crawler nav: team, guides, blog posts, legal — fixes orphan risk on team/legal pages | `exploreNav()` in `static-content.mjs` |

---

## 4. D.1 — Site-level substance review (skeptical AdSense reviewer path)

**Simulated journey:** Home → `/all-spin-wheels` → three random indexed wheels → one blog post → `/about-us` → `/privacy-policy`.

### Home (`/`)

**Feels like:** A credible primary tool — live spinner, streamer mode, fairness copy, FAQs. The indexed wheel directory below the fold lists **21 tools with real controls**, not 40+ clone links.

**Remaining weakness:** None critical on the wheel surface after Phase D deploy. Pre-deploy production still mixed hub/directory counts — fix is in this commit.

### Hub (`/all-spin-wheels`)

**Feels like:** After deploy, an honest directory: **21 indexed** tools up front, **16 bookmark-only** clones labeled as not in search. That matches the product story (“focused specialty set”).

**Remaining weakness (severity: low):** The noindex extras section still exposes clone URLs to humans who scroll — intentional for bookmarks, but a reviewer who clicks into `/exercise-picker-wheel` will still see preset-only UI. Robots noindex limits index damage; **do not re-index without a mode**.

### Three random indexed wheels (spot check)

| Wheel | Reviewer takeaway |
|-------|-------------------|
| `/dinner-picker-wheel` | **Distinct** — cuisine/delivery/chains chips change the pool; not homepage-with-takeout-labels. |
| `/yes-or-no-wheel` | **Distinct** — editable weights + best-of-3 visible without reading FAQ. |
| `/random-name-picker-wheel` | **Distinct** — remove-after-pick, history, optional weights; hat merge absorbed. |

**Clone signal:** Not observed on indexed wheels post Tier 1/2.

### Blog (`/blog/best-spin-wheel-games-for-students`)

**Feels like:** Substantive, wheel-first, links to real classroom tools. Matches the tightened product.

**Remaining weakness (severity: low):** Long-form listicle shape is familiar; acceptable because it ties to shipped modes and downloadable PDF.

### About (`/about-us`)

**Feels like:** Legitimate small team, fairness testing story, links to fairness study — supports E-E-A-T.

**Remaining weakness (severity: low):** Does not enumerate “21 indexed tools” explicitly; not harmful.

### Legal (`/privacy-policy`)

**Feels like:** Standard, complete legal stack — expected for AdSense.

### Non-wheel indexed surface — **weakest layer** (not re-written in B/C)

These **are** in the 47-URL index and were **not** rebuilt during wheel tiers. A reviewer who opens them from footer/SSR nav may still smell old SEO inventory:

| Route | Issue | Severity |
|-------|--------|----------|
| `/comparison-spin-wheel-vs-random-number-generator` | Long generic comparison; competent but interchangeable with any spinner blog | **Medium** |
| `/comparison-spin-wheel-vs-traditional-methods` | Same pattern | **Medium** |
| `/comparison-online-vs-physical-spin-wheels` | Same pattern | **Medium** |
| `/case-study-school-using-spin-wheels` | Narrative case study; CTAs now point at classroom tools (Phase D fix) but prose is template-heavy | **Medium** |
| `/case-study-community-event-using-spin-wheels` | Same | **Medium** |
| `/tutorial-adding-images-to-spin-wheels` | **Good** — matches real product feature | Low |
| `/spin-wheel-fairness-study` | **Good** — original research + CSV | Low |
| `/how-randomness-works` | **Good** — supports trust | Low |
| `/wheel-of-names-alternative` | **Good after D.2** — table matches shipped capabilities | Low |

**10 legacy routes** (`/how-to-use-spin-wheels-in-classrooms`, `/tutorial-creating-your-first-spin-wheel`, etc.) had **keyword-mismatched** titles (e.g. “Spin the Wheel 8 Colors” on a classroom URL). Phase D marks them **`noindex,follow`**; they are **not** in the 47-URL sitemap. If old backlinks exist, they no longer pollute the indexed impression.

### D.1 bottom line

**Does it read as “focused randomization tool + distinct utilities + supporting expertise”?**  
**Yes for the wheel + hub + blog + trust pages** after this deploy.  
**Partially for comparisons/case studies** — they read as competent SEO support, not as differentiated product documentation. That is the main remaining “filler” risk, not the wheel inventory.

---

## 5. D.2 — Count and claim accuracy

| Location | Before | After |
|----------|--------|-------|
| `scripts/static-page-meta.mjs` `/wheel-of-names-alternative` | “40+ specialty pages” | “21 indexed specialty tools with real controls” |
| `scripts/static-page-meta.mjs` `/all-spin-wheels` | “every free specialty spin wheel…” | “21 indexed … plus bookmark-only extras” |
| `AllSpinWheelsPage.tsx` hub heading | `Full directory (43 wheels)` | `Indexed tools (21)` + separate extras block |
| `WheelDirectory.tsx` | “Browse Our Full Collection” | “Indexed specialty wheels” + count from `INDEXED_WHEEL_COUNT_PHASE_C` |
| `public/llms.txt` | Generic specialty blurb | “21 specialty wheels with real controls; leftover clone URLs noindex” |
| `WheelOfNamesAlternative.tsx` + SSR twin | Table understated Tier 1/2 | Rows for weights, filters, birth helpers, name-picker history |
| Homepage featured blogs | Draft/noindex slugs | Four indexed posts only |

**Verified:** Sitemap generator reports **47 URLs (22 pages, 4 blog, 21 wheels)** on local build.

---

## 6. D.3 — Internal link mesh

Audit: `docs/INTERNAL_LINK_AUDIT.md` (also run via `npm run audit:all`).

| Check | Result |
|-------|--------|
| Indexable routes | 47 |
| Orphans (&lt;3 internal inlinks) | **0** |
| Indexable page → noindex wheel (except hub extras list) | **0** |
| Indexable page → merge/redirect URL | **0** |
| Hub lists merge sources in extras | **Fixed** — extras = `NOINDEX_WHEEL_SLUGS` only (merge URLs 301 away) |

---

## 7. Audit outputs (local build 2026-08-20)

| Audit | Result | Doc |
|-------|--------|-----|
| SSR (≥400 words / route) | 47/47 PASS | `docs/SSR_AUDIT.md` |
| Duplicate sentences | 0 cross-page, 0 in-page | `docs/DUP_CHECK.md` |
| Meta uniqueness | 0 issues | `docs/META_AUDIT.md` |
| JSON-LD | 0 issues | `docs/JSONLD_AUDIT.md` (via audit script) |
| Redirects / sitemap / llms | 0 issues | redirect audit |
| Identity phrases | PASS | `docs/IDENTITY_CHECK.md` |
| Internal link mesh | PASS | `docs/INTERNAL_LINK_AUDIT.md` |

---

## 8. Indexed inventory reference (post Phase C)

### 21 indexed wheels

`secret-santa-wheel-generator`, `team-generator-wheel`, `random-number-wheel`, `random-student-picker`, `winner-picker-wheel`, `raffle-wheel`, `classroom-spinner`, `coin-flip-wheel`, `alphabet-spinner-wheel`, `abcd-spin-wheel`, `should-i-text-him-wheel`, `chinese-zodiac-wheel`, `self-care-wheel`, `pokemon-randomizer-wheel`, `outfit-picker-wheel`, `random-name-picker-wheel`, `yes-or-no-wheel`, `dinner-picker-wheel`, `movie-picker-wheel`, `date-night-wheel`, `zodiac-sign-wheel`

### 22 indexed pages (non-wheel)

`/`, `/all-spin-wheels`, `/blog`, four `/team/*`, `/about-us`, `/contact-us`, `/how-randomness-works`, `/tutorial-adding-images-to-spin-wheels`, two case studies, three comparisons, `/wheel-of-names-alternative`, `/spin-wheel-fairness-study`, four legal/trust routes — see `PAGES_SITEMAP_ROUTES` in `scripts/seo-routes.mjs`.

### 4 indexed blog posts

`best-spin-wheel-games-for-students`, `best-icebreaker-games-office-meetings`, `spin-wheel-team-building-activities`, `classroom-spinner-beyond-name-picking`

---

## 9. MANUAL ACTIONS (owner)

1. **Deploy** this Phase D commit to production (Vercel). Until deploy, production hub/meta may still show pre-D clone signals.

2. **Click-check on production** (5 minutes): Home indexed directory → hub split (21 + labeled extras) → `/dinner-picker-wheel` filters → `/wheel-of-names-alternative` table → `/blog/best-spin-wheel-games-for-students` → confirm noindex legacy URL shows robots noindex in view-source (pick one `/how-to-use-spin-wheels-in-classrooms`).

3. **Google Search Console:** Resubmit sitemap (`https://onlinespinwheel.fun/sitemap` or `/sitemap.xml`). Confirm indexed URL count trends toward **47** (allow crawl lag).

4. **GSC URL inspection** (sample): `/all-spin-wheels`, `/dinner-picker-wheel`, `/wheel-of-names-alternative`, one merged URL (`/prize-wheel` → should report redirect to raffle), one noindex extra (`/exercise-picker-wheel` → noindex).

5. **Optional content follow-up (not blocking deploy):** Shorten or rewrite comparison + case-study pages to reference **21 indexed tools** and specific modes (classroom hub, proof links, filters) — reduces remaining “generic SEO article” smell in D.1.

6. **Do not** re-index any NOINDEX wheel or legacy guide without a new shipped differentiator and explicit policy change in `wheel-index-policy.mjs`.

7. **Keep** `npm run audit:all` in CI/pre-release after structural changes; internal link audit now guards regressions on hub/related/blog links.

---

## 10. Phase gate

| Phase | Status |
|-------|--------|
| A — Forensic verdict | Complete ( drove B/C ) |
| B — Tier 1/2 modes | Complete; production e2e verified |
| C — NOINDEX/MERGE + 47 URL shape | Complete |
| D — Substance, claims, link mesh, report | **Complete (awaiting production deploy)** |

**Previous stop gate (“awaiting owner approval before B/C/D”) is superseded** by execution through Phase D. Next owner decision: deploy + GSC actions above; optional comparison/case-study rewrite when bandwidth allows.
