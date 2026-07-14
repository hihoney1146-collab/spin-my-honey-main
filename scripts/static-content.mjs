/**
 * Server-rendered (crawler-visible) content for trust & content pages.
 *
 * The app boots with `createRoot(...).render()` (see src/main.tsx), so React
 * fully re-renders `#root` on hydration. That means the HTML we inject here is
 * crawler-only: it appears in the initial HTML response (verifiable with curl)
 * and is replaced by the interactive React UI on the client. This lets us ship
 * >= 400 words of real, indexable text per route WITHOUT touching the existing
 * UI/UX, colors, layout, or wheel interaction.
 *
 * All content is US English, authored to mirror the corresponding React page.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {
  getWheelUniqueContent,
} from "./wheel-content-loader.mjs";
import { decodeResultId } from "./result-proof-decode.mjs";
import { TEAM_AUTHORS, ORG_NAME, CONTACT_EMAIL } from "./team-constants.mjs";

const __rootContent = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const ROUTE_LASTMOD_PATH = path.join(__rootContent, "src", "generated", "routeLastmod.json");

function routeLastmod(routePath) {
  try {
    const reg = JSON.parse(fs.readFileSync(ROUTE_LASTMOD_PATH, "utf8"));
    return reg.routes?.[routePath]?.lastmod ?? WHEEL_CONTENT_LAST_UPDATED;
  } catch {
    return WHEEL_CONTENT_LAST_UPDATED;
  }
}
function loadFairnessStudy() {
  const p = path.join(__rootContent, "src", "generated", "fairnessStudy.json");
  if (!fs.existsSync(p)) return null;
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

const SITE = "https://onlinespinwheel.fun";
const __root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

/**
 * Extract a top-level literal (`<name> ... = { ... }` or `= [ ... ]`) from a
 * TS/JS source, skipping delimiters inside strings, templates, and comments.
 */
function extractLiteral(src, name, open, close) {
  const openEsc = open === "[" ? "\\[" : "\\{";
  const declRe = new RegExp(`${name}\\s*(?::[^=]*)?=\\s*${openEsc}`);
  const m = declRe.exec(src);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  let depth = 0;
  let inStr = null;
  for (let i = start; i < src.length; i++) {
    const ch = src[i];
    if (inStr) {
      if (ch === "\\") {
        i++;
        continue;
      }
      if (ch === inStr) inStr = null;
      continue;
    }
    if (ch === "/" && src[i + 1] === "/") {
      const nl = src.indexOf("\n", i);
      if (nl === -1) break;
      i = nl;
      continue;
    }
    if (ch === "/" && src[i + 1] === "*") {
      const end = src.indexOf("*/", i + 2);
      if (end === -1) break;
      i = end + 1;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") {
      inStr = ch;
      continue;
    }
    if (ch === open) depth++;
    else if (ch === close) {
      depth--;
      if (depth === 0) return src.slice(start, i + 1);
    }
  }
  return null;
}

/** Load the category enrichment data used by the client wheel pages so SSR
 * mirrors the same rich content (single source of truth in TS). */
function loadEnrichment() {
  const file = path.join(__root, "src", "lib", "wheelContentEnrichment.ts");
  const fallback = { categoryData: {}, personalNotes: {}, absorbedSections: {} };
  if (!fs.existsSync(file)) return fallback;
  const src = fs.readFileSync(file, "utf8");
  const catLit = extractLiteral(src, "CATEGORY_DATA", "{", "}");
  const noteLit = extractLiteral(src, "FEATURED_PERSONAL_NOTES", "{", "}");
  const absorbedLit = extractLiteral(src, "ABSORBED_SECTIONS", "{", "}");
  try {
    return {
      categoryData: catLit
        ? new Function(`"use strict";return (${catLit});`)()
        : {},
      personalNotes: noteLit
        ? new Function(`"use strict";return (${noteLit});`)()
        : {},
      absorbedSections: absorbedLit
        ? new Function(`"use strict";return (${absorbedLit});`)()
        : {},
    };
  } catch (err) {
    console.warn(`⚠️  Could not parse wheel enrichment: ${err.message}`);
    return fallback;
  }
}

const ENRICH = loadEnrichment();

function esc(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/** Committed wheel content-review date; keep in sync with generate-wheel-pages-data.mjs. */
const WHEEL_CONTENT_LAST_UPDATED = "2026-07-08";

function fmtDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function mainWrap(inner) {
  return `<main data-static-seo="true" style="max-width:960px;margin:0 auto;padding:32px 20px;font-family:system-ui,-apple-system,Segoe UI,sans-serif;line-height:1.6">
${inner}
</main>`;
}

function exploreNav() {
  const links = [
    ["/", "Online Spin Wheel home"],
    ["/all-spin-wheels", "All spin wheels"],
    ["/random-name-picker-wheel", "Random name picker wheel"],
    ["/yes-or-no-wheel", "Yes or no wheel"],
    ["/blog", "Spin wheel blog"],
    ["/about-us", "About us"],
    ["/contact-us", "Contact us"],
  ];
  return `<nav aria-label="Explore more">
  <h2>Explore more of Online Spin Wheel</h2>
  <ul>
${links.map(([href, label]) => `    <li><a href="${href}">${esc(label)}</a></li>`).join("\n")}
  </ul>
</nav>`;
}

/* ---------------------------------------------------------------- Home ----- */

function homeContent(wheels) {
  const popular = wheels
    .slice(0, 16)
    .map(
      (w) =>
        `<li><a href="/${esc(w.slug)}">${esc(w.keywordPrimary || w.h1 || w.title || w.slug)}</a></li>`,
    )
    .join("\n");

  return mainWrap(`<h1>Spin the Wheel, Free Online Spin Wheel &amp; Random Picker</h1>
<p>Online Spin Wheel is a free random picker: add names, numbers, or choices, then spin to get one fair result. It chooses winners with the same secure randomness browsers use for encryption, so every entry has an equal chance. No signup or install, it works instantly on phones, tablets, and computers.</p>

<section id="how-to-spin">
  <h2>How to spin the wheel</h2>
  <ol>
    <li><strong>Add your entries.</strong> Type or paste names, numbers, or choices into the panel beside the wheel, one per line, up to 400 at a time.</li>
    <li><strong>Spin it.</strong> Click "Spin the Wheel" or tap the wheel itself, then watch it decelerate naturally until the red pointer settles on one segment.</li>
    <li><strong>Use the winner.</strong> Read the highlighted result, then remove that entry for a multi-round draw or spin again to pick another.</li>
  </ol>
  <p><img src="/spin-wheel-preview.svg?v=3" width="640" height="640" alt="The Online Spin Wheel showing seven colored name segments, a white SPIN hub, and a red pointer on the right" /></p>
</section>

<section id="use-cases">
  <h2>What people use this wheel for</h2>
  <ul>
    <li><strong>Giveaways &amp; raffles:</strong> paste entrant names and draw a transparent winner on screen with the <a href="/raffle-wheel">raffle wheel</a> or <a href="/winner-picker-wheel">winner picker wheel</a>.</li>
    <li><strong>Teachers &amp; classrooms:</strong> call on students fairly using the <a href="/classroom-spinner">classroom spinner</a> hub or <a href="/random-student-picker">random student picker</a>.</li>
    <li><strong>Teams &amp; meetings:</strong> assign tasks, pick a presenter, or split people into squads with the <a href="/team-generator-wheel">team generator wheel</a>.</li>
    <li><strong>Prize &amp; promo spins:</strong> label slices for store giveaways with the <a href="/prize-wheel">prize wheel</a>.</li>
    <li><strong>Food &amp; movie nights:</strong> settle "where do we eat?" and "what do we watch?" with the <a href="/dinner-picker-wheel">dinner picker wheel</a> and <a href="/movie-picker-wheel">movie picker wheel</a>.</li>
    <li><strong>Games &amp; streams:</strong> run dares and audience picks live with the <a href="/truth-or-dare-spinner-online">truth or dare spinner</a> or an <a href="/instagram-wheel-picker">Instagram comment picker</a>.</li>
    <li><strong>Feature comparison:</strong> see how we stack up on our <a href="/wheel-of-names-alternative">Online Spin Wheel feature comparison</a> page.</li>
  </ul>
</section>

<section id="why-fair">
  <h2>Why our results are fair</h2>
  <p>Every spin starts with a fresh random value from the browser's secure generator, the same kind of randomness used for encryption keys, not a simple predictable formula. That value sets the wheel's speed and friction, and where the pointer stops depends purely on each segment's size, so equal-sized slices give every entry identical odds. Spins are also independent: the wheel has no memory, so a name that just won is exactly as likely to win again next time. It all runs on your device, your entries never touch our servers. Learn more about <a href="/how-randomness-works">how randomness works</a>.</p>
</section>

<section id="popular-spin-wheels">
  <h2>Popular spin wheels</h2>
  <ul>
${popular}
  </ul>
</section>

<section id="homepage-faq">
  <h2>Frequently asked questions</h2>
  <h3>What is the maximum number of entries I can add?</h3>
  <p>There is no hard limit. You can paste hundreds of names at once (up to 400 lines per paste) and the wheel resizes every segment automatically. For readability, keep it under about 20 visible slices; larger lists still pick fairly.</p>
  <h3>Can I save a wheel to reuse later?</h3>
  <p>Yes. Your entries are stored in your browser's local storage, so the same names are waiting the next time you open the page on that device. Use Reset to bring back the sample names, or Clear all to start fresh.</p>
  <h3>Can I share my wheel or the result?</h3>
  <p>Yes. Use Copy link above the wheel to bookmark your exact entries in the link (no account). After a giveaway spin on the winner picker, raffle, or name picker wheels, tap Get proof link for a verifiable result page you can paste on Instagram or TikTok.</p>
  <h3>What is streamer mode?</h3>
  <p>Streamer mode switches the page to a solid chroma-key background (green, blue, or magenta by default, or pick any color) and hides the site header, footer, and marketing sections so OBS or Streamlabs can key out everything except the wheel. Turn it on with the toggle above any wheel, choose a background color, then use Copy link to share that stream-ready setup.</p>
  <h3>Does it work on mobile phones and tablets?</h3>
  <p>Yes. The wheel is fully responsive and touch-friendly, just tap the wheel to spin, with no app to install. It runs in any modern browser on phones, tablets, laptops, and classroom smartboards.</p>
  <h3>How do I remove a winner so they aren't picked again?</h3>
  <p>After a spin, the winner dialog has a Remove Winner button that deletes that entry from the wheel. You can also delete any entry manually in the list, which is ideal for multi-round draws.</p>
  <h3>Is the wheel really random?</h3>
  <p>Yes. Each spin uses the browser's secure random number generator, the same kind of randomness used for encryption, and the pointer lands based on segment size, so every equal-sized entry has exactly the same chance. Spins are independent, so past results never affect the next one.</p>
</section>
${exploreNav()}`);
}

/* --------------------------------------------------------------- About ----- */

function aboutContent() {
  const { armghana, zoha, raja, abdal } = TEAM_AUTHORS;
  return mainWrap(`<h1>About Online Spin Wheel</h1>
<p>${ORG_NAME} is built and maintained by a small independent team dedicated solely to this product. We are not a multi-property agency, we focus on one job: free, fast, trustworthy spin wheels for classrooms, giveaways, streamers, and everyday decisions.</p>
<p>The site started because too many online spinners were slow, buried in ads, or vague about whether their results were genuinely random. In early 2026 we launched a straightforward, cleanly designed way to make random choices, pick contest winners, and gamify classrooms without logins or bloated interfaces.</p>

<section>
  <h2>Our team</h2>
  <ul>
    <li><strong><a href="${armghana.path}">${esc(armghana.name)}</a>, CEO.</strong> Sets product direction and business priorities: which wheels ship, how we keep the core tool free, and how we communicate about fairness and privacy.</li>
    <li><strong><a href="${zoha.path}">${esc(zoha.name)}</a>, Co-Founder.</strong> Shapes company direction and user experience: responsive layouts, specialty wheel roadmaps, and product focus for real hosts and teachers.</li>
    <li><strong><a href="${raja.path}">${esc(raja.name)}</a>, Content &amp; SEO Lead.</strong> Owns content, SEO, and quality review: wheel copy, guides, blog posts, and the pre-launch testing checklist every page must pass.</li>
    <li><strong><a href="${abdal.path}">${esc(abdal.name)}</a>, Social Media Expert.</strong> Manages brand social channels, community engagement, and how we share wheel tips with teachers, streamers, and creators.</li>
  </ul>
</section>

<section>
  <h2>Why we built it</h2>
  <p>It began with a simple giveaway problem: picking a fair winner without forcing people into logins, subscriptions, or bloated interfaces. The answer was a clean, mathematically fair wheel that runs instantly in the browser with no app required. Today, teachers, creators, and businesses use it daily because it stays fast, private, and free. The wheel does not jump to a result, it spins and slows naturally with momentum and friction simulation.</p>
</section>

<section>
  <h2>How every wheel is tested</h2>
  <p>Fairness is a team practice, not a marketing line. Every wheel is tested for uniform distribution across 10,000 automated spins before launch. If any equal-sized segment wins noticeably more or less often than the rest, the wheel is not published until the distribution is even. Randomness comes from the browser's built-in secure generator, never a simple predictable formula. Read the full explanation on our <a href="/how-randomness-works">how randomness works</a> page and our <a href="/spin-wheel-fairness-study">100,000-spin fairness study</a>.</p>
</section>

<section>
  <h2>What data we do and don't collect</h2>
  <p>The names, numbers, or options you type into the wheel stay on your device and are never sent to a server. No accounts, sign-ups, or passwords are required. To keep the tool free, we use standard, privacy-respecting analytics and ad measurement, described in our <a href="/privacy-policy">Privacy Policy</a>. If you email us, we use your address and message only to reply.</p>
</section>

<section>
  <h2>Updates &amp; reporting a bug</h2>
  <p>Content is reviewed regularly and refreshed whenever tools, best practices, or your feedback call for it. Every tool page and blog post shows a visible "Last updated" date wired to real content changes. Found a bug or spotted an error? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> with the page URL, your device and browser, and what happened versus what you expected. Reports are reviewed and, where valid, fixed and re-dated within 48 hours.</p>
</section>

<section>
  <h2>Our commitment</h2>
  <p>Online Spin Wheel is 100% free and unlimited with no premium tiers or hidden caps, and it is universally accessible on desktop, tablet, and mobile. Questions, feedback, or ideas for a new wheel are always welcome at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>.</p>
</section>
${exploreNav()}`);
}

/* ------------------------------------------------------------- Contact ----- */

function contactContent() {
  return mainWrap(`<h1>Contact Online Spin Wheel</h1>
<p>We'd love to hear from you. Whether you have a question about a specific spin wheel, found a bug, want to suggest a new feature, or are exploring a partnership, our team reads every message. Send us a note and we'll respond as soon as possible, most support, privacy, and business emails receive a reply within 24–48 hours, and we aim to acknowledge editorial corrections even faster.</p>

<section>
  <h2>Email us</h2>
  <p>For general inquiries, feedback, or support, email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. We read every message and respond as soon as possible, most support, privacy, and business emails receive a reply within 24–48 hours. Your feedback directly shapes which wheels, guides, and features we build next.</p>
</section>

<section>
  <h2>What to include in your message</h2>
  <p>To help us resolve your request in a single reply, include as much relevant detail as you can. A well-described report almost always gets a faster, more useful answer.</p>
  <ul>
    <li>The exact page or wheel URL you were using (for example, the random name picker wheel or the yes or no wheel).</li>
    <li>Your device type, operating system, and browser (Chrome, Safari, Firefox, or Edge) and its version.</li>
    <li>A step-by-step description of what you did and what happened versus what you expected.</li>
    <li>A screenshot or screen recording if the issue is visual or intermittent.</li>
  </ul>
</section>

<section>
  <h2>Business information</h2>
  <ul>
    <li><strong>Operator:</strong> ${ORG_NAME}, a small team dedicated solely to this website. Data controller: ${ORG_NAME} (site owner: confirm registered legal entity name if applicable).</li>
    <li><strong>Based in:</strong> Islamabad, Pakistan. Serving users worldwide online.</li>
    <li><strong>Response time:</strong> typically within 24–48 hours on business days.</li>
  </ul>
</section>

<section>
  <h2>Feedback and requests</h2>
  <p>Have an idea for a new wheel, an accessibility improvement, or a localization request? Reach out with a short description of what you need and who it's for, and we'll suggest a practical approach. Suggestions from schools, nonprofits, and community organizations are especially welcome.</p>
</section>

<section>
  <h2>Editorial corrections</h2>
  <p>Accuracy matters. If you spot an error in a blog post, guide, or wheel description, a broken link, an outdated statistic, or an unclear instruction, email us and reference the page URL. We review reported issues and update published content, refreshing the visible "Last updated" date when we make a change.</p>
</section>

<section>
  <h2>Tips for a faster response</h2>
  <ul>
    <li>Be as specific as possible when reporting issues.</li>
    <li>Include your device type and browser if relevant.</li>
    <li>Check the <a href="/#homepage-faq">FAQ section</a> on the homepage before contacting us.</li>
  </ul>
</section>

<section>
  <h2>Privacy &amp; advertising questions</h2>
  <p>For privacy requests (access, deletion, or opt-out of personalized ads) or advertising inquiries, email us at the address above and we will guide you through your options. Full details are in our <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookie-policy">Cookie Policy</a>.</p>
</section>
${exploreNav()}`);
}

/* -------------------------------------------------------------- Author ----- */

function authorArmghanaContent() {
  const a = TEAM_AUTHORS.armghana;
  return mainWrap(`<h1>${esc(a.name)}, CEO, ${ORG_NAME}</h1>
<p>I'm ${esc(a.name)}, CEO of <a href="/">${ORG_NAME}</a>. Our team built this site because too many online spinners were slow, cluttered, or vague about fairness. We focus on one product, free, browser-based wheels for classrooms, giveaways, and everyday decisions.</p>
<p>As CEO, I set product direction and business priorities: which wheels ship next, how we keep the core tool free without sacrificing speed, and how we communicate honestly about randomness and privacy. I work with <a href="${TEAM_AUTHORS.zoha.path}">${esc(TEAM_AUTHORS.zoha.name)}</a> on company direction and with <a href="${TEAM_AUTHORS.raja.path}">${esc(TEAM_AUTHORS.raja.name)}</a> on content quality, SEO, and the testing bar every page must meet before it goes live.</p>
<p>Our team works only on Online Spin Wheel, no unrelated products or agency side projects. Every decision ties back to users who need a fair pick in front of a class, a livestream, or a comment section. When we add a specialty wheel or publish a guide, it is because real hosts and teachers asked for something we could verify works.</p>
<p>Fairness is a team practice. Before launch, wheels are checked for uniform distribution across 10,000 automated spins; if segments drift, the wheel does not ship. Randomness comes from the browser's secure generator, and user entries stay on the device.</p>

<section>
  <h2>What I focus on as CEO</h2>
  <ul>
    <li>Product direction: which specialty wheels and guides earn a place on the roadmap.</li>
    <li>Business priorities: keeping the core spinner free, fast, and sustainable without dark patterns.</li>
    <li>Quality bar: no wheel ships until distribution testing and content review are complete.</li>
    <li>Honest communication: clear pages on randomness, privacy, and what data we do not collect.</li>
    <li>Partnerships and feedback: routing teacher, creator, and nonprofit requests to the right next step.</li>
  </ul>
</section>

<section>
  <h2>How our team works together</h2>
  <p>${esc(TEAM_AUTHORS.zoha.name)} shapes user experience and co-founder direction. ${esc(TEAM_AUTHORS.raja.name)} owns content, SEO, and the 10,000-spin checks documented on our <a href="/how-randomness-works">how randomness works</a> page and in the <a href="/spin-wheel-fairness-study">fairness study</a>. I align those streams so releases stay coordinated, a new wheel always ships with accurate copy, working embeds, and verifiable randomness.</p>
  <p>We refresh visible last-updated dates when published content changes, respond to bug reports at <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>, and keep server-rendered HTML so crawlers and screen readers see the same facts users do in the app.</p>
</section>

<section>
  <h2>Connect</h2>
  <p>Questions about partnerships or how we operate? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or connect on <a href="${a.linkedIn}" rel="noopener noreferrer author">LinkedIn</a>. Read more on our <a href="/about-us">About us</a> page and meet the full leadership team: <a href="${TEAM_AUTHORS.zoha.path}">${esc(TEAM_AUTHORS.zoha.name)}</a> and <a href="${TEAM_AUTHORS.raja.path}">${esc(TEAM_AUTHORS.raja.name)}</a>.</p>
</section>
${exploreNav()}`);
}

function authorZohaContent() {
  const a = TEAM_AUTHORS.zoha;
  return mainWrap(`<h1>${esc(a.name)}, Co-Founder, ${ORG_NAME}</h1>
<p>I'm ${esc(a.name)}, Co-Founder of <a href="/">${ORG_NAME}</a>. Together with <a href="${TEAM_AUTHORS.armghana.path}">${esc(TEAM_AUTHORS.armghana.name)}</a>, I help steer a small team that builds one thing well: free spin wheels that load instantly, work on any device, and explain how they pick, without logins, paywalls, or hidden scripts.</p>
<p>My work sits at the intersection of product experience and company direction. I focus on what users need when they open a wheel under time pressure: a teacher before period one, a streamer mid-giveaway, a couple deciding where to eat. That means clear defaults, responsive layouts, and specialty pages that answer a real question.</p>
<p>Online Spin Wheel is intentionally narrow in scope. We do not operate unrelated properties. Every roadmap item must earn its place by making the core product more useful or more trustworthy.</p>
<p>We test wheels for even segment distribution across 10,000 automated spins before launch, document randomness on our <a href="/how-randomness-works">how randomness works</a> page, and stamp visible last-updated dates when content changes. <a href="${TEAM_AUTHORS.raja.path}">${esc(TEAM_AUTHORS.raja.name)}</a> leads the content and SEO review that keeps those pages accurate.</p>

<section>
  <h2>Co-Founder responsibilities</h2>
  <ul>
    <li>Set company direction with the CEO: what we build next, what we say no to, and how we stay a one-product team.</li>
    <li>Own user experience: phone, tablet, projector, and livestream layouts that stay clear under time pressure.</li>
    <li>Prioritize the specialty-wheel roadmap so each page solves a real classroom, giveaway, or decision problem.</li>
    <li>Keep trust signals honest: visible mechanics, plain privacy language, and no surprise account walls.</li>
    <li>Coordinate releases with content and SEO so new wheels ship with accurate copy and testing.</li>
    <li>Turn support and community feedback into product improvements that hosts actually need.</li>
  </ul>
</section>

<section>
  <h2>Why we stay focused on one product</h2>
  <p>Spin wheels look simple, but fairness, speed, and clarity compound when you treat them as a full product, not a side widget on a larger agency site. Staying dedicated to Online Spin Wheel lets us ship embeddable tools, classroom spinners, and decision wheels that share one randomness model and one content standard.</p>
  <p>When teachers ask for a classroom spinner or creators need a giveaway wheel, we can respond with a tested page and plain-language instructions instead of a generic template. That focus is a deliberate choice ${esc(TEAM_AUTHORS.armghana.name)} and I made when we started building together.</p>
</section>

<section>
  <h2>Connect</h2>
  <p>Feedback shapes what we build next. Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or connect on <a href="${a.linkedIn}" rel="noopener noreferrer author">LinkedIn</a>. Read the full team story on <a href="/about-us">About us</a> and learn how ${esc(TEAM_AUTHORS.raja.name)} tests every wheel before launch on the <a href="${TEAM_AUTHORS.raja.path}">content team page</a>.</p>
</section>
${exploreNav()}`);
}

function authorAbdalContent() {
  const a = TEAM_AUTHORS.abdal;
  return mainWrap(`<h1>${esc(a.name)}, Social Media Expert, ${ORG_NAME}</h1>
<p>I'm ${esc(a.name)}, Social Media Expert at <a href="/">${ORG_NAME}</a>. I work with <a href="${TEAM_AUTHORS.armghana.path}">${esc(TEAM_AUTHORS.armghana.name)}</a>, <a href="${TEAM_AUTHORS.zoha.path}">${esc(TEAM_AUTHORS.zoha.name)}</a>, and <a href="${TEAM_AUTHORS.raja.path}">${esc(TEAM_AUTHORS.raja.name)}</a> on a small team dedicated solely to this product, helping teachers, streamers, and everyday users discover free spin wheels that are fast, fair, and honest about how they pick.</p>
<p>My role is to grow and serve the community around Online Spin Wheel on the channels where hosts and educators already spend time. That means sharing practical wheel tips, highlighting new specialty wheels, and responding to questions about giveaways, classroom games, and fair random picks, always pointing people to the live tool and our guides rather than hype.</p>
<p>Social content follows the same standards as the rest of the site. I do not overpromise what the wheels do, I link to our <a href="/how-randomness-works">how randomness works</a> page when fairness comes up, and I coordinate with ${esc(TEAM_AUTHORS.raja.name)} on published copy so posts match what the product actually ships.</p>

<section>
  <h2>What I focus on</h2>
  <ul>
    <li>Brand social channels: Instagram, X, YouTube, and Pinterest for Online Spin Wheel.</li>
    <li>Community engagement: answering questions from teachers, streamers, and small businesses using the wheels.</li>
    <li>Sharing useful content: wheel tips, new specialty pages, and links to guides on the <a href="/blog">blog</a>.</li>
    <li>Coordinating launches with the team so social posts align with tested wheels and accurate copy.</li>
    <li>Listening for feedback that should reach product and content, new wheel ideas, accessibility requests, or confusing instructions.</li>
  </ul>
</section>

<section>
  <h2>How social fits the team</h2>
  <p>${esc(TEAM_AUTHORS.armghana.name)} sets product direction; ${esc(TEAM_AUTHORS.zoha.name)} shapes user experience and roadmap priorities; ${esc(TEAM_AUTHORS.raja.name)} owns content, SEO, and the 10,000-spin testing checklist. My job is to carry that same honesty and clarity onto social platforms, no fake urgency, no misleading claims about randomness, and always a path back to the free tool on <a href="/">onlinespinwheel.fun</a>.</p>
  <p>When we publish a new specialty wheel or a guide like the <a href="/spin-wheel-fairness-study">fairness study</a>, I help make sure the community hears about it in a way that matches what is actually on the page. That keeps trust high for classrooms running live picks and creators running giveaways.</p>
</section>

<section>
  <h2>Connect</h2>
  <p>Find Online Spin Wheel on <a href="https://www.instagram.com/onlinespinwheel/" rel="noopener noreferrer">Instagram</a>, <a href="https://x.com/onlinespinwheel" rel="noopener noreferrer">X</a>, <a href="https://www.youtube.com/@OnlineSpinWheel" rel="noopener noreferrer">YouTube</a>, and <a href="https://www.pinterest.com/onlinespinwheel/" rel="noopener noreferrer">Pinterest</a>. Ideas for posts, collaborations, or community features? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a> or connect on <a href="${a.linkedIn}" rel="noopener noreferrer author">LinkedIn</a>. Read the full team story on <a href="/about-us">About us</a>.</p>
</section>
${exploreNav()}`);
}

function authorContent() {
  const a = TEAM_AUTHORS.raja;
  return mainWrap(`<h1>${esc(a.name)}, Content &amp; SEO Lead, ${ORG_NAME}</h1>
<p>I'm ${esc(a.name)}, Content &amp; SEO Lead at <a href="/">${ORG_NAME}</a>. I work with <a href="${TEAM_AUTHORS.armghana.path}">${esc(TEAM_AUTHORS.armghana.name)}</a> and <a href="${TEAM_AUTHORS.zoha.path}">${esc(TEAM_AUTHORS.zoha.name)}</a> on a small team dedicated solely to this product, free spin wheels that are fast, honest, and privacy-respecting for teachers, creators, and small businesses worldwide.</p>
<p>I own the words on the site: specialty wheel copy, comparison guides, blog posts, and the SEO structure that helps people find the right tool. Before a page ships, I check that it answers a real use case, links to the live wheel, and does not overpromise what the software does.</p>
<p>Fairness is measured, not assumed. Before any wheel goes live, I run automated checks across 10,000 spins to confirm each equal-sized segment wins at the same rate. Randomness comes from the browser's secure generator, not a simple predictable formula, and entries you type stay on your device. I document that mechanism on the <a href="/how-randomness-works">how randomness works</a> page and in our <a href="/spin-wheel-fairness-study">fairness study</a>.</p>
<p>When I update a tool page or guide, I refresh its visible last-updated date. Editorial corrections and bug reports go to <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>, include the page URL and what you expected versus what happened.</p>

<section>
  <h2>How I work on the team</h2>
  <ul>
    <li>Write and review wheel pages, guides, and blog posts for accuracy and clarity.</li>
    <li>Test each wheel for uniform distribution across 10,000 automated spins before launch.</li>
    <li>Use cryptographically secure randomness and keep processing on the user's device.</li>
    <li>Maintain server-rendered, structured content so pages stay accessible.</li>
    <li>Refresh visible last-updated dates when published content changes.</li>
  </ul>
</section>

<section>
  <h2>Content and SEO responsibilities</h2>
  <p>I structure specialty wheel pages so each one answers a specific search intent, random name picker, classroom spinner, yes-or-no decision, giveaway wheel, with a direct answer, FAQs, and a link to the live tool. Comparison guides and case studies explain when a spin wheel beats ad-hoc methods without inventing features the app does not have.</p>
  <p>Blog posts cover classroom games, office icebreakers, and fair giveaway practices. Article schema lists me as author; the site publisher is ${ORG_NAME} as an organization. I coordinate with ${esc(TEAM_AUTHORS.armghana.name)} on launch timing and with ${esc(TEAM_AUTHORS.zoha.name)} on whether a new page improves the core experience.</p>
</section>

<section>
  <h2>Connect</h2>
  <p>Read the <a href="/blog">Online Spin Wheel blog</a>, learn more on the <a href="/about-us">About us</a> page, or connect on <a href="${a.linkedIn}" rel="noopener noreferrer author">LinkedIn</a>. Follow the project on <a href="https://www.instagram.com/onlinespinwheel/" rel="noopener noreferrer">Instagram</a>, <a href="https://x.com/onlinespinwheel" rel="noopener noreferrer">X</a>, <a href="https://www.youtube.com/@OnlineSpinWheel" rel="noopener noreferrer">YouTube</a>, or <a href="https://www.pinterest.com/onlinespinwheel/" rel="noopener noreferrer">Pinterest</a>.</p>
</section>
${exploreNav()}`);
}

/* ---------------------------------------------------------------- Legal ---- */

function legalWrap(h1, sections) {
  return mainWrap(`<h1>${esc(h1)}</h1>
${sections}
${exploreNav()}`);
}

function privacyContent() {
  return legalWrap("Privacy Policy", `<p>This Privacy Policy describes how ${ORG_NAME} ("we", "us", or "our") collects, uses, and protects information when you use our website and tools at <a href="https://onlinespinwheel.fun">https://onlinespinwheel.fun</a>. ${ORG_NAME} is the data controller for this site. By using our website, you agree to the collection and use of information in accordance with this policy.</p>
<section><h2>Information we collect</h2><p>Because Online Spin Wheel works directly in your browser, the inputs you type into the wheel (names, numbers, prizes) stay on your local device and are not collected by our servers. To keep the site running and serve relevant advertisements, we collect log data (IP address, browser type and version, pages visited, and time and date of visit), device information (operating system and unique device identifiers), and contact information (your email and message if you contact us).</p></section>
<section><h2>Cookies and web beacons</h2><p>We use cookies and similar technologies (web beacons and pixels): essential cookies necessary for the site to function, analytical/performance cookies to count visitors and see how they move around the site, and targeting/advertising cookies to deliver more relevant ads.</p></section>
<section><h2>Local browser storage</h2><p>To improve your experience without an account, we save a small amount of data in your browser's local storage for wheel entries, your cookie-consent choice, referral attribution, and theme preference. You can clear this data anytime in your browser settings.</p></section>
<section><h2>Contact form processing (Web3Forms)</h2><p>When you submit our contact form, your name, email, and message are sent to Web3Forms so we can receive your inquiry by email. Do not send sensitive personal data through the form.</p></section>
<section><h2>Google Analytics, Consent Mode, and AdSense</h2><p>We use Google Analytics for aggregated traffic insight and Google AdSense for ads and measurement. Google Consent Mode loads advertising and analytics tags with consent defaults set to denied until you accept cookies; your choice updates consent via gtag. Google's DoubleClick DART cookie may serve ads based on your visits; opt out at <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer">policies.google.com/technologies/ads</a>.</p></section>
<section><h2>Do Not Track and Global Privacy Control</h2><p>We do not respond to all Do Not Track signals uniformly. Where supported, we aim to respect Global Privacy Control as a request to limit sale or sharing of personal information.</p></section>
<section><h2>Opting out of personalized advertising</h2><p>Manage cookie preferences and opt out of targeted ads via <a href="https://myadcenter.google.com/" rel="noopener noreferrer">Google Ads Settings</a>, the <a href="https://optout.networkadvertising.org/" rel="noopener noreferrer">Network Advertising Initiative</a>, and the <a href="https://optout.aboutads.info/" rel="noopener noreferrer">Digital Advertising Alliance</a>, or disable cookies in your browser.</p></section>
<section><h2>CCPA/CPRA rights (California)</h2><p>California residents have the right to know, the right to delete, the right to opt out of "sale"/sharing, and the right to non-discrimination. We do not sell personal data, though sharing with ad networks may be considered a "sale" under CCPA. Contact us to exercise these rights; we have one month to respond.</p></section>
<section><h2>GDPR rights (EEA/UK)</h2><p>EEA and UK residents have rights to access, rectification, erasure, restriction of processing, objection to processing, and data portability. We rely on your consent (via our cookie banner) to process non-essential advertising cookies, and you can withdraw it at any time.</p></section>
<section><h2>Children's privacy (COPPA)</h2><p>We comply with COPPA and do not knowingly collect personal information from children under 13. If your child has provided personal data, contact us so we can remove it.</p></section>
<section><h2>Changes and contact</h2><p>We may update this policy and will post changes on this page. Questions? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Operated by ${ORG_NAME}. See also our <a href="/terms-and-conditions">Terms</a> and <a href="/disclaimer">Disclaimer</a>.</p></section>`);
}

function cookieContent() {
  return legalWrap("Cookie Policy", `<p>This Cookie Policy explains how ${ORG_NAME} ("we", "us", or "our") uses cookies and similar tracking technologies on <a href="https://onlinespinwheel.fun">https://onlinespinwheel.fun</a>. By using the site, you agree to the use of cookies as described below.</p>
<section><h2>What are cookies?</h2><p>Cookies are small text files stored on your device by websites you visit. They help provide a better, faster, and safer experience, remember preferences, and analyze usage. We also use similar technologies such as web beacons, tracking pixels, and local browser storage.</p></section>
<section><h2>Types of cookies we use</h2><ul>
<li><strong>Strictly necessary</strong>, essential for core operation (session IDs, security tokens); session to 1 year.</li>
<li><strong>Performance &amp; analytics</strong>, Google Analytics (_ga, _gid), aggregated and anonymized; up to 2 years.</li>
<li><strong>Functional</strong>, remember choices like saved wheel entries and preferences; up to 1 year.</li>
<li><strong>Targeting &amp; advertising</strong>, Google AdSense/DoubleClick DART for ads and measurement; up to 13 months.</li>
</ul></section>
<section><h2>Local storage</h2><p>We store wheel entries, your consent choice, theme preference, and basic referral attribution in your browser's local storage. This stays on your device unless you clear site data.</p></section>
<section><h2>Google Consent Mode</h2><p>Analytics and AdSense load with Consent Mode defaults set to denied until you choose Accept or Decline. Personalized ads and ad-related storage apply only after Accept. Our banner is a custom implementation, not a Google-certified CMP for the EEA/UK/CH.</p></section>
<section><h2>Managing cookies</h2><p>Use the consent banner and the footer "Cookie settings" link to accept or decline non-essential cookies anytime; declining limits personalized ads and analytics while the wheel keeps working. You can also clear or block cookies in your browser, and opt out via <a href="https://myadcenter.google.com/" rel="noopener noreferrer">Google Ad Settings</a>, <a href="https://optout.networkadvertising.org/" rel="noopener noreferrer">NAI</a>, and <a href="https://optout.aboutads.info/" rel="noopener noreferrer">DAA</a>. Where supported, we honor Global Privacy Control.</p></section>
<section><h2>Changes and contact</h2><p>We may update this policy to reflect changes in practice or law. Questions? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. For more detail, read our full <a href="/privacy-policy">Privacy Policy</a>.</p></section>`);
}

function termsContent() {
  return legalWrap("Terms and Conditions", `<p>These Terms and Conditions ("Terms") govern your use of the ${ORG_NAME} website and tool at <a href="https://onlinespinwheel.fun">https://onlinespinwheel.fun</a> (the "Site" and "Service"), operated by ${ORG_NAME}. By accessing or using the site, you agree to be bound by these Terms. If you do not agree, you must not use this website.</p>
<section><h2>About the service</h2><p>Online Spin Wheel provides a free, browser-based random picker that lets users add names, numbers, or options to a virtual wheel and spin to generate a random selection, for entertainment, educational, organizational, and general decision-making support.</p></section>
<section><h2>Ad-supported model</h2><p>The Service is 100% free and ad-supported. By using the site you agree we may display third-party advertisements (such as Google AdSense) and use analytics providers, subject to our <a href="/privacy-policy">Privacy Policy</a> and <a href="/cookie-policy">Cookie Policy</a>.</p></section>
<section><h2>Eligibility and acceptable use</h2><ul>
<li><strong>Age requirement:</strong> you must be at least 13 (or your country's minimum) to use the site unsupervised; minors should use it under adult supervision.</li>
<li><strong>Lawful use:</strong> do not use the site for unlawful purposes or submit illegal, harmful, abusive, or hateful content.</li>
<li><strong>No interference:</strong> do not hack, scrape, distribute malware, or reverse-engineer the site.</li>
</ul></section>
<section><h2>Randomness and decision-making</h2><p>We use cryptographically secure seeds to simulate true randomness and real-world physics. The Service is provided "as is"; we do not guarantee suitability for high-stakes, legally binding, or financial decisions. You are solely responsible for how you use the results, and we are not liable for disputes or outcomes arising from them.</p></section>
<section><h2>No accounts and user content</h2><p>No account is required. Text you enter is processed locally in your browser and is your responsibility; avoid entering sensitive information. Feedback you email us grants Raja Jahangir a non-exclusive, worldwide, royalty-free license to use it to improve the Service.</p></section>
<section><h2>Intellectual property</h2><p>Unless stated otherwise, all content, interface, design, text, graphics, logos, physics engine, and code, is owned by Raja Jahangir and protected by law. You may not copy, modify, distribute, sell, or lease any part of the site, but you may display it on your devices, share screen recordings, or live-stream the wheel as part of normal use.</p></section>
<section><h2>Warranties and liability</h2><p>The Service is provided "AS IS" and "AS AVAILABLE" without warranties of any kind. To the fullest extent permitted by law, Raja Jahangir disclaims all warranties and will not be liable for indirect, incidental, special, consequential, or punitive damages. You agree to indemnify Online Spin Wheel and Raja Jahangir against claims arising from your use or violations of these Terms.</p></section>
<section><h2>Governing law, changes, and contact</h2><p>These Terms are governed by the laws of Pakistan, with disputes resolved in the courts of Islamabad, Pakistan. We may update these Terms at any time; continued use constitutes acceptance. Questions? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. This site is operated by ${ORG_NAME}.</p></section>`);
}

function disclaimerContent() {
  return legalWrap("Disclaimer", `<p>The information and tools provided by ${ORG_NAME} ("we", "us", or "our") on <a href="https://onlinespinwheel.fun">https://onlinespinwheel.fun</a> are for general informational, educational, and entertainment purposes only. All information and services are provided in good faith; however, we make no representation or warranty regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any tool or information on the site.</p>
<section><h2>"As-is" and entertainment purpose only</h2><p>Online Spin Wheel is a fun, interactive decision-making tool. While we use cryptographically secure algorithms to keep the wheel mathematically fair, the service is provided on an "as-is" and "as-available" basis. It is intended for low-stakes, everyday choices (classroom activities, giveaways, game nights) and should not be used for high-stakes, legally binding, or financial decisions. Any reliance on the results is at your own risk.</p></section>
<section><h2>Advertising and ad-network disclaimer</h2><p>To keep the tool free, the site is ad-supported and partners with third-party networks including Google AdSense. The presence of an advertisement is not an endorsement, we do not control which specific ads are served, and any interactions or purchases with advertisers are solely between you and the advertiser.</p></section>
<section><h2>External links disclaimer</h2><p>The site may link to other websites or third-party content that we do not investigate, monitor, or check for accuracy. We do not endorse or assume responsibility for third-party sites and are not a party to any transaction between you and third-party providers.</p></section>
<section><h2>Limitation of liability and user responsibility</h2><p>Under no circumstances shall Raja Jahangir be liable for any loss or damage arising from use of the site, reliance on its information, or outcomes decided by the wheel. We do not store the data you input on our servers, all processing is local to your browser, and you are responsible for the content you enter and any disputes arising from results.</p></section>
<section><h2>Contact</h2><p>Questions about this Disclaimer? Email <a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a>. Operated by ${ORG_NAME}. See also our <a href="/terms-and-conditions">Terms</a> and <a href="/privacy-policy">Privacy Policy</a>.</p></section>`);
}

/* ------------------------------------------ How randomness works ----------- */

function howRandomnessWorksContent() {
  return mainWrap(`<h1>How Randomness Works on Online Spin Wheel</h1>
<p>Every spin on Online Spin Wheel is decided by cryptographically secure randomness generated on your device, not by a predictable pattern or a rigged outcome. This page explains exactly how a winner is chosen, why each entry has an equal chance, and why one spin never influences the next.</p>
<section><h2>Where the randomness comes from</h2><p>When you press spin, the wheel asks your browser for a secure random value, the same kind of randomness browsers use to generate encryption keys and secure session tokens. It draws on your device's hardware entropy, so the value cannot be predicted or reproduced. That matters because a simple built-in random formula is only pseudo-random: it follows a pattern a motivated observer could anticipate. For a fair draw in front of an audience, cryptographic randomness is the honest choice, and it is what we use on every wheel.</p></section>
<section><h2>How that seed becomes a winner</h2><p>The secure random value seeds the wheel's physics: a starting velocity, a friction curve, and a natural deceleration. The wheel is not told the answer in advance and then animated backward, it genuinely spins and slows to a stop, and wherever the pointer lands is the result. The winning entry is simply the segment beneath the pointer. Each segment's probability equals its arc divided by 360 degrees, so when every slice is the same size, every entry has exactly the same chance of being chosen.</p></section>
<section><h2>Why every spin is independent</h2><p>The wheel has no memory. Each spin requests a fresh random seed, so previous results have zero effect on the next outcome. A name that just won is exactly as likely to win again on the following spin, there is no "due" entry and no streak-balancing. This property is called statistical independence, and it is what makes the wheel trustworthy for repeated draws. If you want unique winners across rounds, remove each winner from the wheel after they are picked; otherwise, leaving them in keeps every spin a clean, equal-odds event.</p></section>
<section><h2>Fairness you can verify</h2><p>All of this runs in your browser. Your entries are never sent to a server, so there is no hidden step where an outcome could be edited. Because the spin is visible and continuous, you can screen-record it as proof for a giveaway or classroom draw. Ready to try it? Spin the <a href="/">free online spin wheel</a> on the homepage, or browse the <a href="/all-spin-wheels">full specialty wheel directory</a>. The same fair randomness powers every wheel on the site, from the <a href="/random-name-picker-wheel">random name picker wheel</a> to the <a href="/winner-picker-wheel">winner picker wheel</a>.</p></section>
${exploreNav()}`);
}

/* ----------------------------------------------- Tutorials / guides -------- */

function tutorialAddingImagesContent() {
  return mainWrap(`<h1>How to Add Images to Spin Wheels</h1>
<p>Adding images to a spin wheel turns a plain list of text into a vivid, memorable experience, ideal for classrooms, branded giveaways, and events. This tutorial walks through when to use images, how to prepare them, and how to keep the wheel readable and fair.</p>
<section><h2>Why add images?</h2><p>Images help participants recognize options at a glance, reinforce a brand with logos, and make the wheel more engaging on a projector or live stream. For young learners, pictures support pre-readers; for giveaways, product photos make prizes tangible.</p></section>
<section><h2>Prepare your images</h2><ul>
<li>Use square images so they sit evenly within each segment.</li>
<li>Keep files small (compressed PNG or JPEG) so the wheel loads quickly.</li>
<li>Favor simple, high-contrast visuals that stay clear at small sizes.</li>
<li>Pair each image with a short text label for accessibility.</li>
</ul></section>
<section><h2>Step-by-step</h2><ol>
<li>Add your entries to the wheel first, one per line.</li>
<li>Open the customize panel and upload an image for each segment.</li>
<li>Adjust colors so labels stay legible over the imagery.</li>
<li>Keep the number of segments reasonable (around a dozen) so each image is large enough to see.</li>
<li>Test a few spins before your live event to confirm everything renders correctly.</li>
</ol></section>
<section><h2>Ideas by use case</h2>
<p>Images unlock different value depending on your audience:</p>
<ul>
<li><strong>Classrooms:</strong> pair each student's name with an avatar or a subject icon so pre-readers and visual learners can follow along on the smartboard.</li>
<li><strong>Giveaways:</strong> show product photos or prize tiers so viewers immediately understand what is at stake during a live draw.</li>
<li><strong>Events and booths:</strong> add sponsor logos to reinforce partnerships every time the wheel spins on a big screen.</li>
<li><strong>Family game night:</strong> use playful icons for chores, snacks, or activities to keep younger players engaged.</li>
</ul></section>
<section><h2>File formats and performance</h2><p>PNG works best for logos and graphics with transparency, while JPEG is ideal for photographs. Resize images to roughly the segment size before uploading so the page stays fast, especially on mobile connections. Because everything runs in your browser, smaller files mean smoother animation and quicker load times.</p></section>
<section><h2>Troubleshooting</h2><p>If an image looks cropped, switch to a square source so it fits the segment. If labels become hard to read over busy imagery, choose a darker or lighter segment color for contrast, or simplify the image. If the wheel feels sluggish, reduce the number of image-heavy segments or compress the files. Always run a couple of test spins on the same device you'll use live.</p></section>
<section><h2>Best practices</h2><p>Balance visuals with clarity: too many detailed images crowd the wheel. Use consistent framing, avoid tiny text baked into images, and keep a plain-text fallback for accessibility so screen readers and search engines still understand each option. For fairness, remember that images are purely visual, every equal-sized segment still has the same probability of being chosen, so decorating the wheel never changes the odds.</p></section>
<section><h2>Try it with these wheels</h2><ul>
<li><a href="/random-name-picker-wheel">Random name picker wheel</a></li>
<li><a href="/winner-picker-wheel">Winner picker wheel</a></li>
<li><a href="/team-generator-wheel">Team generator wheel</a></li>
</ul></section>
${exploreNav()}`);
}

function caseStudySchoolContent() {
  return mainWrap(`<h1>Case Study: A School Using Spin Wheels</h1>
<p>This case study looks at how a school adopted digital spin wheels for fair student selection and classroom engagement, and the practical results teachers reported.</p>
<section><h2>The challenge</h2><p>Teachers wanted to call on students evenly, avoid the perception of favoritism, and keep energy high during routine tasks like reading aloud, answering questions, and forming groups. Paper slips were slow and easy to lose, and always calling on the same eager students left others disengaged.</p></section>
<section><h2>The approach</h2><p>Staff displayed a <a href="/random-student-picker">random student picker</a> on the classroom smartboard. Each class list was entered once and reused daily. For group work, teachers used the <a href="/team-generator-wheel">team generator wheel</a> to split students into balanced teams in seconds.</p></section>
<section><h2>What changed</h2><ul>
<li>Participation rose because every student knew their name could come up next.</li>
<li>Complaints about fairness dropped, since selection was visibly random.</li>
<li>Transitions were faster, forming groups took seconds instead of minutes.</li>
<li>Routine tasks felt like a game, improving focus and mood.</li>
</ul></section>
<section><h2>How the rollout worked</h2><p>Adoption was gradual and low-risk. One teacher tried the picker for a single class period, shared the results with colleagues, and within a few weeks it became a shared routine across grade levels. Because the tool runs in any browser with no installation, accounts, or student data collection, IT approval was straightforward and there was nothing to maintain. Teachers bookmarked the wheels they used most and kept class lists ready to paste in each morning.</p></section>
<section><h2>Measuring the impact</h2><p>Staff noticed the difference in ordinary, day-to-day moments rather than in a formal study. Quieter students spoke up more often because selection was clearly out of the teacher's hands. Group formation, which used to spark negotiation, became neutral and quick. And the novelty of a spinning wheel added a small burst of energy to review sessions, spelling practice, and presentation ordering.</p></section>
<section><h2>Tips for teachers</h2><p>Save class lists for reuse, remove a student after they are selected if you want everyone to get a turn, and keep labels short so names are readable from the back of the room. Explain the rules before spinning so students trust the process. For younger classes, add small images to each name to support pre-readers, and consider a separate wheel of tasks or topics to pair with the name wheel.</p></section>
<section><h2>Related tools</h2><ul>
<li><a href="/random-student-picker">Random student picker</a></li>
<li><a href="/alphabet-spinner-wheel">Alphabet spinner wheel</a></li>
<li><a href="/random-word-generator-wheel">Random word generator wheel</a></li>
<li><a href="/team-generator-wheel">Team generator wheel</a></li>
</ul></section>
${exploreNav()}`);
}

function caseStudyCommunityContent() {
  return mainWrap(`<h1>Case Study: A Community Event Using Spin Wheels</h1>
<p>This case study describes how organizers of a community event used spin wheels for transparent raffles and fair participant selection, building trust with attendees.</p>
<section><h2>The challenge</h2><p>The event ran several prize draws and needed a way to pick winners that everyone could see was fair. Drawing names from a box raised questions, and manual selection risked accusations of bias among a large, engaged crowd.</p></section>
<section><h2>The approach</h2><p>Organizers projected a <a href="/winner-picker-wheel">winner picker wheel</a> on the main screen. Ticket numbers or names were pasted in, and the wheel was spun live so the audience watched the result in real time. For repeat draws, winners were removed so no one won twice.</p></section>
<section><h2>What changed</h2><ul>
<li>Trust improved because draws happened openly on a big screen.</li>
<li>Winners were selected in seconds, keeping the event moving.</li>
<li>Recordings of each spin provided a clear, shareable record.</li>
<li>Volunteers needed no special training to run the draws.</li>
</ul></section>
<section><h2>Setting it up on the day</h2><p>Preparation was minimal. Organizers opened the wheel on a laptop connected to the venue projector, pasted in the ticket numbers or attendee names, and did a quick practice spin before doors opened. Because the tool is free and browser-based, there was no software to install and no risk of a licensing surprise mid-event. A volunteer could take over the draws with sixty seconds of instruction.</p></section>
<section><h2>Handling multiple prize tiers</h2><p>For events with several prizes, organizers ran the wheel once per tier, removing each winner before the next spin so no one could win twice. When they wanted a grand-prize finale, they kept that draw for last and let the crowd count down the spin together. This kept the pacing lively and made the biggest moment feel earned and transparent.</p></section>
<section><h2>Tips for organizers</h2><p>Announce the rules before each draw, show the full wheel on screen, and keep a simple list of winners for your records. Test the wheel and your projector beforehand, keep entries readable by using short labels, and have a backup device on hand. If you plan to post proof afterward, record the screen during each spin so the fairness of the process is easy to share.</p></section>
<section><h2>Related tools</h2><ul>
<li><a href="/winner-picker-wheel">Winner picker wheel</a></li>
<li><a href="/random-name-picker-wheel">Random name picker wheel</a></li>
<li><a href="/pick-out-of-a-hat-generator">Pick out of a hat generator</a></li>
<li><a href="/instagram-wheel-picker">Instagram wheel picker</a></li>
</ul></section>
${exploreNav()}`);
}

function comparisonRngContent() {
  return mainWrap(`<h1>Spin Wheel vs Random Number Generator</h1>
<p>Both a spin wheel and a random number generator (RNG) produce fair, unbiased results, the difference is how they feel and how visible they are to an audience. This comparison helps you choose the right tool for the job.</p>
<section><h2>Feature comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Spin wheel</th><th>Random number generator</th></tr></thead>
<tbody>
<tr><td>Shows all options before the draw</td><td>Yes, labeled slices</td><td>No, one number only</td></tr>
<tr><td>Group can watch the selection</td><td>Yes, spin animation</td><td>Only if you show the screen</td></tr>
<tr><td>Works with names without numbering</td><td>Yes, paste labels</td><td>Requires mapping names to IDs</td></tr>
<tr><td>Typical speed</td><td>3–60 seconds per spin</td><td>Instant</td></tr>
<tr><td>Crypto RNG (this site)</td><td>Yes</td><td>Yes, on our number wheel</td></tr>
<tr><td>Shareable proof link</td><td>Yes, winner/raffle wheels</td><td>Not built-in</td></tr>
</tbody>
</table></section>
<section><h2>How each works</h2><p>A plain random-number tool returns a number instantly with no animation. A spin wheel maps your entries to segments and uses randomness plus a physics simulation to land on one visibly. Under the hood, Online Spin Wheel uses the same secure browser randomness as a quality random-number tool, so fairness is equivalent.</p></section>
<section><h2>Engagement and transparency</h2><p>The wheel's biggest advantage is visibility. When you spin live on screen, participants watch the selection happen, which builds trust for giveaways, classrooms, and events. A raw number appears with no suspense and no obvious proof of fairness to onlookers.</p></section>
<section><h2>When to use which</h2><ul>
<li><strong>Use a spin wheel</strong> for audiences, giveaways, classrooms, streams, and any moment where showing fairness matters.</li>
<li><strong>Use a plain RNG</strong> for silent, high-volume, or programmatic number generation where animation is unnecessary.</li>
</ul></section>
<section><h2>Practical examples</h2><p>Imagine a teacher who needs to pick one of thirty students. A raw RNG returns "17," and the class must trust that number maps to the right person. A spin wheel shows the student's name land under the pointer, so there is nothing to interpret and nothing to doubt. Now imagine a developer seeding a simulation with a million random values, here a wheel would be pointless, and a direct RNG call is exactly right. Matching the tool to the moment is the whole decision.</p></section>
<section><h2>Speed, accessibility, and cost</h2><p>Both tools are instant and free on Online Spin Wheel. The wheel adds a short, deliberate animation that builds anticipation; the RNG is silent and immediate. For accessibility, the wheel pairs each result with a clear text label and announcement, while a plain number is inherently simple. Neither requires an account, and neither stores your entries on a server.</p></section>
<section><h2>Fairness notes</h2><p>With equal-sized segments, every entry on the wheel has exactly the same probability (its arc divided by 360°), and the seed comes from cryptographically secure randomness. A good RNG offers the same statistical fairness, the two are equivalent in outcome and differ only in presentation. If you need pure numbers with a visual flourish, our <a href="/random-number-wheel">random number wheel</a> combines RNG fairness with the appeal of a spin.</p></section>
<section><h2>Related tools</h2><ul>
<li><a href="/random-number-wheel">Random number wheel</a></li>
<li><a href="/random-name-picker-wheel">Random name picker wheel</a></li>
<li><a href="/yes-or-no-wheel">Yes or no wheel</a></li>
</ul></section>
${exploreNav()}`);
}

function comparisonTraditionalContent() {
  return mainWrap(`<h1>Spin Wheel vs Traditional Random Methods</h1>
<p>Hats full of paper slips, rolling dice, and flipping coins have decided outcomes for generations. An online spin wheel modernizes those methods while keeping them fair. Here's how they compare.</p>
<section><h2>Feature comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Digital spin wheel</th><th>Hat / straws / coins</th></tr></thead>
<tbody>
<tr><td>Audience sees every option</td><td>Yes, on screen</td><td>Often hidden in container</td></tr>
<tr><td>Setup for 30+ names</td><td>Paste list, seconds</td><td>Write/cut slips, minutes</td></tr>
<tr><td>Works on Zoom / hybrid</td><td>Yes, screen share</td><td>Awkward remotely</td></tr>
<tr><td>Audit trail / proof link</td><td>Yes, on this site</td><td>Manual video only</td></tr>
</tbody>
</table></section>
<section><h2>Names in a hat</h2><p>Drawing from a hat is familiar but slow: you write every slip, folding can bias which is grabbed, and slips get lost. A spin wheel accepts a pasted list instantly, can't be "felt for," and reuses the same entries next time. Our <a href="/pick-out-of-a-hat-generator">pick out of a hat generator</a> recreates the tradition digitally.</p></section>
<section><h2>Dice and coins</h2><p>Dice and coins are great for a handful of outcomes but don't scale, you can't map 30 students to a coin. A wheel handles any number of custom options and shows the result clearly. For simple binaries, the <a href="/yes-or-no-wheel">yes or no wheel</a> and <a href="/coin-flip-wheel">coin flip wheel</a> keep the ritual while adding visibility.</p></section>
<section><h2>Comparison at a glance</h2><ul>
<li><strong>Speed:</strong> wheel is instant; physical methods take setup time.</li>
<li><strong>Scale:</strong> wheel handles many custom entries; dice/coins do not.</li>
<li><strong>Transparency:</strong> a live on-screen spin is easy for audiences to trust.</li>
<li><strong>Reusability:</strong> save and reuse lists with no materials to manage.</li>
</ul></section>
<section><h2>Fairness and bias</h2><p>Traditional methods can drift toward bias in subtle ways. Folded slips vary in size, a "shuffled" hat still favors whatever sits on top, and a well-worn die or coin can land unevenly. A digital wheel removes these physical variables: each equal-sized segment has exactly the same probability, drawn from cryptographically secure randomness, no matter how many times you spin. That consistency is what makes an on-screen result easy to defend when someone asks whether the draw was truly fair.</p></section>
<section><h2>A quick decision guide</h2><p>Choose the method that fits the moment. If you are teaching a lesson about probability with tangible objects, dice and coins are perfect teaching aids. If you are settling a debate over dinner with a friend, a coin flip is charming. But if you need to pick fairly from a long list, prove the process to an audience, or repeat draws quickly without materials, the online wheel is the clear winner.</p></section>
<section><h2>When tradition still wins</h2><p>Physical methods shine when no screen is available or when the tactile ritual is part of the fun. For everything else, classrooms, giveaways, and remote teams, a spin wheel is faster, fairer to verify, and endlessly reusable.</p></section>
<section><h2>Related tools</h2><ul>
<li><a href="/coin-flip-wheel">Coin flip wheel</a></li>
<li><a href="/random-name-picker-wheel">Random name picker wheel</a></li>
<li><a href="/team-generator-wheel">Team generator wheel</a></li>
<li><a href="/pick-out-of-a-hat-generator">Pick out of a hat generator</a></li>
</ul></section>
${exploreNav()}`);
}

function comparisonPhysicalContent() {
  return mainWrap(`<h1>Online vs Physical Spin Wheels</h1>
<p>Physical prize wheels are eye-catching at fairs and stores, but online spin wheels win on portability, cost, and customization. This comparison covers when each makes sense.</p>
<section><h2>Feature comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Online spin wheel</th><th>Physical prize wheel</th></tr></thead>
<tbody>
<tr><td>Upfront cost</td><td>Free</td><td>Often $50–$500+</td></tr>
<tr><td>Change options between rounds</td><td>Type new list, seconds</td><td>Repaint or re-label</td></tr>
<tr><td>Remote / hybrid events</td><td>Screen share or embed</td><td>Camera on booth only</td></tr>
<tr><td>Equal slice probability</td><td>Crypto RNG + equal arcs</td><td>Can drift with wear</td></tr>
<tr><td>Verifiable result link</td><td>Yes, this site</td><td>No</td></tr>
</tbody>
</table></section>
<section><h2>Portability and cost</h2><p>A physical wheel is bulky, single-purpose, and costs money to buy and store. An online wheel is free, lives in any browser, and travels on your phone or laptop, ready for a classroom, a video call, or a pop-up event with no shipping or setup.</p></section>
<section><h2>Customization</h2><p>Repainting a physical wheel for a new set of options is impractical. Online, you retype entries in seconds, change colors, add images, and reuse saved lists. You can run a <a href="/winner-picker-wheel">winner picker wheel</a> one minute and a <a href="/random-name-picker-wheel">random name picker</a> the next.</p></section>
<section><h2>Fairness</h2><p>Physical wheels can develop bias from wear, uneven weighting, or a practiced hand. An online wheel's outcome comes from cryptographically secure randomness with equal-probability segments, so results stay fair over unlimited spins.</p></section>
<section><h2>Accessibility and audience reach</h2><p>An online wheel reaches everyone who has a link, not just the people standing at a booth. It scales from a single classroom to a global live stream, works on the device each person already owns, and pairs every result with a readable text label for screen readers and captions. A physical wheel is limited to the room it occupies and the people who can see it spin, which caps how many participants a single draw can include.</p></section>
<section><h2>Durability and maintenance</h2><p>A physical wheel is a mechanical object: bearings wear, labels fade, and a dropped wheel can be knocked out of balance. Keeping one event-ready means storage space, transport, and occasional repair. An online wheel has none of these costs. It is always the latest version, never runs out of a consumable, and can be duplicated instantly for a second room or a second facilitator.</p></section>
<section><h2>Sharing and proof</h2><p>Online wheels are easy to share and to prove. You can screen-record a spin for a social giveaway, embed the moment in a live stream, or send a link so a remote colleague runs the draw. A physical wheel can be filmed too, but it cannot be shared as a link, reused with new options in seconds, or verified with the same equal-probability math behind every result.</p></section>
<section><h2>When a physical wheel wins</h2><ul>
<li>In-person spectacle at booths where a tactile spin draws a crowd.</li>
<li>Venues without a screen or reliable internet.</li>
<li>Brand installations where the physical object is part of the experience.</li>
</ul></section>
<section><h2>Related tools</h2><ul>
<li><a href="/winner-picker-wheel">Winner picker wheel</a></li>
<li><a href="/instagram-wheel-picker">Instagram wheel picker</a></li>
<li><a href="/all-spin-wheels">Browse all spin wheels</a></li>
</ul></section>
${exploreNav()}`);
}

function wheelOfNamesAlternativeContent() {
  return mainWrap(`<h1>Online Spin Wheel, Feature Comparison</h1>
<p>See how Online Spin Wheel compares with other free online pickers and spinner apps, what we include by default, and what often varies elsewhere.</p>
<p>Online Spin Wheel is a free browser spinner for classrooms, meetings, and giveaways. Beyond a basic name list, we ship specialty pages for <a href="/raffle-wheel">raffles</a>, <a href="/prize-wheel">prize spins</a>, and a <a href="/classroom-spinner">classroom hub</a>, all without signup, with entries processed on your device. Try our <a href="/random-name-picker-wheel">random name picker wheel</a> for a direct name-list spinner.</p>

<section><h2>Feature comparison</h2>
<table>
<thead><tr><th>Feature</th><th>Online Spin Wheel (Us)</th><th>Others</th></tr></thead>
<tbody>
<tr><td>Account required</td><td>No</td><td>Varies, some require signup for extra entries or saving</td></tr>
<tr><td>Entries stay on your device</td><td>Yes, browser-only processing</td><td>Varies, some process/store entries on a server</td></tr>
<tr><td>Image slices on wheel</td><td>Yes</td><td>Varies</td></tr>
<tr><td>Specialty tool pages (40+)</td><td>Yes, raffles, classrooms, prizes</td><td>Typically a single generic wheel</td></tr>
<tr><td>Multi-winner + proof link</td><td>Yes, raffle &amp; winner wheels</td><td>Often manual remove-after-spin</td></tr>
<tr><td>Classroom hub (picker + teams + timer)</td><td>Yes, classroom spinner page</td><td>Often name picker only</td></tr>
<tr><td>Ticket-number raffle mode</td><td>Yes, raffle wheel</td><td>Often requires manual numeric entries</td></tr>
</tbody>
</table>
</section>

<section><h2>Best for Online Spin Wheel</h2>
<ul>
<li>Teachers who want picker + teams + timer in one tab</li>
<li>Giveaway hosts who need proof links and ticket-number raffles</li>
<li>Organizers who want 40+ preset specialty wheels beyond names</li>
<li>Anyone who wants entries to stay on their device</li>
</ul>
</section>

<section><h2>When another tool may fit</h2>
<ul>
<li>You only need a single generic name spinner and already prefer that interface.</li>
<li>You need offline spins with no browser tab, check ads and privacy first.</li>
<li>You want account-based cloud saving more than a free browser-only flow.</li>
</ul>
</section>

<section><h2>Related pages</h2><ul>
<li><a href="/raffle-wheel">Raffle wheel</a></li>
<li><a href="/prize-wheel">Prize wheel</a></li>
<li><a href="/classroom-spinner">Classroom spinner</a></li>
<li><a href="/random-name-picker-wheel">Random name picker wheel</a></li>
<li><a href="/all-spin-wheels">All spin wheels</a></li>
</ul></section>

<section itemscope itemtype="https://schema.org/FAQPage" id="faq"><h2>Frequently asked questions</h2>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do I need an account to use Online Spin Wheel?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">No. Core spinning works without signup. Your entries stay in the browser on your device.</p>
</div>
</div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">How is Online Spin Wheel different from a generic name spinner?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Besides a free name picker, we publish 40+ specialty pages, raffles, classroom hubs, prize wheels, plus multi-winner proof links and ticket-number raffle mode.</p>
</div>
</div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Do my names get uploaded to a server?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">No. Entries are processed in your browser and stay on your device.</p>
</div>
</div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Which tool is best for Instagram giveaways?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Look for multi-winner draws and shareable proof links. Our winner picker and raffle wheels support both.</p>
</div>
</div>
<div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
<h3 itemprop="name">Can I import a class list?</h3>
<div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
<p itemprop="text">Yes, paste one name per line (up to 400). The classroom spinner adds remove-after-pick, teams, and a timer.</p>
</div>
</div>
</section>
${exploreNav()}`);
}

function fairnessStudyContent() {
  const study = loadFairnessStudy();
  if (!study) {
    return mainWrap(`<h1>Spin Wheel Fairness Study</h1>
<p>Original data from 100,000 automated equal-slice spin simulations. Run <code>npm run prebuild</code> to generate distribution tables and CSV.</p>
${exploreNav()}`);
  }

  const allPass = study.summaries.every((s) => s.uniformPass);
  const summaryRows = study.summaries
    .map(
      (s) =>
        `<tr><td>${s.segmentCount}</td><td>${s.totalSpins.toLocaleString()}</td><td>${s.chiSquare}</td><td>${s.degreesOfFreedom}</td><td>${s.critical05}</td><td>${s.uniformPass ? "pass" : "review"}</td><td>${s.maxDeviationPct}%</td></tr>`,
    )
    .join("\n");

  const detailSections = study.summaries
    .map((summary) => {
      const rows = summary.distribution
        .map(
          (row) =>
            `<tr><td>${row.segmentIndex}</td><td>${row.observed}</td><td>${row.expected}</td><td>${row.deviationPct}%</td></tr>`,
        )
        .join("\n");
      return `<section><h2>${summary.segmentCount} segments, ${summary.totalSpins.toLocaleString()} spins</h2>
<p>χ² = ${summary.chiSquare} (df = ${summary.degreesOfFreedom}, critical 0.05 = ${summary.critical05}), ${summary.uniformPass ? "uniform (pass)" : "review needed"} · max deviation ${summary.maxDeviationPct}%</p>
<table>
<thead><tr><th>Slice index</th><th>Observed</th><th>Expected</th><th>Deviation %</th></tr></thead>
<tbody>${rows}</tbody>
</table></section>`;
    })
    .join("\n");

  return mainWrap(`<h1>Spin Wheel Fairness Study, 100,000 Spins</h1>
<p>We ran ${study.totalSpins.toLocaleString()} automated spins on equal-size wheel slices using the same landing-angle geometry as our live <a href="/">spin wheel</a>. Each configuration was tested for uniform distribution with Pearson's chi-square at α = 0.05. Download the CSV to cite or reproduce the results.</p>
<section><h2>Summary</h2>
<ul>
<li>Total spins: ${study.totalSpins.toLocaleString()}</li>
<li>Spins per segment count: ${study.spinsPerConfig.toLocaleString()}</li>
<li>Segment counts tested: ${study.segmentCounts.join(", ")}</li>
<li>Method: ${esc(study.method)}</li>
<li>Uniformity result: ${allPass ? "All configurations passed χ² at α = 0.05" : "See tables below"}</li>
<li>Data as of: ${study.generatedAt}</li>
<li><a href="${study.csvUrl}">Download CSV</a> (${study.totalSpins.toLocaleString()} spin rows)</li>
</ul>
<table>
<thead><tr><th>Segments</th><th>Spins</th><th>χ²</th><th>df</th><th>Critical 0.05</th><th>Result</th><th>Max deviation</th></tr></thead>
<tbody>${summaryRows}</tbody>
</table></section>
<section><h2>Methodology</h2>
<p>For each segment count k, we simulated ${study.spinsPerConfig.toLocaleString()} independent spins. Each spin drew a landing angle with the same secure browser randomness used in production, then mapped the angle to a slice index using the same equal-arc formula as the live wheel (pointer on the right).</p>
<p>Expected count per slice is n/k. We computed Pearson's chi-square statistic χ² = Σ(O−E)²/E with k−1 degrees of freedom and compared to the α = 0.05 critical value. Configurations with χ² ≤ critical value are consistent with a uniform distribution.</p>
<p>This study does not cover weighted slices, removed entries mid-session, or human timing, only equal segments and cryptographic landing angles.</p>
</section>
${detailSections}
<section><h2>Related</h2><ul>
<li><a href="/how-randomness-works">How randomness works</a></li>
<li><a href="/">Free online spin wheel</a></li>
</ul></section>
${exploreNav()}`);
}

/* ----------------------------------------------------------- Blog index ---- */

function blogIndexContent(posts) {
  const items = posts
    .map((p) => {
      const shortTitle = String(p.title || "").split("|")[0].trim();
      return `  <li>
    <h2><a href="/blog/${esc(p.slug)}">${esc(shortTitle)}</a></h2>
    <p>By ${esc(p.author || "Online Spin Wheel")}, last updated ${esc(p.updated || "")}. Read <strong>${esc(shortTitle)}</strong> for step-by-step workflows and linked specialty wheels.</p>
  </li>`;
    })
    .join("\n");

  return mainWrap(`<h1>Online Spin Wheel Blog, Guides &amp; Ideas</h1>
<p>Practical articles on fair random selection for classrooms, teams, couples, and celebrations, powered by Online Spin Wheel. Learn how to run transparent giveaways, energize a classroom, break the ice with remote teams, decide where to eat, and organize a virtual Secret Santa.</p>
<section><h2>What you will find here</h2>
<p>Every article is written for real hosts and teachers who need a fair pick in front of an audience. We cover classroom spin-wheel games, office icebreakers, couple decision rituals, and seasonal giveaways. Each post links to the matching free tool on this site so you can try the idea in the same tab.</p>
<p>Indexed guides below are fully expanded with step-by-step workflows, printable prompts where helpful, and links to specialty wheels such as the <a href="/random-name-picker-wheel">random name picker</a>, <a href="/classroom-spinner">classroom spinner</a>, and <a href="/winner-picker-wheel">winner picker</a>. Draft posts stay out of search until they meet the same depth bar.</p>
<p>New articles focus on classroom fairness, hybrid meeting icebreakers, couple decision rituals, and giveaway transparency. Each post names the exact wheel to open, how many entries to paste, and what to say to the audience before the first spin so nobody doubts the outcome. Start with the indexed guides in the list below.</p>
</section>
<section><h2>Topics we publish</h2>
<ul>
<li><strong>Classrooms:</strong> student pickers, vocabulary games, and fullscreen smartboard setups.</li>
<li><strong>Offices:</strong> icebreaker prompts, hybrid meeting rituals, and fair task assignment.</li>
<li><strong>Couples &amp; friends:</strong> dinner decisions, date ideas, and low-stakes yes-or-no calls.</li>
<li><strong>Giveaways:</strong> transparent winner picks, proof links, and multi-winner raffle flows.</li>
</ul>
<p>Want the tools first? Browse the <a href="/all-spin-wheels">full wheel directory</a> or read <a href="/how-randomness-works">how randomness works</a> before your next live draw.</p>
<p>We publish on a rolling schedule: classroom and giveaway guides ship first, with couple and seasonal posts following once they pass the same editorial bar as our indexed articles. Draft posts remain reachable by URL for internal review but carry <code>noindex</code> until expanded.</p>
</section>
<ul>
${items}
</ul>
${exploreNav()}`);
}

/* ------------------------------------------------------------ Blog post ---- */

function blogPostContent(post) {
  const shortTitle = String(post.title || "").split("|")[0].trim();
  const blocks = Array.isArray(post.blocks) ? post.blocks : [];
  const blockHtml = blocks
    .map((b) => {
      const heading = b.heading
        ? `  <h2>${esc(b.heading)}</h2>\n`
        : "";
      const paras = (Array.isArray(b.paragraphs) ? b.paragraphs : [])
        .map((p) => `  <p>${esc(p)}</p>`)
        .join("\n");
      const list =
        Array.isArray(b.list) && b.list.length
          ? `\n  <ul>\n${b.list.map((li) => `    <li>${esc(li)}</li>`).join("\n")}\n  </ul>`
          : "";
      const images =
        Array.isArray(b.images) && b.images.length
          ? `\n  <figure>\n${b.images
              .map(
                (img) =>
                  `    <img src="${esc(img.src)}" alt="${esc(img.alt)}" loading="lazy" width="800" height="450" />\n    ${img.caption ? `<figcaption>${esc(img.caption)}</figcaption>` : ""}`,
              )
              .join("\n")}\n  </figure>`
          : "";
      const checklist = b.checklist?.items?.length
          ? `\n  <section>\n    <h3>${esc(b.checklist.title || "Checklist")}</h3>\n    <ul>\n${b.checklist.items.map((li) => `      <li>${esc(li)}</li>`).join("\n")}\n    </ul>\n  </section>`
          : "";
      const download = b.download?.href
          ? `\n  <p><a href="${esc(b.download.href)}" download>${esc(b.download.label || "Download")}</a>${b.download.description ? `, ${esc(b.download.description)}` : ""}</p>`
          : "";
      return `${heading}${paras}${list}${images}${checklist}${download}`;
    })
    .join("\n");

  const faqs = Array.isArray(post.faqs) ? post.faqs : [];
  const faqHtml = faqs.length
    ? `<section>
  <h2>Frequently asked questions</h2>
${faqs
  .map((f) => `  <h3>${esc(f.q)}</h3>\n  <p>${esc(f.a)}</p>`)
  .join("\n")}
</section>`
    : "";

  return mainWrap(`<h1>${esc(shortTitle)}</h1>
<p>Written by ${esc(post.author || "Online Spin Wheel")}. Last updated ${esc(post.updated || "")}.</p>
<section>
  <h2>Quick summary</h2>
  <p>${esc(post.excerpt || post.metaDescription || "")}</p>
</section>
${blockHtml}
${faqHtml}
${exploreNav()}`);
}

/* ----------------------------------------------------------- Result proof --- */

function formatProofUtc(ms) {
  return new Date(ms).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

function resultPageContent(proof) {
  if (!proof) {
    return mainWrap(`<h1>Spin result verification</h1>
<p>This verification URL could not be read. Ask the host to generate a new proof link after their spin.</p>
${exploreNav()}`);
  }
  const winners = proof.w.map((w) => `<li>${esc(w)}</li>`).join("\n");
  const wheel =
    proof.s && proof.s !== "legacy"
      ? `<p>Wheel: <a href="/${esc(proof.s)}">/${esc(proof.s)}</a></p>`
      : "";
  return mainWrap(`<h1>Verified spin result</h1>
<p>Read-only proof record encoded in this link, no account lookup.</p>
<ul>
${winners}
</ul>
<p>Entries in pool: ${esc(String(proof.n))}</p>
<p>Drawn (UTC): ${esc(formatProofUtc(proof.t))}</p>
<p>Randomness method: ${esc(proof.m === "crypto-rng" ? "Secure browser randomness (cryptographic)" : String(proof.m))}</p>
${wheel}
${exploreNav()}`);
}

/* ------------------------------------------------- Wheel pages & hub ------- */

function wheelLabel(w) {
  return w.keywordPrimary || w.h1 || w.title || w.slug;
}

function listHtml(items) {
  return `<ul>\n${items.map((i) => `  <li>${esc(i)}</li>`).join("\n")}\n</ul>`;
}

function relatedWheels(wheel, wheels, count = 6) {
  const same = wheels.filter(
    (w) => w.slug !== wheel.slug && w.category === wheel.category,
  );
  const rest = wheels.filter(
    (w) => w.slug !== wheel.slug && w.category !== wheel.category,
  );
  return [...same, ...rest].slice(0, count);
}

function relatedWheelLinksFromUnique(wheel, wheels, count = 6) {
  const unique = getWheelUniqueContent(wheel.slug);
  if (unique?.relatedWheels?.length) {
    return unique.relatedWheels.slice(0, count).map(({ slug, anchor }) => ({
      slug,
      anchor,
    }));
  }
  return relatedWheels(wheel, wheels, count).map((w) => ({
    slug: w.slug,
    anchor: wheelLabel(w),
  }));
}

function wheelOgImagePath(slug) {
  return `/og/${slug}.png`;
}

/** Real tool behavior described in SSR for differentiated wheels (Phase 5.6). */
const WHEEL_MODE_FEATURES = {
  "team-generator-wheel":
    "Paste participant names and choose how many teams you need. The generator shuffles the roster and distributes names in round-robin order so squad sizes stay balanced within one person, ideal for PE classes, office icebreakers, and gaming squads.",
  "secret-santa-wheel-generator":
    "Run a full Secret Santa assignment with optional exclusion pairs (spouses, roommates). Each participant gets a private reveal link they can open without seeing anyone else's match.",
  "random-number-wheel":
    "Set a minimum and maximum, toggle no-repeat mode to avoid duplicate draws, and pick a random integer in range. Small ranges also display on the visual wheel; large ranges show a bold numeric result.",
  "random-student-picker":
    "Built for US classrooms: enable remove-after-pick so called-on students drop from the pool, review session history for subs, and switch to fullscreen classroom mode with large tap-to-spin controls for projectors.",
  "winner-picker-wheel":
    "Draw multiple giveaway winners from a pasted comment list, dedupe @handles, and copy a shareable proof link with timestamp you can post to Instagram or TikTok Stories after a live spin recording.",
  "coin-flip-wheel":
    "Every flip updates a running heads-versus-tails tally and streak counter so tiebreakers, kickoff calls, and stream overlays show transparent stats on screen.",
  "alphabet-spinner-wheel":
    "Spin A through Z with an exclude-letters panel, uncheck glyphs already used in phonics drills, Scattergories, or spelling bees so only fresh letters remain on the wheel.",
  "chinese-zodiac-wheel":
    "Spin the twelve Chinese zodiac animals with birth-year hints on each slice, then use the result for lunar New Year lessons, personality quizzes, or party icebreakers.",
  "instagram-wheel-picker":
    "Paste @handles from your giveaway comments, spin to pick a winner, and screenshot the result for Instagram Stories or Reels without leaving the browser tab.",
  "pokemon-randomizer-wheel":
    "Load Kanto starters or your custom creature list, spin for a random Pokémon challenge, and remove species after use so nuzlocke runs cycle through the full roster.",
  "random-color-wheel":
    "Spin named colors for art prompts, design critiques, or wardrobe challenges, then match the swatch to a real object in the room before the timer expires.",
  "random-hobby-generator-wheel":
    "Spin pastimes like photography, baking, or yoga when weekends disappear into scrolling, then commit to trying whichever hobby lands for seven days.",
  "random-word-generator-wheel":
    "Draw vocabulary words for spelling bees, creative writing warm-ups, or ESL drills, and remove terms after they are used so every student sees a fresh word.",
  "roblox-game-picker-wheel":
    "Spin popular Roblox experiences when your squad cannot agree on a server, then join the winning game and remove it after play so repeats wait until the list resets.",
  "raffle-wheel":
    "Switch between entrant names and ticket-number mode, draw multiple winners without replacement, and copy a timestamped proof link to post after your live raffle stream.",
  "prize-wheel":
    "Load labeled prize slices, Grand Prize, gift cards, bonus entries, and spin for game-show-style giveaways on a phone, tablet, or booth display.",
  "classroom-spinner":
    "Teacher hub with student picker (remove-after-pick + history), balanced team generator, and a countdown timer, all in one fullscreen smartboard layout.",
};

function wheelGettingStartedSection(wheel) {
  const label = wheelLabel(wheel);
  const hasBuiltInFeatures = Boolean(WHEEL_MODE_FEATURES[wheel.slug]);
  const lead = hasBuiltInFeatures
    ? `<p>Load the ${esc(label)} with your list, spin once to preview timing, then adjust entries before going live.</p>`
    : `<p>The ${esc(label)} runs in your browser with no signup, paste entries, spin once, and reset when you need a fresh pool.</p>`;
  return `<section><h2>Getting started</h2>${lead}<p>Enable remove-after-pick on the ${esc(
    label,
  )} when each option should win once, and turn on Streamer mode for a chroma-key backdrop on stream recordings.</p><p>Project the ${esc(
    label,
  )} fullscreen on a smartboard or TV so everyone sees the same spin without crowding one phone.</p></section>`;
}

function wheelContent(wheel, wheels) {
  const unique = getWheelUniqueContent(wheel.slug);
  const keyword = wheelLabel(wheel);
  const kwLower = String(keyword).toLowerCase();
  const options = Array.isArray(wheel.wheelOptions) ? wheel.wheelOptions : [];
  const faqs = unique?.faqs?.length
    ? unique.faqs
    : Array.isArray(wheel.faqs)
      ? wheel.faqs
      : [];
  const lastUpdated = routeLastmod(`/${wheel.slug}`) || wheel.lastUpdated || WHEEL_CONTENT_LAST_UPDATED;
  const directAnswer =
    unique?.directAnswer ||
    wheel.introduction ||
    wheel.metaDescription ||
    "";

  const parts = [];
  parts.push(`<h1>${esc(wheel.h1 || keyword)}</h1>`);
  parts.push(
    `<p>Reviewed by <a href="${TEAM_AUTHORS.raja.path}" rel="author">${esc(TEAM_AUTHORS.raja.name)}</a>, Content &amp; SEO Lead at ${ORG_NAME}. Last updated: <time datetime="${esc(
      lastUpdated,
    )}">${esc(fmtDate(lastUpdated))}</time>.</p>`,
  );
  parts.push(`<p>${esc(directAnswer)}</p>`);

  if (
    wheel.introduction &&
    wheel.introduction.trim() &&
    wheel.introduction.trim() !== directAnswer.trim()
  ) {
    let intro = wheel.introduction.trim();
    const secondary = (wheel.keywordSecondary || "").split(",")[0]?.trim();
    if (
      secondary &&
      secondary.length > 2 &&
      !intro.toLowerCase().includes(secondary.toLowerCase().slice(0, 12))
    ) {
      intro = `${intro} People often find this wheel when searching for ${secondary}.`;
    }
    parts.push(`<section><h2>Overview</h2><p>${esc(intro)}</p></section>`);
  }

  const modeFeatures = WHEEL_MODE_FEATURES[wheel.slug];
  if (modeFeatures) {
    parts.push(
      `<section><h2>Built-in features</h2><p>${esc(modeFeatures)}</p></section>`,
    );
  }

  parts.push(
    `<figure><img src="${esc(wheelOgImagePath(wheel.slug))}" width="1200" height="630" alt="${esc(
      wheel.h1 || keyword,
    )} preview screenshot" loading="lazy" /></figure>`,
  );

  parts.push(
    `<section><h2>How to use the ${esc(kwLower)}</h2><p>${esc(
      wheel.howToUse ||
        "Add or edit entries, press spin, and let the wheel choose a random result.",
    )}</p></section>`,
  );

  if (options.length) {
    parts.push(
      `<section><h2>Default wheel options</h2>${listHtml(options.slice(0, 30))}</section>`,
    );
  }

  if (unique?.useCases?.length) {
    for (const section of unique.useCases) {
      parts.push(
        `<section><h2>${esc(section.heading)}</h2><p>${esc(section.body)}</p></section>`,
      );
    }
  } else {
    const cat =
      ENRICH.categoryData[wheel.category] ||
      ENRICH.categoryData["Utilities & Tools"] ||
      {};
    if (Array.isArray(cat.useCases) && cat.useCases.length) {
      parts.push(
        `<section><h2>Best use cases for the ${esc(keyword)}</h2>${listHtml(cat.useCases)}</section>`,
      );
    }
  }

  if (unique?.supplementalSections?.length) {
    for (const section of unique.supplementalSections) {
      parts.push(
        `<section><h2>${esc(section.heading)}</h2><p>${esc(section.body)}</p></section>`,
      );
    }
  }

  parts.push(wheelGettingStartedSection(wheel));

  const absorbed = ENRICH.absorbedSections[wheel.slug] || [];
  for (const section of absorbed) {
    let body = `<p>${esc(section.intro)}</p>`;
    if (Array.isArray(section.items) && section.items.length) {
      body += listHtml(section.items);
    }
    if (section.table && Array.isArray(section.table.rows)) {
      const [c1, c2] = section.table.columns || ["", ""];
      const rows = section.table.rows
        .map(
          (r) => `    <tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`,
        )
        .join("\n");
      body += `<table><thead><tr><th>${esc(c1)}</th><th>${esc(
        c2,
      )}</th></tr></thead><tbody>\n${rows}\n</tbody></table>`;
    }
    parts.push(`<section><h2>${esc(section.heading)}</h2>${body}</section>`);
  }

  if (faqs.length) {
    parts.push(
      `<section><h2>Frequently asked questions</h2>\n${faqs
        .slice(0, 6)
        .map((f) => `  <h3>${esc(f.question)}</h3>\n  <p>${esc(f.answer)}</p>`)
        .join("\n")}</section>`,
    );
  }

  const related = relatedWheelLinksFromUnique(wheel, wheels);
  if (related.length) {
    const relItems = related
      .map(
        (w) =>
          `  <li><a href="/${esc(w.slug)}">${esc(w.anchor)}</a></li>`,
      )
      .join("\n");
    parts.push(
      `<nav aria-label="Related spin wheels"><h2>Related spin wheels</h2>\n<ul>\n${relItems}\n</ul></nav>`,
    );
  }

  return mainWrap(parts.join("\n"));
}

function allSpinWheelsContent(wheels) {
  const byCat = new Map();
  for (const w of wheels) {
    const c = (w.category || "Other").trim();
    if (!byCat.has(c)) byCat.set(c, []);
    byCat.get(c).push(w);
  }
  const categories = [...byCat.entries()].sort(([a], [b]) => a.localeCompare(b));

  const sections = categories
    .map(([category, list]) => {
      const items = list
        .sort((a, b) => wheelLabel(a).localeCompare(wheelLabel(b)))
        .map(
          (w) =>
            `    <li><a href="/${esc(w.slug)}">${esc(wheelLabel(w))}</a></li>`,
        )
        .join("\n");
      return `<section>
  <h2>${esc(category)} (${list.length})</h2>
  <ul>
${items}
  </ul>
</section>`;
    })
    .join("\n");

  return mainWrap(`<h1>All Spin Wheels, Free Specialty Wheel Directory</h1>
<p>Browse every free specialty spin wheel on Online Spin Wheel, organized by category. Each wheel is pre-filled and ready to spin, decision makers, classroom pickers, giveaway tools, games, zodiac wheels, and more. Every tool runs in your browser with cryptographically secure randomness, no account, and no downloads. Pick a category below to jump straight to the wheel you need, or start with the homepage wheel and add your own custom entries.</p>
<section><h2>Popular money pages</h2><ul>
  <li><a href="/raffle-wheel">Raffle wheel</a>, ticket-number mode, multi-winner draws, proof links</li>
  <li><a href="/prize-wheel">Prize wheel</a>, labeled giveaway slices plus physical-wheel buyer guide</li>
  <li><a href="/classroom-spinner">Classroom spinner</a>, student picker, teams, and timer hub</li>
  <li><a href="/wheel-of-names-alternative">Wheel of names alternative</a>, compare free picker tools</li>
</ul></section>
<p>These wheels cover everyday choices (what to eat, yes or no, coin flips), education (student pickers, alphabet and word wheels), events and giveaways (winner pickers, Secret Santa), games and parties, movies and entertainment, zodiac and fortune, health and fitness, travel, and more. Whatever you need to decide fairly, there is a wheel for it. Use the category headings below to jump directly to the tool you need.</p>
${sections}
${exploreNav()}`);
}

/* ---------------------------------------------------------- Public API ----- */

const FIXED = {
  "/about-us": () => aboutContent(),
  "/contact-us": () => contactContent(),
  "/team/content": () => authorContent(),
  "/team/ceo": () => authorArmghanaContent(),
  "/team/co-founder": () => authorZohaContent(),
  "/team/social": () => authorAbdalContent(),
  "/privacy-policy": () => privacyContent(),
  "/cookie-policy": () => cookieContent(),
  "/terms-and-conditions": () => termsContent(),
  "/disclaimer": () => disclaimerContent(),
  "/how-randomness-works": () => howRandomnessWorksContent(),
  "/tutorial-adding-images-to-spin-wheels": () => tutorialAddingImagesContent(),
  "/case-study-school-using-spin-wheels": () => caseStudySchoolContent(),
  "/case-study-community-event-using-spin-wheels": () =>
    caseStudyCommunityContent(),
  "/comparison-spin-wheel-vs-random-number-generator": () =>
    comparisonRngContent(),
  "/comparison-spin-wheel-vs-traditional-methods": () =>
    comparisonTraditionalContent(),
  "/comparison-online-vs-physical-spin-wheels": () => comparisonPhysicalContent(),
  "/wheel-of-names-alternative": () => wheelOfNamesAlternativeContent(),
  "/spin-wheel-fairness-study": () => fairnessStudyContent(),
};

/**
 * Return crawler-visible HTML for a route, or null to fall back to the default
 * generator behavior.
 * @param {{ path: string }} route
 * @param {{ wheels: any[]; blogPosts: any[] }} ctx
 * @returns {string | null}
 */
export function renderRouteContent(route, { wheels = [], blogPosts = [] } = {}) {
  const routePath = route.path;

  // Specialty wheel page (route carries the wheel record).
  if (route.wheel) return wheelContent(route.wheel, wheels);

  if (routePath === "/") return homeContent(wheels);
  if (routePath === "/all-spin-wheels") return allSpinWheelsContent(wheels);
  if (routePath === "/blog") {
    const indexed = blogPosts.filter((p) => p.indexed !== false);
    return blogIndexContent(indexed);
  }

  if (routePath.startsWith("/blog/")) {
    const slug = routePath.slice("/blog/".length);
    const post = blogPosts.find((p) => p.slug === slug);
    return post ? blogPostContent(post) : null;
  }

  if (routePath.startsWith("/result/") && routePath.length > "/result/".length) {
    const id = routePath.slice("/result/".length);
    return resultPageContent(decodeResultId(id));
  }
  if (routePath === "/result") return resultPageContent(null);

  const builder = FIXED[routePath];
  return builder ? builder() : null;
}
