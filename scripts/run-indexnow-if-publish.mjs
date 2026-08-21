#!/usr/bin/env node
/**
 * Ping IndexNow after production publish only (never preview or local).
 * Override for a one-off: INDEXNOW_PUBLISH=1.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const shouldRun =
  process.env.VERCEL_ENV === "production" ||
  process.env.INDEXNOW_PUBLISH === "1";

if (!shouldRun) {
  console.log(
    "IndexNow: skipped (runs on Vercel production only, or set INDEXNOW_PUBLISH=1).",
  );
  process.exit(0);
}

const child = spawn(process.execPath, ["scripts/indexnow-ping.mjs"], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code) => process.exit(code ?? 0));
