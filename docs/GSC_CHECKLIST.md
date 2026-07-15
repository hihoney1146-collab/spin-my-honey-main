# Google Search Console checklist

After each production deploy:

```bash
npm run verify:sitemap
npm run verify:ads-txt
```

## Submit sitemap (important)

GSC often reports **Couldn't fetch** for `*.xml` sitemaps behind Cloudflare even when
browsers get `200`. Prefer extensionless URLs:

1. Open [Google Search Console](https://search.google.com/search-console)
2. Property: `https://onlinespinwheel.fun` (Domain property or apex URL-prefix)
3. **Sitemaps** → **remove** failed rows (`pages-sitemap.xml`, `wheels-sitemap.xml`, etc.)
4. Add **exactly**: `sitemap`  
   Full URL: `https://onlinespinwheel.fun/sitemap`
5. If that still fails within 24h, also add: `sitemap.txt`
6. Do **not** resubmit `*.xml` child files unless debugging — use extensionless
   `/pages-sitemap`, `/wheels-sitemap`, `/blog-sitemap`, `/images-sitemap` if needed

`robots.txt` lists `/sitemap`, `/sitemap.xml`, and `/sitemap.txt` (same URL set).

## Request indexing (URL Inspection)

- `/`
- `/all-spin-wheels`
- `/random-name-picker-wheel`
- `/yes-or-no-wheel`
- `/about-us`
- `/team/content`

## If status is still "Couldn't fetch"

1. Confirm live: `curl.exe -sI https://onlinespinwheel.fun/sitemap`
   - Expect `200`, `Content-Type: application/xml`, body starts with `<?xml`, **no** HTML
2. Confirm text fallback: `curl.exe -sI https://onlinespinwheel.fun/sitemap.txt`
3. Cloudflare: [CLOUDFLARE_SEO.md](./CLOUDFLARE_SEO.md) — Bot Fight Mode off / verified bots allow; WAF skip for `/sitemap`
4. Purge entire Cloudflare cache, then resubmit
5. Wait 24–48h after a clean fetch (GSC caches failures on the same URL)
