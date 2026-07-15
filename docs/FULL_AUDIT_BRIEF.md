# Full Audit Brief

Canonical phase instructions for onlinespinwheel.fun SEO / hardening work.
New agent chats should execute only the requested phase (do not re-run completed phases unless asked).

---

ROLE: You are a senior full-stack engineer + technical SEO working on this codebase. CONSTRAINTS:

Do NOT change the existing UI/UX design system, colors, layout, or wheel interaction. All work is additive content, SSR, redirects, schema, and new opt-in features.
Every piece of indexable content MUST be server-rendered (present in the initial HTML response, verifiable with curl). Never ship indexable text as client-only JS.
US English throughout. Audience: United States.
============================================================ PHASE 0 — CRAWLER ACCESS & INFRASTRUCTURE (blocking issues)
Evidence: AdSense reports "ads.txt: Not found" and GSC reports sitemap "Couldn't fetch", yet both files serve correctly to normal requests. This is a crawler-access failure, almost certainly Cloudflare bot protection, not missing files.

0.1 Cloudflare configuration (document steps in docs/CLOUDFLARE_SEO.md):

Turn OFF "Bot Fight Mode" / Super Bot Fight Mode challenges for verified bots.
In Security > Bots: ensure "Verified bots" are ALLOWED.
If "Block AI Bots" (or AI Scrapers and Crawlers toggle) is ON, turn it OFF or create allow rules for: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Bingbot, Applebot, Amazonbot, CCBot, meta-externalagent. (These power AI platform citations — required for GEO.)
Create WAF skip rules (Security > WAF > Custom rules) that SKIP all managed challenges for requests where cf.client.bot is true, and explicitly for user agents: Googlebot, Mediapartners-Google, AdsBot-Google, Googlebot-Image, Bingbot.
Ensure /ads.txt, /robots.txt, /sitemap*.xml, /llms.txt are excluded from ANY challenge, rate limit, cache rule that could return 403/503, or country blocks.
Verify Cloudflare SSL mode is "Full (strict)" (Flexible mode causes redirect loops behind Vercel).
0.2 Verification script (add scripts/verify-crawler-access.sh, run it and paste output): for UA in "Googlebot/2.1 (+http://www.google.com/bot.html)"
"Mediapartners-Google" "AdsBot-Google" "Bingbot" "GPTBot" "ClaudeBot" "PerplexityBot"; do for PATHX in / /ads.txt /sitemap.xml /robots.txt /about-us /yes-or-no-wheel; do code=$(curl -s -o /dev/null -w "%{http_code}" -A "$UA" "https://onlinespinwheel.fun$PATHX") echo "$UA $PATHX -> $code" done done

Every line must be 200. Any 403/429/503 = Phase 0 not complete.
0.3 Host + URL canonicalization:

301 redirect www.onlinespinwheel.fun/* -> onlinespinwheel.fun/* (single hop). GSC evidence shows www URLs receiving impressions separately.
301 /terms -> /terms-and-conditions (stray legacy URL receiving impressions).
Verify http -> https 301 single hop.
0.4 Sitemap consistency (one source of truth):

Keep exactly ONE sitemap entry point: /sitemap.xml.
robots.txt currently lists sitemap.xml, sitemap-api.xml, and sitemap.txt — remove sitemap-api.xml and sitemap.txt references (delete the files or 301 them).
llms.txt claims sitemap.xml is an index with pages/wheels/blog/images children; make reality match: either make /sitemap.xml a real index referencing those child sitemaps (all returning 200, correct lastmod), or serve a single urlset and update llms.txt. No dead sitemap references anywhere.
Content-Type must be application/xml; no compression/transform issues via Cloudflare.
Resubmit /sitemap.xml in GSC after deploy; also add site to Bing Webmaster Tools and implement IndexNow (Next.js: ping api.indexnow.org on build/publish with a key file at /<key>.txt). Bing index powers ChatGPT search — required for GEO.
============================================================ PHASE 1 — SERVER-RENDER ALL TRUST & CONTENT PAGES
Evidence: /about-us and /author/raja-jahangir return metadata with an EMPTY body to non-JS fetchers, while tool pages return full content. Homepage long-form sections (anchors like #exploring-online-spin-wheel appear in GSC) are not in initial HTML.

1.1 Audit every route: run curl (no JS) against all 68 URLs, record visible text length. Output a table in docs/SSR_AUDIT.md: route | ssr_words | status. 1.2 Convert about-us, contact-us, author/*, privacy-policy, cookie-policy, terms-and-conditions, disclaimer, blog index, all blog posts, and all homepage content sections to full SSR/SSG (Next.js server components / getStaticProps). Interactive wheel stays client-side; everything textual is in initial HTML. 1.3 Acceptance: curl of every indexable route shows >= 400 words of unique visible text (legal pages exempt from uniqueness but must SSR fully).

---

PHASE 2 — CONSOLIDATE DOORWAY PAGES (301 map)
Implement permanent 301s at the edge (next.config redirects), remove sources from all sitemaps and internal links, and ABSORB each merged page's unique value into the target as a real on-page section/mode:

/exercise-spin-wheel -> /exercise-picker-wheel /date-night-idea-wheel -> /date-night-wheel /what-movie-should-i-watch-wheel -> /movie-picker-wheel /giveaway-winner-picker-wheel -> /winner-picker-wheel /zodiac-sign-wheel-game -> /zodiac-sign-wheel (add "Party game mode" section) /zodiac-wheel-dates -> /zodiac-sign-wheel (add dates table section) /zodiac-wheel-planets -> /zodiac-sign-wheel (add ruling planets section) /wheel-of-fortune-zodiac -> /daily-horoscope-wheel /egyptian-zodiac-wheel -> /zodiac-sign-wheel (add Egyptian signs section)

After merge, zodiac cluster = 2 pages (zodiac-sign-wheel, chinese-zodiac-wheel) plus daily-horoscope-wheel. chinese-zodiac-wheel stays (GSC position 11.8 — protect it). Verify: no internal link, sitemap entry, or llms.txt line points at a redirected URL.

---

PHASE 3 — HOMEPAGE REBUILD (content only, same design)
Keep the wheel hero exactly as is. Replace the generic AI-pattern sections ("Exploring Online Spin Wheel", "Understanding Decision Makers", "Essential Features", "Exciting Spin Wheel Games") with this SSR content model:

H1: Spin the Wheel — Free Online Spin Wheel & Random Picker Direct-answer paragraph (45-60 words, immediately after H1, self-contained, extractable by AI Overviews): what it is, how it picks (crypto.getRandomValues), no signup, works on any device. H2: How to spin the wheel (3 concrete steps with a real screenshot of THIS wheel) H2: What people use this wheel for (5 short scenario blocks: teachers/classrooms, giveaways & raffles, teams & meetings, food & movie nights, games & streams — each linking to the matching specialty wheel) H2: Why our results are fair (crypto RNG explained in plain English, independence of spins, link to a short /how-randomness-works page) H2: Popular spin wheels (existing curated grid — keep) H2: FAQ (6 questions real users ask about THIS custom wheel: max entries, saving a wheel, sharing, mobile use, removing a winner, is it really random). FAQPage schema. Footer sections unchanged.

Rules: no filler headings like "Understanding X"; every sentence must say something specific. Title tag: "Spin the Wheel - Free Online Spin Wheel & Random Name Picker". Meta description rewritten, not the current template.

---

PHASE 4 — E-E-A-T + SOLO OWNERSHIP TRANSITION
The site moves from "operated by Auroxa Tech" to an independent solo project.

4.1 Remove "Auroxa Tech" from: about-us, author page, privacy policy, terms, llms.txt Identity block, all schema, all meta. Replace operator with: "Online Spin Wheel is an independent project built and maintained by Raja Jahangir." 4.2 Author repositioning: the author page currently titles him "SEO & Growth Specialist" — change to maker/builder framing: Title: "Raja Jahangir — Creator of Online Spin Wheel" Bio (SSR, 250+ words): who he is, why he built the site, how each wheel is designed and tested, how fairness is verified, city/country optional, real photo (real headshot image file, not a stock avatar), links to real social profiles. 4.3 Footer/contact: replace onlinespinwheel@gmail.com with hello@onlinespinwheel.fun (set up domain email forwarding). Footer social icons must link to REAL live profiles; remove any icon whose profile does not exist. 4.4 About page (SSR, 450+ words): the story, the testing methodology ("every wheel is tested for uniform distribution across 10,000 automated spins before launch"), update policy, how to report a bug, what data is/isn't collected. 4.5 Schema: sitewide WebSite + Person (Raja Jahangir, sameAs -> real profiles) as publisher/author. Remove any Organization references to Auroxa Tech. Every tool page: WebApplication (applicationCategory: UtilityApplication, offers price 0, isAccessibleForFree true) + FAQPage (mirrors visible FAQs exactly) + BreadcrumbList. Blog posts: Article with author Person, datePublished, dateModified. NEVER add AggregateRating/Review schema to tool pages. 4.6 Add visible "Last updated: <date>" on every tool page and blog post, wired to real content-change dates (not build dates).

---

PHASE 5 — TOOL PAGE DEPTH + UNIQUENESS (all ~36 surviving wheels)
Known boilerplate leak: the sentence "…is a free online tool that uses cryptographic randomization to deliver fair, instant results. Enter your options, click spin…" appears verbatim across many pages and is being shown in Google snippets. Eliminate ALL cross-page duplicate sentences.

Per page, generate a unique content model: 5.1 H1 + 45-60 word direct-answer paragraph specific to this wheel's job. 5.2 3-5 use-case sections with concrete scenarios for a US audience. Examples: - random-student-picker: equitable cold-calling, participation tracking, ESL/small groups, sub-teacher plans; reference "remove after pick" mode. - winner-picker-wheel: Instagram/TikTok giveaway steps, US contest disclosure basics (not legal advice), duplicate-entry handling, using the proof link (5.6). - team-generator-wheel: PE class teams, office icebreakers, gaming squads. 5.3 FAQs: 4-6 questions ONLY about this tool. Delete off-topic PAA imports (e.g. remove "What is 20 questions" from yes-or-no-wheel). 5.4 Unique per-page OG image + hero screenshot: build-time script (Playwright) captures each wheel with its default options -> /public/og/<slug>.png (1200x630). No page ships the generic og-image.png. 5.5 Meta description: unique, benefit-led, no shared template opener. Title formula: "<Primary keyword> — <concrete differentiator>" under 60 chars. 5.6 Functional differentiation (real behavior, then describe it in SSR content): - team-generator-wheel: input names + team count -> outputs full balanced teams. - secret-santa-wheel-generator: full assignment mode w/ exclusions + shareable per-person reveal links. - random-number-wheel: min/max range, no-repeat toggle. - random-student-picker: remove-after-pick toggle + session history + fullscreen classroom mode (big text, one-tap spin). - winner-picker-wheel: multi-winner draw + result proof link (Phase 8.1). - coin-flip-wheel: streak counter + running heads/tails tally. - alphabet-spinner-wheel: exclude-letters option (retitle page: "Letter Spinner — Random Alphabet Wheel (A-Z)" to capture "letter spinner"). 5.7 Related-wheels module: contextual (same audience), max 6, varied anchor text.

---

PHASE 6 — NEW MONEY PAGES (from Keyword Planner data)
Create these pages (same wheel component, real presets + full Phase 5 content model): /raffle-wheel Primary: "raffle wheel", "raffle wheel generator", "raffle spinner", "spinning raffle wheel", "virtual prize wheel". Highest advertiser demand in the dataset. Include multi-winner, ticket-number mode (spin numbers not names), proof link. /prize-wheel Primary: "prize wheel", "spinning prize wheel", "giveaway wheel". Include a short honest buyer-intent section: "Need a physical prize wheel? What to look for" (captures dry-erase/tabletop intent; later monetizable with affiliate/ads). /classroom-spinner Primary: "classroom spinner", "classroom spinner wheel", "random student selector", "online wheel spinner for teachers". Teacher Mode hub: student picker + team maker + timer, fullscreen. /wheel-of-names-alternative Honest comparison page: our tool vs wheelofnames vs pickerwheel vs spinner apps (feature table, who each is best for). Never impersonate the WheelOfNames brand; position as a comparison/alternative. This page also feeds AI-platform answers for "wheel of names alternative" style queries. Internal links: homepage scenario blocks + all-spin-wheels hub link to all four.

---

============================================================
PHASE 7 — HARDENING ADDENDUM (accessibility, security, report extras)
============================================================
Context notes that OVERRIDE anything else:
- DO NOT investigate or "fix" the GSC sitemap "Couldn't fetch" status.
  It is already diagnosed with firewall-log evidence as GSC processing
  lag (Googlebot fetches all sitemap files successfully; 144/144 events
  = skip). Any change to sitemap serving, headers, or Cloudflare-related
  config for this reason is forbidden.
- This site is single-language (en-US). Do NOT add hreflang.
- Do not produce numeric "scores out of 100" or estimated ranking/
  visibility percentages — these are unmeasurable. Qualitative severity
  (CRITICAL/HIGH/MEDIUM/LOW) only.

7.1 ACCESSIBILITY (WCAG 2.1 AA, no visual redesign):
    - Run an automated axe-core scan (add scripts/audit-a11y.mjs using
      @axe-core/playwright) across: homepage, 3 wheel pages (one with
      streamer mode on), hub, one blog post, about, contact.
    - Fix within constraints: missing/incorrect ARIA labels and roles,
      missing form/input labels, missing button names (icon buttons),
      focus states (visible focus ring using existing design tokens),
      keyboard operability of the wheel spin button + entries panel +
      streamer toggle + color picker, skip-to-content link, correct
      heading order (no skipped levels), img alt completeness,
      prefers-reduced-motion respected for wheel/confetti animations.
    - Contrast: text must meet 4.5:1 (3:1 for large text) against its
      actual background. Fix by adjusting only where the current value
      already fails — prefer the existing palette's nearest compliant
      shade; log every color change in the report for owner review.
    - Acceptance: axe scan reports zero critical/serious violations on
      all scanned pages; keyboard-only walkthrough of one full spin
      documented in the report.

7.2 SECURITY HEADERS (via vercel.json headers config):
    - Add/verify: Strict-Transport-Security (max-age >= 15552000),
      X-Content-Type-Options: nosniff, Referrer-Policy:
      strict-origin-when-cross-origin, Permissions-Policy (deny unused
      sensors/camera/mic), X-Frame-Options: SAMEORIGIN for all routes
      EXCEPT /embed/* (embeds must remain frameable — keep the existing
      frame-ancestors * CSP on /embed/:slug*).
    - Content-Security-Policy: implement in Report-Only mode first with
      a policy that allows current origins (self, Google fonts if used,
      AdSense domains pre-listed: pagead2.googlesyndication.com,
      googleads.g.doubleclick.net, tpc.googlesyndication.com,
      www.googletagservices.com) — do NOT enforce in this pass; log the
      policy for owner review after AdSense approval since enforcement
      before ad-code integration risks breaking future ad serving.
    - Scan built HTML for mixed-content (http://) references; fix all.
    - Acceptance: curl -I shows all headers on / and one wheel page;
      /embed/<slug> remains embeddable in an iframe (e2e check).

7.3 REPORT EXTRAS (qualitative, evidence-based only):
    - "Top 10 reasons AdSense could still reject this site" — each tied
      to a specific page/element found in THIS audit, or explicitly
      marked "not found — low risk".
    - "Top 10 quick wins" and "Top 10 long-term items" ordered by
      expected impact, each with the file/route it concerns.
    - Content-language sweep: list (don't auto-rewrite) any sentence
      flagged for grammar errors or unnatural phrasing, with suggested
      rewrite, so the owner can approve batch application in one pass.

Acceptance for Phase 7: audit-a11y passes; headers verified via curl;
report extras present in docs/FULL_AUDIT_REPORT.md; zero changes to
visual design tokens except documented contrast fixes.
