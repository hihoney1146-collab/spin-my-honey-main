import type { BlogPost } from "./blogTypes";
import { bestSpinWheelGamesForStudents } from "./blogContent/best-spin-wheel-games-for-students";
import { bestIcebreakerGamesOfficeMeetings } from "./blogContent/best-icebreaker-games-office-meetings";
import {
  randomNamePickerDraft,
  couplesDinnerDraft,
  virtualSecretSantaDraft,
} from "./blogPostsDrafts";

export type { BlogContentBlock, BlogFaq, BlogPost } from "./blogTypes";

export const blogPosts: BlogPost[] = [
  randomNamePickerDraft,
  bestIcebreakerGamesOfficeMeetings,
  bestSpinWheelGamesForStudents,
  couplesDinnerDraft,
  virtualSecretSantaDraft,
];

const bySlug = new Map(blogPosts.map((p) => [p.slug, p]));

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.filter((p) => p.indexed !== false);
}

/** All posts including noindex drafts (for direct URL rendering). */
export function getAllBlogPostsIncludingDrafts(): BlogPost[] {
  return blogPosts.slice();
}

export function getBlogPostBySlug(slug: string | undefined): BlogPost | null {
  if (!slug) return null;
  return bySlug.get(slug) ?? null;
}
