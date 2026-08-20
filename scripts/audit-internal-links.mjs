#!/usr/bin/env node
/**
 * D.3: from dist HTML, count inlinks among indexable routes and flag
 * indexable pages that href noindex wheels, merge sources, or leftover guides.
 * /all-spin-wheels may link noindex wheels (labeled extras).
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { collectIndexableRoutes, REDIRECT_PATHS } from "./route-registry.mjs";
import {
  NOINDEX_WHEEL_SLUGS,
  WHEEL_MERGE_REDIRECTS,
} from "./wheel-index-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

const LEGACY_NOINDEX = new Set([
  "/how-to-use-spin-wheels-in-classrooms",
  "/how-to-create-fair-giveaways-with-spin-wheels",
  "/how-to-use-spin-wheels-for-team-building",
  "/how-to-organize-events-with-random-selection",
  "/how-to-make-decisions-faster-with-spin-wheels",
  "/tutorial-creating-your-first-spin-wheel",
  "/tutorial-customizing-spin-wheel-colors",
  "/tutorial-managing-spin-wheel-entries",
  "/tutorial-advanced-spin-wheel-features",
  "/case-study-corporate-event-using-spin-wheels",
]);

const NOINDEX_PATHS = new Set([
  ...NOINDEX_WHEEL_SLUGS.map((s) => `/${s}`),
  ...LEGACY_NOINDEX,
]);
const MERGE_PATHS = new Set(
  Object.keys(WHEEL_MERGE_REDIRECTS).map((s) => `/${s}`),
);

function htmlPathFor(routePath) {
  if (routePath === "/") return path.join(dist, "index.html");
  return path.join(dist, routePath.replace(/^\//, ""), "index.html");
}

function normalizeHref(href) {
  if (!href) return null;
  let h = href.trim();
  if (h.startsWith("https://onlinespinwheel.fun")) {
    h = h.slice("https://onlinespinwheel.fun".length) || "/";
  }
  if (!h.startsWith("/")) return null;
  h = h.split("#")[0].split("?")[0];
  if (h.length > 1 && h.endsWith("/")) h = h.slice(0, -1);
  return h || "/";
}

function extractHrefs(html) {
  const out = [];
  const re = /href=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const n = normalizeHref(m[1]);
    if (n) out.push(n);
  }
  return out;
}

if (!fs.existsSync(dist)) {
  console.error("dist/ missing; run the production build first.");
  process.exit(1);
}

const indexable = collectIndexableRoutes(root);
const indexableSet = new Set(indexable.map((r) => r.path));
const inlinks = new Map(indexable.map((r) => [r.path, new Set()]));
const leakIssues = [];

for (const route of indexable) {
  const file = htmlPathFor(route.path);
  if (!fs.existsSync(file)) {
    leakIssues.push(`missing HTML for indexable ${route.path}`);
    continue;
  }
  const hrefs = extractHrefs(fs.readFileSync(file, "utf8"));
  for (const href of hrefs) {
    if (indexableSet.has(href) && href !== route.path) {
      inlinks.get(href).add(route.path);
    }
    const isNoindex = NOINDEX_PATHS.has(href);
    const isMerge = MERGE_PATHS.has(href) || REDIRECT_PATHS.has(href);
    if (isMerge) {
      leakIssues.push(`${route.path} links to redirect/merge ${href}`);
    } else if (isNoindex && route.path !== "/all-spin-wheels") {
      leakIssues.push(`${route.path} links to noindex ${href}`);
    }
  }
}

const orphanIssues = [];
for (const [p, from] of inlinks) {
  if (from.size < 3) {
    orphanIssues.push(`${p} has ${from.size} inlink(s): ${[...from].join(", ") || "(none)"}`);
  }
}

const report = [
  "# Internal link mesh (D.3)",
  "",
  `Indexable routes: ${indexable.length}`,
  `Orphans (<3 inlinks): ${orphanIssues.length}`,
  `Leaks to noindex/redirect (hub extras allowed): ${leakIssues.length}`,
  "",
  "## Orphans",
  ...(orphanIssues.length ? orphanIssues.map((s) => `- ${s}`) : ["- none"]),
  "",
  "## Leaks",
  ...(leakIssues.length ? leakIssues.map((s) => `- ${s}`) : ["- none"]),
  "",
].join("\n");

fs.writeFileSync(path.join(root, "docs", "INTERNAL_LINK_AUDIT.md"), report);
console.log(report);

if (orphanIssues.length || leakIssues.length) process.exit(1);
console.log("**PASS**, every indexable route has ≥3 inlinks; no indexable page (except hub extras) links to noindex or redirect URLs.");
