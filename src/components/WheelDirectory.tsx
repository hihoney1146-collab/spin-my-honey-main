import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getWheelsGroupedByCategory } from "@/lib/wheelPages";

/**
 * Homepage wheel directory: every CSV wheel grouped by category with
 * primary-keyword anchor text → /slug (SEO + internal linking).
 */
export function WheelDirectory() {
  const groups = getWheelsGroupedByCategory();

  return (
    <section
      id="browse-full-collection"
      aria-labelledby="wheel-directory-heading"
      className="w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-14 bg-muted/20 border-t border-border/60"
    >
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 md:mb-10 text-center lg:text-left max-w-3xl lg:max-w-none mx-auto lg:mx-0">
          <h2
            id="wheel-directory-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-tight"
          >
            Browse Our Full Collection
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground leading-relaxed">
            Explore every specialty spin wheel, organized by category. Each link opens that
            wheel&apos;s dedicated page using its primary topic as the label.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 lg:gap-7">
          {groups.map(({ category, items }) => (
            <Card
              key={category}
              className="flex flex-col h-full p-5 sm:p-6 border border-border/70 bg-card/80 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300"
            >
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 pb-3 border-b border-border/60 leading-snug">
                {category}
              </h3>
              <nav className="flex-1 min-h-0" aria-label={`${category} spin wheels`}>
                <ul className="flex flex-col gap-2 sm:gap-2.5">
                  {items.map((w) => {
                    const label = (w.keywordPrimary || w.h1 || w.slug).trim();
                    return (
                      <li key={w.slug}>
                        <Link
                          to={`/${w.slug}`}
                          className="inline-block text-sm leading-snug text-foreground/85 no-underline decoration-2 underline-offset-[3px] rounded-sm transition-colors duration-200 hover:text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:hover:text-blue-400"
                        >
                          {label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
