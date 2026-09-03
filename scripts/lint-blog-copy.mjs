/**
 * Phase 7 — reject AI-boilerplate strings in blog source files.
 * Also validates title/meta length, incomplete title endings, and stale tool names.
 * Run: npm run lint:blog-copy
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BLOG_DATA_FILES, collectBlogPostsFull } from "./blog-data-sources.mjs";
import {
  WHEEL_MERGE_REDIRECTS,
  NOINDEX_WHEEL_SLUGS,
} from "./wheel-index-policy.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const MAX_TITLE = 59;
const MAX_META = 160;
const MIN_META = 40;

/** Banned patterns — headings/openers that read as generic AI filler. */
const BANNED = [
  { pattern: /^\s*Understanding\s+/im, label: 'Heading/opener starting with "Understanding"' },
  { pattern: /^\s*Exploring\s+/im, label: 'Heading/opener starting with "Exploring"' },
  { pattern: /In today['']s fast-paced world/gi, label: '"In today\'s fast-paced world"' },
  { pattern: /In today['']s fast-paced corporate/gi, label: '"In today\'s fast-paced corporate"' },
  { pattern: /In today['']s fast-paced digital/gi, label: '"In today\'s fast-paced digital"' },
  { pattern: /Meet the Maker Behind Online Spin Wheel/g, label: '"Meet the Maker Behind Online Spin Wheel" boilerplate section' },
  { pattern: /Proudly Powered by/g, label: '"Proudly Powered by" footer leak' },
];

/** Title endings that suggest truncation mid-phrase. */
const INCOMPLETE_TITLE_END =
  /(?:\b(?:for|with|to|and|or|the|a|an|in|on|at|by|from|of|without)\s*|\d+\s*:\s*\d+\s*$|\d+\s*$)$/i;

const STALE_TOOL_SLUGS = new Set([
  ...Object.keys(WHEEL_MERGE_REDIRECTS),
  ...NOINDEX_WHEEL_SLUGS,
]);

function scanSourceFiles() {
  let failed = false;
  for (const file of [...BLOG_DATA_FILES, "blogPostsDrafts.ts"]) {
    const filePath = path.join(root, "src", "data", file);
    if (!fs.existsSync(filePath)) continue;
    const src = fs.readFileSync(filePath, "utf8");
    for (const { pattern, label } of BANNED) {
      if (pattern.test(src)) {
        console.error(`❌ ${file}: banned string — ${label}`);
        failed = true;
      }
    }
  }

  const contentDir = path.join(root, "src", "data", "blogContent");
  if (fs.existsSync(contentDir)) {
    for (const name of fs.readdirSync(contentDir)) {
      if (!name.endsWith(".ts")) continue;
      const src = fs.readFileSync(path.join(contentDir, name), "utf8");
      for (const { pattern, label } of BANNED) {
        if (pattern.test(src)) {
          console.error(`❌ blogContent/${name}: banned string — ${label}`);
          failed = true;
        }
      }
    }
  }
  return failed;
}

function auditPostMeta(post) {
  const issues = [];
  const title = String(post.title || "");
  const meta = String(post.metaDescription || "");
  const shortTitle = title.split("|")[0].trim();

  if (!title) issues.push("missing title");
  else if (title.length > MAX_TITLE) {
    issues.push(`title ${title.length} chars (max ${MAX_TITLE}): ${title}`);
  }
  if (INCOMPLETE_TITLE_END.test(shortTitle)) {
    issues.push(`title ends with incomplete phrase: "${shortTitle}"`);
  }
  if (!meta || meta.length < MIN_META) issues.push("missing/short meta description");
  else if (meta.length > MAX_META) {
    issues.push(`meta ${meta.length} chars (max ${MAX_META})`);
  }

  const body = JSON.stringify(post.blocks || []) + JSON.stringify(post.faqs || []);
  for (const slug of STALE_TOOL_SLUGS) {
    const slugRe = new RegExp(`\\b${slug.replace(/-/g, "[- ]")}\\b`, "i");
    const pathRe = new RegExp(`/${slug}\\b`);
    if (slugRe.test(body) || pathRe.test(body)) {
      issues.push(`references non-indexable or merged tool "/${slug}"`);
    }
  }
  if (/\bprize wheel\b/i.test(body) && !/\braffle wheel\b/i.test(body)) {
    issues.push('uses "prize wheel" without pointing to raffle wheel');
  }

  return issues;
}

function auditHeadingHierarchy(post) {
  const issues = [];
  let lastNumbered = 0;
  for (const block of post.blocks || []) {
    const h = block.heading;
    if (!h) continue;
    const num = h.match(/^(\d+)\.\s/);
    if (num) {
      const n = parseInt(num[1], 10);
      if (lastNumbered && n > lastNumbered + 1) {
        issues.push(`heading skips level: "${h}" after section ${lastNumbered}`);
      }
      lastNumbered = n;
    }
  }
  return issues;
}

let failed = scanSourceFiles();

const posts = collectBlogPostsFull(root);
for (const post of posts) {
  if (post.indexed === false) continue;
  const metaIssues = auditPostMeta(post);
  const headingIssues = auditHeadingHierarchy(post);
  for (const msg of [...metaIssues, ...headingIssues]) {
    console.error(`❌ blog/${post.slug}: ${msg}`);
    failed = true;
  }
}

if (failed) {
  console.error("\nBlog copy lint failed. Fix titles, meta, stale tools, or banned boilerplate.");
  process.exit(1);
}

console.log("✅ Blog copy lint passed (no banned AI-boilerplate strings).");
