/**
 * Generate static HTML pages with route-specific <head> metadata for SEO.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  fixedRouteMeta,
  canonicalUrl,
  DEFAULT_OG_IMAGE,
  SITE,
} from "./static-page-meta.mjs";
import {
  collectBlogRouteMeta,
  collectBlogPostsFull,
} from "./blog-data-sources.mjs";
import { renderRouteContent } from "./static-content.mjs";
import { siteIdentityJsonLd as teamSiteIdentity, ORG_ID, TEAM_AUTHORS, profilePageJsonLd, personJsonLd } from "./team-constants.mjs";
import {
  getWheelUniqueContent,
  wheelOgImageUrl,
} from "./wheel-content-loader.mjs";
import {
  WHEEL_MERGE_REDIRECTS,
  wheelRobotsDirective,
  isWheelIndexableSlug,
} from "./wheel-index-policy.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function stripHtml(s) {
  return String(s || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function plainTitle(title) {
  return stripHtml(title)
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

const BRAND_TITLE_SUFFIX = " | Online Spin Wheel";

function normalizeTitle(title, fallback = "Online Spin Wheel") {
  const clean = plainTitle(title || fallback);
  const replacements = new Map([
    [
      "How a Random Name Picker Makes Decisions Fair, Fun & Easy | Online Spin Wheel",
      "Random Name Picker: Fair, Fun & Easy | Online Spin Wheel",
    ],
  ]);
  if (replacements.has(clean)) return replacements.get(clean);
  if (clean.length < 60) return clean;

  let core = clean
    .replace(/\s*(\||,)\s*Online Spin Wheel\s*$/i, "")
    .replace(/\s*-\s*Complete\s*/i, " ")
    .replace(/\s+/g, " ")
    .trim();

  const withBrand = `${core}${BRAND_TITLE_SUFFIX}`;
  if (withBrand.length < 60) return withBrand;

  const maxCoreLen = 59 - BRAND_TITLE_SUFFIX.length;
  if (core.length > maxCoreLen) {
    core = core
      .slice(0, maxCoreLen)
      .replace(/\s+\S*$/, "")
      .replace(/[,|]\s*$/, "")
      .trim();
  }
  return `${core}${BRAND_TITLE_SUFFIX}`;
}

/** Author profile titles may exceed 59 chars when the full role string is required. */
function pageTitle(route) {
  const clean = plainTitle(route.title);
  if (route.path?.startsWith("/author/") && clean.length < 66) return clean;
  return normalizeTitle(route.title);
}

function htmlList(items, mapper) {
  const listItems = items.map((item) => `<li>${mapper(item)}</li>`).join("\n");
  return `<ul>\n${listItems}\n</ul>`;
}

function rootWithSeoContent(html, content) {
  if (/<div id="root">[\s\S]*?<\/div>/i.test(html)) {
    return html.replace(
      /<div id="root">[\s\S]*?<\/div>/i,
      `<div id="root">\n${content}\n</div>`,
    );
  }
  return html.replace(
    /<div id="root"><\/div>/i,
    `<div id="root">\n${content}\n</div>`,
  );
}

function routeHeading(meta) {
  if (meta.h1) return meta.h1;
  return normalizeTitle(meta.title).split("|")[0].split(" - ")[0].trim();
}

function makeSeoShell({ h1, intro, sections = [], links = [] }) {
  const linkList = links.length
    ? `<nav aria-label="Related pages">
      <h2>Related spin wheel pages</h2>
      ${htmlList(links, (link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`)}
    </nav>`
    : "";

  return `<main data-static-seo="true" style="max-width:960px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6">
    <h1>${escapeHtml(h1)}</h1>
    <p>${escapeHtml(intro)}</p>
    ${sections.join("\n")}
    ${linkList}
  </main>`;
}

function loadWheelPages() {
  const wheelJsonPath = path.join(root, "src", "generated", "wheelPages.json");
  if (!fs.existsSync(wheelJsonPath)) return [];
  return JSON.parse(fs.readFileSync(wheelJsonPath, "utf-8"));
}

function wheelLabel(wheel) {
  return wheel.keywordPrimary || wheel.h1 || wheel.title || wheel.slug;
}

function relatedWheelLinks(wheel, wheels, count = 6) {
  const unique = getWheelUniqueContent(wheel.slug);
  if (unique?.relatedWheels?.length) {
    return unique.relatedWheels
      .filter((l) => l.slug !== wheel.slug && isWheelIndexableSlug(l.slug))
      .slice(0, count)
      .map(({ slug, anchor }) => ({
        href: `/${slug}`,
        label: anchor,
      }));
  }
  const pool = wheels.filter(
    (w) => w.slug !== wheel.slug && isWheelIndexableSlug(w.slug),
  );
  const sameCategory = pool.filter((w) => w.category === wheel.category);
  const rest = pool.filter((w) => w.category !== wheel.category);
  return [...sameCategory, ...rest].slice(0, count).map((w) => ({
    href: `/${w.slug}`,
    label: wheelLabel(w),
  }));
}

function buildWheelSeoContent(route, wheels) {
  const wheel = route.wheel;
  const options = Array.isArray(wheel.wheelOptions) ? wheel.wheelOptions : [];
  const faqs = Array.isArray(wheel.faqs) ? wheel.faqs : [];
  const sections = [
    `<section><h2>Default wheel options</h2>${htmlList(
      options.slice(0, 24),
      (option) => escapeHtml(option),
    )}</section>`,
    `<section><h2>How to use this wheel</h2><p>${escapeHtml(
      wheel.howToUse || "Add or edit entries, press spin, and let the wheel choose a random result.",
    )}</p></section>`,
  ];

  if (faqs.length) {
    sections.push(
      `<section><h2>Frequently asked questions</h2>${faqs
        .slice(0, 5)
        .map(
          (faq) =>
            `<article><h3>${escapeHtml(faq.question)}</h3><p>${escapeHtml(faq.answer)}</p></article>`,
        )
        .join("\n")}</section>`,
    );
  }

  return makeSeoShell({
    h1: wheel.h1 || wheelLabel(wheel),
    intro:
      wheel.introduction ||
      wheel.metaDescription ||
      `${wheelLabel(wheel)} is a free browser-based spin wheel for fair random selection.`,
    sections,
    links: relatedWheelLinks(wheel, wheels),
  });
}

function buildGenericSeoContent(route, wheels, blogRoutes) {
  const h1 = routeHeading(route);
  const sections = [];
  const links = [];

  if (route.path === "/") {
    sections.push(
      `<section><h2>Popular spin wheels</h2>${htmlList(
        wheels.filter((w) => isWheelIndexableSlug(w.slug)).slice(0, 16),
        (wheel) => `<a href="/${escapeHtml(wheel.slug)}">${escapeHtml(wheelLabel(wheel))}</a>`,
      )}</section>`,
      `<section><h2>Why use Online Spin Wheel?</h2><p>Use the wheel for names, numbers, classroom picks, giveaways, teams, games, and everyday decisions. The tool works in your browser with no account required.</p></section>`,
    );
  } else if (route.path === "/all-spin-wheels") {
    sections.push(
      `<section><h2>Indexed wheel pages</h2>${htmlList(
        wheels.filter((w) => isWheelIndexableSlug(w.slug)),
        (wheel) => `<a href="/${escapeHtml(wheel.slug)}">${escapeHtml(wheelLabel(wheel))}</a>`,
      )}</section>`,
    );
  } else if (route.path === "/blog") {
    sections.push(
      `<section><h2>Latest guides</h2>${htmlList(
        blogRoutes,
        (post) => `<a href="${escapeHtml(post.path)}">${escapeHtml(normalizeTitle(post.title))}</a>`,
      )}</section>`,
    );
  } else if (route.path.startsWith("/blog/")) {
    sections.push(
      `<section><h2>What this guide covers</h2><p>This article explains practical ways to use online spin wheels for fair random choices, classroom activities, giveaways, team decisions, and everyday selection tasks. It is written for people who want quick decisions without accounts, downloads, or complicated setup.</p></section>`,
      `<section><h2>Related tools and guides</h2>${htmlList(
        [
          { href: "/random-name-picker-wheel", label: "Random name picker wheel" },
          { href: "/winner-picker-wheel", label: "Winner picker wheel" },
          { href: "/team-generator-wheel", label: "Team generator wheel" },
          { href: "/blog", label: "Spin wheel blog" },
        ],
        (link) => `<a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a>`,
      )}</section>`,
    );
  }

  links.push(
    { href: "/", label: "Online Spin Wheel" },
    { href: "/all-spin-wheels", label: "All spin wheels" },
    { href: "/random-name-picker-wheel", label: "Random name picker wheel" },
    { href: "/yes-or-no-wheel", label: "Yes or no wheel" },
    { href: "/blog", label: "Spin wheel guides" },
  );

  return makeSeoShell({
    h1,
    intro: route.description,
    sections,
    links,
  });
}

const PERSON_ID = `${SITE}/author/raja-jahangir#person`;
const WEBSITE_ID = `${SITE}/#website`;

function siteIdentityJsonLd() {
  return teamSiteIdentity();
}

function faqJsonLd(faqs = [], pageUrl) {
  if (!faqs.length) return null;
  const base = pageUrl ? pageUrl.replace(/\/$/, "") : "";
  const faqPageId = base ? `${base}#faq` : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(faqPageId
      ? {
          "@id": faqPageId,
          url: base,
          inLanguage: "en",
          isPartOf: { "@id": WEBSITE_ID },
        }
      : {}),
    mainEntity: faqs.map((faq, index) => {
      const questionId = faqPageId ? `${faqPageId}-q${index + 1}` : undefined;
      return {
        "@type": "Question",
        ...(questionId ? { "@id": questionId } : {}),
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          ...(questionId ? { "@id": `${questionId}-answer` } : {}),
          text: faq.answer,
        },
      };
    }),
  };
}

function wheelBreadcrumbJsonLd(wheel) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "All Spin Wheels",
        item: canonicalUrl("/all-spin-wheels"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: wheel.h1 || wheelLabel(wheel),
        item: canonicalUrl(`/${wheel.slug}`),
      },
    ],
  };
}

function breadcrumbJsonLd(route, label) {
  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: canonicalUrl("/"),
    },
  ];

  if (route.path !== "/") {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: label,
      item: canonicalUrl(route.path),
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function webApplicationJsonLd(route, name) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description: route.description,
    url: canonicalUrl(route.path),
    applicationCategory: "UtilityApplication",
    operatingSystem: "Web Browser",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@id": ORG_ID },
    provider: { "@id": ORG_ID },
  };
}

function enrichRoute(route, wheels, blogRoutes, blogPosts) {
  const title = pageTitle(route);
  const label = routeHeading({ ...route, title });
  const jsonLd = [];
  if (route.jsonLd) jsonLd.push(...(Array.isArray(route.jsonLd) ? route.jsonLd : [route.jsonLd]));

  let ogImage;
  let ogImageAlt = `${label}, preview`;
  if (route.path === "/spin-wheel-fairness-study") {
    ogImage = `${SITE}/og/spin-wheel-fairness-study.png`;
  } else if (route.path.startsWith("/blog/") && route.path !== "/blog") {
    const slug = route.path.slice("/blog/".length);
    const post = blogPosts.find((p) => p.slug === slug);
    if (post && post.indexed !== false) {
      ogImage = `${SITE}/blog-featured/${slug}.jpg`;
      ogImageAlt = title.split("|")[0].trim();
    }
  }

  let seoContent;
  if (route.wheel) {
    jsonLd.push(...siteIdentityJsonLd());
    jsonLd.push(wheelBreadcrumbJsonLd(route.wheel));
    jsonLd.push(webApplicationJsonLd(route, route.wheel.h1 || wheelLabel(route.wheel)));
    const faqLd = faqJsonLd(
      route.wheel.faqs,
      canonicalUrl(route.path),
    );
    if (faqLd) jsonLd.push(faqLd);
    seoContent =
      renderRouteContent(route, { wheels, blogPosts }) ||
      buildWheelSeoContent(route, wheels);
  } else {
    jsonLd.push(breadcrumbJsonLd(route, label));
    const author = Object.values(TEAM_AUTHORS).find((a) => a.path === route.path);
    if (author) {
      jsonLd.push(
        profilePageJsonLd({
          title: label,
          description: route.description,
          url: canonicalUrl(route.path),
          personId: author.personId,
        }),
      );
      jsonLd.push(personJsonLd(author));
    }
    seoContent =
      renderRouteContent(route, { wheels, blogPosts }) ||
      buildGenericSeoContent({ ...route, title }, wheels, blogRoutes);
  }

  return { ...route, title, jsonLd, seoContent, ogImage, ogImageAlt };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function replaceFirst(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function setMetaByName(html, name, content) {
  const re = new RegExp(
    `<meta\\s+name="${escapeRegex(name)}"[^>]*>`,
    "i",
  );
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<head>/i, `<head>\n  ${tag}`);
}

function setMetaByProperty(html, property, content) {
  const re = new RegExp(
    `<meta\\s+property="${escapeRegex(property)}"[^>]*>`,
    "i",
  );
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<head>/i, `<head>\n  ${tag}`);
}

function setLinkCanonical(html, href) {
  const re = /<link\s+rel="canonical"[^>]*>/i;
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<head>/i, `<head>\n  ${tag}`);
}

function setRobots(html, content) {
  const re = /<meta\s+name="robots"[^>]*>/i;
  const tag = `<meta name="robots" content="${escapeHtml(content)}" />`;
  if (re.test(html)) return html.replace(re, tag);
  return html;
}

function stripJsonLdScripts(html) {
  return html.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>\s*/gi,
    "",
  );
}

function injectJsonLd(html, jsonLd) {
  if (!jsonLd) return html;
  const items = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  const scripts = items
    .map(
      (obj) =>
        `  <script type="application/ld+json">\n${JSON.stringify(obj, null, 2)}\n  </script>`,
    )
    .join("\n");
  return html.replace("</head>", `${scripts}\n</head>`);
}

/**
 * @param {string} html
 * @param {{ path: string; title: string; description: string; ogType?: string; robots?: string; jsonLd?: object | object[] }} meta
 */
export function applyRouteHead(html, meta) {
  const canonical = canonicalUrl(meta.path);
  const ogType = meta.ogType || "website";
  const ogImage =
    meta.ogImage ||
    (meta.wheel?.slug ? wheelOgImageUrl(meta.wheel.slug, SITE) : DEFAULT_OG_IMAGE);
  const shortTitle = meta.title.split("|")[0].trim();

  let out = html;
  out = replaceFirst(out, /<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  out = setMetaByName(out, "description", meta.description);
  out = setLinkCanonical(out, canonical);
  if (meta.robots) out = setRobots(out, meta.robots);

  out = setMetaByProperty(out, "og:title", shortTitle);
  out = setMetaByProperty(out, "og:description", meta.description);
  out = setMetaByProperty(out, "og:type", ogType);
  out = setMetaByProperty(out, "og:url", canonical);
  out = setMetaByProperty(out, "og:image", ogImage);
  if (meta.ogImageAlt) {
    out = setMetaByProperty(out, "og:image:alt", meta.ogImageAlt);
    out = setMetaByName(out, "twitter:image:alt", meta.ogImageAlt);
  }

  out = setMetaByName(out, "twitter:title", shortTitle);
  out = setMetaByName(out, "twitter:description", meta.description);
  out = setMetaByName(out, "twitter:image", ogImage);

  const bingValidate = process.env.BING_MSVALIDATE?.trim();
  if (bingValidate) {
    out = setMetaByName(out, "msvalidate.01", bingValidate);
  }

  out = stripJsonLdScripts(out);
  out = injectJsonLd(out, meta.jsonLd);
  if (meta.seoContent) out = rootWithSeoContent(out, meta.seoContent);
  return out;
}

/** @returns {import('./static-page-meta.mjs').RouteMeta[]} */
function loadWheelRouteMeta() {
  const mergeSources = new Set(Object.keys(WHEEL_MERGE_REDIRECTS));
  return loadWheelPages()
    .filter((p) => p.slug && !mergeSources.has(p.slug))
    .map((p) => ({
      path: `/${p.slug}`,
      title: p.title || "Online Spin Wheel",
      description: p.metaDescription || p.h1 || "Free online spin wheel.",
      h1: p.h1,
      wheel: p,
      robots: wheelRobotsDirective(p.slug),
      jsonLd: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: p.title || p.h1,
        description: p.metaDescription,
        url: canonicalUrl(`/${p.slug}`),
        headline: p.h1,
      },
    }));
}

const LEGACY_NOINDEX_PAGE_PATHS = [
  "/how-to-use-spin-wheels-in-classrooms",
  "/how-to-create-fair-giveaways-with-spin-wheels",
  "/how-to-use-spin-wheels-for-team-building",
  "/how-to-organize-events-with-random-selection",
  "/how-to-make-decisions-faster-with-spin-wheels",
  "/tutorial-creating-your-first-spin-wheel",
  "/tutorial-customizing-spin-wheel-colors",
  "/tutorial-managing-spin-wheel-entries",
  "/tutorial-advanced-spin-wheel-features",
  "/case-study-corporate-event-using-spin-wheels",
];

function loadLegacyNoindexRouteMeta() {
  return LEGACY_NOINDEX_PAGE_PATHS.map((p) => ({
    path: p,
    title: "Online Spin Wheel",
    description:
      "This leftover guide URL stays available for old bookmarks and is not in search.",
    robots: "noindex, follow",
  }));
}

const distPath = path.join(root, "dist");
const indexPath = path.join(distPath, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error('❌ Build not found. Run "npm run build" first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");
const wheels = loadWheelPages();
const blogRoutes = collectBlogRouteMeta(root, { canonicalUrl, SITE });
const blogPosts = collectBlogPostsFull(root);
const routes = [
  ...fixedRouteMeta,
  ...blogRoutes,
  ...loadWheelRouteMeta(),
  ...loadLegacyNoindexRouteMeta(),
].map((route) => enrichRoute(route, wheels, blogRoutes, blogPosts));

console.log("🚀 Generating static HTML pages with route-specific metadata...\n");

for (const route of routes) {
  if (route.path === "/") {
    const homeHtml = applyRouteHead(template, route);
    fs.writeFileSync(indexPath, homeHtml);
    console.log("✅ / (index.html) updated with home metadata");
    continue;
  }

  const routePath = path.join(distPath, route.path);
  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }

  const pageHtml = applyRouteHead(template, route);
  fs.writeFileSync(path.join(routePath, "index.html"), pageHtml);
  console.log(`✅ ${route.path}/index.html`);
}

console.log(`\n✨ Generated ${routes.length} route HTML files.`);
