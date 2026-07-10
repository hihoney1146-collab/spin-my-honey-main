import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { WheelBySlug } from "@/components/wheelModes/WheelBySlug";
import { getRouteLastmod } from "@/lib/routeLastmod";
import { getWheelPageBySlug, getRelatedWheelLinks } from "@/lib/wheelPages";
import {
  WHEEL_HUB_PATH,
  BLOG_INDEX_PATH,
  comparisonLinks,
  tutorialLinks,
  caseStudyLinks,
} from "@/lib/siteInternalLinks";
import { Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SITE_ORIGIN,
  webPageJsonLd,
  webApplicationJsonLd,
  faqPageJsonLd,
  siteIdentityJsonLd,
  breadcrumbListJsonLd,
  howToJsonLd,
  parseHowToSteps,
} from "@/lib/schema";
import { AuthorByline } from "@/components/AuthorByline";
import { AdSlot } from "@/components/AdSlot";
import {
  getEnrichedContent,
  getRelatedBlogPosts,
  getAbsorbedSections,
} from "@/lib/wheelContentEnrichment";
import { WHEEL_MODE_FEATURES } from "@/data/wheelModeFeatures";
import { EmbedWidgetSnippet } from "@/components/EmbedWidgetSnippet";
import { useStreamerMode } from "@/lib/useStreamerMode";

function wheelOgUrl(slug: string) {
  return `${SITE_ORIGIN}/og/${slug}.png`;
}

const WheelProgrammaticPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { streamerMode } = useStreamerMode();
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
  const ogImage = wheelOgUrl(page.slug);
  const keywords = page.keywordPrimary ? [page.keywordPrimary] : [];
  const related = getRelatedWheelLinks(page.slug, 6);
  const breadcrumbItems = [
    { name: "Home", url: `${SITE_ORIGIN}/` },
    { name: "All Spin Wheels", url: hubUrl },
    { name: page.h1 },
  ];
  const enriched = getEnrichedContent(page);
  const displayFaqs = enriched.hasUniqueContent ? enriched.faqs : page.faqs;
  const lastUpdatedIso = getRouteLastmod(`/${page.slug}`);
  const lastUpdatedLabel = new Date(
    `${lastUpdatedIso}T12:00:00`,
  ).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const absorbedSections = getAbsorbedSections(page.slug);
  const relatedBlogs = getRelatedBlogPosts(enriched.relatedBlogSlugs);
  const howToSteps = parseHowToSteps(page.howToUse);
  const modeFeatures = WHEEL_MODE_FEATURES[page.slug];
  const showStreamerCallout =
    page.slug === "winner-picker-wheel" ||
    page.slug === "random-name-picker-wheel";
  const relatedGuides = [
    ...tutorialLinks,
    ...comparisonLinks.slice(0, 2),
    ...caseStudyLinks.slice(0, 1),
  ];

  return (
    <>
      <Helmet>
        <title>{page.title}</title>
        <meta name="description" content={page.metaDescription} />
        {keywords.length ? <meta name="keywords" content={keywords.join(", ")} /> : null}
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={page.title} />
        <meta property="og:description" content={page.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:alt" content={`${page.h1} — preview`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:description" content={page.metaDescription} />
        <meta name="twitter:image" content={ogImage} />
        <meta name="twitter:image:alt" content={`${page.h1} — preview`} />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
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
            ...(displayFaqs?.length
              ? [
                  faqPageJsonLd(
                    displayFaqs.map((f) => ({
                      q: f.question,
                      a: f.answer,
                    })),
                  ),
                ]
              : []),
            ...(howToSteps.length > 0
              ? [
                  howToJsonLd({
                    name: `How to use the ${page.keywordPrimary || page.h1}`,
                    description: page.metaDescription,
                    steps: howToSteps,
                  }),
                ]
              : []),
          ])}
        </script>
      </Helmet>

      <article className={streamerMode ? "w-full" : "container mx-auto px-4 py-8 md:py-12 max-w-5xl"}>
        {!streamerMode ? (
          <>
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

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4 max-w-3xl">
          {enriched.directAnswer}
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <AuthorByline className="mb-2" />
          <p className="text-sm text-muted-foreground mb-2">
            Last updated:{" "}
            <time dateTime={lastUpdatedIso}>{lastUpdatedLabel}</time>
          </p>
        </div>
          </>
        ) : null}

        <div className={streamerMode ? "" : "mb-6"}>
          <WheelBySlug
            slug={page.slug}
            presetOptionLabels={
              page.wheelOptions.length > 0 ? page.wheelOptions : undefined
            }
          />
        </div>

        {!streamerMode ? (
          <>
        {showStreamerCallout ? (
          <Card className="p-5 md:p-6 mb-6 border-primary/20 bg-primary/5">
            <h2 className="text-lg font-bold mb-2">Streamer mode (OBS / Streamlabs)</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Toggle <strong className="text-foreground">Streamer mode</strong> above the wheel
              for a solid chroma-key background and hidden site chrome — ideal for giveaway
              streams on Twitch, YouTube, or TikTok Live. Pair with{" "}
              <strong className="text-foreground">Get proof link</strong> after your draw and
              paste the verification URL in chat.
            </p>
          </Card>
        ) : null}

        <EmbedWidgetSnippet slug={page.slug} wheelTitle={page.h1} />

        <AdSlot className="mb-10 max-w-3xl mx-auto" />

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

        {relatedGuides.length > 0 ? (
          <Card className="p-5 md:p-6 mb-8">
            <h2 className="text-lg font-bold mb-3">Related guides</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              {relatedGuides.map((g) => (
                <li key={g.to}>
                  <Link
                    to={g.to}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {g.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

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
                    {w.anchor}
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        ) : null}

        <div className="space-y-6 md:space-y-8">
          {enriched.useCaseSections.map((section, i) => (
            <Card key={i} className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {section.heading}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </Card>
          ))}

          {enriched.supplementalSections.map((section, i) => (
            <Card key={`supp-${i}`} className="p-6 md:p-8 border-primary/20">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {section.heading}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </Card>
          ))}

          {modeFeatures ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                Built-in features
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {modeFeatures}
              </p>
            </Card>
          ) : null}

          <Card className="p-6 md:p-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4">
              How to Use the {page.keywordPrimary || page.h1}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
              {page.howToUse}
            </p>
          </Card>

          {absorbedSections.map((section, si) => (
            <Card key={`absorbed-${si}`} className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-4">
                {section.heading}
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                {section.intro}
              </p>
              {section.items ? (
                <ul className="space-y-3">
                  {section.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-base text-muted-foreground leading-relaxed"
                    >
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.table ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm md:text-base border-collapse">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="py-2 pr-4 font-semibold text-foreground">
                          {section.table.columns[0]}
                        </th>
                        <th className="py-2 font-semibold text-foreground">
                          {section.table.columns[1]}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row, i) => (
                        <tr
                          key={i}
                          className="border-b border-border/50 text-muted-foreground"
                        >
                          <td className="py-2 pr-4 font-medium text-foreground">
                            {row[0]}
                          </td>
                          <td className="py-2">{row[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}
            </Card>
          ))}

          {displayFaqs.length > 0 ? (
            <Card className="p-6 md:p-8">
              <h2 className="text-xl md:text-2xl font-bold mb-6">
                Frequently Asked Questions
              </h2>
              <dl className="space-y-6">
                {displayFaqs.map((item, i) => (
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

          <Card className="p-6 md:p-8">
            <div className="flex flex-wrap gap-3 text-sm">
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
          </>
        ) : null}
      </article>
    </>
  );
};

export default WheelProgrammaticPage;
