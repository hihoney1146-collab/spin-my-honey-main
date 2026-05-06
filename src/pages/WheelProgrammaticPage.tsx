import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { SpinWheel } from "@/components/SpinWheel";
import { getWheelPageBySlug, getRelatedWheelPages } from "@/lib/wheelPages";
import { WHEEL_HUB_PATH } from "@/lib/siteInternalLinks";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

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
  const keywords = [page.keywordPrimary, page.keywordSecondary]
    .filter(Boolean)
    .join(", ");
  const related = getRelatedWheelPages(page.slug, 6);

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
        <meta property="og:image" content={`${SITE_ORIGIN}/logo.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: page.title,
            description: page.metaDescription,
            url: canonical,
            headline: page.h1,
          })}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <nav className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Online Spin Wheel
          </Link>
        </nav>

        {page.category ? (
          <p className="text-sm uppercase tracking-wide text-primary font-semibold mb-2">
            {page.category}
          </p>
        ) : null}

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          {page.h1}
        </h1>

        <div className="mb-10">
          <SpinWheel
            presetOptionLabels={
              page.wheelOptions.length > 0 ? page.wheelOptions : undefined
            }
          />
        </div>

        <Card className="p-5 md:p-6 mb-8 border-primary/15">
          <h2 className="text-lg font-bold mb-3">More on Online Spin Wheel</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Build your own slices or browse every specialty wheel we publish.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <li>
              <Link
                to="/spin-wheel-free"
                className="font-medium text-primary hover:underline"
              >
                Custom spin wheel (editor)
              </Link>
            </li>
            <li>
              <Link
                to={WHEEL_HUB_PATH}
                className="font-medium text-primary hover:underline"
              >
                All specialty wheels
              </Link>
            </li>
            <li>
              <Link to="/spin-wheel-picker" className="font-medium text-primary hover:underline">
                Spin wheel picker
              </Link>
            </li>
          </ul>
        </Card>

        {related.length > 0 ? (
          <Card className="p-5 md:p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">Related wheels</h2>
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

        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">Introduction</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {page.introduction}
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">How to use</h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {page.howToUse}
            </p>
          </Card>

          {page.faqs.length > 0 ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6">FAQs</h2>
              <dl className="space-y-6">
                {page.faqs.map((item, i) => (
                  <div key={i} className="border-b border-border/60 pb-6 last:border-0 last:pb-0">
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
        </div>
      </article>
    </>
  );
};

export default WheelProgrammaticPage;
