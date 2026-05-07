import { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";
import { getBlogPostBySlug } from "@/data/blogPosts";
import { buildBlogTableOfContents } from "@/lib/blogToc";

const SITE_ORIGIN = "https://onlinespinwheel.fun";
const AUROXA_TECH_URL = "https://auroxatech.com";
const ABOUT_AUTHOR_PATH = "/about-us";
/** Same profile referenced in PDF “Connect with Raja on LinkedIn”. */
const RAJA_LINKEDIN_URL = "https://www.linkedin.com/in/raja-jahangir-596401245";
const RAJA_LINKEDIN_PHRASE = "Connect with Raja on LinkedIn";

/** PDF-style body copy: line height ~1.6, space between paragraphs */
const pBody =
  "text-base md:text-lg text-muted-foreground leading-[1.6] m-0 mb-4 last:mb-0";

function splitQuickSummary(excerpt: string): string[] {
  const idx = excerpt.indexOf(". ");
  if (idx === -1) return [excerpt];
  const first = excerpt.slice(0, idx + 1).trim();
  const rest = excerpt.slice(idx + 2).trim();
  return rest ? [first, rest] : [first];
}

function formatBlogDate(isoDate: string): string {
  return new Date(isoDate + "T12:00:00").toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function paragraphWithOptionalLinkedIn(para: string) {
  const i = para.indexOf(RAJA_LINKEDIN_PHRASE);
  if (i === -1) return para;
  return (
    <>
      {para.slice(0, i)}
      <a
        href={RAJA_LINKEDIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
      >
        {RAJA_LINKEDIN_PHRASE}
      </a>
      {para.slice(i + RAJA_LINKEDIN_PHRASE.length)}
    </>
  );
}

function renderListItem(text: string) {
  const numbered = text.match(/^(\d+\.\s+[^:]+:\s*)([\s\S]*)$/);
  const bullet = text.match(/^(●\s+[^:]+:\s*)([\s\S]*)$/);
  const prefixMatch = numbered || bullet;
  if (prefixMatch) {
    return (
      <li className="mb-3 pl-0 text-base md:text-lg leading-[1.6] text-muted-foreground">
        <strong className="font-semibold text-foreground">{prefixMatch[1]}</strong>
        <span>{prefixMatch[2]}</span>
      </li>
    );
  }
  return (
    <li className="mb-2 list-none text-base md:text-lg text-muted-foreground leading-[1.6]">
      {text}
    </li>
  );
}

function isNumberedHeading(heading: string | undefined): boolean {
  return !!heading && /^\d+\.\s/.test(heading);
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return (
      <>
        <Helmet>
          <title>404 - Page Not Found | Online Spin Wheel</title>
          <meta name="robots" content="noindex, follow" />
        </Helmet>
        <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl text-center">
          <h1 className="text-2xl md:text-3xl font-bold mb-4">Page not found</h1>
          <p className="text-muted-foreground mb-6">
            This blog post does not exist or the link may be incorrect.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild variant="outline">
              <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
            </Button>
            <Button asChild variant="default">
              <Link to="/" className="inline-flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
          </div>
        </article>
      </>
    );
  }

  const canonical = `${SITE_ORIGIN}${BLOG_INDEX_PATH}/${post.slug}`;
  const metaTitle = post.title.split("|")[0].trim();
  const authorParsed = post.author.match(/^(.+?)\s*\(([^)]+)\)\s*$/);
  const authorDisplayName = authorParsed?.[1]?.trim() ?? post.author;
  const authorRole = authorParsed?.[2]?.trim();

  const { roots: tocRoots, faqSectionNumber, sectionDomId } = buildBlogTableOfContents(post);
  const summaryParagraphs = splitQuickSummary(post.excerpt);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    dateModified: post.updated,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Online Spin Wheel",
      url: SITE_ORIGIN,
    },
    mainEntityOfPage: canonical,
  };

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonical} />
        <meta property="article:modified_time" content={`${post.updated}T12:00:00`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.metaDescription} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-[800px]">
        <nav className="mb-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
            <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </Link>
          </Button>
        </nav>

        <header className="mb-10 space-y-4 text-foreground">
          <h1 className="m-0 text-2xl sm:text-[1.75rem] font-bold leading-snug text-foreground">
            {metaTitle}
          </h1>
          <p className="m-0 text-base leading-[1.6] text-muted-foreground">
            Written by{" "}
            <Link
              to={ABOUT_AUTHOR_PATH}
              className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
            >
              {authorDisplayName}
            </Link>
            {authorRole ? (
              <>
                {" "}
                (<span className="text-muted-foreground">{authorRole}</span>).
              </>
            ) : (
              "."
            )}{" "}
            Powered by{" "}
            <a
              href={AUROXA_TECH_URL}
              className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
              rel="noopener noreferrer"
            >
              Auroxa Tech
            </a>
            . Last Updated: {formatBlogDate(post.updated)}.
          </p>
        </header>

        <section className="mb-10" aria-labelledby="quick-summary-heading">
          <h2
            id="quick-summary-heading"
            className="mt-0 mb-4 text-[1.65rem] font-bold leading-snug text-foreground sm:text-[1.75rem]"
          >
            Quick Summary
          </h2>
          {summaryParagraphs.map((para, i) => (
            <p key={i} className={pBody}>
              {para}
            </p>
          ))}
        </section>

        {tocRoots.length > 0 ? (
          <nav className="mb-12" aria-label="Table of contents">
            <h2 className="mt-0 mb-4 text-[1.65rem] font-bold leading-snug text-foreground sm:text-[1.75rem]">
              Table of Contents
            </h2>
            <ol className="m-0 list-none space-y-2 p-0 text-base leading-[1.6] text-muted-foreground">
              {tocRoots.map((root) => (
                <li key={root.blockIndex} className="text-foreground">
                  <a
                    href={`#${sectionDomId(root.blockIndex)}`}
                    className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
                  >
                    {root.label}
                  </a>
                  {root.children.length > 0 ? (
                    <ul className="mt-2 list-[circle] space-y-1 pl-6 marker:text-foreground">
                      {root.children.map((ch) => (
                        <li key={ch.blockIndex}>
                          <a
                            href={`#${sectionDomId(ch.blockIndex)}`}
                            className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
                          >
                            {ch.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
              {post.faqs && post.faqs.length > 0 && faqSectionNumber > 0 ? (
                <li>
                  <a
                    href="#frequently-asked-questions"
                    className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
                  >
                    {faqSectionNumber}. Frequently Asked Questions
                  </a>
                </li>
              ) : null}
            </ol>
          </nav>
        ) : null}

        <div className="blog-pdf-body">
          {post.blocks.map((block, i) => {
            const prev = post.blocks[i - 1];
            const prevSub =
              !!prev?.heading && !isNumberedHeading(prev.heading);
            const currSub =
              !!block.heading && !isNumberedHeading(block.heading);
            const showSubsectionRule =
              i > 0 && prevSub && currSub && !!block.heading && !!prev?.heading;

            const numbered = isNumberedHeading(block.heading);
            const HeadingTag: "h2" | "h3" = numbered ? "h2" : "h3";
            const h2Class =
              i === 0 && numbered
                ? "mt-0 mb-4 scroll-mt-28 text-[1.65rem] font-bold leading-snug text-foreground sm:text-[1.75rem]"
                : "mt-10 mb-4 scroll-mt-28 text-[1.65rem] font-bold leading-snug text-foreground sm:text-[1.75rem]";
            const h3Class =
              "mt-8 mb-3 scroll-mt-28 text-xl font-bold leading-snug text-foreground";

            return (
              <div key={i}>
                {showSubsectionRule ? (
                  <hr
                    className="mb-8 mt-2 h-1 border-0 bg-foreground"
                    aria-hidden
                  />
                ) : null}
                <section>
                  {block.heading ? (
                    <HeadingTag
                      id={sectionDomId(i)}
                      className={numbered ? h2Class : h3Class}
                    >
                      {block.heading}
                    </HeadingTag>
                  ) : null}
                  <div>
                    {block.paragraphs.map((para, j) => {
                      const isPoweredLine = para
                        .trimStart()
                        .startsWith("Proudly Powered by");
                      return (
                        <p
                          key={j}
                          className={`${pBody} ${isPoweredLine ? "italic" : ""}`}
                        >
                          {isPoweredLine ? para : paragraphWithOptionalLinkedIn(para)}
                        </p>
                      );
                    })}
                  </div>
                  {block.list && block.list.length > 0 ? (
                    block.list.some((item) => /^\d+\.\s|^●\s/.test(item)) ? (
                      <ul className="mt-4 list-none space-y-0 pl-0">
                        {block.list.map((item, k) => (
                          <Fragment key={k}>{renderListItem(item)}</Fragment>
                        ))}
                      </ul>
                    ) : (
                      <ul className="mt-6 space-y-2 list-disc pl-5 text-base md:text-lg leading-[1.6] text-muted-foreground">
                        {block.list.map((item, k) => (
                          <li key={k} className="mb-1 last:mb-0">
                            {item}
                          </li>
                        ))}
                      </ul>
                    )
                  ) : null}
                </section>
              </div>
            );
          })}
        </div>

        {post.faqs && post.faqs.length > 0 ? (
          <section
            id="frequently-asked-questions"
            className="scroll-mt-28 mt-10 sm:mt-12 md:mt-14"
          >
            <h2 className="mb-6 text-[1.65rem] font-bold leading-snug text-foreground sm:text-[1.75rem]">
              {faqSectionNumber > 0
                ? `${faqSectionNumber}. Frequently Asked Questions`
                : "Frequently Asked Questions"}
            </h2>
            <dl className="m-0 space-y-8">
              {post.faqs.map((faq, idx) => (
                <div key={idx}>
                  <dt className="mb-2 text-lg font-bold leading-snug text-foreground">
                    {faq.q}
                  </dt>
                  <dd className={`${pBody} m-0 text-muted-foreground`}>{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        <footer className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          <Button asChild variant="outline">
            <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
          </Button>
          <Button asChild>
            <Link to="/all-spin-wheels">Browse spin wheels</Link>
          </Button>
        </footer>
      </article>
    </>
  );
};

export default BlogPost;
