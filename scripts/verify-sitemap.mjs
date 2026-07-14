#!/usr/bin/env node
/**
 * Post-deploy: validate root + child sitemaps (GSC compatibility).
 */
const SITE = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";

const SITEMAPS = [
  { path: "/sitemap", kind: "urlset", minLocs: 50 },
  { path: "/sitemap.xml", kind: "urlset", minLocs: 50 },
  { path: "/sitemap.txt", kind: "text", minLocs: 50 },
  { path: "/pages-sitemap.xml", kind: "urlset", minLocs: 10 },
  { path: "/wheels-sitemap.xml", kind: "urlset", minLocs: 40 },
  { path: "/blog-sitemap.xml", kind: "urlset", minLocs: 1 },
  { path: "/images-sitemap.xml", kind: "image", minLocs: 1 },
];

const ROBOTS_CHECKS = [
  { pattern: /Disallow:\s*\/\s*$/m, failIf: true, label: "blanket Disallow /" },
  { pattern: /User-agent:\s*GPTBot[\s\S]*?Disallow:\s*\//i, failIf: true, label: "GPTBot blocked" },
  { pattern: /User-agent:\s*ClaudeBot[\s\S]*?Disallow:\s*\//i, failIf: true, label: "ClaudeBot blocked" },
];

let failed = 0;

console.log("=== Sitemaps ===\n");

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

    if (kind === "text") {
      if (!ct.includes("text/plain")) {
        console.error(`FAIL ${path}: Content-Type "${ct}" (expected text/plain)`);
        failed++;
        continue;
      }

      const urls = body
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean);
      const badLine = urls.find((line) => !line.startsWith(`${SITE}/`));

      if (badLine) {
        console.error(`FAIL ${path}: non-canonical URL line "${badLine}"`);
        failed++;
        continue;
      }
      if (urls.length < minLocs) {
        console.error(`FAIL ${path}: expected at least ${minLocs} entries, got ${urls.length}`);
        failed++;
        continue;
      }

      console.log(`OK  ${url}`);
      console.log(`    Content-Type: ${ct.split(";")[0]}`);
      console.log(`    Entries: ${urls.length}`);
      continue;
    }

    if (!ct.includes("xml")) {
      console.error(`FAIL ${path}: Content-Type "${ct}" (expected XML)`);
      failed++;
      continue;
    }
    if (!body.trimStart().startsWith("<?xml")) {
      console.error(`FAIL ${path}: body is not XML (HTML or empty?)`);
      console.error(body.slice(0, 120));
      failed++;
      continue;
    }

    if (kind === "index" && !body.includes("<sitemapindex")) {
      console.error(`FAIL ${path}: expected sitemap index`);
      failed++;
      continue;
    }
    if ((kind === "urlset" || kind === "image") && !body.includes("<urlset")) {
      console.error(`FAIL ${path}: expected urlset`);
      failed++;
      continue;
    }

    // CSP on crawler endpoints makes GSC flaky, warn loudly
    const csp = res.headers.get("content-security-policy");
    if (csp) {
      console.warn(`WARN ${path}: has Content-Security-Policy (prefer none on sitemaps)`);
    }

    const locs =
      kind === "index"
        ? (body.match(/<sitemap>/g) || []).length
        : (body.match(/<loc>/g) || []).length;

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
    if (!body.includes("Sitemap:")) {
      console.error("FAIL robots.txt: missing Sitemap directive");
      robotsOk = false;
      failed++;
    }
    if (!body.includes(`${SITE}/sitemap`)) {
      console.error("FAIL robots.txt: missing extensionless /sitemap");
      robotsOk = false;
      failed++;
    }
    if (robotsOk) {
      console.log(`OK  ${SITE}/robots.txt`);
    }
  }
} catch (err) {
  console.error(`FAIL robots.txt: ${err.message}`);
  failed++;
}

console.log("\n=== GSC checklist ===\n");
console.log(`1. PRIMARY submit in GSC: ${SITE}/sitemap  (extensionless, best with Cloudflare)`);
console.log(`2. Fallback: ${SITE}/sitemap.txt  (URL list, often succeeds when XML fails)`);
console.log(`3. Also listed: ${SITE}/sitemap.xml (same urlset as /sitemap)`);
console.log("4. Purge Cloudflare cache after deploy, remove old failed submissions, wait, resubmit");
console.log("5. Bing Webmaster: same /sitemap URL, then npm run indexnow\n");

if (failed > 0) {
  console.error(`${failed} check(s) failed.`);
  process.exit(1);
}
console.log("All SEO endpoint checks passed.");
