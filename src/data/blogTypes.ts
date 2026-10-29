export type BlogImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Intrinsic pixel size — omit forced wrong aspect if unknown. */
  width?: number;
  height?: number;
};

export type BlogChecklist = {
  title: string;
  items: string[];
};

export type BlogDownload = {
  label: string;
  href: string;
  description?: string;
};

export type BlogContentBlock = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
  images?: BlogImage[];
  checklist?: BlogChecklist;
  download?: BlogDownload;
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
  /** When false: noindex, excluded from sitemap and blog index. Default true. */
  indexed?: boolean;
  blocks: BlogContentBlock[];
  faqs?: BlogFaq[];
  /** Related wheel slugs for internal links (min 3 on indexed posts). */
  relatedWheels?: string[];
  /**
   * One contextual link to the main wheel, shown after the article.
   * Indexed posts ran 1,000 to 2,100 words with no link to the tool at all,
   * so a reader who finished the piece had no way to go and use it. Write a
   * sentence that fits the post and an anchor that describes where it goes,
   * not a repeated keyword.
   */
  tryItLink?: { sentence: string; anchor: string };
};