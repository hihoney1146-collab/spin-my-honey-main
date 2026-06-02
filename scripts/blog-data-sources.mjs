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
          publisher: {
            "@type": "Organization",
            name: "Online Spin Wheel",
            url: SITE,
          },
        },
      });
    }
  }
  return posts;
}
