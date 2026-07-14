#!/usr/bin/env node
/** Cross-platform crawler-access check (Phase 0.2). */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ORIGIN = process.env.ORIGIN || "https://onlinespinwheel.fun";
const USER_AGENTS = [
  "Googlebot/2.1 (+http://www.google.com/bot.html)",
  "Mediapartners-Google",
  "AdsBot-Google",
  "Bingbot",
  "GPTBot",
  "ClaudeBot",
  "PerplexityBot",
];
const PATHS = ["/", "/ads.txt", "/sitemap", "/sitemap.xml", "/robots.txt", "/llms.txt", "/about-us", "/yes-or-no-wheel"];

let fail = 0;
const lines = [`Crawler-access check against ${ORIGIN}`, "-".repeat(65)];

for (const ua of USER_AGENTS) {
  for (const p of PATHS) {
    const res = await fetch(`${ORIGIN}${p}`, { headers: { "User-Agent": ua }, redirect: "follow" });
    const flag = res.status !== 200 ? "   <-- NOT 200" : "";
    if (res.status !== 200) fail = 1;
    lines.push(`${ua.padEnd(45)} ${p.padEnd(16)} -> ${res.status}${flag}`);
  }
  lines.push("-".repeat(65));
}

lines.push(
  fail ? "FAIL: at least one request did not return 200." : "PASS: every crawler received 200 on every path.",
);
const out = lines.join("\n");
console.log(out);
fs.writeFileSync(path.join(root, "docs", "CRAWLER_ACCESS.txt"), out, "utf8");
process.exit(fail);
