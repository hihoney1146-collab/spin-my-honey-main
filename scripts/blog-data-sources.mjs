import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const BLOG_DATA_FILES = ["blogPosts.ts", "blogPostsAdditional.ts"];

export function readBlogDataSources(root) {
  const dataDir = path.join(root, "src", "data");
  return BLOG_DATA_FILES.map((file) => path.join(dataDir, file)).filter((p) =>
    fs.existsSync(p),
  );
}

/** @returns {string[]} Indexed posts only (sitemap, llms). */
export function collectBlogSlugs(root) {
  return collectBlogPostsFull(root)
    .filter((p) => p.indexed !== false)
    .map((p) => p.slug);
}

/** @returns {{ slug: string; updated: string }[]} Indexed posts only */
export function collectBlogPostsMeta(root) {
  return collectBlogPostsFull(root)
    .filter((p) => p.indexed !== false)
    .map((p) => ({
      slug: p.slug,
      updated: p.updated ?? new Date().toISOString().slice(0, 10),
    }));
}

/**
 * Extract a top-level array literal `<name>... = [ ... ]` from a TS/JS source,
 * correctly skipping brackets that appear inside strings, template literals, and
 * comments. Returns the literal text including the outer brackets, or null.
 */
function extractArrayLiteral(src, name) {
  const declRe = new RegExp(`${name}\\s*(?::[^=]+)?=\\s*\\[`);
  const declMatch = declRe.exec(src);
  if (!declMatch) return null;
  const start = declMatch.index + declMatch[0].length - 1; // index of '['

  let depth = 0;
  let i = start;
  let inStr = null; // '"' | "'" | '`'
  for (; i < src.length; i++) {
    const ch = src[i];
    const prev = src[i - 1];

    if (inStr) {
      if (ch === "\\") {
        i++; // skip escaped char
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }

    // line comment
    if (ch === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i);
      if (nl === -1) break;
      i = nl;
      continue;
    }
    // block comment
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

/**
 * Extract a top-level object literal starting at `startIndex` (must point to `{`).
 */
function extractBracedLiteral(src, startIndex) {
  let depth = 0;
  let i = startIndex;
  let inStr = null;
  for (; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i);
      if (nl === -1) break;
      i = nl;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === "{") depth++;
    else if (ch === "}") {
      depth--;
      if (depth === 0) return src.slice(startIndex, i + 1);
    }
  }
  return null;
}

/** Split a `[...]` literal into top-level comma-separated element strings. */
function splitArrayElements(arrayLiteral) {
  const inner = arrayLiteral.slice(1, -1);
  const elements = [];
  let depth = 0;
  let start = 0;
  let inStr = null;
  for (let i = 0; i < inner.length; i++) {
    const ch = inner[i];
    if (inStr) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "/" && inner[i + 1] === "/") {
      const nl = inner.indexOf("\n", i);
      if (nl === -1) break;
      i = nl;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === "{" || ch === "[") depth++;
    else if (ch === "}" || ch === "]") depth--;
    else if (ch === "," && depth === 0) {
      elements.push(inner.slice(start, i).trim());
      start = i + 1;
    }
  }
  const tail = inner.slice(start).trim();
  if (tail) elements.push(tail);
  return elements;
}

function loadBlogPostExportsFromFile(filePath, exportsByName) {
  if (!fs.existsSync(filePath)) return;
  const src = fs.readFileSync(filePath, "utf8");
  const re = /export\s+const\s+(\w+)\s*:\s*BlogPost\s*=\s*\{/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    const name = m[1];
    const start = m.index + m[0].length - 1;
    const literal = extractBracedLiteral(src, start);
    if (!literal) continue;
    try {
      // eslint-disable-next-line no-new-func
      const post = new Function(`"use strict";return (${literal});`)();
      if (post?.slug) exportsByName.set(name, post);
    } catch (err) {
      console.warn(`⚠️  Could not parse BlogPost export ${name}: ${err.message}`);
    }
  }
}

/**
 * Load full BlogPost objects from blogPosts.ts (import references + inline literals),
 * blogPostsDrafts.ts, and blogContent/*.ts.
 * @returns {import('../src/data/blogTypes').BlogPost[]}
 */
export function collectBlogPostsFull(root) {
  const exportsByName = new Map();
  const dataDir = path.join(root, "src", "data");

  loadBlogPostExportsFromFile(path.join(dataDir, "blogPostsDrafts.ts"), exportsByName);
  const contentDir = path.join(dataDir, "blogContent");
  if (fs.existsSync(contentDir)) {
    for (const name of fs.readdirSync(contentDir)) {
      if (name.endsWith(".ts")) {
        loadBlogPostExportsFromFile(path.join(contentDir, name), exportsByName);
      }
    }
  }

  const posts = [];
  const seen = new Set();

  function pushPost(post) {
    if (!post?.slug || seen.has(post.slug)) return;
    seen.add(post.slug);
    posts.push(post);
  }

  for (const filePath of readBlogDataSources(root)) {
    const src = fs.readFileSync(filePath, "utf8");
    const base = path.basename(filePath);
    const varNames = {
      "blogPosts.ts": "blogPosts",
      "blogPostsAdditional.ts": "additionalBlogPosts",
    };
    const name = varNames[base] || "blogPosts";
    const literal = extractArrayLiteral(src, name);
    if (!literal) continue;

    for (const el of splitArrayElements(literal)) {
      const trimmed = el.trim();
      if (trimmed.startsWith("{")) {
        try {
          // eslint-disable-next-line no-new-func
          const post = new Function(`"use strict";return (${trimmed});`)();
          pushPost(post);
        } catch {
          /* inline object parse failed — skip */
        }
        continue;
      }
      const ident = trimmed.match(/^([a-zA-Z_$][\w$]*)$/);
      if (ident && exportsByName.has(ident[1])) {
        pushPost(exportsByName.get(ident[1]));
      }
    }
  }

  if (posts.length === 0) {
    for (const post of exportsByName.values()) pushPost(post);
  }

  return posts;
}

/** @returns {import('./static-page-meta.mjs').RouteMeta[]} */
export function collectBlogRouteMeta(root, { canonicalUrl, SITE }) {
  return collectBlogPostsFull(root).map((post) => ({
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.metaDescription,
    ogType: "article",
    robots: post.indexed === false ? "noindex, follow" : undefined,
    jsonLd:
      post.indexed === false
        ? undefined
        : {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title.split("|")[0].trim(),
            description: post.metaDescription,
            url: canonicalUrl(`/blog/${post.slug}`),
            datePublished: `${post.published ?? post.updated}T12:00:00`,
            dateModified: `${post.updated}T12:00:00`,
            author: {
              "@type": "Person",
              "@id": `${SITE}/team/content#person`,
              name: "Raja Jahangir",
              url: `${SITE}/team/content`,
            },
            publisher: {
              "@type": "Organization",
              "@id": `${SITE}/#organization`,
              name: "Online Spin Wheel",
              url: SITE,
              logo: `${SITE}/logo.png`,
            },
          },
  }));
}
