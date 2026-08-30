const ACCEPTED = new Set(["image/png", "image/jpeg", "image/webp"]);
export const COIN_FACE_MAX_BYTES = 5 * 1024 * 1024;
const MAX_EDGE = 256;

export type ProcessedCoinFace = {
  objectUrl: string;
  width: number;
  height: number;
};

export function validateCoinFaceFile(file: File): string | null {
  if (!ACCEPTED.has(file.type)) {
    return "Use PNG, JPEG, or WebP only.";
  }
  if (file.size > COIN_FACE_MAX_BYTES) {
    return "Image must be 5 MB or smaller.";
  }
  return null;
}

/** Downscale locally; returns a blob URL (never uploaded). Caller must revoke. */
export async function processCoinFaceFile(file: File): Promise<ProcessedCoinFace> {
  const err = validateCoinFaceFile(file);
  if (err) throw new Error(err);

  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, MAX_EDGE / Math.max(bitmap.width, bitmap.height));
  const width = Math.max(1, Math.round(bitmap.width * scale));
  const height = Math.max(1, Math.round(bitmap.height * scale));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    throw new Error("Could not process image.");
  }
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();

  const blob = await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("Could not encode image."))),
      "image/webp",
      0.85,
    );
  });

  return {
    objectUrl: URL.createObjectURL(blob),
    width,
    height,
  };
}

export function revokeCoinFaceUrl(url: string | null | undefined) {
  if (url?.startsWith("blob:")) {
    URL.revokeObjectURL(url);
  }
}
