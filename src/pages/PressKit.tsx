import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, FlaskConical, Code2, Printer, Users, Mail } from "lucide-react";
import {
  SITE_ORIGIN,
  CONTACT_EMAIL,
  siteIdentityJsonLd,
  breadcrumbListJsonLd,
} from "@/lib/schema";
import { WHEEL_HUB_PATH } from "@/lib/siteInternalLinks";
import { TEAM_AUTHOR_LINKS } from "@/lib/teamLinks";
import studyData from "@/generated/fairnessStudy.json";

const CANONICAL = `${SITE_ORIGIN}/press-kit`;

const PressKit = () => {
  const allPass = studyData.summaries.every((s) => s.uniformPass);

  return (
    <>
      <Helmet>
        <title>Press Kit and Resources - Online Spin Wheel</title>
        <meta
          name="description"
          content="Free resources for teachers, writers, and streamers covering Online Spin Wheel: an embeddable wheel widget, the 100,000-spin fairness study, a printable classroom PDF, and who built the tool."
        />
        <link rel="canonical" href={CANONICAL} />
        <meta property="og:title" content="Press Kit and Resources - Online Spin Wheel" />
        <meta
          property="og:description"
          content="Embeddable wheel widget, the 100,000-spin fairness study, a printable classroom PDF, and who built Online Spin Wheel, all in one place."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={CANONICAL} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Press Kit and Resources" },
            ]),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="px-1">/</li>
            <li className="text-foreground font-medium">Press Kit and Resources</li>
          </ol>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Press Kit and Resources
        </h1>
        <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl">
          Writing about Online Spin Wheel, building a classroom lesson, or putting a wheel
          on your own page? Everything you need to reference, embed, or cite the tool is
          on this page: no signup, no request form.
        </p>

        <div className="space-y-6 md:space-y-8">
          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Code2 className="h-6 w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Embed a wheel on your site</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Every wheel page includes a ready-to-copy iframe snippet, free to use on
              blogs, classroom sites, or streaming overlays. Open any wheel from the{" "}
              <Link to={WHEEL_HUB_PATH} className="text-primary underline underline-offset-2">
                full wheel list
              </Link>{" "}
              and scroll to the &quot;Embed this wheel&quot; section to copy the code.
            </p>
            <Button asChild variant="outline">
              <Link to="/">See the embed snippet on the home wheel</Link>
            </Button>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <FlaskConical className="h-6 w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Original research: the fairness study</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We ran {studyData.totalSpins.toLocaleString()} automated spin simulations across{" "}
              {studyData.segmentCounts.length} segment-count configurations and tested each one
              for uniform distribution with a chi-square test at alpha = 0.05.{" "}
              {allPass
                ? "Every configuration passed."
                : "Full per-configuration results are on the study page."}{" "}
              Methodology, per-slice tables, and a downloadable CSV are on the{" "}
              <Link
                to="/spin-wheel-fairness-study"
                className="text-primary underline underline-offset-2 font-medium"
              >
                full fairness study page
              </Link>
              , including the exact citation format to use.
            </p>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Printer className="h-6 w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Printable classroom resource</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A free printable PDF of classroom spinner game setup cards, useful for a
              substitute teacher or when the projector is not available.
            </p>
            <Button asChild className="gap-2" variant="outline">
              <a href="/downloads/classroom-spin-wheel-game-cards.pdf" download>
                <Download className="h-4 w-4" />
                Download printable game cards (PDF)
              </a>
            </Button>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Who built Online Spin Wheel</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              A small independent team dedicated to one product. Read the full story on{" "}
              <Link to="/about-us" className="text-primary underline underline-offset-2">
                our About page
              </Link>
              , or go straight to an individual bio:
            </p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {TEAM_AUTHOR_LINKS.map((member) => (
                <li key={member.to}>
                  <Link
                    to={member.to}
                    className="block rounded-lg border border-border/60 bg-background/60 p-3 hover:border-primary/40 transition-colors"
                  >
                    <p className="font-semibold text-foreground text-sm">{member.label}</p>
                    <p className="text-xs text-muted-foreground">{member.role}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="h-6 w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold">Logo and media contact</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The Online Spin Wheel logo is free to use in articles or roundups that
              reference the tool.{" "}
              <a
                href="/logo.png"
                download
                className="text-primary underline underline-offset-2"
              >
                Download the logo (PNG)
              </a>
              . For interview requests, corrections, or anything else, write to{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary underline underline-offset-2"
              >
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </Card>
        </div>
      </article>
    </>
  );
};

export default PressKit;
