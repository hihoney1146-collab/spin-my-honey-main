/**
 * Serves the primary XML sitemap at /sitemap and /sitemap.xml (vercel rewrites).
 * Extensionless /sitemap avoids Cloudflare mangling .xml responses for Googlebot.
 */
import {
  buildSitemapXml,
  buildTextSitemap,
} from "../scripts/seo-routes.mjs";

function wantsText(req) {
  const raw = req.url || "";
  try {
    const u = new URL(raw, "https://onlinespinwheel.fun");
    if (u.searchParams.get("format") === "txt") return true;
    if (u.pathname.endsWith(".txt")) return true;
  } catch {
    /* ignore */
  }
  return raw.includes("format=txt") || raw.includes("sitemap.txt");
}

export default function handler(req, res) {
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, must-revalidate");
  res.setHeader("X-Content-Type-Options", "nosniff");

  if (wantsText(req)) {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.status(200).send(buildTextSitemap());
    return;
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(buildSitemapXml());
}
