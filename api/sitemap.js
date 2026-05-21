import { buildSitemapXml } from "../scripts/seo-routes.mjs";

export default function handler(_req, res) {
  const xml = buildSitemapXml();
  res.setHeader("Content-Type", "application/xml; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(xml);
}
