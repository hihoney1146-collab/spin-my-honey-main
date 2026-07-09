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

/** @returns {string[]} */
export function collectBlogSlugs(root) {
  const slugs = [];
  const seen = new Set();
  for (const filePath of readBlogDataSources(root)) {
    const src = fs.readFileSync(filePath, "utf8");
    const slugRe = /slug:\s*"([\w-]+)"/g;
    let match;
    while ((match = slugRe.exec(src)) !== null) {
      if (!seen.has(match[1])) {
        seen.add(match[1]);
        slugs.push(match[1]);
      }
    }
  }
  return slugs;
}

/** @returns {{ slug: string; updated: string }[]} ISO date YYYY-MM-DD per post */
export function collectBlogPostsMeta(root) {
  const posts = [];
  const seen = new Set();
  for (const filePath of readBlogDataSources(root)) {
    const src = fs.readFileSync(filePath, "utf8");
    const slugRe = /slug:\s*"([\w-]+)"/g;
    let match;
    while ((match = slugRe.exec(src)) !== null) {
      const slug = match[1];
      if (seen.has(slug)) continue;
      seen.add(slug);
      const slice = src.slice(match.index, match.index + 800);
      const updatedMatch = slice.match(/updated:\s*"([\d-]+)"/);
      posts.push({
        slug,
        updated: updatedMatch?.[1] ?? new Date().toISOString().slice(0, 10),
      });
    }
  }
  return posts;
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
 * Load full BlogPost objects (blocks, faqs, excerpt) from the data files.
 * The data is pure serializable literals, so we evaluate the extracted array in a
 * sandbox-free Function at build time (trusted, first-party source).
 * @returns {import('../src/data/blogTypes').BlogPost[]}
 */
export function collectBlogPostsFull(root) {
  const posts = [];
  const seen = new Set();
  const varNames = {
    "blogPosts.ts": "blogPosts",
    "blogPostsAdditional.ts": "additionalBlogPosts",
  };
  for (const filePath of readBlogDataSources(root)) {
    const src = fs.readFileSync(filePath, "utf8");
    const base = path.basename(filePath);
    const name = varNames[base] || "blogPosts";
    const literal = extractArrayLiteral(src, name);
    if (!literal) continue;
    let arr;
    try {
      // eslint-disable-next-line no-new-func
      arr = new Function(`"use strict";return (${literal});`)();
    } catch (err) {
      console.warn(`⚠️  Could not parse ${base}: ${err.message}`);
      continue;
    }
    for (const post of Array.isArray(arr) ? arr : []) {
      if (!post || !post.slug || seen.has(post.slug)) continue;
      seen.add(post.slug);
      posts.push(post);
    }
  }
  return posts;
}

/** @returns {import('./static-page-meta.mjs').RouteMeta[]} */
export function collectBlogRouteMeta(root, { canonicalUrl, SITE }) {
  const posts = [];
  for (const filePath of readBlogDataSources(root)) {
    const tsSource = fs.readFileSync(filePath, "utf8");
    const slugRe = /slug:\s*"([\w-]+)"/g;
    let m;
    while ((m = slugRe.exec(tsSource)) !== null) {
      const slug = m[1];
      const slice = tsSource.slice(m.index, m.index + 1500);
      const descMatch = slice.match(
        /metaDescription:\s*\n?\s*"([^"]*(?:\\.[^"]*)*)"/,
      );
      const description = descMatch
        ? descMatch[1].replace(/\\"/g, '"')
        : "Article on Online Spin Wheel.";
      const titleMatch = slice.match(/title:\s*\n?\s*"([^"]*(?:\\.[^"]*)*)"/);
      const title = titleMatch
        ? titleMatch[1].replace(/\\"/g, '"')
        : "Blog | Online Spin Wheel";
      const updatedMatch = slice.match(/updated:\s*"([\d-]+)"/);
      const publishedMatch = slice.match(/published:\s*"([\d-]+)"/);
      const updated =
        updatedMatch?.[1] ?? new Date().toISOString().slice(0, 10);
      const published = publishedMatch?.[1] ?? updated;
      posts.push({
        path: `/blog/${slug}`,
        title,
        description,
        ogType: "article",
        jsonLd: {
          "@context": "https://schema.org",
          "@type": "Article",
          headline: title.split("|")[0].trim(),
          description,
          url: canonicalUrl(`/blog/${slug}`),
          datePublished: `${published}T12:00:00`,
          dateModified: `${updated}T12:00:00`,
          author: {
            "@type": "Person",
            "@id": `${SITE}/author/raja-jahangir#person`,
            name: "Raja Jahangir",
            url: `${SITE}/author/raja-jahangir`,
          },
          publisher: {
            "@type": "Person",
            "@id": `${SITE}/author/raja-jahangir#person`,
            name: "Raja Jahangir",
            url: `${SITE}/author/raja-jahangir`,
          },
        },
      });
    }
  }
  return posts;
}
