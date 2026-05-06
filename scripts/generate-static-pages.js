/**
 * Generate Static HTML Pages for SEO
 *
 * This script generates static HTML files for each route
 * to ensure search engines can properly index all pages.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseRoutes = [
  {
    path: "/",
    title:
      "Free Spin Wheel - Random Name Picker & Decision Maker Online | Online Spin Wheel",
  },
  { path: "/about-us", title: "About Us - Online Spin Wheel" },
  { path: "/contact-us", title: "Contact Us - Online Spin Wheel" },
  { path: "/privacy-policy", title: "Privacy Policy - Online Spin Wheel" },
  { path: "/terms-and-conditions", title: "Terms and Conditions - Online Spin Wheel" },
  { path: "/disclaimer", title: "Disclaimer - Online Spin Wheel" },
  {
    path: "/all-spin-wheels",
    title: "All specialty spin wheels | Online Spin Wheel",
  },
];

const wheelJsonPath = path.join(__dirname, "../src/generated/wheelPages.json");
let programmaticRoutes = [];
if (fs.existsSync(wheelJsonPath)) {
  try {
    const wheelPages = JSON.parse(fs.readFileSync(wheelJsonPath, "utf-8"));
    programmaticRoutes = wheelPages.map((p) => ({
      path: `/${p.slug}`,
      title: p.title || "Online Spin Wheel",
    }));
  } catch (e) {
    console.warn("⚠️ Could not read wheelPages.json:", e.message);
  }
}

const routes = [...baseRoutes, ...programmaticRoutes];

// Read the main index.html template
const distPath = path.resolve(__dirname, "../dist");
const indexPath = path.join(distPath, "index.html");

if (!fs.existsSync(indexPath)) {
  console.error('❌ Build not found. Run "npm run build" first.');
  process.exit(1);
}

const template = fs.readFileSync(indexPath, "utf-8");

console.log("🚀 Generating static HTML pages for SEO...\n");

routes.forEach((route) => {
  if (route.path === "/") {
    console.log(`✅ / (already exists as index.html)`);
    return;
  }

  // Create directory for the route
  const routePath = path.join(distPath, route.path);

  if (!fs.existsSync(routePath)) {
    fs.mkdirSync(routePath, { recursive: true });
  }

  // Create index.html for the route
  const routeIndexPath = path.join(routePath, "index.html");

  // Update the title in the template
  let pageHtml = template.replace(
    /<title>.*?<\/title>/,
    `<title>${route.title}</title>`
  );

  // Write the file
  fs.writeFileSync(routeIndexPath, pageHtml);

  console.log(`✅ ${route.path}/index.html created`);
});

console.log("\n✨ Static pages generated successfully!");
console.log("\nPages created:");
routes.forEach((route) => {
  console.log(`  📄 https://onlinespinwheel.fun${route.path}`);
});

console.log(
  "\n💡 These pages will help search engines index your site properly."
);
