import { getAllBlogPosts } from "@/data/blogPosts";
import { getAllWheelSlugs, getWheelPageBySlug } from "@/lib/wheelPages";

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
  { to: "/spin-wheel-free", label: "Spin Wheel Free" },
  { to: "/spin-wheel-picker", label: "Spin Wheel Picker" },
  { to: "/embed", label: "Embed widget" },
];

export const guideLinks: SiteLinkItem[] = [
  {
    to: "/how-to-use-spin-wheels-in-classrooms",
    label: "Spin wheels in classrooms",
  },
  {
    to: "/how-to-create-fair-giveaways-with-spin-wheels",
    label: "Fair giveaways with spin wheels",
  },
  {
    to: "/how-to-use-spin-wheels-for-team-building",
    label: "Team building with spin wheels",
  },
  {
    to: "/how-to-organize-events-with-random-selection",
    label: "Events and random selection",
  },
  {
    to: "/how-to-make-decisions-faster-with-spin-wheels",
    label: "Faster decisions with spin wheels",
  },
];

export const tutorialLinks: SiteLinkItem[] = [
  {
    to: "/tutorial-creating-your-first-spin-wheel",
    label: "Your first spin wheel",
  },
  {
    to: "/tutorial-customizing-spin-wheel-colors",
    label: "Customize wheel colors",
  },
  {
    to: "/tutorial-adding-images-to-spin-wheels",
    label: "Add images to wheels",
  },
  {
    to: "/tutorial-managing-spin-wheel-entries",
    label: "Manage wheel entries",
  },
  {
    to: "/tutorial-advanced-spin-wheel-features",
    label: "Advanced wheel features",
  },
];

export const caseStudyLinks: SiteLinkItem[] = [
  {
    to: "/case-study-school-using-spin-wheels",
    label: "School case study",
  },
  {
    to: "/case-study-corporate-event-using-spin-wheels",
    label: "Corporate event case study",
  },
  {
    to: "/case-study-community-event-using-spin-wheels",
    label: "Community event case study",
  },
];

export const comparisonLinks: SiteLinkItem[] = [
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

const FEATURED_WHEEL_COUNT = 6;

/** First CSV rows as quick entry points; full list lives on WHEEL_HUB_PATH. */
export function getFeaturedWheelLinks(): SiteLinkItem[] {
  return getAllWheelSlugs()
    .slice(0, FEATURED_WHEEL_COUNT)
    .map((slug) => {
      const rec = getWheelPageBySlug(slug);
      return {
        to: `/${slug}`,
        label: rec?.keywordPrimary || slug.replace(/-/g, " "),
      };
    });
}
