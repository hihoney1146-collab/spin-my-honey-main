/**
 * Trim CC0 BigSoundBank coin recordings into lightweight flip SFX.
 * Source: Pierre SIBANARCO / BigSoundBank (CC0) — spin #2697, cup #0339.
 *
 * Usage: node scripts/process-coin-flip-sounds.mjs
 */
import decode from "audio-decode";
import fs from "fs";
import path from "path";

const ROOT = path.resolve("public/sounds/coin-flip");
const SRC = path.join(ROOT, "_src");
const OUT = ROOT;

function mixToMono(decoded) {
  const channels = decoded.channelData;
  const length = channels[0]?.length ?? 0;
  if (channels.length === 1) return channels[0];
  const mono = new Float32Array(length);
  for (let ch = 0; ch < channels.length; ch++) {
    const data = channels[ch];
    for (let i = 0; i < length; i++) mono[i] += data[i] / channels.length;
  }
  return mono;
}

function sliceMono(mono, sampleRate, startSec, endSec) {
  const start = Math.max(0, Math.floor(startSec * sampleRate));
  const end = Math.min(mono.length, Math.ceil(endSec * sampleRate));
  return mono.subarray(start, end);
}

function resampleNearest(mono, fromRate, toRate) {
  if (fromRate === toRate) return mono;
  const outLen = Math.max(1, Math.round((mono.length * toRate) / fromRate));
  const out = new Float32Array(outLen);
  for (let i = 0; i < outLen; i++) {
    const src = Math.min(mono.length - 1, Math.round((i * fromRate) / toRate));
    out[i] = mono[src];
  }
  return out;
}

function fadeEnvelope(samples, sampleRate, attackSec, releaseSec) {
  const attack = Math.floor(attackSec * sampleRate);
  const release = Math.floor(releaseSec * sampleRate);
  for (let i = 0; i < attack && i < samples.length; i++) {
    samples[i] *= i / attack;
  }
  for (let i = 0; i < release && i < samples.length; i++) {
    const idx = samples.length - 1 - i;
    samples[idx] *= i / release;
  }
}

function writeWav(samples, sampleRate, outPath) {
  const numChannels = 1;
  const bitsPerSample = 16;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(bitsPerSample, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    buffer.writeInt16LE(Math.round(clamped * 32767), offset);
    offset += 2;
  }

  fs.writeFileSync(outPath, buffer);
}

async function loadAudio(name) {
  const file = path.join(SRC, name);
  if (!fs.existsSync(file)) {
    throw new Error(`Missing source ${file}. Run download step first.`);
  }
  return decode(fs.readFileSync(file));
}

async function main() {
  fs.mkdirSync(OUT, { recursive: true });

  const spinSrc = await loadAudio("spin-table-2697.ogg");
  const landSrc = await loadAudio("coin-cup-0339.mp3");

  const targetRate = 22050;
  const spinMono = resampleNearest(
    mixToMono(spinSrc),
    spinSrc.sampleRate,
    targetRate,
  );
  const landMono = resampleNearest(
    mixToMono(landSrc),
    landSrc.sampleRate,
    targetRate,
  );

  const spinDuration = spinMono.length / targetRate;

  // Flick: initial metallic contact at toss launch.
  const flick = sliceMono(spinMono, targetRate, 0.02, 0.14);
  fadeEnvelope(flick, targetRate, 0.004, 0.03);

  // Air spin: bright whir while coin rotates (mid recording avoids table rumble).
  const spinStart = Math.min(0.35, spinDuration * 0.05);
  const spinEnd = Math.min(spinStart + 2.0, spinDuration * 0.68);
  const spin = sliceMono(spinMono, targetRate, spinStart, spinEnd);
  fadeEnvelope(spin, targetRate, 0.02, 0.08);

  // Landing: short metallic clink/tap (coin-cup + tail of spin deceleration).
  const landFromCup = sliceMono(landMono, targetRate, 0, Math.min(0.22, landMono.length / targetRate));
  const landTail = sliceMono(
    spinMono,
    targetRate,
    Math.max(0, spinDuration - 0.28),
    Math.max(0.12, spinDuration - 0.02),
  );
  const landLen = Math.max(landFromCup.length, landTail.length);
  const land = new Float32Array(landLen);
  for (let i = 0; i < landLen; i++) {
    const a = landFromCup[i] ?? 0;
    const b = (landTail[i] ?? 0) * 0.55;
    land[i] = Math.max(-1, Math.min(1, a + b));
  }
  fadeEnvelope(land, targetRate, 0.002, 0.06);

  // Edge land: sharper rattle from stacked clinks.
  const edge = sliceMono(landMono, targetRate, 0, Math.min(0.45, landMono.length / targetRate));
  fadeEnvelope(edge, targetRate, 0.002, 0.1);

  const files = [
    ["coin-flip-flick.wav", flick],
    ["coin-flip-spin.wav", spin],
    ["coin-flip-land.wav", land],
    ["coin-flip-edge-land.wav", edge],
  ];

  const report = [];
  for (const [name, samples] of files) {
    const outPath = path.join(OUT, name);
    writeWav(samples, targetRate, outPath);
    report.push({ name, bytes: fs.statSync(outPath).size, sec: (samples.length / targetRate).toFixed(2) });
  }

  const total = report.reduce((n, r) => n + r.bytes, 0);
  console.log(JSON.stringify({ files: report, totalBytes: total }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
