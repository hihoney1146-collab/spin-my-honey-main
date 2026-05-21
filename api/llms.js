import { buildLlmsTxt } from "../scripts/seo-routes.mjs";

export default function handler(_req, res) {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.setHeader("Cache-Control", "public, max-age=3600, s-maxage=86400");
  res.status(200).send(buildLlmsTxt());
}
