import type { BlogPost } from "@/data/blogPosts";

export type TocChild = { label: string; blockIndex: number };

export type TocRoot = {
  label: string;
  blockIndex: number;
  children: TocChild[];
};

export function buildBlogTableOfContents(post: BlogPost): {
  roots: TocRoot[];
  faqSectionNumber: number;
  sectionDomId: (blockIndex: number) => string;
} {
  const sectionDomId = (blockIndex: number) => `blog-section-${blockIndex}`;
  const roots: TocRoot[] = [];
  let maxNum = 0;

  for (let i = 0; i < post.blocks.length; i++) {
    const heading = post.blocks[i].heading;
    if (!heading) continue;
    const numMatch = heading.match(/^(\d+)\.\s/);
    if (numMatch) {
      const n = parseInt(numMatch[1], 10);
      maxNum = Math.max(maxNum, n);
      roots.push({ label: heading, blockIndex: i, children: [] });
    } else if (roots.length > 0) {
      roots[roots.length - 1].children.push({ label: heading, blockIndex: i });
    }
  }

  const faqSectionNumber = post.faqs?.length ? Math.max(maxNum + 1, 1) : 0;

  return { roots, faqSectionNumber, sectionDomId };
}
