/**
 * Writes root urlset + child sitemaps, robots.txt, llms.txt to public/
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { updateRouteLastmodRegistry } from "./route-lastmod.mjs";
import {
  buildRobotsTxt,
  buildLlmsTxt,
  writeAllSitemapFiles,
  CHILD_SITEMAPS,
} from "./seo-routes.mjs";
import { collectBlogSlugs } from "./blog-data-sources.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const publicDir = path.join(root, "public");

updateRouteLastmodRegistry(root);

const { pageCount, blogCount, wheelCount } = writeAllSitemapFiles(root);

fs.writeFileSync(path.join(publicDir, "robots.txt"), buildRobotsTxt(), "utf8");
fs.writeFileSync(path.join(publicDir, "llms.txt"), buildLlmsTxt(root), "utf8");

const childNames = CHILD_SITEMAPS.map((c) => c.filename).join(", ");
const totalUrls = pageCount + blogCount + wheelCount;
const blogs = collectBlogSlugs(root).length;

console.log(`✅ sitemap.xml (sitemap index) + ${childNames}`);
console.log(
  `   URLs: ${totalUrls} (${pageCount} pages, ${blogs} blog, ${wheelCount} wheels) + images-sitemap`,
);
console.log("✅ robots.txt and llms.txt updated");
