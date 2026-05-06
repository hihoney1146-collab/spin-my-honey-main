import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowLeft, Home } from "lucide-react";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";
import { getBlogPostBySlug } from "@/data/blogPosts";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

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
  const headline = post.title.split("|")[0].trim();
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

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <nav className="mb-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
            <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Blog
            </Link>
          </Button>
        </nav>

        <header className="mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-[2.5rem] font-bold text-foreground leading-tight mb-6">
            {headline}
          </h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-b border-border/60 pb-6">
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4 text-primary/80" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary/80" />
              Last updated{" "}
              {new Date(post.updated + "T12:00:00").toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="space-y-6 md:space-y-8 prose prose-neutral dark:prose-invert max-w-none">
          {post.blocks.map((block, i) => (
            <Card key={i} className="p-6 md:p-8 border-border/60">
              {block.heading ? (
                <h2 className="text-2xl md:text-3xl font-bold mt-0 mb-4 text-foreground">
                  {block.heading}
                </h2>
              ) : null}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {block.paragraphs.map((para, j) => (
                  <p key={j} className="text-base md:text-lg m-0">
                    {para}
                  </p>
                ))}
              </div>
              {block.list && block.list.length > 0 ? (
                <ul className="mt-6 space-y-2 list-disc pl-5 text-base md:text-lg text-muted-foreground">
                  {block.list.map((item, k) => (
                    <li key={k}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </Card>
          ))}
        </div>

        {post.faqs && post.faqs.length > 0 ? (
          <Card className="mt-8 md:mt-10 p-6 md:p-8 border-border/60">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">FAQ</h2>
            <dl className="space-y-6 m-0">
              {post.faqs.map((faq, i) => (
                <div key={i}>
                  <dt className="font-semibold text-foreground mb-2">{faq.q}</dt>
                  <dd className="text-muted-foreground leading-relaxed m-0 text-base md:text-lg">
                    {faq.a}
                  </dd>
                </div>
              ))}
            </dl>
          </Card>
        ) : null}

        <footer className="mt-10 pt-8 border-t border-border/60 flex flex-wrap gap-3">
          <Button asChild variant="outline">
            <Link to={BLOG_INDEX_PATH} className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              All posts
            </Link>
          </Button>
          <Button asChild>
            <Link to="/spin-wheel-free">Try the spin wheel</Link>
          </Button>
        </footer>
      </article>
    </>
  );
};

export default BlogPost;
