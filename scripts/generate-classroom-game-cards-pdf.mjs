/**
 * Printable classroom spin-wheel game cards (PDF) for the students blog post.
 * Run: npm run generate:classroom-game-cards-pdf
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public", "downloads");
const outFile = path.join(outDir, "classroom-spin-wheel-game-cards.pdf");

const CARDS = [
  {
    title: "Vocabulary Lightning",
    grades: "Grades 3–8",
    setup: "Paste 12 weekly vocab words on the wheel.",
    play: "Spin → student defines word in one sentence → remove word after use.",
    wheel: "/alphabet-spinner-wheel",
  },
  {
    title: "Math Sprint",
    grades: "Grades 2–6",
    setup: "Wheel A: numbers 1–12. Wheel B: + − × ÷ labels.",
    play: "Spin both wheels → class solves whiteboard problem in 60 seconds.",
    wheel: "/random-number-wheel",
  },
  {
    title: "Cold Call Fairness",
    grades: "All grades",
    setup: "Paste roster on classroom spinner. Enable remove-after-pick.",
    play: "Spin for reader, presenter, or line leader. History log prevents repeats.",
    wheel: "/classroom-spinner",
  },
  {
    title: "Topic Roulette Review",
    grades: "Grades 6–12",
    setup: "Add unit topics (Civil War, cells, fractions) as slices.",
    play: "Spin → team earns points for 30-second recap of landed topic.",
    wheel: "/abcd-spin-wheel",
  },
  {
    title: "Letter of the Day",
    grades: "Grades K–2",
    setup: "Use A–Z wheel with exclude-letters for used glyphs.",
    play: "Spin → class lists three words starting with that letter aloud.",
    wheel: "/alphabet-spinner-wheel",
  },
  {
    title: "Partner Pick",
    grades: "Grades 4–12",
    setup: "Paste names, spin twice for talk partners (re-spin if same person).",
    play: "Pair shares answer before whole-group debrief.",
    wheel: "/random-student-picker",
  },
  {
    title: "Quick Draw Prompt",
    grades: "Grades 1–8",
    setup: "Load art prompts on what-to-draw wheel slices.",
    play: "Five-minute silent sketch → gallery walk.",
    wheel: "/what-to-draw-wheel",
  },
  {
    title: "Friday Reward Spin",
    grades: "All grades",
    setup: "Slices: extra recess, homework pass, choice seat, teacher helper.",
    play: "Whole class earns spin after goal met. One spin only.",
    wheel: "/prize-wheel",
  },
];

function pdfSafe(text) {
  return String(text)
    .replace(/\u2192/g, "->")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2212/g, "-")
    .replace(/\u00f7/g, "/");
}

async function main() {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdf.embedFont(StandardFonts.HelveticaBold);

  const pageW = 612;
  const pageH = 792;
  const cols = 2;
  const rows = 2;
  const margin = 36;
  const gap = 12;
  const cardW = (pageW - margin * 2 - gap) / cols;
  const cardH = (pageH - margin * 2 - gap) / rows;

  let cardIndex = 0;
  while (cardIndex < CARDS.length) {
    const page = pdf.addPage([pageW, pageH]);
    for (let slot = 0; slot < 4 && cardIndex < CARDS.length; slot++, cardIndex++) {
      const card = CARDS[cardIndex];
      const col = slot % cols;
      const row = Math.floor(slot / cols);
      const x = margin + col * (cardW + gap);
      const y = pageH - margin - (row + 1) * cardH - row * gap;

      page.drawRectangle({
        x,
        y,
        width: cardW,
        height: cardH,
        borderColor: rgb(0.2, 0.2, 0.25),
        borderWidth: 1,
        color: rgb(0.98, 0.98, 0.99),
      });

      let ty = y + cardH - 22;
      page.drawText(pdfSafe(card.title), { x: x + 10, y: ty, size: 13, font: fontBold, color: rgb(0.1, 0.1, 0.15) });
      ty -= 16;
      page.drawText(pdfSafe(card.grades), { x: x + 10, y: ty, size: 9, font, color: rgb(0.35, 0.35, 0.4) });
      ty -= 18;
      const lines = [
        `Setup: ${card.setup}`,
        `Play: ${card.play}`,
        `Wheel: onlinespinwheel.fun${card.wheel}`,
      ];
      for (const line of lines) {
        const wrapped = wrap(line, 58);
        for (const wl of wrapped) {
          page.drawText(pdfSafe(wl), { x: x + 10, y: ty, size: 8.5, font, color: rgb(0.15, 0.15, 0.2) });
          ty -= 11;
        }
        ty -= 4;
      }
    }
  }

  const cover = pdf.insertPage(0, [pageW, pageH]);
  cover.drawText("Classroom Spin Wheel Game Cards", {
    x: 72,
    y: pageH - 120,
    size: 22,
    font: fontBold,
    color: rgb(0.1, 0.1, 0.15),
  });
  cover.drawText("Print, cut, and pair with free wheels at onlinespinwheel.fun", {
    x: 72,
    y: pageH - 150,
    size: 11,
    font,
    color: rgb(0.3, 0.3, 0.35),
  });
  cover.drawText("By Raja Jahangir, Online Spin Wheel, 2026", {
    x: 72,
    y: 72,
    size: 9,
    font,
    color: rgb(0.4, 0.4, 0.45),
  });

  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outFile, await pdf.save());
  console.log(`✅ ${path.relative(root, outFile)} (${CARDS.length} game cards + cover)`);
}

function wrap(text, maxLen) {
  const words = text.split(" ");
  const lines = [];
  let line = "";
  for (const w of words) {
    const next = line ? `${line} ${w}` : w;
    if (next.length > maxLen) {
      if (line) lines.push(line);
      line = w;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
