/** Shared team / author constants for SSR scripts (keep in sync with src/lib/teamAuthors.ts). */

export const SITE = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const ORG_ID = `${SITE}/#organization`;
export const WEBSITE_ID = `${SITE}/#website`;
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

export const TEAM_AUTHORS = {
  armghana: {
    slug: "armghana-zeeshan",
    name: "Armghana Zeeshan",
    jobTitle: "CEO, Online Spin Wheel",
    shortRole: "CEO",
    path: "/author/armghana-zeeshan",
    url: `${SITE}/author/armghana-zeeshan`,
    personId: `${SITE}/author/armghana-zeeshan#person`,
    linkedIn: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
  },
  zoha: {
    slug: "zoha-zeeshan",
    name: "Zoha Zeeshan",
    jobTitle: "Co-Founder, Online Spin Wheel",
    shortRole: "Co-Founder",
    path: "/author/zoha-zeeshan",
    url: `${SITE}/author/zoha-zeeshan`,
    personId: `${SITE}/author/zoha-zeeshan#person`,
    linkedIn: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
  },
  raja: {
    slug: "raja-jahangir",
    name: "Raja Jahangir",
    jobTitle: "Content & SEO Lead, Online Spin Wheel",
    shortRole: "Content & SEO Lead",
    path: "/author/raja-jahangir",
    url: `${SITE}/author/raja-jahangir`,
    personId: `${SITE}/author/raja-jahangir#person`,
    linkedIn: "https://www.linkedin.com/in/raja-jahangir",
    image: `${SITE}/raja-jahangir.jpg`,
    locality: "Islamabad",
    country: "Pakistan",
    countryCode: "PK",
  },
  abdal: {
    slug: "abdal-khalid",
    name: "Abdal Khalid",
    jobTitle: "Social Media Expert, Online Spin Wheel",
    shortRole: "Social Media Expert",
    path: "/author/abdal-khalid",
    url: `${SITE}/author/abdal-khalid`,
    personId: `${SITE}/author/abdal-khalid#person`,
    linkedIn: "https://www.linkedin.com/in/abdal-khalid",
  },
};

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
