import fs from "fs";
import path from "path";
import { buildSitemapXml } from "../scripts/seo-routes.mjs";

export default function handler(_req, res) {
  const staticSitemapPath = path.join(process.cwd(), "public", "sitemap.xml");
  const xml = fs.existsSync(staticSitemapPath)
    ? fs.readFileSync(staticSitemapPath, "utf8")
    : buildSitemapXml();

  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("X-Robots-Tag", "index, follow");
  res.status(200).send(xml);
}
