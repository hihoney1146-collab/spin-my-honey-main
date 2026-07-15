/**
 * Serves the primary XML sitemap at /sitemap and /sitemap.xml (vercel rewrites).
 * Extensionless /sitemap prefers the static public/sitemap file on Vercel; this
 * handler is the fallback and always returns the prebuilt full urlset.
 */
import { SITEMAP_XML, SITEMAP_TXT } from "./sitemap-payload.js";

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
    res.status(200).send(SITEMAP_TXT);
    return;
  }

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.status(200).send(SITEMAP_XML);
}
