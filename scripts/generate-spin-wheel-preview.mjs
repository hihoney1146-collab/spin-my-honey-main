import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "..", "public", "spin-wheel-preview.svg");

/** Matches SpinWheel default sample mapping after remaps:
 *  Mudabber→orange, Jacob→green, Abdal→light green
 */
const slices = [
  { name: "Jahangir", c0: "#e74c3c", c1: "#b41909" },
  { name: "Mudabber", c0: "#e67e22", c1: "#b34b00" },
  { name: "Adam", c0: "#f39c12", c1: "#c06900" },
  { name: "Jacob", c0: "#2ecc71", c1: "#00993e" },
  { name: "Abdal", c0: "#1abc9c", c1: "#008969" },
  { name: "Gabriel", c0: "#3498db", c1: "#0165a8" },
  { name: "Hanna", c0: "#9b59b6", c1: "#682683" },
];

const CX = 320;
const CY = 320;
const R = 250;
const LABEL_R = 155;
const N = slices.length;
const SLICE = 360 / N;

function deg2rad(d) {
  return (d * Math.PI) / 180;
}

/** Canvas/SVG y-down: positive degrees = clockwise from east. */
function polar(deg, rad = R) {
  const a = deg2rad(deg);
  return [CX + rad * Math.cos(a), CY + rad * Math.sin(a)];
}

const grads = slices
  .map(
    (s, i) =>
      `<radialGradient id="g${i}" cx="50%" cy="50%" r="50%"><stop offset="0%" stop-color="${s.c0}"/><stop offset="100%" stop-color="${s.c1}"/></radialGradient>`,
  )
  .join("\n");

const paths = slices
  .map((_, i) => {
    const a0 = i * SLICE;
    const a1 = (i + 1) * SLICE;
    const [x0, y0] = polar(a0);
    const [x1, y1] = polar(a1);
    return `<path d="M ${CX} ${CY} L ${x0.toFixed(2)} ${y0.toFixed(2)} A ${R} ${R} 0 0 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z" fill="url(#g${i})" stroke="rgba(255,255,255,0.35)" stroke-width="1.5"/>`;
  })
  .join("\n");

const labels = slices
  .map((s, i) => {
    const mid = i * SLICE + SLICE / 2;
    const [lx, ly] = polar(mid, LABEL_R);
    // Flip upright when the ray points left/down so letters aren't upside-down
    const textRot = mid > 90 && mid < 270 ? mid + 180 : mid;
    console.log(
      `${s.name.padEnd(10)} mid=${mid.toFixed(1)}° color=${s.c0} pos=(${lx.toFixed(0)},${ly.toFixed(0)}) rot=${textRot.toFixed(1)}`,
    );
    return `<text x="${lx.toFixed(2)}" y="${ly.toFixed(2)}" transform="rotate(${textRot.toFixed(4)} ${lx.toFixed(2)} ${ly.toFixed(2)})" fill="#ffffff" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="22" font-weight="700" text-anchor="middle" dominant-baseline="middle" style="paint-order:stroke" stroke="rgba(0,0,0,0.4)" stroke-width="0.8">${s.name}</text>`;
  })
  .join("\n");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="640" height="640" role="img" aria-label="Online Spin Wheel with seven colored name segments and a red pointer">
<rect width="640" height="640" rx="24" fill="#0f1118"/>
<defs>
${grads}
<radialGradient id="hub" cx="50%" cy="35%" r="65%"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#e2e8f0"/></radialGradient>
</defs>
${paths}
<circle cx="${CX}" cy="${CY}" r="${R}" fill="none" stroke="rgba(15,23,42,0.35)" stroke-width="3"/>
${labels}
<circle cx="${CX}" cy="${CY}" r="52" fill="url(#hub)" stroke="#cbd5e1" stroke-width="2"/>
<text x="${CX}" y="${CY}" fill="#475569" font-family="Inter, Segoe UI, system-ui, sans-serif" font-size="26" font-weight="800" text-anchor="middle" dominant-baseline="central">SPIN</text>
<polygon points="604,298 604,342 564,320" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5"/>
</svg>
`;

fs.writeFileSync(out, svg, "utf8");
console.log("Wrote", out);
