import { getAllBlogPosts } from "@/data/blogPosts";
import { getWheelPageBySlug } from "@/lib/wheelPages";
import { isWheelIndexableSlug } from "@/data/wheelIndexPolicy";

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

export const tutorialLinks: SiteLinkItem[] = [
  {
    to: "/tutorial-adding-images-to-spin-wheels",
    label: "Add images to wheels",
  },
];

export const caseStudyLinks: SiteLinkItem[] = [
  {
    to: "/case-study-school-using-spin-wheels",
    label: "School case study",
  },
  {
    to: "/case-study-community-event-using-spin-wheels",
    label: "Community event case study",
  },
];

export const comparisonLinks: SiteLinkItem[] = [
  {
    to: "/wheel-of-names-alternative",
    label: "Feature comparison",
  },
  {
    to: "/comparison-spin-wheel-vs-random-number-generator",
    label: "Wheel vs random number generator",
  },
  {
    to: "/comparison-spin-wheel-vs-traditional-methods",
    label: "Wheel vs traditional methods",
  },
  {
    to: "/comparison-online-vs-physical-spin-wheels",
    label: "Online vs physical wheels",
  },
];

const FEATURED_WHEEL_SLUGS = [
  "random-name-picker-wheel",
  "yes-or-no-wheel",
  "random-student-picker",
  "team-generator-wheel",
  "winner-picker-wheel",
  "dinner-picker-wheel",
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
