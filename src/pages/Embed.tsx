import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { WheelBySlug } from "@/components/wheelModes/WheelBySlug";
import { PoweredByBadge } from "@/components/PoweredByBadge";
import { getWheelPageBySlug } from "@/lib/wheelPages";
import { gtagEvent } from "@/lib/analytics";
import { SITE_ORIGIN } from "@/lib/schema";

const Embed = () => {
  const { slug = "random-name-picker-wheel" } = useParams<{ slug: string }>();
  const page = getWheelPageBySlug(slug);
  const wheelTitle = page?.h1 ?? page?.keywordPrimary ?? "Spin Wheel";

  useEffect(() => {
    gtagEvent("embed_view", {
      event_category: "parasite_seo",
      event_label: slug,
      value: 1,
    });

    if (window.parent !== window) {
      try {
        const parentUrl = document.referrer;
        if (parentUrl) {
          gtagEvent("embed_parent_domain", {
            event_category: "parasite_seo",
            event_label: new URL(parentUrl).hostname,
          });
        }
      } catch {
        /* cross-origin referrer blocked */
      }
    }
  }, [slug]);

  if (!page) {
    return (
      <>
        <Helmet>
          <title>Embed — wheel not found</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <p className="p-4 text-center text-sm">Wheel not found.</p>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{wheelTitle} — Embed</title>
        <meta name="description" content={`Embed ${wheelTitle} on your site.`} />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href={`${SITE_ORIGIN}/${slug}`} />
      </Helmet>

      <div className="min-h-screen bg-background p-3 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl mx-auto">
          <WheelBySlug slug={slug} presetOptionLabels={page.wheelOptions} compactEmbed />
          <div className="mt-3 text-center">
            <PoweredByBadge variant="gradient" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Embed;
