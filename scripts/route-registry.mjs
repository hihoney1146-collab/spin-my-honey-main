/**
 * Single source of indexable routes for sitemap, llms.txt, and IndexNow.
 */
import { collectBlogSlugs } from "./blog-data-sources.mjs";
import {
  PAGES_SITEMAP_ROUTES,
  loadWheelRecords,
  getProjectRoot,
  SITE,
} from "./seo-routes.mjs";

/** Paths that 301 elsewhere — never list in llms.txt or IndexNow. */
export const REDIRECT_PATHS = new Set([
  "/terms",
  "/about",
  "/contact",
  "/privacy",
  "/spin-wheel-free",
  "/spin-wheel-picker",
  "/giveaway-winner-picker-wheel",
  "/exercise-spin-wheel",
  "/date-night-idea-wheel",
  "/what-movie-should-i-watch-wheel",
  "/zodiac-sign-wheel-game",
  "/zodiac-wheel-dates",
  "/zodiac-wheel-planets",
  "/wheel-of-fortune-zodiac",
  "/egyptian-zodiac-wheel",
]);

/** Phase 6 money pages + research (also in wheels sitemap when applicable). */
export const FEATURED_TOOL_PATHS = [
  "/raffle-wheel",
  "/prize-wheel",
  "/classroom-spinner",
  "/wheel-of-names-alternative",
];

/**
 * @param {string} [root]
 * @returns {{ path: string; kind: "page" | "wheel" | "blog"; label?: string; description?: string }[]}
 */
export function collectIndexableRoutes(root = getProjectRoot()) {
  const routes = [];
  const seen = new Set();

  function add(path, kind, meta = {}) {
    if (!path || REDIRECT_PATHS.has(path) || seen.has(path)) return;
    seen.add(path);
    routes.push({ path, kind, ...meta });
  }

  for (const r of PAGES_SITEMAP_ROUTES) {
    add(r.path, "page");
  }

  for (const w of loadWheelRecords(root)) {
    if (w.slug) {
      add(`/${w.slug}`, "wheel", {
        label: w.keywordPrimary || w.h1 || w.title || w.slug,
        description: (w.metaDescription || "").trim(),
      });
    }
  }

  for (const slug of collectBlogSlugs(root)) {
    add(`/blog/${slug}`, "blog");
  }

  return routes.sort((a, b) => a.path.localeCompare(b.path));
}

/** Absolute URLs for IndexNow. */
export function collectIndexableUrls(root = getProjectRoot()) {
  return collectIndexableRoutes(root).map((r) =>
    r.path === "/" ? `${SITE}/` : `${SITE}${r.path}`,
  );
}
