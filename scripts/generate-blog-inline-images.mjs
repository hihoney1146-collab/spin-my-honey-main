/**
 * Generate inline blog article illustrations (800×450 PNG) for Phase 7 posts.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public", "blog");
fs.mkdirSync(outDir, { recursive: true });

/** @param {{ title: string; subtitle: string; accent: string; slices?: string[] }} opts */
function wheelSceneSvg({ title, subtitle, accent, slices = ["A", "B", "C", "D", "E", "F"] }) {
  const n = slices.length;
  const slicePaths = slices
    .map((label, i) => {
      const a0 = (i / n) * 360;
      const a1 = ((i + 1) / n) * 360;
      const r = 140;
      const cx = 400;
      const cy = 230;
      const x1 = cx + r * Math.cos((Math.PI * a0) / 180);
      const y1 = cy + r * Math.sin((Math.PI * a0) / 180);
      const x2 = cx + r * Math.cos((Math.PI * a1) / 180);
      const y2 = cy + r * Math.sin((Math.PI * a1) / 180);
      const large = a1 - a0 > 180 ? 1 : 0;
      const fill = i % 2 === 0 ? "#2d3748" : "#4a5568";
      return `<path d="M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z" fill="${fill}"/>
      <text x="${cx + (r * 0.55) * Math.cos((Math.PI * (a0 + a1)) / 360)}" y="${cy + (r * 0.55) * Math.sin((Math.PI * (a0 + a1)) / 360)}" fill="#fff" font-family="Segoe UI,Arial,sans-serif" font-size="14" text-anchor="middle" dominant-baseline="middle">${label}</text>`;
    })
    .join("\n");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
  <rect width="800" height="450" fill="#121218"/>
  <rect x="24" y="24" width="752" height="402" rx="16" fill="#1e1e28" stroke="#333" stroke-width="2"/>
  <text x="40" y="56" fill="${accent}" font-family="Segoe UI,Arial,sans-serif" font-size="13" font-weight="600">ONLINE SPIN WHEEL — SCREEN CAPTURE STYLE</text>
  <text x="40" y="88" fill="#f7fafc" font-family="Segoe UI,Arial,sans-serif" font-size="22" font-weight="700">${title}</text>
  <text x="40" y="112" fill="#a0aec0" font-family="Segoe UI,Arial,sans-serif" font-size="14">${subtitle}</text>
  <circle cx="400" cy="250" r="148" fill="none" stroke="${accent}" stroke-width="4"/>
  ${slicePaths}
  <polygon points="400,98 388,118 412,118" fill="${accent}"/>
  <rect x="320" y="380" width="160" height="36" rx="8" fill="${accent}"/>
  <text x="400" y="403" fill="#121218" font-family="Segoe UI,Arial,sans-serif" font-size="14" font-weight="700" text-anchor="middle">SPIN</text>
</svg>`;
}

const SCENES = [
  {
    file: "students-classroom-spinner-setup.png",
    svg: wheelSceneSvg({
      title: "Classroom spinner on smartboard",
      subtitle: "Fullscreen roster wheel · remove-after-pick enabled",
      accent: "#48bb78",
      slices: ["Alex", "Jordan", "Sam", "Riley", "Casey", "Morgan", "Taylor", "Jamie"],
    }),
  },
  {
    file: "students-vocabulary-wheel-game.png",
    svg: wheelSceneSvg({
      title: "Vocabulary lightning round",
      subtitle: "Weekly word list on the wheel — spin → define → remove",
      accent: "#63b3ed",
      slices: ["evidence", "theme", "context", "infer", "summarize", "compare"],
    }),
  },
  {
    file: "icebreaker-wheel-prompts.png",
    svg: wheelSceneSvg({
      title: "Spin-the-wheel icebreaker prompts",
      subtitle: "Paste team prompts — one spin, one share-out",
      accent: "#9f7aea",
      slices: [
        "Weekend win",
        "Hidden talent",
        "Dream trip",
        "Snack hot take",
        "First job",
        "Two truths",
      ],
    }),
  },
  {
    file: "icebreaker-hybrid-meeting.png",
    svg: wheelSceneSvg({
      title: "Hybrid meeting icebreaker",
      subtitle: "Zoom gallery + shared wheel on screen share",
      accent: "#ed8936",
      slices: ["Intro", "Prompt", "Follow-up", "Shout-out", "Next", "Wrap"],
    }),
  },
];

for (const { file, svg } of SCENES) {
  const dest = path.join(outDir, file);
  await sharp(Buffer.from(svg)).png().toFile(dest);
  console.log(`✅ public/blog/${file} (800×450)`);
}

console.log(`\nGenerated ${SCENES.length} blog inline images.`);
