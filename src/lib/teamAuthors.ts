const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;

export const ARMGHANA_AUTHOR = {
  slug: "armghana-zeeshan",
  name: "Armghana Zeeshan",
  jobTitle: "CEO, Online Spin Wheel",
  shortRole: "CEO",
  url: `${SITE_ORIGIN}/author/armghana-zeeshan`,
  linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
} as const;

export const ZOHA_AUTHOR = {
  slug: "zoha-zeeshan",
  name: "Zoha Zeeshan",
  jobTitle: "Co-Founder, Online Spin Wheel",
  shortRole: "Co-Founder",
  url: `${SITE_ORIGIN}/author/zoha-zeeshan`,
  linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
} as const;

export const RAJA_AUTHOR = {
  slug: "raja-jahangir",
  name: "Raja Jahangir",
  jobTitle: "Content & SEO Lead, Online Spin Wheel",
  shortRole: "Content & SEO Lead",
  url: `${SITE_ORIGIN}/author/raja-jahangir`,
  linkedIn: "https://www.linkedin.com/in/raja-jahangir",
  image: `${SITE_ORIGIN}/raja-jahangir.jpg`,
  locality: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
} as const;

export const ABDAL_AUTHOR = {
  slug: "abdal-khalid",
  name: "Abdal Khalid",
  jobTitle: "Social Media Expert, Online Spin Wheel",
  shortRole: "Social Media Expert",
  url: `${SITE_ORIGIN}/author/abdal-khalid`,
  linkedIn: "https://www.linkedin.com/in/abdal-khalid",
} as const;

export const TEAM_AUTHOR_PAGES = [
  { ...ARMGHANA_AUTHOR, path: `/author/${ARMGHANA_AUTHOR.slug}` },
  { ...ZOHA_AUTHOR, path: `/author/${ZOHA_AUTHOR.slug}` },
  { ...RAJA_AUTHOR, path: `/author/${RAJA_AUTHOR.slug}` },
  { ...ABDAL_AUTHOR, path: `/author/${ABDAL_AUTHOR.slug}` },
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
