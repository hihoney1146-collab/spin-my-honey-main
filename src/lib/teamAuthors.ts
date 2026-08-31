const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

/** Canonical author profile paths (/author/<name-slug>). */
export const ARMGHANA_AUTHOR = {
  slug: "ceo",
  legacySlug: "armghana-zeeshan",
  name: "Armghana Zeeshan",
  jobTitle: "CEO, Online Spin Wheel",
  shortRole: "CEO",
  path: "/author/armghana-zeeshan",
  url: `${SITE_ORIGIN}/author/armghana-zeeshan`,
  linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
} as const;

export const ZOHA_AUTHOR = {
  slug: "co-founder",
  legacySlug: "zoha-zeeshan",
  name: "Zoha Zeeshan",
  jobTitle: "Co-Founder, Online Spin Wheel",
  shortRole: "Co-Founder",
  path: "/author/zoha-zeeshan",
  url: `${SITE_ORIGIN}/author/zoha-zeeshan`,
  linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
} as const;

export const RAJA_AUTHOR = {
  slug: "content",
  legacySlug: "raja-jahangir",
  name: "Raja Jahangir",
  jobTitle: "SEO/AEO/AIO/GEO/SXO Strategist, Online Spin Wheel",
  shortRole: "SEO/AEO/AIO/GEO/SXO Strategist",
  path: "/author/raja-jahangir",
  url: `${SITE_ORIGIN}/author/raja-jahangir`,
  linkedIn: "https://www.linkedin.com/in/raja-jahangir-7317253b3",
  image: `${SITE_ORIGIN}/raja-jahangir.jpg`,
  locality: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
} as const;

export const FAISAL_AUTHOR = {
  slug: "marketing",
  legacySlug: "faisal-zahir",
  name: "Faisal Zahir",
  jobTitle: "Digital Marketing | Performance Marketing | Meta Ads, Online Spin Wheel",
  shortRole: "Digital Marketing",
  path: "/author/faisal-zahir",
  url: `${SITE_ORIGIN}/author/faisal-zahir`,
  linkedIn: "https://www.linkedin.com/in/faisal-zahir/",
} as const;

export const TEAM_AUTHOR_PAGES = [
  ARMGHANA_AUTHOR,
  ZOHA_AUTHOR,
  RAJA_AUTHOR,
  FAISAL_AUTHOR,
] as const;

/** Old role-based /team/* paths → canonical /author/* (301). */
export const TEAM_LEGACY_REDIRECTS = [
  { from: `/team/${ARMGHANA_AUTHOR.slug}`, to: ARMGHANA_AUTHOR.path },
  { from: `/team/${ZOHA_AUTHOR.slug}`, to: ZOHA_AUTHOR.path },
  { from: `/team/${RAJA_AUTHOR.slug}`, to: RAJA_AUTHOR.path },
  { from: `/team/${FAISAL_AUTHOR.slug}`, to: FAISAL_AUTHOR.path },
] as const;

/** @deprecated Use TEAM_LEGACY_REDIRECTS */
export const AUTHOR_LEGACY_REDIRECTS = TEAM_LEGACY_REDIRECTS;

export function personId(url: string) {
  return `${url}#person`;
}

export const ARMGHANA_PERSON_ID = personId(ARMGHANA_AUTHOR.url);
export const ZOHA_PERSON_ID = personId(ZOHA_AUTHOR.url);
export const RAJA_PERSON_ID = personId(RAJA_AUTHOR.url);
export const FAISAL_PERSON_ID = personId(FAISAL_AUTHOR.url);

/** @deprecated Use RAJA_PERSON_ID, kept for article author references. */
export const PERSON_ID = RAJA_PERSON_ID;
