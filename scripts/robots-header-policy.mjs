/**
 * Paths that must NEVER carry X-Robots-Tag: noindex (crawlers + indexable surfaces).
 */
import { NOINDEX_WHEEL_SLUGS } from "./wheel-index-policy.mjs";

export { NOINDEX_WHEEL_SLUGS };

export const ROOT_CRAWLER_PATHS = [
  "/ads.txt",
  "/robots.txt",
  "/llms.txt",
  "/sitemap.xml",
  "/pages-sitemap",
  "/pages-sitemap.xml",
  "/wheels-sitemap",
  "/wheels-sitemap.xml",
  "/blog-sitemap",
  "/blog-sitemap.xml",
  "/images-sitemap",
  "/images-sitemap.xml",
];

/** Leftover guide URLs — noindex via meta + optional header. */
export const LEGACY_NOINDEX_PATHS = [
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
];

/** Shell blog posts — noindex until expanded. */
export const NOINDEX_BLOG_SLUGS = [
  "random-name-picker-fair-fun-easy",
  "fun-ways-decide-where-to-eat-couples",
  "virtual-secret-santa-online",
];

/** All routes that must carry noindex (meta and/or X-Robots-Tag). */
export function collectNoindexPaths() {
  return [
    ...NOINDEX_WHEEL_SLUGS.map((s) => `/${s}`),
    ...LEGACY_NOINDEX_PATHS,
    ...NOINDEX_BLOG_SLUGS.map((s) => `/blog/${s}`),
    "/result/test",
    "/embed/random-name-picker-wheel",
  ];
}

/** Sample paths audited on every build (static + optional live fetch). */
export function auditSamplePaths(indexablePath = "/abcd-spin-wheel") {
  return [
    ...ROOT_CRAWLER_PATHS.filter((p) =>
      ["/ads.txt", "/robots.txt", "/sitemap.xml", "/llms.txt"].includes(p),
    ),
    "/",
    indexablePath,
    "/random-country-wheel",
    "/result/test",
    "/embed/random-name-picker-wheel",
  ];
}
