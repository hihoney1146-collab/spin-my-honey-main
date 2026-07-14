const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

/** Role-based paths — no personal names in URLs. */
export const ARMGHANA_AUTHOR = {
  slug: "ceo",
  /** Legacy URL slug (redirect source only). */
  legacySlug: "armghana-zeeshan",
  name: "Armghana Zeeshan",
  jobTitle: "CEO, Online Spin Wheel",
  shortRole: "CEO",
  path: "/team/ceo",
  url: `${SITE_ORIGIN}/team/ceo`,
  linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
} as const;

export const ZOHA_AUTHOR = {
  slug: "co-founder",
  legacySlug: "zoha-zeeshan",
  name: "Zoha Zeeshan",
  jobTitle: "Co-Founder, Online Spin Wheel",
  shortRole: "Co-Founder",
  path: "/team/co-founder",
  url: `${SITE_ORIGIN}/team/co-founder`,
  linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
} as const;

export const RAJA_AUTHOR = {
  slug: "content",
  legacySlug: "raja-jahangir",
  name: "Raja Jahangir",
  jobTitle: "Content & SEO Lead, Online Spin Wheel",
  shortRole: "Content & SEO Lead",
  path: "/team/content",
  url: `${SITE_ORIGIN}/team/content`,
  linkedIn: "https://www.linkedin.com/in/raja-jahangir",
  image: `${SITE_ORIGIN}/raja-jahangir.jpg`,
  locality: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
} as const;

export const ABDAL_AUTHOR = {
  slug: "social",
  legacySlug: "abdal-khalid",
  name: "Abdal Khalid",
  jobTitle: "Social Media Expert, Online Spin Wheel",
  shortRole: "Social Media Expert",
  path: "/team/social",
  url: `${SITE_ORIGIN}/team/social`,
  linkedIn: "https://www.linkedin.com/in/abdal-khalid",
} as const;

export const TEAM_AUTHOR_PAGES = [
  ARMGHANA_AUTHOR,
  ZOHA_AUTHOR,
  RAJA_AUTHOR,
  ABDAL_AUTHOR,
] as const;

/** Old /author/<name> paths → role URLs (SEO 301). */
export const AUTHOR_LEGACY_REDIRECTS = [
  { from: `/author/${ARMGHANA_AUTHOR.legacySlug}`, to: ARMGHANA_AUTHOR.path },
  { from: `/author/${ZOHA_AUTHOR.legacySlug}`, to: ZOHA_AUTHOR.path },
  { from: `/author/${RAJA_AUTHOR.legacySlug}`, to: RAJA_AUTHOR.path },
  { from: `/author/${ABDAL_AUTHOR.legacySlug}`, to: ABDAL_AUTHOR.path },
] as const;

export function personId(url: string) {
  return `${url}#person`;
}

export const ARMGHANA_PERSON_ID = personId(ARMGHANA_AUTHOR.url);
export const ZOHA_PERSON_ID = personId(ZOHA_AUTHOR.url);
export const RAJA_PERSON_ID = personId(RAJA_AUTHOR.url);
export const ABDAL_PERSON_ID = personId(ABDAL_AUTHOR.url);

/** @deprecated Use RAJA_PERSON_ID — kept for article author references. */
export const PERSON_ID = RAJA_PERSON_ID;
