/**
 * Client mirror of scripts/wheel-index-policy.mjs (keep in sync).
 * NOINDEX wheels stay routable; MERGE sources are handled via App/vercel redirects.
 */
export const NOINDEX_WHEEL_SLUGS = [
  "exercise-picker-wheel",
  "nfl-team-picker-wheel",
  "random-word-generator-wheel",
  "random-country-wheel",
  "random-animal-picker-wheel",
  "random-day-picker-wheel",
  "what-to-draw-wheel",
  "twister-spinner-online",
  "random-color-wheel",
  "family-game-night-picker-wheel",
  "bedtime-story-picker-wheel",
  "fortnite-drop-location-wheel",
  "roblox-game-picker-wheel",
  "truth-or-dare-spinner-online",
  "random-travel-destination-wheel",
  "random-hobby-generator-wheel",
] as const;

/** Phase C merges (hat deferred). */
export const WHEEL_MERGE_REDIRECTS: Record<string, string> = {
  "prize-wheel": "raffle-wheel",
  "instagram-wheel-picker": "winner-picker-wheel",
  "fast-food-wheel": "dinner-picker-wheel",
  "horror-movie-picker-wheel": "movie-picker-wheel",
  "daily-horoscope-wheel": "zodiac-sign-wheel",
  "pick-out-of-a-hat-generator": "random-name-picker-wheel",
};

export const NOINDEX_WHEEL_SET = new Set<string>(NOINDEX_WHEEL_SLUGS);
export const WHEEL_MERGE_SET = new Set(Object.keys(WHEEL_MERGE_REDIRECTS));

export function isNoindexWheelSlug(slug: string | undefined): boolean {
  return Boolean(slug && NOINDEX_WHEEL_SET.has(slug));
}

export function isMergedWheelSlug(slug: string | undefined): boolean {
  return Boolean(slug && WHEEL_MERGE_SET.has(slug));
}

export function wheelRobotsDirective(
  slug: string | undefined,
): string | undefined {
  return isNoindexWheelSlug(slug) ? "noindex, follow" : undefined;
}

/** Live hub listing excludes merge sources (they 301). Includes noindex tools users may still open. */
export function isHubListedWheelSlug(slug: string | undefined): boolean {
  return Boolean(slug && !isMergedWheelSlug(slug));
}

/** Indexed specialty wheel count after Phase C + hat merge. */
export const INDEXED_WHEEL_COUNT_PHASE_C = 21;

/** Target after all enrichments (same as post-hat merge). */
export const INDEXED_WHEEL_COUNT_TARGET = 21;
