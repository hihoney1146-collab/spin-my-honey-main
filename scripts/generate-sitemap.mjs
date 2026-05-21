/**
 * Writes public/sitemap.xml (build-time mirror of /api/sitemap for previews & fallbacks).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  buildSitemapXml,
  buildRobotsTxt,
  buildLlmsTxt,
  collectSitemapEntries,
} from "./seo-routes.mjs";
import { collectBlogSlugs } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const xml = buildSitemapXml(root);
fs.writeFileSync(path.join(root, "public", "sitemap.xml"), xml, "utf8");
fs.writeFileSync(path.join(root, "public", "robots.txt"), buildRobotsTxt(), "utf8");
fs.writeFileSync(path.join(root, "public", "llms.txt"), buildLlmsTxt(root), "utf8");
const urlCount = collectSitemapEntries(root).length;
const blogCount = collectBlogSlugs(root).length;
console.log(`✅ Sitemap written (${urlCount} URLs, ${blogCount} blog posts) → public/sitemap.xml`);
console.log("✅ robots.txt and llms.txt updated");
