#!/usr/bin/env node
/** Post-deploy: sitemap.xml is valid XML and reachable for Google Search Console. */
const SITE = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";
const url = `${SITE}/sitemap.xml`;

try {
  const res = await fetch(url, { redirect: "follow" });
  const body = await res.text();
  const ct = res.headers.get("content-type") || "";

  if (!res.ok) {
    console.error(`FAIL: HTTP ${res.status}`);
    process.exit(1);
  }
  if (!ct.includes("xml")) {
    console.error(`FAIL: Content-Type is "${ct}" (expected application/xml)`);
    process.exit(1);
  }
  if (!body.trimStart().startsWith("<?xml")) {
    console.error("FAIL: body is not XML (got HTML or empty?)");
    console.error(body.slice(0, 200));
    process.exit(1);
  }
  const count = (body.match(/<loc>/g) || []).length;
  if (count < 1) {
    console.error("FAIL: no <loc> entries in sitemap");
    process.exit(1);
  }
  console.log(`OK  ${url}`);
  console.log(`    Content-Type: ${ct}`);
  console.log(`    URLs: ${count}`);
} catch (err) {
  console.error(`FAIL: ${err.message}`);
  process.exit(1);
}
