# Full Audit Report — Phase 7 Hardening Addendum

**Site:** https://onlinespinwheel.fun  
**Generated:** 2026-07-15  
**Scope:** Accessibility (7.1), security headers (7.2), qualitative extras (7.3)  
**Out of scope (explicit overrides):** GSC sitemap “Couldn't fetch” (diagnosed as processing lag; no sitemap/Cloudflare changes), hreflang (en-US only), numeric scores / ranking percentages.

Related detail: [docs/A11Y_AUDIT.md](./A11Y_AUDIT.md) · config: `vercel.json` · script: `npm run audit:a11y`

---

## 7.1 Accessibility — status: PASS

### Automated scan

`scripts/audit-a11y.mjs` (@axe-core/playwright) against Vite preview after production build.

| Page | Path | Critical / serious |
|------|------|--------------------|
| Homepage | `/` | 0 |
| Wheel | `/random-name-picker-wheel` | 0 |
| Wheel | `/yes-or-no-wheel` | 0 |
| Wheel + streamer | `/dinner-picker-wheel?stream=1` | 0 |
| Hub | `/all-spin-wheels` | 0 |
| Blog | `/blog/best-icebreaker-games-office-meetings` | 0 |
| About | `/about-us` | 0 |
| Contact | `/contact-us` | 0 |

**Result: PASS** — zero critical/serious violations on all scanned pages.

### Fixes applied (no visual redesign)

| Area | Change | Files |
|------|--------|-------|
| Skip link | “Skip to content” → `#main-content` | `src/components/Layout.tsx` |
| Main landmark | `id="main-content"` + `tabIndex={-1}` | `Layout.tsx` |
| Icon / control names | Theme toggle (mounted placeholder), menu, entry toggle / color / image / remove; slider thumb `aria-label` | `ThemeToggle.tsx`, `Layout.tsx`, `SpinWheel.tsx`, `ui/slider.tsx` |
| Entries panel | `aria-expanded` / `aria-controls` on desktop collapse | `SpinWheel.tsx` |
| Focus | Existing `*:focus-visible` ring tokens retained; skip link + embed `pre` focus ring | `index.css`, `EmbedWidgetSnippet.tsx` |
| Reduced motion | Idle spin + confetti gated; shorter spin; CSS animation/transition kill-switch | `SpinWheel.tsx`, `index.css` |
| Links in prose | Underline by default (not color-only) where axe flagged `link-in-text-block` | Index, About, Contact, CookieConsent, EmbedWidgetSnippet, WheelProgrammaticPage |
| Scrollable embed code | `tabIndex={0}` + `role="region"` + label | `EmbedWidgetSnippet.tsx` |
| Active nav | Tinted `bg-primary/10` + `text-primary` → `bg-muted` / `text-foreground` (contrast) | `Layout.tsx` |

### Documented contrast / token changes (owner review)

| Token / UI | Before | After | Why |
|------------|--------|-------|-----|
| `.dark --primary` | `280 85% 65%` (`#bf5af2`) | `280 85% 72%` (`#cc7bf4`) | Link text on dark card was ~4.43:1 |
| `.dark --primary-foreground` | white | `280 40% 10%` | White on lavender purple was ~3.52:1 on Accept / primary buttons |
| `.dark --secondary` / `--secondary-foreground` | cyan + white | `200 90% 55%` + dark navy fg | White-on-secondary failed on badges/buttons |
| `.dark --muted-foreground` | `240 5% 65%` | `240 5% 70%` | Slightly clearer secondary text on dark surfaces |
| `.dark --ring` | matched old primary | matched new primary | Focus ring consistency |
| Light `--secondary` | `200 95% 50%` | `200 90% 35%` | White-on-cyan was ~2.63:1 (would fail light theme) |
| SpinWheel badges | `bg-primary/10 text-primary` | `bg-primary text-primary-foreground` | Tinted chip failed AA in dark |
| Entry index chip | `bg-primary/10 text-primary` | `bg-muted text-foreground` | Same tint issue |

Light-mode `--primary` / `--muted-foreground` left unchanged (already ≥4.5:1 on white). No layout/brand redesign beyond palette compliance.

### Keyboard-only walkthrough (one full spin)

Documented against `/random-name-picker-wheel` (desktop viewport, keyboard only):

1. **Skip link:** Tab once from load → “Skip to content” → Enter → focus moves to `#main-content`.
2. **Streamer toggle:** Tab to “Streamer mode (chroma key)” switch → Space toggles; with streamer on, Tab to chroma color input and preset buttons (named presets).
3. **Spin control:** Tab to wheel (button, “Spin the wheel”) or primary “SPIN THE WHEEL” → Enter/Space starts spin; button/wheel disabled while spinning.
4. **Entries panel:** Tab into paste textarea → edit → “Add all lines to wheel”; Tab through Shuffle / Sort / Reset / Clear; Tab to spin-duration slider thumb (named) → arrow keys adjust seconds.
5. **Per-entry row:** Tab activate/deactivate → color input → image control → name field → remove (visible on focus via `focus:opacity-100`).
6. **Result:** After spin, winner dialog is focusable/dismissible with keyboard (Escape / close control).

---

## 7.2 Security headers — status: CONFIGURED (deploy to verify live)

### `vercel.json` policy (this pass)

**Site routes** (catch-all excludes `api/`, `embed/`, `ads.txt`, robots/llms/sitemaps):

| Header | Value |
|--------|--------|
| Strict-Transport-Security | `max-age=63072000; includeSubDomains; preload` (≥ 15552000) |
| X-Frame-Options | `SAMEORIGIN` |
| X-Content-Type-Options | `nosniff` |
| Referrer-Policy | `strict-origin-when-cross-origin` |
| Permissions-Policy | `camera=(), microphone=(), geolocation=(), gyroscope=(), accelerometer=(), magnetometer=(), payment=(), usb=()` |
| Content-Security-Policy-**Report-Only** | See below (not enforced) |

**CSP Report-Only (owner review after AdSense approval before enforcing):**

```
upgrade-insecure-requests; default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://pagead2.googlesyndication.com https://www.googletagservices.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' data: https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://api.web3forms.com https://www.googletagmanager.com https://pagead2.googlesyndication.com; frame-src https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://pagead2.googlesyndication.com; frame-ancestors 'self'
```

**`/embed` and `/embed/:slug*`:** HSTS + nosniff + Referrer-Policy + Permissions-Policy; enforcing CSP `upgrade-insecure-requests; frame-ancestors *` only. **No** `X-Frame-Options` (remains iframe-embeddable).

### Mixed content

Scan of built `dist/**/*.html` and `src` markup: **no** `http://` resource references (excluding schema/W3C namespaces).

### Verification notes

- **Local e2e:** `e2e/embed-iframe.spec.ts` — embed wheel loads inside iframe and exposes Spin control (**passed**).
- **Production `curl -I` (2026-07-15, pre-redeploy of this branch):** `/` and `/yes-or-no-wheel` already had HSTS, nosniff, Referrer-Policy, XFO SAMEORIGIN, and an **enforcing** CSP. Embed still received catch-all XFO/CSP (old config). After deploying this `vercel.json`, re-check:
  - `/` and one wheel: Report-Only CSP + Permissions-Policy; no enforcing CSP.
  - `/embed/<slug>`: **no** XFO; CSP with `frame-ancestors *`.

---

## 7.3 Report extras

### Top 10 reasons AdSense could still reject this site

Each item is tied to something observed in this audit, or marked **not found — low risk**.

1. **Insufficient real visitor value / thin niche perception** — Hub + many programmatic wheel URLs (`/all-spin-wheels`, `/…-wheel`) can look like a template farm if reviewers sample similar H1/section patterns. **MEDIUM**
2. **Ad placeholder / inventory not live yet** — `AdSlot.tsx` + cookie-gated AdSense loader; until ads render on approved pages, review is about site quality, not filling. **not found as broken ads.txt — ads.txt Pub ID present via `api/ads.js`**
3. **Cookie consent interdependence** — Ads load only after Accept (`CookieConsent.tsx`). If reviewers decline or close without accepting, they never see ad UX; not a violation by itself. **LOW**
4. **User-generated or party-game content surface** — Truth-or-dare / social wheels exist in the catalog; family-safe defaults help, but category review risk remains. **/truth-or-dare-spinner-online and related.** **MEDIUM**
5. **Navigation density / commercial feel** — Heavy internal linking clusters on Index and wheel pages. Harmless for SEO; reviewers sometimes flag “SEO-first” sites. **LOW–MEDIUM**
6. **Contact / ownership clarity** — `/contact-us` and `/about-us` + team routes exist; `mailto` + form present. **not found — low risk** for “no contact” rejections.
7. **Privacy / cookie docs** — Policies linked from consent banner. **not found — low risk** for missing policy.
8. **Broken primary tooling** — Wheel spin keyboard + axe clean; streamer chroma labeled. **not found — low risk** for “site doesn’t work”.
9. **Policy violations via UGC images** — Entries allow image upload (client-side). Abuse is user-local, not server-stored, but reviewers may still note content tools. **LOW**
10. **Domain age / traffic quality** — Not measurable in this code audit; operational risk outside HTML. **not found in HTML — owner operational risk**

### Top 10 quick wins (by expected impact)

1. **Deploy `vercel.json` header changes** — Report-Only CSP + embed XFO exclusion — `vercel.json`
2. **Re-curl production** after deploy — confirm Permissions-Policy + Report-Only + embed frameable — `/`, `/yes-or-no-wheel`, `/embed/yes-or-no-wheel`
3. **Keep `npm run audit:a11y` in CI** — `package.json` / `scripts/audit-a11y.mjs`
4. **Review dark primary button text** on streamer screenshots (dark fg on purple) — `src/index.css`
5. **Apply approved content-language rewrites** in one batch (list below) — copy files as listed
6. **Underlined prose links sitewide remaining pages** (tutorials/comparisons still `hover:underline` only) — `src/pages/Tutorial*`, `Comparison*`
7. **Confirm AdSense script domains against Report-Only console** after first ads — widen CSP before enforce
8. **Ensure consent Accept remains easy to find** for ad review sessions — `CookieConsent.tsx`
9. **Feature 2–3 long-form blog posts in footer / hub** for “real content” signal — `Layout.tsx`, hub
10. **Manual keyboard QA on mobile menu Sheet** after deploy — `Layout.tsx`

### Top 10 long-term items (by expected impact)

1. **Enforce CSP** only after AdSense/GA domains confirmed in Report-Only — `vercel.json`
2. **Deep unique body copy** on lower traffic wheels to reduce template-farm optics — `wheelUniqueContent.ts` / enrichment
3. **Editorial calendar** — more indexed blog posts beyond icebreaker/students — `src/data/blogContent/`
4. **Server-side rate limits / abuse policy for future persisted UGC** — if saving wheels remotely
5. **Automated contrast CI** (light + dark Playwright colorScheme) — extend `audit-a11y.mjs`
6. **Landmark audit beyond axe** (manual voiceover) — especially streamer-only layout
7. **Permissions-Policy tighten further** if features stay sensor-free — `vercel.json`
8. **Structured “publisher story” on About** (history, maintenance cadence) — `/about-us`
9. **Monitor Core Web Vitals with live ads** (CLS from ad iframes) — Ad slots reserved today
10. **Separate policy page for embed iframe third-party use** — `/embed/*` consumers

### Content-language sweep (list only — do not auto-apply)

Flagged sentences with suggested rewrites for owner batch approval:

| Location | Current | Suggested |
|----------|---------|-----------|
| `Layout.tsx` footer tagline | “Making Decisions Fun, One Spin at a Time. The ultimate spin wheel tool for random, fair, and exciting choices.” | “Make decisions with a fair online spin wheel, random, clear, and easy to share.” |
| `Layout.tsx` status chip | “Online & Ready to Spin” | “Ready when you are” |
| `EmbedWidgetSnippet.tsx` | “(followed link for SEO).” | “(includes a credit link back to this wheel).” |
| `CookieConsent.tsx` | “Decline non-essential” / “Accept all” (ok) plus dense first sentence | “We use cookies for essential features, analytics, and advertising (including Google AdSense). Accept all cookies, or decline non-essential ones.” |
| `Index.tsx` use-case cards | “Run ticket-number draws with proof links on the raffle wheel…” | “Run raffle ticket draws with proof links on the raffle wheel, or paste @handles on the winner picker.” |
| `Contact.tsx` placeholder | “Tell us what's on your mind...” | “How can we help?” |
| `About.tsx` (if still present) mission marketing stacks | Prefer concrete verbs over “ultimate / amazing” where they remain | Match footer rewrite tone: short, concrete, benefit-led |
| Wheel hub intro (`AllSpinWheelsPage.tsx`) | Scan for repeated “spin wheel” stacking in one sentence | Prefer one “spin wheel” + clearer use-case second clause |
| Blog icebreaker / students posts | Prefer completed prose pass (already tightened); re-check any leftover “Wheel: /path · Flow:” fragments | Expand any remaining telegraphic labels into full sentences |
| Legal summaries linking from footer | Ensure disclaimer sentences stay complete clauses (no truncated “by using this site…”) | Owner legal review — not rewritten here |

---

## Acceptance checklist (Phase 7)

| Criterion | Status |
|-----------|--------|
| `audit:a11y` zero critical/serious | **PASS** (`docs/A11Y_AUDIT.md`) |
| Headers in `vercel.json` (HSTS, nosniff, Referrer-Policy, Permissions-Policy, XFO except embed, CSP Report-Only) | **PASS** (config); live curl after deploy pending |
| Mixed-content scan clean | **PASS** |
| Embed remains iframe-frameable | **PASS** (`e2e/embed-iframe.spec.ts`) |
| Report extras in this file | **PASS** |
| No GSC sitemap / hreflang / numeric score changes | Honored |
| Contrast-only token tweaks logged | Logged above |

---

## Commands

```bash
npm run build          # or npx vite build for JS/CSS-only iteration
npm run audit:a11y
npx playwright test e2e/embed-iframe.spec.ts
curl -sI https://onlinespinwheel.fun/
curl -sI https://onlinespinwheel.fun/yes-or-no-wheel
curl -sI https://onlinespinwheel.fun/embed/yes-or-no-wheel
```
