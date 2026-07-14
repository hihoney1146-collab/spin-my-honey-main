/** Shared team / author constants for SSR scripts (keep in sync with src/lib/teamAuthors.ts). */

export const SITE = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

/** Role-based paths — no personal names in URLs. */
export const TEAM_AUTHORS = {
  armghana: {
    slug: "ceo",
    legacySlug: "armghana-zeeshan",
    name: "Armghana Zeeshan",
    jobTitle: "CEO, Online Spin Wheel",
    shortRole: "CEO",
    path: "/team/ceo",
    url: `${SITE}/team/ceo`,
    personId: `${SITE}/team/ceo#person`,
    linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
  },
  zoha: {
    slug: "co-founder",
    legacySlug: "zoha-zeeshan",
    name: "Zoha Zeeshan",
    jobTitle: "Co-Founder, Online Spin Wheel",
    shortRole: "Co-Founder",
    path: "/team/co-founder",
    url: `${SITE}/team/co-founder`,
    personId: `${SITE}/team/co-founder#person`,
    linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
  },
  raja: {
    slug: "content",
    legacySlug: "raja-jahangir",
    name: "Raja Jahangir",
    jobTitle: "Content & SEO Lead, Online Spin Wheel",
    shortRole: "Content & SEO Lead",
    path: "/team/content",
    url: `${SITE}/team/content`,
    personId: `${SITE}/team/content#person`,
    linkedIn: "https://www.linkedin.com/in/raja-jahangir",
    image: `${SITE}/raja-jahangir.jpg`,
    locality: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
  },
  abdal: {
    slug: "social",
    legacySlug: "abdal-khalid",
    name: "Abdal Khalid",
    jobTitle: "Social Media Expert, Online Spin Wheel",
    shortRole: "Social Media Expert",
    path: "/team/social",
    url: `${SITE}/team/social`,
    personId: `${SITE}/team/social#person`,
    linkedIn: "https://www.linkedin.com/in/abdal-khalid",
  },
};

export const AUTHOR_LEGACY_REDIRECTS = [
  { from: `/author/${TEAM_AUTHORS.armghana.legacySlug}`, to: TEAM_AUTHORS.armghana.path },
  { from: `/author/${TEAM_AUTHORS.zoha.legacySlug}`, to: TEAM_AUTHORS.zoha.path },
  { from: `/author/${TEAM_AUTHORS.raja.legacySlug}`, to: TEAM_AUTHORS.raja.path },
  { from: `/author/${TEAM_AUTHORS.abdal.legacySlug}`, to: TEAM_AUTHORS.abdal.path },
];

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG_NAME,
    url: SITE,
    logo: `${SITE}/logo.png`,
    email: CONTACT_EMAIL,
    founder: [
      { "@id": TEAM_AUTHORS.armghana.personId },
      { "@id": TEAM_AUTHORS.zoha.personId },
    ],
  };
}

export function personJsonLd(author) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": author.personId,
    name: author.name,
    jobTitle: author.jobTitle,
    url: author.url,
    sameAs: [author.linkedIn],
  };
  if (author.image) node.image = author.image;
  if (author.locality) {
    node.address = {
      "@type": "PostalAddress",
      addressLocality: author.locality,
      addressCountry: author.countryCode,
    };
  }
  return node;
}

export function siteIdentityJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      name: ORG_NAME,
      url: `${SITE}/`,
      inLanguage: "en",
      publisher: { "@id": ORG_ID },
    },
    organizationJsonLd(),
    personJsonLd(TEAM_AUTHORS.armghana),
    personJsonLd(TEAM_AUTHORS.zoha),
    personJsonLd(TEAM_AUTHORS.raja),
    personJsonLd(TEAM_AUTHORS.abdal),
  ];
}
