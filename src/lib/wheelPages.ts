import wheelPagesData from "@/generated/wheelPages.json";

export type WheelFaq = {
  question: string;
  answer: string;
};

export type WheelPageRecord = {
  slug: string;
  keywordPrimary: string;
  keywordSecondary: string;
  title: string;
  metaDescription: string;
  h1: string;
  introduction: string;
  howToUse: string;
  category: string;
  wheelOptions: string[];
  faqs: WheelFaq[];
};

const pages = wheelPagesData as WheelPageRecord[];

const bySlug = new Map<string, WheelPageRecord>();
for (const p of pages) {
  if (p.slug) bySlug.set(p.slug, p);
}

export function getAllWheelSlugs(): string[] {
  return pages.map((p) => p.slug).filter(Boolean);
}

export function getWheelPageBySlug(slug: string | undefined): WheelPageRecord | null {
  if (!slug) return null;
  return bySlug.get(slug) ?? null;
}
