/**
 * AdSense Phase C+ wheel index policy — single source of truth.
 * MERGE sources 301 away; NOINDEX stay live with robots noindex,follow and
 * are excluded from sitemaps / llms.txt / IndexNow.
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
];

/** All merges (Phase C + deferred hat after name-picker Tier 1). */
export const WHEEL_MERGE_REDIRECTS = {
  "prize-wheel": "raffle-wheel",
  "instagram-wheel-picker": "winner-picker-wheel",
  "fast-food-wheel": "dinner-picker-wheel",
  "horror-movie-picker-wheel": "movie-picker-wheel",
  "daily-horoscope-wheel": "zodiac-sign-wheel",
  "pick-out-of-a-hat-generator": "random-name-picker-wheel",
};

export const NOINDEX_WHEEL_SET = new Set(NOINDEX_WHEEL_SLUGS);
export const WHEEL_MERGE_SET = new Set(Object.keys(WHEEL_MERGE_REDIRECTS));

export function isWheelIndexableSlug(slug) {
  if (!slug) return false;
  if (NOINDEX_WHEEL_SET.has(slug)) return false;
  if (WHEEL_MERGE_SET.has(slug)) return false;
  return true;
}

export function wheelRobotsDirective(slug) {
  if (NOINDEX_WHEEL_SET.has(slug)) return "noindex, follow";
  return undefined;
}
