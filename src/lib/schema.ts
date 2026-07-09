import { TEAM_LINKEDIN } from "./teamLinks";

export const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

/** Sitewide contact address (domain email; forwarding configured at the registrar). */
export const CONTACT_EMAIL = "hello@onlinespinwheel.fun";

export const RAJA_AUTHOR = {
  slug: "raja-jahangir",
  name: "Raja Jahangir",
  jobTitle: "Creator of Online Spin Wheel",
  url: `${SITE_ORIGIN}/author/raja-jahangir`,
  linkedIn: TEAM_LINKEDIN.rajaJahangir,
  image: `${SITE_ORIGIN}/raja-jahangir.jpg`,
  locality: "Islamabad",
  country: "Pakistan",
  countryCode: "PK",
};

export const PERSON_ID = `${RAJA_AUTHOR.url}#person`;

/** Sitewide Person: Raja Jahangir is the owner, author, and publisher of record. */
export function personJsonLd(author: typeof RAJA_AUTHOR = RAJA_AUTHOR) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${author.url}#person`,
    name: author.name,
    jobTitle: author.jobTitle,
    url: author.url,
    image: author.image,
    sameAs: [author.linkedIn],
    description:
      "Raja Jahangir is the independent creator, developer, and maintainer of Online Spin Wheel, a free browser-based random picker.",
    address: {
      "@type": "PostalAddress",
      addressLocality: author.locality,
      addressCountry: author.countryCode,
    },
    knowsAbout: [
      "Web Development",
      "Random Selection",
      "Cryptographic Randomness",
      "Spin Wheel Tools",
      "Educational Technology",
    ],
  };
}

/** Sitewide WebSite entity, authored and published by the Person. */
export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: ORG_NAME,
    url: `${SITE_ORIGIN}/`,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
  };
}

/** Sitewide identity graph: WebSite + Person (publisher/author). */
export function siteIdentityJsonLd() {
  return [websiteJsonLd(), personJsonLd()];
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
    author: { "@id": PERSON_ID },
    publisher: { "@id": PERSON_ID },
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
      "@id": PERSON_ID,
      name: opts.authorName ?? RAJA_AUTHOR.name,
      url: RAJA_AUTHOR.url,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: opts.authorName ?? RAJA_AUTHOR.name,
      url: RAJA_AUTHOR.url,
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
    publisher: { "@id": PERSON_ID },
    provider: { "@id": WEBSITE_ID },
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
