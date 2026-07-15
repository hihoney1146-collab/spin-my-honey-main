#!/usr/bin/env node
/**
 * Phase 7.1 — axe-core accessibility audit (WCAG 2.1 AA).
 *
 * Spins up Playwright against the Vite preview server, runs @axe-core/playwright
 * on the required page set, and fails if any critical/serious violations remain.
 *
 * Usage (after build): node scripts/audit-a11y.mjs
 * Optional: AUDIT_A11Y_BASE=http://127.0.0.1:4173 node scripts/audit-a11y.mjs
 */
import { createRequire } from "module";
import { chromium } from "playwright";
import { spawn } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const require = createRequire(import.meta.url);
const AxeBuilder = require("@axe-core/playwright").default;

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const BASE = process.env.AUDIT_A11Y_BASE || "http://127.0.0.1:4173";
const PORT = Number(new URL(BASE).port || 4173);

const PAGES = [
  { path: "/", label: "homepage" },
  { path: "/random-name-picker-wheel", label: "wheel: random-name-picker" },
  { path: "/yes-or-no-wheel", label: "wheel: yes-or-no" },
  {
    path: "/dinner-picker-wheel?stream=1",
    label: "wheel: dinner-picker (streamer mode)",
  },
  { path: "/all-spin-wheels", label: "hub" },
  {
    path: "/blog/best-icebreaker-games-office-meetings",
    label: "blog post",
  },
  { path: "/about-us", label: "about" },
  { path: "/contact-us", label: "contact" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, attempts = 60) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
      if (res.ok || res.status === 404) return;
    } catch {
      /* retry */
    }
    await sleep(500);
  }
  throw new Error(`Preview server did not become ready at ${url}`);
}

async function ensurePreview() {
  if (process.env.AUDIT_A11Y_BASE) {
    await waitForServer(BASE);
    return null;
  }
  if (!fs.existsSync(dist)) {
    throw new Error("dist/ missing — run `npm run build` first");
  }
  const viteBin = path.join(root, "node_modules", "vite", "bin", "vite.js");
  const child = spawn(
    process.execPath,
    [viteBin, "preview", "--host", "127.0.0.1", "--port", String(PORT)],
    {
      cwd: root,
      stdio: "pipe",
      env: { ...process.env },
    },
  );
  await waitForServer(BASE);
  return child;
}

function formatViolation(v) {
  const nodes = v.nodes
    .slice(0, 5)
    .map((n) => `    - ${n.target.join(" ")}: ${n.failureSummary?.split("\n")[0] || n.html?.slice(0, 80)}`)
    .join("\n");
  return `  [${v.impact}] ${v.id}: ${v.help}\n${nodes}`;
}

async function scanPage(context, pageDef) {
  const page = await context.newPage();
  const url = `${BASE}${pageDef.path}`;
  await page.goto(url, { waitUntil: "networkidle", timeout: 60_000 });
  // Allow client hydration / cookie banner settle
  await page.waitForTimeout(800);

  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze();

  const blocking = results.violations.filter(
    (v) => v.impact === "critical" || v.impact === "serious",
  );
  const moderate = results.violations.filter(
    (v) => v.impact === "moderate" || v.impact === "minor",
  );

  await page.close();
  return {
    label: pageDef.label,
    path: pageDef.path,
    blocking,
    moderate,
    passes: results.passes.length,
  };
}

async function main() {
  let preview = null;
  try {
    preview = await ensurePreview();
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const rows = [];
    for (const def of PAGES) {
      process.stdout.write(`Scanning ${def.path} ... `);
      const row = await scanPage(context, def);
      const n = row.blocking.length;
      console.log(n === 0 ? "OK" : `FAIL (${n} critical/serious)`);
      rows.push(row);
    }
    await browser.close();

    const reportPath = path.join(root, "docs", "A11Y_AUDIT.md");
    const lines = [
      "# Accessibility Audit (axe-core)",
      "",
      `Generated ${new Date().toISOString().slice(0, 10)} via \`scripts/audit-a11y.mjs\` (@axe-core/playwright).`,
      "",
      "Tags: wcag2a, wcag2aa, wcag21a, wcag21aa. Blocking = critical + serious only.",
      "",
      "| Page | Path | Critical/Serious | Moderate/Minor |",
      "|------|------|------------------|----------------|",
    ];
    let failCount = 0;
    for (const r of rows) {
      if (r.blocking.length) failCount++;
      lines.push(
        `| ${r.label} | \`${r.path}\` | **${r.blocking.length}** | ${r.moderate.length} |`,
      );
    }
    lines.push("");
    for (const r of rows) {
      if (!r.blocking.length && !r.moderate.length) continue;
      lines.push(`## ${r.label} (\`${r.path}\`)`);
      lines.push("");
      if (r.blocking.length) {
        lines.push("### Critical / serious");
        lines.push("```");
        for (const v of r.blocking) lines.push(formatViolation(v));
        lines.push("```");
        lines.push("");
      }
      if (r.moderate.length) {
        lines.push("### Moderate / minor (non-blocking)");
        lines.push("```");
        for (const v of r.moderate) lines.push(formatViolation(v));
        lines.push("```");
        lines.push("");
      }
    }
    lines.push(
      failCount === 0
        ? "**Result: PASS** — zero critical/serious violations on all scanned pages."
        : `**Result: FAIL** — ${failCount} page(s) still have critical/serious violations.`,
    );
    lines.push("");
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, lines.join("\n"), "utf8");
    console.log(`\nWrote ${path.relative(root, reportPath)}`);

    if (failCount > 0) {
      process.exitCode = 1;
      for (const r of rows) {
        if (!r.blocking.length) continue;
        console.error(`\n${r.label} (${r.path}):`);
        for (const v of r.blocking) console.error(formatViolation(v));
      }
    }
  } finally {
    if (preview) {
      preview.kill("SIGTERM");
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
