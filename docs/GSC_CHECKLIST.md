# Google Search Console checklist

After each production deploy:

```bash
npm run verify:sitemap
npm run verify:ads-txt
```

## Submit sitemap

1. Open [Google Search Console](https://search.google.com/search-console)
2. Property: `https://onlinespinwheel.fun`
3. **Sitemaps** → Add: `sitemap.xml` (not child files unless debugging)
4. Wait 24-48 hours for status to update

## Request indexing (URL Inspection)

- `/`
- `/all-spin-wheels`
- `/random-name-picker-wheel`
- `/yes-or-no-wheel`
- `/about-us`
- `/author/raja-jahangir`

## If status is "Couldn't fetch"

1. Confirm live XML: `curl -I https://onlinespinwheel.fun/sitemap.xml`
2. Fix Cloudflare: [CLOUDFLARE_SEO.md](./CLOUDFLARE_SEO.md)
3. Remove duplicate/wrong sitemap submissions in GSC
4. Retry URL Inspection on the sitemap URL
