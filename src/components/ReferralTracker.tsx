import { useEffect } from "react";
import { gtagEvent } from "@/lib/analytics";

export const ReferralTracker = () => {
  useEffect(() => {
    // Track which site sent the visitor, so referral traffic can be attributed.
    const trackReferralSource = () => {
      if (typeof window === "undefined") return;

      const referrer = document.referrer;
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");

      // Platforms worth attributing referral traffic to.
      const referralPlatforms = [
        { name: "medium", domain: "medium.com" },
        { name: "youtube", domain: "youtube.com" },
        { name: "reddit", domain: "reddit.com" },
        { name: "quora", domain: "quora.com" },
        { name: "pinterest", domain: "pinterest.com" },
        { name: "linkedin", domain: "linkedin.com" },
        { name: "tumblr", domain: "tumblr.com" },
        { name: "twitter", domain: "twitter.com" },
        { name: "facebook", domain: "facebook.com" },
      ];

      // Did the visitor arrive from one of the platforms we watch?
      const referralPlatform = referralPlatforms.find((platform) =>
        referrer.toLowerCase().includes(platform.domain)
      );

      if (referralPlatform) {
        gtagEvent("referral_source", {
          event_category: "referral",
          event_label: referralPlatform.name,
          value: 1,
        });

        // Store in localStorage for attribution
        localStorage.setItem("first_referrer", referralPlatform.name);
        localStorage.setItem("referrer_url", referrer);
      }

      // Track UTM parameters on inbound links.
      if (utmSource) {
        gtagEvent("utm_tracking", {
          event_category: "campaign",
          event_label: `${utmSource}|${utmMedium || "unknown"}|${utmCampaign || "unknown"}`,
        });

        // Note the source when it is one we recognise.
        const knownSources = [
          "medium",
          "youtube",
          "reddit",
          "quora",
          "pinterest",
          "linkedin",
          "tumblr",
          "embed",
        ];

        if (knownSources.includes(utmSource.toLowerCase())) {
          localStorage.setItem("referral_source", utmSource);
        }
      }
    };

    trackReferralSource();
  }, []);

  // This component doesn't render anything
  return null;
};

