import { OptimizedImage } from "@/components/OptimizedImage";
import {
  getBlogFeaturedImageSrc,
  getBlogFeaturedImageWebpSrc,
} from "@/lib/blogFeaturedImages";

/** Native featured asset size (1200×630) — keep listing and post hero in sync. */
export const BLOG_FEATURED_ASPECT_CLASS = "aspect-[40/21]";

type BlogFeaturedImageProps = {
  slug: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
};

export function BlogFeaturedImage({
  slug,
  alt,
  className = "",
  imageClassName = "",
  loading = "lazy",
  fetchPriority,
}: BlogFeaturedImageProps) {
  const src = getBlogFeaturedImageSrc(slug);
  const webpSrc = getBlogFeaturedImageWebpSrc(slug);
  if (!src) return null;

  return (
    <div
      className={`relative ${BLOG_FEATURED_ASPECT_CLASS} w-full overflow-hidden bg-muted/30 ${className}`}
    >
      <OptimizedImage
        src={src}
        webpSrc={webpSrc}
        alt={alt}
        className={`h-full w-full object-cover ${imageClassName}`}
        loading={loading}
        fetchPriority={fetchPriority}
      />
    </div>
  );
}
