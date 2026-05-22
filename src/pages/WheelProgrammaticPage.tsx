import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SpinWheel } from "@/components/SpinWheel";
import { getWheelPageBySlug, getRelatedWheelPages } from "@/lib/wheelPages";
import {
  WHEEL_HUB_PATH,
  BLOG_INDEX_PATH,
  comparisonLinks,
  tutorialLinks,
} from "@/lib/siteInternalLinks";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SITE_ORIGIN,
  webPageJsonLd,
  webApplicationJsonLd,
  faqPageJsonLd,
  organizationJsonLd,
  breadcrumbListJsonLd,
} from "@/lib/schema";
import {
  getEnrichedContent,
  getRelatedBlogPosts,
} from "@/lib/wheelContentEnrichment";

const WheelProgrammaticPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = getWheelPageBySlug(slug);

  if (!page) {
    return (
      <>
        <Helmet>
          <title>404 - Page Not Found | Online Spin Wheel</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-6">
            This wheel page does not exist or the link may be incorrect.
          </p>
          <Button asChild variant="default">
            <Link to="/" className="inline-flex items-center gap-2">
              <Home className="h-4 w-4" />
              Back to home
            </Link>
          </Button>
        </article>
      </>
    );
  }

  const canonical = `${SITE_ORIGIN}/${page.slug}`;
  const hubUrl = `${SITE_ORIGIN}${WHEEL_HUB_PATH}`;
  const keywords = [page.keywordPrimary, page.keywordSecondary]
    .filter(Boolean)
    .join(", ");
  const related = getRelatedWheelPages(page.slug, 6);
  const breadcrumbItems = [
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: "All Spin Wheels", url: hubUrl },
    { name: page.h1 },
  ];
  const enriched = getEnrichedContent(page);
  const relatedBlogs = getRelatedBlogPosts(enriched.relatedBlogSlugs);

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {keywords ? <meta name="keywords" content={keywords} /> : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <script type="application/ld+json">
          {JSON.stringify([
            organizationJsonLd(),
            breadcrumbListJsonLd(breadcrumbItems),
            webPageJsonLd({
              name: page.title,
              description: page.metaDescription,
              url: canonical,
              headline: page.h1,
            }),
            webApplicationJsonLd({
              name: page.h1,
              description: page.metaDescription,
              url: canonical,
            }),
            ...(page.faqs?.length
              ? [
                  faqPageJsonLd(
                    page.faqs.map((f) => ({
                      q: f.question,
                      a: f.answer,
                    })),
                  ),
                ]
              : []),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="px-1">/</li>
            <li>
              <Link to={WHEEL_HUB_PATH} className="hover:text-primary transition-colors">
                All Spin Wheels
              </Link>
            </li>
            <li aria-hidden="true" className="px-1">/</li>
            <li className="text-foreground font-medium truncate max-w-[min(100%,20rem)]">
              {page.h1}
            </li>
          </ol>
        </nav>

        {page.category ? (
          <p className="text-sm uppercase tracking-wide text-primary font-semibold mb-2">
            {page.category}
          </p>
        ) : null}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          {page.h1}
        </h1>

        {/* Answer-first definition snippet for AI citation */}
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-3xl">
          {enriched.definitionSnippet}
        </p>

        {/* Interactive wheel */}
        <div className="mb-10">
          <SpinWheel
            key={page.slug}
            presetOptionLabels={
              page.wheelOptions.length > 0 ? page.wheelOptions : undefined
            }
          />
        </div>

        {/* Hub + Related Wheels */}
        <Card className="p-5 md:p-6 mb-8 border-primary/15">
          <h2 className="text-lg font-bold mb-3">More on Online Spin Wheel</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Browse every specialty wheel we publish, or try one of the related
            tools below.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                to={WHEEL_HUB_PATH}
                className="font-medium text-primary hover:underline"
              >
                All specialty wheels
              </Link>
            </li>
            {tutorialLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-medium text-primary hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            {comparisonLinks.slice(0, 2).map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-medium text-primary hover:underline"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        {related.length > 0 ? (
          <Card className="p-5 md:p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">Related Wheels</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {related.map((w) => (
                <li key={w.slug}>
                  <Link
                    to={`/${w.slug}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {w.keywordPrimary || w.h1}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        {/* Content sections */}
        <div className="space-y-6 md:space-y-8">
          {/* Introduction */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              What Is the {page.keywordPrimary || page.h1}?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {page.introduction}
            </p>
          </Card>

          {/* Why use this tool */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              Why Use This Tool?
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {enriched.whyUse}
            </p>
          </Card>

          {/* How to use */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              How to Use the {page.keywordPrimary || page.h1}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {page.howToUse}
            </p>
          </Card>

          {/* Best use cases */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {enriched.useCases.heading}
            </h2>
            <ul className="space-y-3">
              {enriched.useCases.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Real-world examples */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {enriched.examples.heading}
            </h2>
            <p className="text-muted-foreground mb-4">
              {getEnrichedContent(page).definitionSnippet
                ? enriched.examples.items.length > 0
                  ? `Here are practical ways people use this tool every day:`
                  : ""
                : ""}
            </p>
            <ul className="space-y-3">
              {enriched.examples.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                >
                  <span className="font-semibold text-primary flex-shrink-0 w-6">
                    {i + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Benefits */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {enriched.benefits.heading}
            </h2>
            <ul className="space-y-3">
              {enriched.benefits.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                >
                  <span className="mt-1.5 h-2 w-2 rounded-full bg-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Tips */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              {enriched.tips.heading}
            </h2>
            <ol className="space-y-3">
              {enriched.tips.items.map((item, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                >
                  <span className="font-semibold text-primary flex-shrink-0 w-6">
                    {i + 1}.
                  </span>
                  {item}
                </li>
              ))}
            </ol>
          </Card>

          {/* FAQs */}
          {page.faqs.length > 0 ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-6">
                {page.faqs.map((item, i) => (
                  <div
                    key={i}
                    className="border-b border-border/60 pb-6 last:border-0 last:pb-0"
                  >
                    <dt className="font-semibold text-foreground mb-2">
                      {item.question}
                    </dt>
                    <dd className="text-muted-foreground leading-relaxed whitespace-pre-line">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          ) : null}

          {/* Related blog posts */}
          {relatedBlogs.length > 0 ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Related Articles
              </h2>
              <p className="text-muted-foreground mb-4">
                Dive deeper with these guides from our blog:
              </p>
              <ul className="space-y-4">
                {relatedBlogs.map((post) => (
                  <li key={post.slug}>
                    <Link
                      to={`${BLOG_INDEX_PATH}/${post.slug}`}
                      className="group block"
                    >
                      <span className="font-medium text-primary group-hover:underline">
                        {post.title.split("|")[0].trim()}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {post.excerpt}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ) : null}

          {/* Conclusion */}
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Conclusion</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {enriched.conclusion}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <Link
                to={WHEEL_HUB_PATH}
                className="font-medium text-primary hover:underline"
              >
                Browse all wheels
              </Link>
              <Link
                to={BLOG_INDEX_PATH}
                className="font-medium text-primary hover:underline"
              >
                Read our blog
              </Link>
              <Link
                to="/"
                className="font-medium text-primary hover:underline"
              >
                Back to homepage
              </Link>
            </div>
          </Card>
        </div>
      </article>
    </>
  );
};

export default WheelProgrammaticPage;
