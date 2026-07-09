import wheelPagesData from "@/generated/wheelPages.json";

export type WheelFaq = {
  question: string;
  answer: string;
};

export type WheelPageRecord = {
  slug: string;
  keywordPrimary: string;
  keywordSecondary: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  howToUse: string;
  category: string;
  wheelOptions: string[];
  faqs: WheelFaq[];
  lastUpdated?: string;
};

/**
 * Committed content-review date for wheel pages that don't carry a per-row
 * "Last Updated" value. This is a real, stable date (the Phase 4 content
 * overhaul), not the build date, so it stays consistent across rebuilds.
 */
export const WHEEL_CONTENT_LAST_UPDATED = "2026-07-08";

const pages = wheelPagesData as WheelPageRecord[];

const bySlug = new Map<string, WheelPageRecord>();
for (const p of pages) {
  if (p.slug) bySlug.set(p.slug, p);
}

export function getAllWheelSlugs(): string[] {
  return pages.map((p) => p.slug).filter(Boolean);
}

export function getWheelPageBySlug(slug: string | undefined): WheelPageRecord | null {
  if (!slug) return null;
  return bySlug.get(slug) ?? null;
}

/** All programmatic wheel records (CSV order). */
export function getAllWheelRecords(): WheelPageRecord[] {
  return pages.slice();
}

/** Same category first, then others; excludes current slug. */
export function getRelatedWheelPages(
  slug: string,
  limit: number
): WheelPageRecord[] {
  const current = bySlug.get(slug);
  if (!current) return [];
  const others = pages.filter((p) => p.slug !== slug);
  const sameCat = others.filter((p) => p.category === current.category);
  const diffCat = others.filter((p) => p.category !== current.category);
  return [...sameCat, ...diffCat].slice(0, limit);
}

export type WheelCategoryGroup = {
  category: string;
  items: WheelPageRecord[];
};

/**
 * All wheels from CSV (via wheelPages.json), grouped by Category.
 * Categories sorted A–Z; "Other" last. Wheels within a category sorted by primary keyword.
 */
export function getWheelsGroupedByCategory(): WheelCategoryGroup[] {
  const records = getAllWheelRecords().filter((p) => p.slug);
  const map = new Map<string, WheelPageRecord[]>();
  for (const p of records) {
    const raw = (p.category ?? "").trim();
    const cat = raw.length > 0 ? raw : "Other";
    if (!map.has(cat)) map.set(cat, []);
    map.get(cat)!.push(p);
  }
  for (const [, items] of map) {
    items.sort((a, b) =>
      (a.keywordPrimary || a.slug).localeCompare(b.keywordPrimary || b.slug, undefined, {
        sensitivity: "base",
      }),
    );
  }
  const groups = [...map.entries()].map(([category, items]) => ({ category, items }));
  groups.sort((a, b) => {
    if (a.category === "Other") return 1;
    if (b.category === "Other") return -1;
    return a.category.localeCompare(b.category, undefined, { sensitivity: "base" });
  });
  return groups;
}
