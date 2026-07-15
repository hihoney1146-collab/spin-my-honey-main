# Cloudflare SEO & Crawler-Access Configuration

**Problem this document solves:** AdSense reports `ads.txt: Not found` and Google
Search Console reports the sitemap as `Couldn't fetch`, even though both files
return `200` to a normal browser request. When files serve correctly to humans
but fail for bots, the cause is almost always **Cloudflare bot protection
challenging or blocking the crawler**, not a missing file.

The repository already ships correct files (`public/ads.txt` equivalent served
from `api/ads`, `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt`).
Everything below is **dashboard configuration** on the Cloudflare zone
`onlinespinwheel.fun`. None of it can be committed to git — it must be applied in
the Cloudflare dashboard and then verified with
[`scripts/verify-crawler-access.sh`](../scripts/verify-crawler-access.sh).

> After every change below, purge the Cloudflare cache and re-run the
> verification script. Every line of its output must be `200`.

---

## 0. Prerequisite: confirm SSL mode is Full (strict)

`Cloudflare Dashboard → SSL/TLS → Overview → Encryption mode`

- Set to **Full (strict)**.
- Do **not** use **Flexible** — behind Vercel it causes redirect loops
  (`ERR_TOO_MANY_REDIRECTS`) and can surface as `503`/`525` to crawlers.
- Enable **Always Use HTTPS** so `http://` → `https://` is a single 301 hop.

---

## 1. Bot Fight Mode / Super Bot Fight Mode

`Security → Bots`

1. Turn **OFF** *Bot Fight Mode* (Free plan) — it challenges headless clients and
   silently blocks legitimate crawlers, which produces the exact "serves to
   humans, fails for bots" symptom.
2. On Pro/Business plans using *Super Bot Fight Mode*:
   - **Definitely automated** → set the action to **Allow** for *Verified Bots*,
     or restrict blocking to *Likely automated* only.
   - **Verified bots** → **Allow** (this whitelists Googlebot, Bingbot, AdsBot,
     etc. that Cloudflare verifies by reverse DNS).
   - **Static resource protection** → **OFF**.
   - **JavaScript detections** → OFF for the paths in section 4.

---

## 2. AI crawlers (required for GEO / AI-platform citations)

`Security → Bots → AI Crawl Control` (formerly *AI Scrapers and Crawlers* /
*Block AI bots*).

If **Block AI Bots** is ON, either turn it **OFF** or create **Allow** rules for
every user-agent below. These bots power ChatGPT, Claude, Perplexity, Google AI,
Bing/Copilot, Apple and Meta AI answers — blocking them removes the site from AI
citations (Generative Engine Optimization):

| Platform | User-agents to ALLOW |
| --- | --- |
| OpenAI | `GPTBot`, `OAI-SearchBot`, `ChatGPT-User` |
| Anthropic | `ClaudeBot`, `Claude-User` |
| Perplexity | `PerplexityBot`, `Perplexity-User` |
| Google AI | `Google-Extended` |
| Microsoft | `Bingbot` |
| Apple | `Applebot` |
| Amazon | `Amazonbot` |
| Common Crawl | `CCBot` |
| Meta | `meta-externalagent` |

> Only enable AI training/citation access if your Privacy Policy permits it.
> `public/robots.txt` already `Allow: /` for all agents; do **not** let Cloudflare
> inject a second managed `robots.txt` with `Disallow: /` for AI bots.

### Content-Signal (if Cloudflare injects it)

If Cloudflare adds `Content-Signal: search=yes,ai-train=no` and you want AI
citations + training visibility, change it to:

```text
Content-Signal: search=yes,ai-train=yes,ai-input=yes
```

---

## 3. Verified bots must be allowed

`Security → Bots`

Ensure **Allow verified bots** is enabled. Verified bots include Googlebot,
Googlebot-Image, Bingbot, AdsBot-Google, Applebot, DuckDuckBot, and others that
Cloudflare confirms via reverse DNS. This is the single most important toggle for
fixing GSC "Couldn't fetch" and AdSense "ads.txt not found".

---

## 4. WAF custom rules — SKIP challenges for crawlers

`Security → WAF → Custom rules → Create rule`

### Rule A — Skip all managed challenges for verified bots

- **Field / expression** (Edit expression):

  ```txt
  (cf.client.bot) or
  (http.user_agent contains "Googlebot") or
  (http.user_agent contains "Mediapartners-Google") or
  (http.user_agent contains "AdsBot-Google") or
  (http.user_agent contains "Googlebot-Image") or
  (http.user_agent contains "Bingbot")
  ```

- **Action:** `Skip`
- **Skip:** check **All managed rules**, **Bot Fight Mode / Super Bot Fight
  Mode**, **Rate limiting rules**, and **Managed Challenge**.
- Place this rule **first** in evaluation order.

### Rule B — Never challenge critical crawler files

- **Field / expression:**

  ```txt
  (http.request.uri.path in {"/ads.txt" "/robots.txt" "/llms.txt" "/sitemap" "/sitemap.xml" "/sitemap.txt" "/pages-sitemap" "/pages-sitemap.xml" "/wheels-sitemap" "/wheels-sitemap.xml" "/blog-sitemap" "/blog-sitemap.xml" "/images-sitemap" "/images-sitemap.xml" "/sitemap-index.xml"})
  ```

- **Action:** `Skip` → all managed rules, Bot Fight Mode, rate limiting, and any
  challenge.

> These paths must **never** return `403`, `429`, or `503`. Confirm they are not
> caught by any **rate-limiting rule**, **country/IP block**, or **cache rule**
> that could serve an error page.

---

## 5. Cache & transform rules

`Caching → Configuration`, `Rules → Transform Rules`

- Purge the cache after every deploy, then resubmit **`/sitemap`** (extensionless) in GSC.
  Prefer `/sitemap` over `/sitemap.xml` — Cloudflare has been reported to mangle `.xml`
  responses for Googlebot even when browsers see valid XML.
- Ensure `*.xml` is served as `application/xml` and `ads.txt`/`robots.txt`/
  `llms.txt` as `text/plain` (Vercel already sets these via `vercel.json`
  headers). Cloudflare must not rewrite `Content-Type` to `text/html`.
- Disable **Rocket Loader**, **Auto Minify (HTML)**, and any transform rule for
  the paths in section 4 — they can corrupt XML/plain-text responses.
- No country block or Under-Attack Mode should apply to these paths.

---

## 6. Canonical host & redirects

- Property served: `https://onlinespinwheel.fun` (matches every sitemap URL).
- `www.onlinespinwheel.fun` and `http://` are 301-redirected to the apex HTTPS
  host. These redirects are configured in [`vercel.json`](../vercel.json)
  (`redirects` array) and by **Always Use HTTPS** in Cloudflare — a single hop
  each, no chains.
- In GSC, register the **Domain property** (covers www + apex + http/https) or
  the apex URL-prefix property, and submit **`https://onlinespinwheel.fun/sitemap`**
  (fallback: `/sitemap.txt`). See [GSC_CHECKLIST.md](./GSC_CHECKLIST.md).

---

## 7. Bing Webmaster Tools + IndexNow (required for GEO)

Bing's index powers ChatGPT Search and Copilot, so Bing coverage directly affects
AI citations.

1. Create/verify the site at <https://www.bing.com/webmasters> (import from GSC is
   fastest).
2. Submit `https://onlinespinwheel.fun/sitemap` (or `/sitemap.txt`).
3. **HTML meta verification:** In Bing Webmaster Tools, choose the meta-tag method
   and copy the `content` value. Set it as a Vercel environment variable on the
   production project:
   - **Name:** `BING_MSVALIDATE`
   - **Value:** the string from `content="..."` (not the full tag)
   - Redeploy once. Every prerendered page will include
     `<meta name="msvalidate.01" content="…" />` via
     `scripts/generate-static-pages.mjs`.
4. IndexNow is implemented in this repo:
   - Key file: [`public/<key>.txt`](../public) (see
     `scripts/indexnow-ping.mjs` for the current key).
   - Production builds automatically ping IndexNow after static generation when
     `VERCEL_ENV=production` (see `scripts/run-indexnow-if-publish.mjs`).
   - Manual ping: `npm run indexnow` or set `INDEXNOW_PUBLISH=1` locally.

---

## 8. Verification after every change

```bash
# Full crawler-access matrix (every line MUST be 200)
bash scripts/verify-crawler-access.sh

# Endpoint content-type / sitemap sanity (run against production)
npm run verify:sitemap
npm run verify:ads-txt

# Spot checks
curl -sI -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://onlinespinwheel.fun/ads.txt
curl -sI -A "Mediapartners-Google" https://onlinespinwheel.fun/
curl -sI https://onlinespinwheel.fun/sitemap
curl -sI https://onlinespinwheel.fun/sitemap.txt
```

**Phase 0 is complete only when:** every `verify-crawler-access.sh` line is `200`,
`/ads.txt` returns `text/plain` to `Mediapartners-Google`/`AdsBot-Google`, and
`/sitemap` returns `application/xml` starting with `<?xml` to `Googlebot` (and has
**no** `Content-Security-Policy` header).
Any `403` / `429` / `503` means a Cloudflare rule above still needs adjustment.
