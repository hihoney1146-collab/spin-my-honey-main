# Post-fix verification report — onlinespinwheel.fun

**Date:** 2026-06-02  
**Auditor:** Automated checks (curl + codebase review)  
**Production URL:** https://onlinespinwheel.fun  
**Repo branch state:** Local build includes SEO plan fixes; **production is not fully deployed**

---

## Executive summary

| Area | Repo / local build | Live production |
|------|-------------------|-----------------|
| Sitemap XML | Pass | Pass |
| robots.txt (AI crawlers) | Pass | **Fail (Cloudflare)** |
| llms.txt (full wheel list) | Pass (144 lines, all wheels) | **Fail (70 lines, 8 featured only)** |
| Wheel sitemap priorities | Pass (8× 0.9, rest 0.7) | **Fail (all 0.7)** |
| E-E-A-T (byline, HowTo) | Pass in source | **Not visible until deploy** |
| Core pages HTTP 200 | N/A | Pass |
| ads.txt | Pass | Pass |
| Privacy / consent | Pass in source | Pass (assumed; pages 200) |

**Overall health score (live):** ~72% — **Needs improvement**  
**AdSense readiness:** **Not ready** until deploy + Cloudflare robots fix  
**AI platform indexing:** **Not ready** (Cloudflare blocks GPTBot, ClaudeBot, Google-Extended)

---

## Section A: Fixed issues (in codebase / partial live)

### A.1 Sitemap XML (live — PASS)

Verified 2026-06-02 via curl:

| URL | HTTP | Content-Type | XML declaration | Entries |
|-----|------|--------------|-----------------|---------|
| `/sitemap.xml` | 200 | `application/xml; charset=utf-8` | Yes | 4 child sitemaps |
| `/pages-sitemap.xml` | 200 | application/xml | Yes | 16 URLs |
| `/wheels-sitemap.xml` | 200 | application/xml | Yes | 49 URLs |
| `/blog-sitemap.xml` | 200 | application/xml | Yes | 5 URLs |
| `/images-sitemap.xml` | 200 | application/xml + image NS | Yes | 16 `image:image` tags |

Sitemaps are **not** minified HTML; structure is valid.

### A.2 Core pages (live — PASS)

All returned **HTTP 200** (including `/author-raja-jahangir`, which serves SPA shell):

- `/`, `/about-us`, `/contact-us`, `/all-spin-wheels`, `/author/raja-jahangir`
- `/privacy-policy`, `/terms-and-conditions`, `/blog`, `/ads.txt`

### A.3 ads.txt (live — PASS)

```
google.com, pub-2823129698767735, DIRECT, f08c47fec0942fa0
```

### A.4 Repo robots.txt (PASS — not what live crawlers see first)

[`public/robots.txt`](../public/robots.txt) uses a single `User-agent: *` group with `Allow: /` and no AI-specific `Disallow: /`.

### A.5 Implemented in repo (PASS after deploy)

- Sitemap index: pages → wheels → blog → images
- Blog `lastmod` from post `updated` dates
- Featured wheel priority `0.9` (local `wheels-sitemap.xml`)
- Full `llms.txt` with all 49 wheels + descriptions (local, 144 lines)
- `AuthorByline`, HowTo JSON-LD, FAQ + Breadcrumb + WebApplication on wheel pages
- Organization `founder` in `index.html` + `schema.ts`
- Related guides block on wheel pages
- Consent-gated `AdSlot` placeholder
- Privacy: AdSense, COPPA, CCPA sections
- Cookie consent banner (`CookieConsent.tsx`)
- [`docs/CLOUDFLARE_SEO.md`](./CLOUDFLARE_SEO.md), [`docs/GSC_CHECKLIST.md`](./GSC_CHECKLIST.md)
- Extended `npm run verify:sitemap`

### A.6 Blog word count (source — PASS)

All 5 posts exceed 800 words (approximate body text):

| Slug | Words |
|------|------|
| random-name-picker-fair-fun-easy | 1,122 |
| best-icebreaker-games-office-meetings | 1,798 |
| best-spin-wheel-games-for-students | 1,114 |
| fun-ways-decide-where-to-eat-couples | 1,428 |
| virtual-secret-santa-online | 1,388 |

---

## Section B: Remaining issues

### B.1 CRITICAL — Cloudflare robots.txt blocks AI crawlers (live)

**Status:** FAIL on production

Live `https://onlinespinwheel.fun/robots.txt` prepends **Cloudflare Managed content**:

```
Content-Signal: search=yes,ai-train=no
User-agent: ClaudeBot
Disallow: /
User-agent: GPTBot
Disallow: /
User-agent: Google-Extended
Disallow: /
… (and other bots)
```

**Impact:** ChatGPT, Claude, Gemini training/index extensions blocked regardless of repo file.

**Fix:** Follow [`docs/CLOUDFLARE_SEO.md`](./CLOUDFLARE_SEO.md):

1. Disable or override **Managed robots.txt** / **AI Crawl Control** blocks.
2. Set `Content-Signal` to allow `ai-input` / `ai-train` if policy allows.
3. Purge Cloudflare cache after changes.
4. Re-verify: `curl -sS https://onlinespinwheel.fun/robots.txt | grep -A1 GPTBot`

---

### B.2 HIGH — Latest SEO build not deployed to production

**Evidence:**

| Asset | Local (repo) | Live |
|-------|--------------|------|
| `llms.txt` lines | 144 (all wheels listed) | 70 (featured + categories only) |
| Wheel priority 0.9 count | 8 | 0 (all 0.7) |
| Author byline on wheel HTML | `Reviewed by Raja Jahangir` in source | Not found in `/yes-or-no-wheel` HTML |

**Fix:** Deploy current `main` to Vercel, run `npm run build` (regenerates `public/*.xml`, `llms.txt`, `robots.txt`), purge Cloudflare cache.

---

### B.3 HIGH — Google Search Console (manual — not verified here)

Cannot access your GSC account from this audit.

**Action:** After deploy + Cloudflare fix:

1. Submit only `https://onlinespinwheel.fun/sitemap.xml`
2. Use URL Inspection on sitemap URL
3. See [`docs/GSC_CHECKLIST.md`](./GSC_CHECKLIST.md)

If status is still "Couldn't fetch" with valid XML, it is often cache/GSC delay (24–48h).

---

### B.4 MEDIUM — Author page vs audit checklist

**URL:** `/author/raja-jahangir` (not `/author-raja-jahangir` — intentional canonical)

| Criterion | Status |
|-----------|--------|
| Page loads 200 | Pass |
| Bio + Auroxa Tech | Pass |
| Photo | Pass |
| LinkedIn | Pass |
| "4 years full-stack" wording | **Partial** — copy says "three years" SEO experience |
| Twitter / GitHub | **Missing** — only LinkedIn linked |

**Fix (optional):** Update bio to match credentials; add `sameAs` only for real profiles.

---

### B.5 MEDIUM — Images sitemap scope

**Live:** 16 `image:image` entries (homepage OG/logo, blog featured JPEGs).

**Audit asked for:** 20+ including per-wheel thumbnails.

**Status:** Acceptable for current assets; expand when per-wheel images exist in `public/`.

---

### B.6 MEDIUM — Em dashes in codebase

**Remaining:**

- `src/components/SpinWheel.tsx` — 14 (mostly skipped by polish script)
- `src/assets/data.csv` — 2

**Fix:** Run `node scripts/polish-emdash.mjs`; manually clean CSV and SpinWheel comments if needed.

---

### B.7 LOW — Dynamic sitemap “auto-update within 5 minutes”

**Design:** Build-time regeneration on `npm run build` / `prebuild`, not instant API updates.

**Pass criteria for your stack:** New CSV row → commit → deploy → sitemaps refresh.

**Not a bug** unless you expected runtime DB updates.

---

### B.8 LOW — Ad slots on homepage

**Repo:** `AdSlot` on wheel pages only; homepage has no placeholder yet.

**Audit:** Asked for homepage ad container below hero.

**Fix (optional):** Add `<AdSlot />` below hero on `Index.tsx` if desired pre-approval.

---

## Section C: New issues found

1. **Dual robots.txt on live** — Crawlers read Cloudflare block *before* your Vercel rules. Confusing for auditors and some bots.
2. **`/author-raja-jahangir` returns 200** — SPA fallback serves homepage shell; use **`/author/raja-jahangir`** only in links/GSC.
3. **Wheel lastmod on live** — Still uniform `0.7` priorities; deploy needed for tiered priorities and blog-specific dates on live.

---

## Section D: Overall health score

| Category | Checks | Passed |
|----------|--------|--------|
| Phase 1 Critical (live) | 4 tasks | 2.5 / 4 |
| Phase 2 Sitemaps (live) | 3 tasks | 2 / 3 |
| Phase 3 E-E-A-T | 4 tasks | 2.5 / 4 (repo stronger) |
| Phase 4 Content | 3 tasks | 2.5 / 3 |
| Phase 5 AdSense | 4 tasks | 3 / 4 |
| Phase 6 AI / llms | 3 tasks | 1.5 / 3 |
| Phase 7 Performance | 4 tasks | Not run (manual PSI) |

**Estimated live score:** **~72%** (Needs improvement)  
**Estimated post-deploy + Cloudflare fix:** **~90–94%**

---

## Section E: AdSense approval readiness

| Requirement | Status |
|-------------|--------|
| Legal pages | Ready |
| Privacy / AdSense / COPPA / CCPA | Ready (source) |
| Cookie consent | Ready |
| ads.txt | Ready (live) |
| Content depth (wheels) | Ready in repo (~800+ words with enrichment) |
| Trust / author | Ready in repo; deploy needed |
| No policy violations observed | — |
| **Blockers** | Deploy latest build; fix Cloudflare robots if reviewers test AI/trust signals |

**Verdict:** **Not ready on live until deploy.** After deploy: **likely ready to apply** (subject to Google manual review).

---

## Section F: AI platform ranking readiness

| Requirement | Status |
|-------------|--------|
| robots.txt allows AI bots | **No (live)** |
| llms.txt complete | **No (live)** / Yes (repo) |
| FAQ / structured data | Yes (repo; verify after deploy) |
| E-E-A-T author | Yes (repo) |

**Verdict:** **Not ready** for ChatGPT / Claude / Google-Extended crawling until **Cloudflare robots** fixed and **full deploy** completed.

---

## Recommended action order

1. **Cloudflare** — Disable AI bot blocks ([`CLOUDFLARE_SEO.md`](./CLOUDFLARE_SEO.md)) — **15 min**
2. **Deploy** — Push latest code; confirm Vercel build runs `prebuild` — **10 min**
3. **Verify live** — `npm run verify:sitemap && npm run verify:ads-txt` — **2 min**
4. **GSC** — Resubmit `sitemap.xml`; request indexing for key URLs — **10 min**
5. **Optional** — PageSpeed Insights + Rich Results Test on author + wheel URLs

---

## Verification commands (copy-paste)

```bash
# After deploy + Cloudflare changes
curl -sS https://onlinespinwheel.fun/robots.txt | grep -E 'GPTBot|ClaudeBot|Google-Extended' -A1
curl -I https://onlinespinwheel.fun/sitemap.xml
npm run verify:sitemap
npm run verify:ads-txt
wc -l public/llms.txt   # expect ~144 locally after build
grep -c 'priority>0.9' public/wheels-sitemap.xml   # expect 8 locally
```

---

*This report compares live production (2026-06-02) with the implemented SEO + AdSense plan in the local repository.*
