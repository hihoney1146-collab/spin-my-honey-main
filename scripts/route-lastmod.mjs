/**
 * Content-hash registry for stable sitemap lastmod + visible "Last updated" dates.
 * Unchanged routes keep their prior lastmod across deploys.
 */
import fs from "fs";
import path from "path";
import { createHash } from "crypto";
import { fileURLToPath, pathToFileURL } from "url";
import { fixedRouteMeta } from "./static-page-meta.mjs";
import { loadWheelRecords } from "./seo-routes.mjs";
import { collectBlogPostsFull } from "./blog-data-sources.mjs";
import { renderRouteContent } from "./static-content.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const REGISTRY_PATH = path.join(root, "src", "generated", "routeLastmod.json");

function hashContent(text) {
  return createHash("sha256").update(text, "utf8").digest("hex").slice(0, 16);
}

function loadRegistry() {
  if (!fs.existsSync(REGISTRY_PATH)) return { routes: {} };
  return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
}

function collectRoutes(rootDir) {
  const wheels = loadWheelRecords(rootDir);
  const blogPosts = collectBlogPostsFull(rootDir);
  const routes = [];

  for (const r of fixedRouteMeta) {
    if (r.path === "/result") continue;
    routes.push({ path: r.path });
  }
  for (const p of blogPosts.filter((b) => b.indexed !== false)) {
    routes.push({ path: `/blog/${p.slug}` });
  }
  for (const w of wheels) {
    routes.push({ path: `/${w.slug}`, wheel: w });
  }
  return routes;
}

export function getRouteLastmod(routePath) {
  const reg = loadRegistry();
  return reg.routes[routePath]?.lastmod ?? new Date().toISOString().slice(0, 10);
}

export function updateRouteLastmodRegistry(rootDir = root) {
  const wheels = loadWheelRecords(rootDir);
  const blogPosts = collectBlogPostsFull(rootDir);
  const ctx = { wheels, blogPosts };
  const prev = loadRegistry();
  const today = new Date().toISOString().slice(0, 10);
  const routes = collectRoutes(rootDir);
  const next = { routes: {} };

  for (const route of routes) {
    const html = renderRouteContent(route, ctx) || "";
    const hash = hashContent(html);
    const old = prev.routes[route.path];
    const lastmod =
      old && old.hash === hash ? old.lastmod : today;
    next.routes[route.path] = { hash, lastmod };
  }

  fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true });
  fs.writeFileSync(REGISTRY_PATH, JSON.stringify(next, null, 2) + "\n", "utf8");
  return next;
}

const isMain =
  process.argv[1] &&
  import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href;

if (isMain) {
  const reg = updateRouteLastmodRegistry();
  console.log(`✅ routeLastmod.json — ${Object.keys(reg.routes).length} routes`);
}
