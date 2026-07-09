#!/usr/bin/env node
/**
 * IndexNow ping — notifies Bing, Yandex, Seznam (and any IndexNow participant)
 * of the site's current URL set. Bing's index powers ChatGPT Search / Copilot.
 *
 * Run AFTER a production deploy so the key file and pages are live:
 *   npm run indexnow
 *
 * Key file: https://onlinespinwheel.fun/<INDEXNOW_KEY>.txt
 */
import path from "path";
import { fileURLToPath } from "url";
import { SITE } from "./seo-routes.mjs";
import { collectIndexableUrls } from "./route-registry.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const INDEXNOW_KEY =
  process.env.INDEXNOW_KEY || "0f9c2a7b8d4e4f1aa3c65b0d9e8f7a12";
const HOST = new URL(SITE).host;
const KEY_LOCATION = `${SITE}/${INDEXNOW_KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function main() {
  const urlList = collectIndexableUrls(root);
  const payload = {
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: KEY_LOCATION,
    urlList,
  };

  console.log(`IndexNow: submitting ${urlList.length} URLs for ${HOST}`);
  console.log(`Key location: ${KEY_LOCATION}`);

  if (process.env.DRY_RUN === "1") {
    console.log("DRY_RUN=1 — not sending. First 5 URLs:");
    console.log(urlList.slice(0, 5).join("\n"));
    return;
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(payload),
  });

  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow: OK (HTTP ${res.status}).`);
  } else {
    const body = await res.text().catch(() => "");
    console.error(`IndexNow: FAILED (HTTP ${res.status}). ${body}`);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(`IndexNow: error — ${err.message}`);
  process.exit(1);
});
