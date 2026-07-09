export type BlogContentBlock = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogFaq = { q: string; a: string };

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  updated: string;
  /** Original publish date (YYYY-MM-DD). Falls back to `updated` when absent. */
  published?: string;
  blocks: BlogContentBlock[];
  faqs?: BlogFaq[];
};
