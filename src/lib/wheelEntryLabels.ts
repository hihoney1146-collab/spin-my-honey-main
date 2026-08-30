/** Shared entry-line parsing and duplicate policies for wheel mode sync. */

export type DuplicatePolicy = "dedupe" | "warn" | "allow";

export function parseEntryLines(
  raw: string,
  splitPattern: RegExp = /[\n,]+/,
): string[] {
  return raw
    .split(splitPattern)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function countDuplicateLines(lines: string[]): number {
  const seen = new Set<string>();
  let dupes = 0;
  for (const line of lines) {
    const key = line.toLowerCase();
    if (seen.has(key)) dupes++;
    else seen.add(key);
  }
  return dupes;
}

export function applyDuplicatePolicy(
  lines: string[],
  policy: DuplicatePolicy,
  normalize: (line: string) => string = (line) => line,
): { labels: string[]; removedCount: number; duplicateCount: number } {
  if (policy === "allow") {
    return { labels: lines, removedCount: 0, duplicateCount: 0 };
  }

  if (policy === "warn") {
    return {
      labels: lines,
      removedCount: 0,
      duplicateCount: countDuplicateLines(lines.map(normalize)),
    };
  }

  const seen = new Set<string>();
  const labels: string[] = [];
  let removedCount = 0;
  for (const line of lines) {
    const normalized = normalize(line);
    if (!normalized) continue;
    const key = normalized.toLowerCase();
    if (seen.has(key)) {
      removedCount++;
      continue;
    }
    seen.add(key);
    labels.push(normalized);
  }
  return { labels, removedCount, duplicateCount: 0 };
}

export function labelsToMultiline(labels: string[]): string {
  return labels.join("\n");
}

export function duplicateNotice(
  policy: DuplicatePolicy,
  removedCount: number,
  duplicateCount: number,
): string | null {
  if (policy === "dedupe" && removedCount > 0) {
    return `${removedCount} duplicate entr${removedCount === 1 ? "y" : "ies"} removed.`;
  }
  if (policy === "warn" && duplicateCount > 0) {
    return `${duplicateCount} duplicate name${duplicateCount === 1 ? "" : "s"} found — they will each get their own slice.`;
  }
  return null;
}
