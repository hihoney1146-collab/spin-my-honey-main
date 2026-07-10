import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, MapPin } from "lucide-react";
import { OptimizedImage } from "@/components/OptimizedImage";
import type { ReactNode } from "react";
import { ORG_NAME, siteIdentityJsonLd } from "@/lib/schema";

type AuthorProfilePageProps = {
  canonical: string;
  title: string;
  metaDescription: string;
  ogDescription: string;
  name: string;
  roleLabel: string;
  jobTitle: string;
  location?: string;
  image?: { src: string; alt: string };
  initials?: string;
  linkedIn: string;
  ogImage?: string;
  children: ReactNode;
  extraSections?: ReactNode;
  showBrandSocial?: boolean;
  brandSocialLinks?: readonly { href: string; label: string }[];
};

export function AuthorProfilePage({
  canonical,
  title,
  metaDescription,
  ogDescription,
  name,
  roleLabel,
  jobTitle,
  location,
  image,
  initials,
  linkedIn,
  ogImage,
  children,
  extraSections,
  showBrandSocial = false,
  brandSocialLinks = [],
}: AuthorProfilePageProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={ogDescription} />
        <meta property="og:type" content="profile" />
        <meta property="og:url" content={canonical} />
        {ogImage ? <meta property="og:image" content={ogImage} /> : null}
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
          {image ? (
            <div className="h-40 w-40 rounded-full overflow-hidden border border-border/60 shrink-0">
              <OptimizedImage
                src={image.src}
                alt={image.alt}
                className="h-full w-full object-cover"
                width={320}
                height={320}
                loading="eager"
                fetchPriority="high"
              />
            </div>
          ) : (
            <div
              className="h-40 w-40 rounded-full border border-border/60 shrink-0 flex items-center justify-center bg-primary/10 text-primary text-3xl font-bold"
              aria-hidden="true"
            >
              {initials}
            </div>
          )}
          <div>
            <p className="text-sm font-semibold text-primary uppercase tracking-wide mb-1">
              {roleLabel}
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{name}</h1>
            <p className="text-lg text-muted-foreground">{jobTitle}</p>
            {location ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" aria-hidden="true" />
                {location}
              </p>
            ) : null}
          </div>
        </header>

        <Card className="p-6 md:p-8 space-y-4 text-muted-foreground leading-relaxed">
          {children}
        </Card>

        {extraSections}

        <section className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer author"
              className="inline-flex items-center gap-2"
            >
              Connect on LinkedIn
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/about-us">Meet the team</Link>
          </Button>
        </section>

        {showBrandSocial && brandSocialLinks.length ? (
          <section className="mt-8">
            <h2 className="text-xl font-bold mb-4 text-foreground">Follow {ORG_NAME}</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {brandSocialLinks.map((link) => (
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
        ) : null}
      </article>
    </>
  );
}
