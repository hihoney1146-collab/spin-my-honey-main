import { SITE_ORIGIN } from "@/lib/schema";

export type CoinFlipExportInput = {
  question?: string;
  labels: [string, string];
  winner: string;
  timestampMs: number;
  oddsText?: string;
};

const W = 640;
const H = 420;

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(/\s+/);
  let line = "";
  let cy = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, cy);
      line = word;
      cy += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, cy);
    cy += lineHeight;
  }
  return cy;
}

/** Text-only PNG — never includes user-uploaded face images. */
export async function downloadCoinFlipResultPng(
  input: CoinFlipExportInput,
): Promise<void> {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");

  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(24, 24, W - 48, H - 48);

  ctx.fillStyle = "#1e293b";
  ctx.font = "bold 22px system-ui, sans-serif";
  ctx.fillText("Coin flip result", 48, 72);

  let y = 108;
  ctx.font = "16px system-ui, sans-serif";
  ctx.fillStyle = "#475569";

  if (input.question?.trim()) {
    y = wrapText(ctx, input.question.trim(), 48, y, W - 96, 22) + 8;
  }

  ctx.font = "14px system-ui, sans-serif";
  ctx.fillText(`Side A: ${input.labels[0]}`, 48, y);
  y += 22;
  ctx.fillText(`Side B: ${input.labels[1]}`, 48, y);
  y += 28;

  ctx.fillStyle = "#0f766e";
  ctx.font = "bold 28px system-ui, sans-serif";
  ctx.fillText(`Winner: ${input.winner}`, 48, y + 8);
  y += 44;

  ctx.fillStyle = "#64748b";
  ctx.font = "13px system-ui, sans-serif";
  const utc = new Date(input.timestampMs)
    .toISOString()
    .replace("T", " ")
    .replace(/\.\d{3}Z$/, " UTC");
  ctx.fillText(utc, 48, y);
  y += 20;

  if (input.oddsText) {
    ctx.fillText(input.oddsText, 48, y);
    y += 20;
  }

  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px system-ui, sans-serif";
  ctx.fillText("Online Spin Wheel", 48, H - 56);
  ctx.fillText(SITE_ORIGIN.replace(/^https:\/\//, ""), 48, H - 38);

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Export failed"))),
      "image/png",
    );
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "coin-flip-result.png";
  a.click();
  URL.revokeObjectURL(url);
}
