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
import {
  WHEEL_MERGE_REDIRECTS,
  NOINDEX_WHEEL_SLUGS,
  isWheelIndexableSlug,
} from "./wheel-index-policy.mjs";

/** Paths that 301 elsewhere, never list in llms.txt or IndexNow. */
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
  "/team/ceo",
  "/team/co-founder",
  "/team/content",
  "/team/social",
  ...Object.keys(WHEEL_MERGE_REDIRECTS).map((s) => `/${s}`),
]);

/** Edge + SPA redirect map (source path → destination path). One hop only. */
export const REDIRECT_MAP = {
  "/terms": "/terms-and-conditions",
  "/about": "/about-us",
  "/contact": "/contact-us",
  "/privacy": "/privacy-policy",
  "/spin-wheel-free": "/all-spin-wheels",
  "/spin-wheel-picker": "/all-spin-wheels",
  "/giveaway-winner-picker-wheel": "/winner-picker-wheel",
  "/exercise-spin-wheel": "/exercise-picker-wheel",
  "/date-night-idea-wheel": "/date-night-wheel",
  "/what-movie-should-i-watch-wheel": "/movie-picker-wheel",
  "/zodiac-sign-wheel-game": "/zodiac-sign-wheel",
  "/zodiac-wheel-dates": "/zodiac-sign-wheel",
  "/zodiac-wheel-planets": "/zodiac-sign-wheel",
  "/wheel-of-fortune-zodiac": "/zodiac-sign-wheel",
  "/egyptian-zodiac-wheel": "/zodiac-sign-wheel",
  "/team/ceo": "/author/armghana-zeeshan",
  "/team/co-founder": "/author/zoha-zeeshan",
  "/team/content": "/author/raja-jahangir",
  "/team/marketing": "/author/faisal-zahir",
  "/team/social": "/about-us",
  ...Object.fromEntries(
    Object.entries(WHEEL_MERGE_REDIRECTS).map(([from, to]) => [
      `/${from}`,
      `/${to}`,
    ]),
  ),
};

/** Phase 6 money pages + research (also in wheels sitemap when applicable). */
export const FEATURED_TOOL_PATHS = [
  "/raffle-wheel",
  "/classroom-spinner",
  "/wheel-of-names-alternative",
];

export { NOINDEX_WHEEL_SLUGS };

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
    add(r, "page");
  }

  for (const w of loadWheelRecords(root)) {
    if (w.slug && isWheelIndexableSlug(w.slug)) {
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
