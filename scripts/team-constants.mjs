/** Shared team / author constants for SSR scripts (keep in sync with src/lib/teamAuthors.ts). */

export const SITE = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

/** Canonical author profile paths (/author/<name-slug>). */
export const TEAM_AUTHORS = {
  armghana: {
    slug: "ceo",
    legacySlug: "armghana-zeeshan",
    name: "Armghana Zeeshan",
    jobTitle: "CEO, Online Spin Wheel",
    shortRole: "CEO",
    path: "/author/armghana-zeeshan",
    url: `${SITE}/author/armghana-zeeshan`,
    personId: `${SITE}/author/armghana-zeeshan#person`,
    linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
  },
  zoha: {
    slug: "co-founder",
    legacySlug: "zoha-zeeshan",
    name: "Zoha Zeeshan",
    jobTitle: "Co-Founder, Online Spin Wheel",
    shortRole: "Co-Founder",
    path: "/author/zoha-zeeshan",
    url: `${SITE}/author/zoha-zeeshan`,
    personId: `${SITE}/author/zoha-zeeshan#person`,
    linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
  },
  raja: {
    slug: "content",
    legacySlug: "raja-jahangir",
    name: "Raja Jahangir",
    jobTitle: "SEO/AEO/AIO/GEO/SXO Strategist, Online Spin Wheel",
    shortRole: "SEO/AEO/AIO/GEO/SXO Strategist",
    path: "/author/raja-jahangir",
    url: `${SITE}/author/raja-jahangir`,
    personId: `${SITE}/author/raja-jahangir#person`,
    linkedIn: "https://www.linkedin.com/in/raja-jahangir-7317253b3",
    image: `${SITE}/raja-jahangir.jpg`,
    locality: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
  },
  faisal: {
    slug: "marketing",
    legacySlug: "faisal-zahir",
    name: "Faisal Zahir",
    jobTitle: "Digital Marketing | Performance Marketing | Meta Ads, Online Spin Wheel",
    shortRole: "Digital Marketing",
    path: "/author/faisal-zahir",
    url: `${SITE}/author/faisal-zahir`,
    personId: `${SITE}/author/faisal-zahir#person`,
    linkedIn: "https://www.linkedin.com/in/faisal-zahir/",
  },
};

/** Old role-based /team/* paths → canonical /author/* (301). */
export const TEAM_LEGACY_REDIRECTS = [
  { from: `/team/${TEAM_AUTHORS.armghana.slug}`, to: TEAM_AUTHORS.armghana.path },
  { from: `/team/${TEAM_AUTHORS.zoha.slug}`, to: TEAM_AUTHORS.zoha.path },
  { from: `/team/${TEAM_AUTHORS.raja.slug}`, to: TEAM_AUTHORS.raja.path },
  { from: `/team/${TEAM_AUTHORS.faisal.slug}`, to: TEAM_AUTHORS.faisal.path },
];

/** @deprecated Use TEAM_LEGACY_REDIRECTS */
export const AUTHOR_LEGACY_REDIRECTS = TEAM_LEGACY_REDIRECTS;

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

/** Author profile route — ProfilePage with mainEntity Person (existing @id). */
export function profilePageJsonLd(opts) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${opts.url}#profilepage`,
    name: opts.title,
    description: opts.description,
    url: opts.url,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": opts.personId },
  };
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
    personJsonLd(TEAM_AUTHORS.faisal),
  ];
}
