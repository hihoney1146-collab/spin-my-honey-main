import {
  ABDAL_AUTHOR,
  ABDAL_PERSON_ID,
  ARMGHANA_AUTHOR,
  ARMGHANA_PERSON_ID,
  ORGANIZATION_ID,
  RAJA_AUTHOR,
  RAJA_PERSON_ID,
  ZOHA_AUTHOR,
  ZOHA_PERSON_ID,
} from "./teamAuthors";

export const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/** Sitewide contact address (domain email; forwarding configured at the registrar). */
export const CONTACT_EMAIL = "onlinespinwheel@gmail.com";

export {
  RAJA_AUTHOR,
  PERSON_ID,
  RAJA_PERSON_ID,
  ORGANIZATION_ID,
  ARMGHANA_AUTHOR,
  ZOHA_AUTHOR,
  ABDAL_AUTHOR,
} from "./teamAuthors";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    email: CONTACT_EMAIL,
    founder: [
      { "@id": ARMGHANA_PERSON_ID },
      { "@id": ZOHA_PERSON_ID },
    ],
  };
}

type AuthorProfile = {
  name: string;
  jobTitle: string;
  url: string;
  linkedIn: string;
  image?: string;
  locality?: string;
  countryCode?: string;
};

export function personJsonLd(author: AuthorProfile, personId: string) {
  const node: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
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
  if (author === RAJA_AUTHOR) {
    node.description =
      "Raja Jahangir leads content, SEO, and quality review for Online Spin Wheel — a free browser-based random picker built by a small dedicated team.";
    node.knowsAbout = [
      "Content Strategy",
      "Search Engine Optimization",
      "Random Selection",
      "Cryptographic Randomness",
      "Spin Wheel Tools",
      "Educational Technology",
    ];
  }
  return node;
}

/** Sitewide WebSite entity, published by the Online Spin Wheel organization. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: ORG_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

/** Sitewide identity graph: WebSite + Organization + team Person entities. */
export function siteIdentityJsonLd() {
  return [
    websiteJsonLd(),
    organizationJsonLd(),
    personJsonLd(ARMGHANA_AUTHOR, ARMGHANA_PERSON_ID),
    personJsonLd(ZOHA_AUTHOR, ZOHA_PERSON_ID),
    personJsonLd(RAJA_AUTHOR, RAJA_PERSON_ID),
    personJsonLd(ABDAL_AUTHOR, ABDAL_PERSON_ID),
  ];
}

/** Parse numbered steps from CSV "How To Use" text */
export function parseHowToSteps(howToUse: string): string[] {
  return howToUse
    .split(/\n+/)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^\d+\.\s*/, "").trim())
    .filter(Boolean);
}

export function howToJsonLd(opts: {
  name: string;
  description: string;
  steps: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: opts.name,
    description: opts.description,
    step: opts.steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text.length > 72 ? `${text.slice(0, 69)}...` : text,
      text,
    })),
  };
}

export function webPageJsonLd(opts: {
  name: string;
  description: string;
  url: string;
  headline?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    headline: opts.headline ?? opts.name,
    isPartOf: { "@id": WEBSITE_ID },
    author: { "@id": RAJA_PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified: string;
  image?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    url: opts.url,
    mainEntityOfPage: opts.url,
    datePublished: `${opts.datePublished ?? opts.dateModified}T12:00:00`,
    dateModified: `${opts.dateModified}T12:00:00`,
    author: {
      "@type": "Person",
      "@id": RAJA_PERSON_ID,
      name: opts.authorName ?? RAJA_AUTHOR.name,
      url: RAJA_AUTHOR.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: ORG_NAME,
      url: SITE_ORIGIN,
      logo: `${SITE_ORIGIN}/logo.png`,
    },
    ...(opts.image ? { image: opts.image } : {}),
  };
}

export function webApplicationJsonLd(opts: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: opts.name,
    description: opts.description,
    url: opts.url,
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    publisher: { "@id": ORGANIZATION_ID },
    provider: { "@id": ORGANIZATION_ID },
  };
}

export function breadcrumbListJsonLd(
  items: { name: string; url?: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  };
}

export function faqPageJsonLd(
  faqs: { q: string; a: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q.replace(/^\s*A:\s*/i, "").trim(),
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a.replace(/^\s*A:\s*/i, "").trim(),
      },
    })),
  };
}
