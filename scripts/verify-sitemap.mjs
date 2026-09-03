#!/usr/bin/env node
/**
 * Post-deploy: validate canonical sitemap + child partitions (GSC compatibility).
 */
const SITE = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";

const SITEMAPS = [
  { path: "/sitemap.xml", kind: "urlset", minLocs: 35 },
  { path: "/pages-sitemap", kind: "urlset", minLocs: 10 },
  { path: "/pages-sitemap.xml", kind: "urlset", minLocs: 10 },
  { path: "/wheels-sitemap", kind: "urlset", minLocs: 15 },
  { path: "/wheels-sitemap.xml", kind: "urlset", minLocs: 15 },
  { path: "/blog-sitemap", kind: "urlset", minLocs: 1 },
  { path: "/blog-sitemap.xml", kind: "urlset", minLocs: 1 },
  { path: "/images-sitemap", kind: "image", minLocs: 1 },
  { path: "/images-sitemap.xml", kind: "image", minLocs: 1 },
];

const LEGACY_REDIRECTS = [
  { path: "/sitemap", target: "/sitemap.xml" },
  { path: "/sitemap.txt", target: "/sitemap.xml" },
  { path: "/sitemap-index.xml", target: "/sitemap.xml" },
];

const ROBOTS_CHECKS = [
  { pattern: /Disallow:\s*\/\s*$/m, failIf: true, label: "blanket Disallow /" },
  { pattern: /User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//i, failIf: true, label: "GPTBot blocked" },
  { pattern: /User-agent:\s*ClaudeBot[\s\S]*?Disallow:\s*\//i, failIf: true, label: "ClaudeBot blocked" },
];

let failed = 0;

console.log("=== Canonical sitemap ===\n");

for (const { path, kind, minLocs } of SITEMAPS) {
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
    if (body.includes("<!DOCTYPE html") || body.includes("<html")) {
      console.error(`FAIL ${path}: response looks like HTML (SPA fallback?)`);
      failed++;
      continue;
    }

    if (!ct.includes("xml")) {
      console.error(`FAIL ${path}: Content-Type "${ct}" (expected application/xml)`);
      failed++;
      continue;
    }
    if (!body.trimStart().startsWith("<?xml")) {
      console.error(`FAIL ${path}: body is not XML (HTML or empty?)`);
      console.error(body.slice(0, 120));
      failed++;
      continue;
    }

    if ((kind === "urlset" || kind === "image") && !body.includes("<urlset")) {
      console.error(`FAIL ${path}: expected urlset`);
      failed++;
      continue;
    }

    const csp = res.headers.get("content-security-policy");
    if (csp) {
      console.warn(`WARN ${path}: has Content-Security-Policy (prefer none on sitemaps)`);
    }

    const locs = (body.match(/<loc>/g) || []).length;
    if (locs < minLocs) {
      console.error(`FAIL ${path}: expected at least ${minLocs} entries, got ${locs}`);
      failed++;
      continue;
    }

    console.log(`OK  ${url}`);
    console.log(`    Content-Type: ${ct.split(";")[0]}`);
    console.log(`    Entries: ${locs}`);
  } catch (err) {
    console.error(`FAIL ${path}: ${err.message}`);
    failed++;
  }
}

console.log("\n=== Legacy sitemap redirects ===\n");

for (const { path, target } of LEGACY_REDIRECTS) {
  try {
    const res = await fetch(`${SITE}${path}`, { redirect: "manual" });
    const location = res.headers.get("location") || "";
    if (res.status !== 301 && res.status !== 308) {
      console.error(`FAIL ${path}: expected 301/308, got ${res.status}`);
      failed++;
      continue;
    }
    if (!location.includes(target)) {
      console.error(`FAIL ${path}: Location "${location}" (expected *${target}*)`);
      failed++;
      continue;
    }
    console.log(`OK  ${path} -> ${location}`);
  } catch (err) {
    console.error(`FAIL ${path}: ${err.message}`);
    failed++;
  }
}

console.log("\n=== robots.txt ===\n");

try {
  const res = await fetch(`${SITE}/robots.txt`, { redirect: "follow" });
  const body = await res.text();
  if (!res.ok) {
    console.error(`FAIL robots.txt: HTTP ${res.status}`);
    failed++;
  } else {
    let robotsOk = true;
    for (const { pattern, failIf, label } of ROBOTS_CHECKS) {
      if (pattern.test(body) === failIf) {
        console.error(`FAIL robots.txt: ${label}`);
        robotsOk = false;
        failed++;
      }
    }
    const sitemapLines = body.match(/^Sitemap:\s*.+$/gim) || [];
    if (sitemapLines.length !== 1) {
      console.error(`FAIL robots.txt: expected exactly 1 Sitemap line, got ${sitemapLines.length}`);
      robotsOk = false;
      failed++;
    } else if (!sitemapLines[0].includes(`${SITE}/sitemap.xml`)) {
      console.error(`FAIL robots.txt: Sitemap line must be ${SITE}/sitemap.xml`);
      robotsOk = false;
      failed++;
    }
    if (robotsOk) {
      console.log(`OK  ${SITE}/robots.txt`);
      console.log(`    ${sitemapLines[0]?.trim()}`);
    }
  }
} catch (err) {
  console.error(`FAIL robots.txt: ${err.message}`);
  failed++;
}

console.log("\n=== GSC checklist ===\n");
console.log(`1. Submit in GSC: ${SITE}/sitemap.xml`);
console.log("2. Remove legacy /sitemap, /sitemap.txt, /sitemap-index.xml rows from GSC");
console.log("3. Purge Cloudflare cache for /sitemap.xml, /robots.txt, /ads.txt after deploy");
console.log("4. Bing Webmaster: same /sitemap.xml URL, then npm run indexnow\n");

if (failed > 0) {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
console.log("All SEO endpoint checks passed.");
