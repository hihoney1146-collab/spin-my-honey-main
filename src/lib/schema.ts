import { AUROXA_TECH_URL, TEAM_LINKEDIN } from "./teamLinks";

export const SITE_ORIGIN = "https://onlinespinwheel.fun";
export const ORG_NAME = "Online Spin Wheel";
export const ORG_ID = `${SITE_ORIGIN}/#organization`;

export const RAJA_AUTHOR = {
  slug: "raja-jahangir",
  name: "Raja Jahangir",
  jobTitle: "SEO & Growth Specialist",
  url: `${SITE_ORIGIN}/author/raja-jahangir`,
  linkedIn: TEAM_LINKEDIN.rajaJahangir,
  worksFor: "Auroxa Tech",
  worksForUrl: AUROXA_TECH_URL,
  image: `${SITE_ORIGIN}/logo.png`,
};

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: ORG_NAME,
    url: SITE_ORIGIN,
    logo: `${SITE_ORIGIN}/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "onlinespinwheel@gmail.com",
      contactType: "customer service",
    },
  };
}

export function personAuthorJsonLd(
  author: typeof RAJA_AUTHOR = RAJA_AUTHOR,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${author.url}#person`,
    name: author.name,
    jobTitle: author.jobTitle,
    url: author.url,
    image: author.image,
    sameAs: [author.linkedIn],
    worksFor: {
      "@type": "Organization",
      name: author.worksFor,
      url: author.worksForUrl,
    },
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
    isPartOf: { "@id": SITE_ORIGIN },
    publisher: { "@id": ORG_ID },
  };
}

export function articleJsonLd(opts: {
  title: string;
  description: string;
  url: string;
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
    dateModified: `${opts.dateModified}T12:00:00`,
    author: {
      "@type": "Person",
      name: opts.authorName ?? RAJA_AUTHOR.name,
      url: RAJA_AUTHOR.url,
    },
    publisher: {
      "@type": "Organization",
      name: ORG_NAME,
      url: SITE_ORIGIN,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_ORIGIN}/logo.png`,
      },
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
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: { "@id": ORG_ID },
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
