import { useEffect } from "react";
import { gtagEvent } from "@/lib/analytics";

export const ReferralTracker = () => {
  useEffect(() => {
    // Track referral sources for parasite SEO
    const trackReferralSource = () => {
      if (typeof window === "undefined") return;

      const referrer = document.referrer;
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get("utm_source");
      const utmMedium = urlParams.get("utm_medium");
      const utmCampaign = urlParams.get("utm_campaign");

      // Parasite SEO platforms to track
      const parasitePlatforms = [
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

      // Check if traffic is from parasite SEO platform
      const parasitePlatform = parasitePlatforms.find((platform) =>
        referrer.toLowerCase().includes(platform.domain)
      );

      if (parasitePlatform) {
        gtagEvent("parasite_seo_referral", {
          event_category: "parasite_seo",
          event_label: parasitePlatform.name,
          value: 1,
        });

        // Store in localStorage for attribution
        localStorage.setItem("first_referrer", parasitePlatform.name);
        localStorage.setItem("referrer_url", referrer);
      }

      // Track UTM parameters from parasite SEO campaigns
      if (utmSource) {
        gtagEvent("utm_tracking", {
          event_category: "campaign",
          event_label: `${utmSource}|${utmMedium || "unknown"}|${utmCampaign || "unknown"}`,
        });

        // Mark as parasite SEO traffic if from known sources
        const parasiteSources = [
          "medium",
          "youtube",
          "reddit",
          "quora",
          "pinterest",
          "linkedin",
          "tumblr",
          "embed",
        ];

        if (parasiteSources.includes(utmSource.toLowerCase())) {
          localStorage.setItem("parasite_source", utmSource);
        }
      }
    };

    trackReferralSource();
  }, []);

  // This component doesn't render anything
  return null;
};

