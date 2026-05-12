import jpgRandomName from "@/assets/blog-featured/random-name-picker-fair-fun-easy.jpg";
import webpRandomName from "@/assets/blog-featured/random-name-picker-fair-fun-easy.webp";
import jpgIcebreaker from "@/assets/blog-featured/best-icebreaker-games-office-meetings.jpg";
import webpIcebreaker from "@/assets/blog-featured/best-icebreaker-games-office-meetings.webp";
import jpgStudents from "@/assets/blog-featured/best-spin-wheel-games-for-students.jpg";
import webpStudents from "@/assets/blog-featured/best-spin-wheel-games-for-students.webp";
import jpgCouples from "@/assets/blog-featured/fun-ways-decide-where-to-eat-couples.jpg";
import webpCouples from "@/assets/blog-featured/fun-ways-decide-where-to-eat-couples.webp";
import jpgSecretSanta from "@/assets/blog-featured/virtual-secret-santa-online.jpg";
import webpSecretSanta from "@/assets/blog-featured/virtual-secret-santa-online.webp";

/** Vite-resolved paths: JPEG fallback + WebP for in-app `OptimizedImage`. */
const bySlug: Record<
  string,
  { jpg: string; webp: string }
> = {
  "random-name-picker-fair-fun-easy": { jpg: jpgRandomName, webp: webpRandomName },
  "best-icebreaker-games-office-meetings": { jpg: jpgIcebreaker, webp: webpIcebreaker },
  "best-spin-wheel-games-for-students": { jpg: jpgStudents, webp: webpStudents },
  "fun-ways-decide-where-to-eat-couples": { jpg: jpgCouples, webp: webpCouples },
  "virtual-secret-santa-online": { jpg: jpgSecretSanta, webp: webpSecretSanta },
};

/** JPEG URL for `<img>` fallback and social/meta (broad crawler support). */
export function getBlogFeaturedImageSrc(slug: string): string | undefined {
  return bySlug[slug]?.jpg;
}

export function getBlogFeaturedImageWebpSrc(slug: string): string | undefined {
  return bySlug[slug]?.webp;
}

/** Absolute URL for Open Graph / Twitter Card / JSON-LD (JPEG). */
export function getBlogFeaturedImageAbsoluteUrl(
  slug: string,
  siteOrigin: string,
): string | undefined {
  const src = getBlogFeaturedImageSrc(slug);
  if (!src) return undefined;
  if (src.startsWith("http")) return src;
  return `${siteOrigin}${src.startsWith("/") ? src : `/${src}`}`;
}
