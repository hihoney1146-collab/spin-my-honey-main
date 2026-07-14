/**
 * Route-level SEO metadata for static HTML generation (post-build).
 * Keep in sync with React Helmet where possible.
 */

import { siteIdentityJsonLd, ORG_ID, WEBSITE_ID } from "./team-constants.mjs";

const SITE = "https://onlinespinwheel.fun";
const DEFAULT_OG_IMAGE = `${SITE}/og-image.png`;

/** @typedef {{ path: string; title: string; description: string; ogType?: string; robots?: string; jsonLd?: object | object[] }} RouteMeta */

/** @type {RouteMeta[]} */
export const fixedRouteMeta = [
  {
    path: "/",
    title: "Online Spin Wheel — Free Random Picker Tool",
    description:
      "Spin the wheel for a fair, random pick. Add names, numbers, or choices and let crypto-grade randomness decide — no signup, works on any phone, tablet, or computer.",
    ogType: "website",
    jsonLd: [
      ...siteIdentityJsonLd(),
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Online Spin Wheel",
        description:
          "Free online spin wheel and random picker for names, numbers, prizes, classrooms, teams, and fair decisions. Results use crypto.getRandomValues() and work on any device with no signup.",
        url: `${SITE}/`,
        applicationCategory: "UtilityApplication",
        operatingSystem: "Web Browser",
        isAccessibleForFree: true,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        publisher: { "@id": ORG_ID },
        provider: { "@id": ORG_ID },
      },
      {
        "@context": "https://schema.org",
        "@type": "HowTo",
        name: "How to spin the wheel",
        description:
          "Add your entries, spin the online wheel, and use the randomly selected winner.",
        step: [
          {
            "@type": "HowToStep",
            position: 1,
            name: "Add your entries",
            text: "Type or paste names, numbers, or choices into the panel beside the wheel, one per line, up to 400 at a time.",
            url: `${SITE}/#how-to-spin`,
          },
          {
            "@type": "HowToStep",
            position: 2,
            name: "Spin it",
            text: "Click Spin the Wheel or tap the wheel, then watch it slow down until the red pointer settles on one segment.",
            url: `${SITE}/#how-to-spin`,
          },
          {
            "@type": "HowToStep",
            position: 3,
            name: "Use the winner",
            text: "Read the highlighted result, then remove that entry for a multi-round draw or spin again to pick another.",
            url: `${SITE}/#how-to-spin`,
          },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE}/#faq`,
        url: `${SITE}/`,
        inLanguage: "en",
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: [
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q1`,
            name: "What is the maximum number of entries I can add?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q1-answer`,
              text: "There is no hard limit. You can paste hundreds of names at once (up to 400 lines per paste) and the wheel resizes every segment automatically. For readability, keep it under about 20 visible slices; larger lists still pick fairly.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q2`,
            name: "Can I save a wheel to reuse later?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q2-answer`,
              text: "Yes. Your entries are stored in your browser's local storage, so the same names are waiting the next time you open the page on that device. Use Reset to bring back the sample names, or Clear all to start fresh.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q3`,
            name: "Can I share my wheel or the result?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q3-answer`,
              text: "Yes. Use Copy link above the wheel to bookmark your exact entries in the link (no account). After a giveaway spin on the winner picker, raffle, or name picker wheels, tap Get proof link for a verifiable result page you can paste on Instagram or TikTok.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q4`,
            name: "What is streamer mode?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q4-answer`,
              text: "Streamer mode switches the page to a solid chroma-key background (green, blue, or magenta by default — or pick any color) and hides the site header, footer, and marketing sections so OBS or Streamlabs can key out everything except the wheel. Turn it on with the toggle above any wheel, choose a background color, then use Copy link to share that stream-ready setup.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q5`,
            name: "Does it work on mobile phones and tablets?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q5-answer`,
              text: "Yes. The wheel is fully responsive and touch-friendly — just tap the wheel to spin — with no app to install. It runs in any modern browser on phones, tablets, laptops, and classroom smartboards.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q6`,
            name: "How do I remove a winner so they aren't picked again?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q6-answer`,
              text: "After a spin, the winner dialog has a Remove Winner button that deletes that entry from the wheel. You can also delete any entry manually in the list, which is ideal for multi-round draws.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/#faq-q7`,
            name: "Is the wheel really random?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/#faq-q7-answer`,
              text: "Yes. Each spin uses the browser's secure random number generator — the same kind of randomness used for encryption — and the pointer lands based on segment size, so every equal-sized entry has exactly the same chance. Spins are independent, so past results never affect the next one.",
            },
          },
        ],
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
      "Online Spin Wheel is built by a small dedicated team. How every wheel is tested across 10,000 spins, and what data we do and don't collect.",
  },
  {
    path: "/team/content",
    title: "Content & SEO Lead | Online Spin Wheel",
    description:
      "Content, SEO, and quality review for Online Spin Wheel. How the team tests every wheel for fair, uniform random results.",
    ogType: "profile",
  },
  {
    path: "/team/ceo",
    title: "CEO | Online Spin Wheel",
    description:
      "CEO of Online Spin Wheel. Product direction, business priorities, and the standards behind every free fair spin wheel.",
    ogType: "profile",
  },
  {
    path: "/team/co-founder",
    title: "Co-Founder | Online Spin Wheel",
    description:
      "Co-Founder of Online Spin Wheel. Company direction, user experience, and roadmap for free fair random pickers.",
    ogType: "profile",
  },
  {
    path: "/team/social",
    title: "Social Media | Online Spin Wheel",
    description:
      "Social Media at Online Spin Wheel. Brand social channels, community engagement, and sharing wheel tips with teachers and creators.",
    ogType: "profile",
  },
  {
    path: "/contact-us",
    title: "Contact Us | Online Spin Wheel",
    description:
      "Contact Online Spin Wheel for support, feedback, privacy questions, and business inquiries.",
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
    path: "/how-randomness-works",
    title: "How Randomness Works | Online Spin Wheel",
    description:
      "How the Online Spin Wheel stays fair: crypto.getRandomValues() seeds, equal-probability segments, and why every spin is independent of the last.",
    ogType: "article",
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
    title: "Spin Wheel vs Traditional Methods | Online Spin Wheel",
    description:
      "Spin wheels vs hats, dice, and paper draws—pros, cons, and when to use each.",
  },
  {
    path: "/comparison-online-vs-physical-spin-wheels",
    title: "Online vs Physical Spin Wheels | Online Spin Wheel",
    description:
      "Online spin wheels vs physical wheels: portability, fairness, customization, and cost.",
  },
  {
    path: "/wheel-of-names-alternative",
    title: "Online Spin Wheel — Feature Comparison",
    description:
      "Compare Online Spin Wheel with other free pickers: no account, browser-only entries, 40+ specialty pages, raffle proof links, and a classroom hub.",
    jsonLd: [
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${SITE}/wheel-of-names-alternative#faq`,
        url: `${SITE}/wheel-of-names-alternative`,
        inLanguage: "en",
        isPartOf: { "@id": `${SITE}/#website` },
        mainEntity: [
          {
            "@type": "Question",
            "@id": `${SITE}/wheel-of-names-alternative#faq-q1`,
            name: "Do I need an account to use Online Spin Wheel?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/wheel-of-names-alternative#faq-q1-answer`,
              text: "No. Core spinning works without signup. Your entries stay in the browser on your device.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/wheel-of-names-alternative#faq-q2`,
            name: "How is Online Spin Wheel different from a generic name spinner?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/wheel-of-names-alternative#faq-q2-answer`,
              text: "Besides a free name picker, we publish 40+ specialty pages — raffles, classroom hubs, prize wheels — plus multi-winner proof links and ticket-number raffle mode.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/wheel-of-names-alternative#faq-q3`,
            name: "Do my names get uploaded to a server?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/wheel-of-names-alternative#faq-q3-answer`,
              text: "No. Entries are processed in your browser and stay on your device.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/wheel-of-names-alternative#faq-q4`,
            name: "Which tool is best for Instagram giveaways?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/wheel-of-names-alternative#faq-q4-answer`,
              text: "Look for multi-winner draws and shareable proof links. Our winner picker and raffle wheels support both.",
            },
          },
          {
            "@type": "Question",
            "@id": `${SITE}/wheel-of-names-alternative#faq-q5`,
            name: "Can I import a class list?",
            acceptedAnswer: {
              "@type": "Answer",
              "@id": `${SITE}/wheel-of-names-alternative#faq-q5-answer`,
              text: "Yes — paste one name per line (up to 400). The classroom spinner adds remove-after-pick, teams, and a timer.",
            },
          },
        ],
      },
    ],
  },
  {
    path: "/spin-wheel-fairness-study",
    title: "Spin Wheel Fairness Study: 100,000 Spins",
    h1: "Spin Wheel Fairness Study",
    description:
      "Original data: 100,000 automated spin-wheel simulations across segment counts. Chi-square uniformity tests, distribution tables, methodology, and downloadable CSV.",
    ogType: "article",
  },
  {
    path: "/result",
    title: "Spin Result Verification | Online Spin Wheel",
    description:
      "Verifiable spin proof records for giveaways and raffles — winner, entry count, UTC timestamp, and cryptographic RNG method.",
    robots: "noindex, follow",
  },
];

export function canonicalUrl(path) {
  if (path === "/") return `${SITE}/`;
  return `${SITE}${path}`;
}

export { SITE, DEFAULT_OG_IMAGE };
