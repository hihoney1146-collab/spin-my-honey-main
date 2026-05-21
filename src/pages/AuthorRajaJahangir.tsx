import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import jahangirSeo from "@/assets/Jahangir-SEO.jpeg";
import {
  ORG_NAME,
  RAJA_AUTHOR,
  SITE_ORIGIN,
  organizationJsonLd,
  personAuthorJsonLd,
} from "@/lib/schema";
import { AUROXA_TECH_URL, TEAM_LINKEDIN } from "@/lib/teamLinks";

const AuthorRajaJahangir = () => {
  const canonical = RAJA_AUTHOR.url;
  const personLd = personAuthorJsonLd();
  const orgLd = organizationJsonLd();

  return (
    <>
      <Helmet>
        <title>Raja Jahangir | SEO &amp; Growth Specialist | {ORG_NAME}</title>
        <meta
          name="description"
          content="Raja Jahangir is the SEO and growth specialist behind Online Spin Wheel. Read credentials, editorial standards, and how we build trustworthy, human-reviewed spin wheel content."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Raja Jahangir | SEO & Growth Specialist" />
        <meta
          property="og:description"
          content="Professional profile of Raja Jahangir, SEO & Growth Specialist for Online Spin Wheel and Auroxa Tech."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(personLd)}</script>
        <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-3xl">
        <nav className="mb-8">
          <Button asChild variant="ghost" size="sm" className="-ml-3 text-muted-foreground">
            <Link to="/about-us" className="inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              About us
            </Link>
          </Button>
        </nav>

        <header className="flex flex-col sm:flex-row items-center gap-6 mb-10 text-center sm:text-left">
          <div className="h-40 w-40 rounded-full overflow-hidden border border-border/60 shrink-0">
            <OptimizedImage
              src={jahangirSeo}
              alt="Raja Jahangir, SEO and growth specialist"
              className="h-full w-full object-cover"
              width={320}
              height={320}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              Author profile
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Raja Jahangir
            </h1>
            <p className="text-lg text-muted-foreground">
              SEO &amp; Growth Specialist · {RAJA_AUTHOR.worksFor}
            </p>
          </div>
        </header>

        <Card className="p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            Raja Jahangir leads SEO and digital growth for{" "}
            <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
              Online Spin Wheel
            </Link>
            . With more
            than three years of hands-on experience in search strategy, he focuses on
            fast pages, clear user journeys, and privacy-respecting tools that teachers,
            creators, and small businesses can trust.
          </p>
          <p>
            Raja shapes editorial direction for our blog and specialty wheel pages. That
            includes fair-use guidance for giveaways, classroom pickers, and team
            icebreakers. Content is reviewed for accuracy, readable structure, and
            practical steps readers can apply immediately.
          </p>
          <p>
              Online Spin Wheel is built by{" "}
              <a
                href={AUROXA_TECH_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
              >
                Auroxa Tech
              </a>
              . Raja works alongside product,
            engineering, and community teammates to keep the experience free, fast, and
            transparent for global users.
          </p>
        </Card>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">Credentials</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>SEO and content strategy for utility and education sites</li>
            <li>Technical SEO: sitemaps, structured data, Core Web Vitals</li>
            <li>Growth for free tools with AdSense and consent-aware analytics</li>
            <li>Editorial standards for E-E-A-T on programmatic and blog content</li>
          </ul>
        </section>

        <section className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={TEAM_LINKEDIN.rajaJahangir}
              target="_blank"
              rel="noopener noreferrer author"
              className="inline-flex items-center gap-2"
            >
              Connect on LinkedIn
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/blog">Read the blog</Link>
          </Button>
        </section>
      </article>
    </>
  );
};

export default AuthorRajaJahangir;
