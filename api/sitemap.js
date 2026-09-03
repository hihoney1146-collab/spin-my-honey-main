/**
 * Serves the canonical XML sitemap at /sitemap.xml (vercel rewrite).
 * Static public/sitemap.xml is preferred on Vercel; this handler is the fallback.
 */
import { SITEMAP_XML } from "./sitemap-payload.js";

const EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;

function isValidUrlset(xml) {
  return (
    typeof xml === "string" &&
    xml.includes("<urlset") &&
    xml.includes("<loc>") &&
    (xml.match(/<loc>/g) || []).length >= 1
  );
}

export default function handler(req, res) {
  try {
    res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400, must-revalidate");
    res.setHeader("X-Content-Type-Options", "nosniff");

    if (!isValidUrlset(SITEMAP_XML)) {
      console.error(
        "[sitemap] SITEMAP_XML missing, empty urlset, or no <loc> entries — refusing empty sitemap",
      );
      res.status(503);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      res.send(EMPTY_URLSET);
      return;
    }

    res.setHeader("Content-Type", "application/xml; charset=utf-8");
    res.status(200).send(SITEMAP_XML);
  } catch (err) {
    console.error("[sitemap] handler error:", err?.message || err);
    res.status(500);
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.send("Sitemap error\n");
  }
}
