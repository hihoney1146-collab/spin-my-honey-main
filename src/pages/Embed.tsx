import { SpinWheel } from "@/components/SpinWheel";
import { PoweredByBadge } from "@/components/PoweredByBadge";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { gtagEvent } from "@/lib/analytics";

const Embed = () => {
  useEffect(() => {
    // Track embed page views
    gtagEvent("embed_view", {
      event_category: "parasite_seo",
      event_label: "widget_impression",
      value: 1,
    });

    // Track parent domain for backlink source tracking
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
  }, []);

  return (
    <>
      <Helmet>
        <title>Embed - Online Spin Wheel Spin Wheel</title>
        <meta
          name="description"
          content="Embed Online Spin Wheel spin wheel on your website for random selections and decision making."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background p-4 flex flex-col items-center justify-center">
        {/* Compact version for embedding */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-[1fr_350px] gap-4 items-start">
            <div className="flex flex-col items-center justify-center">
              <SpinWheel />
            </div>
          </div>

          {/* Attribution Badge */}
          <div className="mt-4 text-center">
            <PoweredByBadge variant="gradient" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Embed;
