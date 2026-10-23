import { getAllBlogPosts } from "@/data/blogPosts";
import { getWheelPageBySlug } from "@/lib/wheelPages";
import { isWheelIndexableSlug } from "@/data/wheelIndexPolicy";
import { ARMGHANA_AUTHOR, RAJA_AUTHOR, ZOHA_AUTHOR, FAISAL_AUTHOR } from "@/lib/teamAuthors";

export type SiteLinkItem = {
  to: string;
  label: string;
};

export const WHEEL_HUB_PATH = "/all-spin-wheels";

export const BLOG_INDEX_PATH = "/blog";

/** Footer / manifest links for published blog posts (derived from data). */
export function getBlogPostLinks(): SiteLinkItem[] {
  return getAllBlogPosts().map((p) => {
    const short = p.title.split("|")[0].trim();
    return {
      to: `${BLOG_INDEX_PATH}/${p.slug}`,
      label: short.length > 46 ? `${short.slice(0, 43)}…` : short,
    };
  });
}

export const toolLinks: SiteLinkItem[] = [
  { to: "/embed", label: "Embed widget" },
];

export const guideLinks: SiteLinkItem[] = [];

export const originalContentLinks: SiteLinkItem[] = [
  {
    to: "/spin-wheel-fairness-study",
    label: "Fairness study (100k spins)",
  },
  {
    to: "/press-kit",
    label: "Press kit and resources",
  },
  {
    to: "/how-randomness-works",
    label: "How randomness works",
  },
];

export const teamAuthorFooterLinks: SiteLinkItem[] = [
  { to: ARMGHANA_AUTHOR.path, label: ARMGHANA_AUTHOR.name },
  { to: ZOHA_AUTHOR.path, label: ZOHA_AUTHOR.name },
  { to: RAJA_AUTHOR.path, label: RAJA_AUTHOR.name },
  { to: FAISAL_AUTHOR.path, label: FAISAL_AUTHOR.name },
];

export const tutorialLinks: SiteLinkItem[] = [
  {
    to: "/tutorial-adding-images-to-spin-wheels",
    label: "Add images to wheels",
  },
];

export const caseStudyLinks: SiteLinkItem[] = [
  {
    to: "/case-study-school-using-spin-wheels",
    label: "Example: school scenario",
  },
  {
    to: "/case-study-community-event-using-spin-wheels",
    label: "Example: community event scenario",
  },
];

export const comparisonLinks: SiteLinkItem[] = [
  {
    to: "/wheel-of-names-alternative",
    label: "Feature comparison",
  },
  {
    to: "/comparison-spin-wheel-vs-traditional-methods",
    label: "Wheel vs hat draw vs number generator",
  },
];

/**
 * The six indexed wheels people actually reach, newest ranking first.
 * Chosen from measured Search Console clicks, not from guesswork: over the 28 days
 * from 2026-09-23 to 2026-10-20 these six took 127 of the site's clicks, while the
 * six listed here before took 0 between them. Re-check this list against a fresh
 * export every few months rather than leaving it to drift.
 */
const FEATURED_WHEEL_SLUGS = [
  "abcd-spin-wheel",
  "should-i-text-him-wheel",
  "secret-santa-wheel-generator",
  "outfit-picker-wheel",
  "alphabet-spinner-wheel",
  "self-care-wheel",
] as const;

/** Featured indexed wheels; full lists live on WHEEL_HUB_PATH. */
export function getFeaturedWheelLinks(): SiteLinkItem[] {
  return FEATURED_WHEEL_SLUGS.filter((slug) => isWheelIndexableSlug(slug)).map(
    (slug) => {
      const rec = getWheelPageBySlug(slug);
      return {
        to: `/${slug}`,
        label: rec?.keywordPrimary || slug.replace(/-/g, " "),
      };
    },
  );
}
