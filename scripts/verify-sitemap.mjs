#!/usr/bin/env node
/**
 * Post-deploy: validate sitemap index + child sitemaps (GSC compatibility).
 */
const SITE = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";

const SITEMAPS = [
  { path: "/sitemap.xml", kind: "index" },
  { path: "/pages-sitemap.xml", kind: "urlset" },
  { path: "/blog-sitemap.xml", kind: "urlset" },
  { path: "/wheels-sitemap.xml", kind: "urlset" },
  { path: "/images-sitemap.xml", kind: "image" },
];

let failed = 0;

for (const { path, kind } of SITEMAPS) {
  const url = `${SITE}${path}`;
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = await res.text();
    const ct = res.headers.get("content-type") || "";

    if (!res.ok) {
      console.error(`FAIL ${path}: HTTP ${res.status}`);
      failed++;
      continue;
    }
    if (!ct.includes("xml")) {
      console.error(`FAIL ${path}: Content-Type "${ct}" (expected XML)`);
      failed++;
      continue;
    }
    if (!body.trimStart().startsWith("<?xml")) {
      console.error(`FAIL ${path}: body is not XML`);
      console.error(body.slice(0, 120));
      failed++;
      continue;
    }

    if (kind === "index" && !body.includes("<sitemapindex")) {
      console.error(`FAIL ${path}: expected sitemap index`);
      failed++;
      continue;
    }
    if (kind === "urlset" && !body.includes("<urlset")) {
      console.error(`FAIL ${path}: expected urlset`);
      failed++;
      continue;
    }
    if (kind === "image" && !body.includes("image:image")) {
      console.warn(`WARN ${path}: no image:image entries (blog images may be missing pre-build)`);
    }

    const locs =
      kind === "index"
        ? (body.match(/<sitemap>/g) || []).length
        : (body.match(/<loc>/g) || []).length;
    console.log(`OK  ${url} (${locs} ${kind === "index" ? "child sitemaps" : "URLs"})`);
  } catch (err) {
    console.error(`FAIL ${path}: ${err.message}`);
    failed++;
  }
}

if (failed > 0) process.exit(1);
console.log("\nAll sitemap endpoints validated.");
