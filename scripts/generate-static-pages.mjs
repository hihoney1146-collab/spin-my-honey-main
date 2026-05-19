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
import { collectBlogRouteMeta } from "./blog-data-sources.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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
  const ogImage = DEFAULT_OG_IMAGE;
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

  out = setMetaByName(out, "twitter:title", shortTitle);
  out = setMetaByName(out, "twitter:description", meta.description);
  out = setMetaByName(out, "twitter:image", ogImage);

  out = stripJsonLdScripts(out);
  out = injectJsonLd(out, meta.jsonLd);
  return out;
}

/** @returns {import('./static-page-meta.mjs').RouteMeta[]} */
function loadWheelRouteMeta() {
  const wheelJsonPath = path.join(root, "src", "generated", "wheelPages.json");
  if (!fs.existsSync(wheelJsonPath)) return [];

  const wheels = JSON.parse(fs.readFileSync(wheelJsonPath, "utf-8"));
  return wheels.map((p) => ({
    path: `/${p.slug}`,
    title: p.title || "Online Spin Wheel",
    description: p.metaDescription || p.h1 || "Free online spin wheel.",
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

const distPath = path.join(root, "dist");
const indexPath = path.join(distPath, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error('❌ Build not found. Run "npm run build" first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");
const routes = [
  ...fixedRouteMeta,
  ...collectBlogRouteMeta(root, { canonicalUrl, SITE }),
  ...loadWheelRouteMeta(),
];

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
