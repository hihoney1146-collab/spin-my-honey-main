/**
 * Route-level SEO metadata for static HTML generation (post-build).
 * Keep in sync with React Helmet where possible.
 */

const SITE = "https://onlinespinwheel.fun";
const DEFAULT_OG_IMAGE = `${SITE}/og-image.png`;

/** @typedef {{ path: string; title: string; description: string; ogType?: string; robots?: string; jsonLd?: object | object[] }} RouteMeta */

/** @type {RouteMeta[]} */
export const fixedRouteMeta = [
  {
    path: "/",
    title: "Online Spin Wheel - Free Random Name & Number Picker",
    description:
      "Free customizable online spin wheel. Add names or numbers, click spin, get instant random results. No account needed at onlinespinwheel.fun.",
    ogType: "website",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": `${SITE}/#website`,
        name: "Online Spin Wheel",
        url: `${SITE}/`,
        description:
          "Free online spin wheel picker for names, numbers, prizes, classrooms, and fair random decisions.",
        inLanguage: "en",
        publisher: { "@id": `${SITE}/#organization` },
      },
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${SITE}/#organization`,
        name: "Online Spin Wheel",
        url: SITE,
        logo: `${SITE}/logo.png`,
        founder: {
          "@type": "Person",
          name: "Raja Jahangir",
          url: `${SITE}/author/raja-jahangir`,
        },
        contactPoint: {
          "@type": "ContactPoint",
          email: "onlinespinwheel@gmail.com",
          contactType: "customer service",
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Online Spin Wheel",
        description:
          "Free online spin wheel tool for random selection and decision making.",
        url: `${SITE}/`,
        applicationCategory: "UtilitiesApplication",
        operatingSystem: "Web Browser",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        provider: { "@id": `${SITE}/#organization` },
      },
    ],
  },
  {
    path: "/all-spin-wheels",
    title: "All specialty spin wheels | Online Spin Wheel",
    description:
      "Browse every free specialty spin wheel on Online Spin Wheel—decision wheels, pickers, classroom tools, games, and more.",
  },
  {
    path: "/blog",
    title: "Blog | Online Spin Wheel",
    description:
      "Tips and guides for random name pickers, classroom spin wheels, office icebreakers, couples' dinner decisions, and virtual Secret Santa.",
  },
  {
    path: "/about-us",
    title: "About Us - Online Spin Wheel",
    description:
      "Learn about Online Spin Wheel, operated by Auroxa Tech. Fair, fast, free random selection for classrooms, teams, and giveaways.",
  },
  {
    path: "/author/raja-jahangir",
    title: "Raja Jahangir | SEO & Growth Specialist | Online Spin Wheel",
    description:
      "Author profile of Raja Jahangir, SEO and growth specialist for Online Spin Wheel and Auroxa Tech.",
    ogType: "profile",
  },
  {
    path: "/contact-us",
    title: "Contact Us | Online Spin Wheel",
    description:
      "Contact Online Spin Wheel (Auroxa Tech) for support, feedback, privacy questions, and business inquiries.",
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy - Online Spin Wheel",
    description:
      "Privacy Policy for onlinespinwheel.fun: data we collect, cookies, Google AdSense, GDPR/CCPA rights, and how to contact us.",
  },
  {
    path: "/terms-and-conditions",
    title: "Terms and Conditions - Online Spin Wheel",
    description:
      "Terms and conditions for using the free Online Spin Wheel tool at onlinespinwheel.fun.",
  },
  {
    path: "/cookie-policy",
    title: "Cookie Policy - Online Spin Wheel",
    description:
      "How Online Spin Wheel uses cookies, Google AdSense, analytics, and how to manage your preferences.",
  },
  {
    path: "/disclaimer",
    title: "Disclaimer - Online Spin Wheel",
    description:
      "Disclaimer for Online Spin Wheel: limitations of random selection tools and proper use.",
  },
  {
    path: "/tutorial-adding-images-to-spin-wheels",
    title: "Tutorial: Adding Images to Spin Wheels | Online Spin Wheel",
    description:
      "Learn how to add images to spin wheel entries for classrooms, events, and branded giveaways.",
  },
  {
    path: "/case-study-school-using-spin-wheels",
    title: "Case Study: School Using Spin Wheels | Online Spin Wheel",
    description:
      "How a school used digital spin wheels for fair student selection and classroom engagement.",
  },
  {
    path: "/case-study-community-event-using-spin-wheels",
    title: "Case Study: Community Event Spin Wheels | Online Spin Wheel",
    description:
      "How a community event used spin wheels for fair raffles and participant selection.",
  },
  {
    path: "/comparison-spin-wheel-vs-random-number-generator",
    title: "Spin Wheel vs Random Number Generator | Online Spin Wheel",
    description:
      "Compare spin wheels and random number generators for fairness, engagement, and audience visibility.",
  },
  {
    path: "/comparison-spin-wheel-vs-traditional-methods",
    title: "Spin Wheel vs Traditional Random Methods | Online Spin Wheel",
    description:
      "Spin wheels vs hats, dice, and paper draws—pros, cons, and when to use each.",
  },
  {
    path: "/comparison-online-vs-physical-spin-wheels",
    title: "Online vs Physical Spin Wheels | Online Spin Wheel",
    description:
      "Online spin wheels vs physical wheels: portability, fairness, customization, and cost.",
  },
];

export function canonicalUrl(path) {
  if (path === "/") return `${SITE}/`;
  return `${SITE}${path}`;
}

export { SITE, DEFAULT_OG_IMAGE };
