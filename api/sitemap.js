/**
 * Serves the primary XML sitemap at /sitemap and /sitemap.xml (vercel rewrites).
 * Extensionless /sitemap prefers the static public/sitemap file on Vercel; this
 * handler is the fallback and always returns the prebuilt full urlset.
 */
import { SITEMAP_XML, SITEMAP_TXT } from "./sitemap-payload.js";

const EMPTY_URLSET = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
</urlset>
`;

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

    if (wantsText(req)) {
      const txt =
        typeof SITEMAP_TXT === "string" && SITEMAP_TXT.includes("https://onlinespinwheel.fun")
          ? SITEMAP_TXT
          : "";
      if (!txt) {
        console.error("[sitemap] SITEMAP_TXT missing or empty — payload build failed?");
        res.status(503);
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        res.send("Sitemap temporarily unavailable\n");
        return;
      }
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.status(200).send(txt);
      return;
    }

    if (!isValidUrlset(SITEMAP_XML)) {
      console.error(
        "[sitemap] SITEMAP_XML missing, empty urlset, or no <loc> entries — refusing empty sitemap",
      );
      res.status(503);
      res.setHeader("Content-Type", "application/xml; charset=utf-8");
      // Valid XML so clients don't treat the body as HTML, but 503 so GSC retries
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
