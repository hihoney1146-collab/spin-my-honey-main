# Cloudflare SEO & AI crawler configuration

The repository [`public/robots.txt`](../public/robots.txt) allows all crawlers via a single `User-agent: *` rule. **Live** `robots.txt` may still block AI bots if Cloudflare injects managed rules.

## 1. Disable conflicting managed robots

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com) → your zone → **onlinespinwheel.fun**
2. Go to **Security** → **Bots** (or **Scrape Shield** on older plans)
3. Find **AI Crawl Control**, **Managed robots.txt**, or **Block AI bots**
4. Either disable managed `robots.txt` injection **or** ensure these user-agents are **Allowed**:
   - `GPTBot`, `ChatGPT-User`, `OAI-SearchBot`
   - `ClaudeBot`, `Claude-Web`, `anthropic-ai`
   - `Google-Extended`, `PerplexityBot`, `Applebot-Extended`

Do **not** publish a second `Disallow: /` for AI bots while the repo allows `/`.

## 2. Content-Signal (if enabled)

If Cloudflare adds:

```text
Content-Signal: search=yes,ai-train=no
```

and you want AI citations and training visibility, change to:

```text
Content-Signal: search=yes,ai-train=yes,ai-input=yes
```

(Only if your legal/privacy policy permits it.)

## 3. WAF and bot fight mode

- **Security** → **WAF** → review rules that challenge `Googlebot` or `Googlebot-Image`
- Add a skip rule for verified bots on paths: `/sitemap.xml`, `/*-sitemap.xml`, `/robots.txt`, `/llms.txt`
- **Bot Fight Mode**: can block headless crawlers; test with URL Inspection in GSC after changes

## 4. Caching

- Purge cache after deploy when resubmitting sitemaps in Google Search Console
- Ensure `*.xml` is not cached as `text/html` (Vercel serves static XML from `public/`)

## 5. Canonical host

Pick one property in GSC:

- `https://onlinespinwheel.fun` (recommended, matches sitemap URLs)

Redirect the other host (e.g. `www`) with a single 301 to avoid redirect loops.

## 6. Verification after changes

```bash
curl -sS https://onlinespinwheel.fun/robots.txt
curl -A ClaudeBot -I https://onlinespinwheel.fun/
curl -I https://onlinespinwheel.fun/sitemap.xml
npm run verify:sitemap
npm run verify:ads-txt
```

Expected: no `Disallow: /` lines for AI bots; sitemap returns `Content-Type: application/xml` and starts with `<?xml`.
