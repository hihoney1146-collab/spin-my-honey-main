import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import jahangirSeo from "@/assets/Jahangir-SEO.jpeg";
import { ORG_NAME, RAJA_AUTHOR, siteIdentityJsonLd } from "@/lib/schema";
import { TEAM_LINKEDIN, SITE_SOCIAL_LINKS } from "@/lib/teamLinks";

const AuthorRajaJahangir = () => {
  const canonical = RAJA_AUTHOR.url;
  const location = `${RAJA_AUTHOR.locality}, ${RAJA_AUTHOR.country}`;

  return (
    <>
      <Helmet>
        <title>Raja Jahangir — Creator of {ORG_NAME}</title>
        <meta
          name="description"
          content="Raja Jahangir is the independent creator of Online Spin Wheel. Learn how he designs, builds, and tests every wheel for fair, uniform random results — and connect with him."
        />
        <link rel="canonical" href={canonical} />
        <meta
          property="og:title"
          content="Raja Jahangir — Creator of Online Spin Wheel"
        />
        <meta
          property="og:description"
          content="Meet Raja Jahangir, the solo maker who builds, tests, and maintains Online Spin Wheel and its free specialty wheels."
        />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={RAJA_AUTHOR.image} />
        {siteIdentityJsonLd().map((node, i) => (
          <script type="application/ld+json" key={i}>
            {JSON.stringify(node)}
          </script>
        ))}
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
              alt="Raja Jahangir, creator of Online Spin Wheel"
              className="h-full w-full object-cover"
              width={320}
              height={320}
              loading="eager"
              fetchPriority="high"
            />
          </div>
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              Creator &amp; maintainer
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Raja Jahangir
            </h1>
            <p className="text-lg text-muted-foreground">
              Creator of {ORG_NAME}
            </p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
              {location}
            </p>
          </div>
        </header>

        <Card className="p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I&apos;m Raja Jahangir, the independent creator of{" "}
            <Link
              to="/"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
            >
              Online Spin Wheel
            </Link>
            . Online Spin Wheel is an independent project built and maintained by
            me — not a company or an agency. I design it, write the code, publish
            every specialty wheel, and answer the emails. Working from{" "}
            {location}, I keep the tool free, fast, and privacy-respecting for
            teachers, creators, and small businesses around the world.
          </p>
          <p>
            I built this site because most spinners I found were slow, cluttered
            with ads, or vague about whether their results were actually random.
            I wanted a wheel that loads instantly, works on any phone or
            smartboard, and is honest about how it picks. So every wheel here
            draws its randomness from the browser&apos;s Web Crypto API
            (<code>crypto.getRandomValues()</code>) rather than a predictable
            <code> Math.random()</code>, and your entries never leave your device.
          </p>
          <p>
            Each wheel is designed the same way: I start from a real use case —
            a classroom name draw, a giveaway, a team stand-up — write the
            content and default entries around it, and then build the interaction
            so it feels fair to watch. Before a wheel goes live, I test it for
            uniform distribution across 10,000 automated spins to confirm every
            equal-sized segment lands with the same probability. If the results
            drift, the wheel doesn&apos;t ship until they don&apos;t.
          </p>
          <p>
            Fairness is the whole point, so I keep it verifiable rather than
            asking you to take my word for it. The spin is continuous and
            visible, you can screen-record it as proof, and I explain the exact
            mechanism on the{" "}
            <Link
              to="/how-randomness-works"
              className="font-medium text-primary underline underline-offset-2 hover:opacity-90"
            >
              how randomness works
            </Link>{" "}
            page. When I update a tool or a guide, I refresh its visible
            &quot;last updated&quot; date so you always know how current the page is.
          </p>
        </Card>

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            How I work
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Design and build every wheel and page myself, end to end.</li>
            <li>
              Test each wheel for uniform distribution across 10,000 automated
              spins before launch.
            </li>
            <li>
              Use cryptographically secure randomness and keep all processing on
              your device.
            </li>
            <li>
              Maintain fast, server-rendered, structured content so pages are
              accurate and accessible.
            </li>
            <li>
              Review published content regularly and stamp a visible last-updated
              date.
            </li>
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

        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">
            Follow {ORG_NAME}
          </h2>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {SITE_SOCIAL_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-primary hover:underline inline-flex items-center gap-1"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
};

export default AuthorRajaJahangir;
