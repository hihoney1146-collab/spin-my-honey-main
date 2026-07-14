# Google Search Console checklist

After each production deploy:

```bash
npm run verify:sitemap
npm run verify:ads-txt
```

## Submit sitemap (important)

GSC often reports **Couldn't fetch** for `/sitemap.xml` behind Cloudflare even when
browsers get `200`. Prefer the extensionless URL:

1. Open [Google Search Console](https://search.google.com/search-console)
2. Property: `https://onlinespinwheel.fun` (Domain property or apex URL-prefix)
3. **Sitemaps** → remove any old failed rows (`sitemap.xml` that still says Couldn't fetch)
4. Add **exactly**: `sitemap`  
   Full URL: `https://onlinespinwheel.fun/sitemap`
5. If that still fails within 24h, also add: `sitemap.txt`
6. Do **not** submit child files (`pages-sitemap.xml`, etc.) unless debugging

`robots.txt` lists `/sitemap`, `/sitemap.xml`, and `/sitemap.txt` (same URL set).

## Request indexing (URL Inspection)

- `/`
- `/all-spin-wheels`
- `/random-name-picker-wheel`
- `/yes-or-no-wheel`
- `/about-us`
- `/author/raja-jahangir`

## If status is still "Couldn't fetch"

1. Confirm live: `curl.exe -sI https://onlinespinwheel.fun/sitemap`
   - Expect `200`, `Content-Type: application/xml`, body starts with `<?xml`, **no** HTML
2. Confirm text fallback: `curl.exe -sI https://onlinespinwheel.fun/sitemap.txt`
3. Cloudflare: [CLOUDFLARE_SEO.md](./CLOUDFLARE_SEO.md) — Bot Fight Mode off / verified bots allow; WAF skip for `/sitemap`
4. Purge entire Cloudflare cache, then resubmit
5. Wait 24–48h after a clean fetch (GSC caches failures on the same URL)
