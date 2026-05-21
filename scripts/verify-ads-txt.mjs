#!/usr/bin/env node
/** Post-deploy check: ads.txt is reachable and contains the expected publisher line. */
const SITE = process.env.SITE_ORIGIN || "https://onlinespinwheel.fun";
const EXPECTED =
  "google.com, pub-2823129698767735, DIRECT, f08c47fec0942fa0";

const urls = [`${SITE}/ads.txt`, `https://www.onlinespinwheel.fun/ads.txt`];

let failed = 0;

for (const url of urls) {
  try {
    const res = await fetch(url, { redirect: "follow" });
    const body = (await res.text()).trim();
    if (!res.ok) {
      console.error(`FAIL ${url}: HTTP ${res.status}`);
      failed++;
      continue;
    }
    if (!body.includes(EXPECTED)) {
      console.error(`FAIL ${url}: body does not contain publisher line`);
      console.error(`  Got: ${body.slice(0, 120)}`);
      failed++;
      continue;
    }
    console.log(`OK  ${url}`);
  } catch (err) {
    console.error(`FAIL ${url}: ${err.message}`);
    failed++;
  }
}

process.exit(failed > 0 ? 1 : 0);
