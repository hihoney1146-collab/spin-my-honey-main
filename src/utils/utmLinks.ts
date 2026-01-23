// UTM tracking links for parasite SEO campaigns

export const utmLinks = {
  // Medium article links
  medium: {
    article: "https://onlinespinwheel.fun?utm_source=medium&utm_medium=article&utm_campaign=parasite_seo",
    profile: "https://onlinespinwheel.fun?utm_source=medium&utm_medium=profile&utm_campaign=author_bio",
  },

  // YouTube video links
  youtube: {
    description: "https://onlinespinwheel.fun?utm_source=youtube&utm_medium=video&utm_campaign=tutorial",
    pinned_comment: "https://onlinespinwheel.fun?utm_source=youtube&utm_medium=comment&utm_campaign=engagement",
  },

  // Reddit post links
  reddit: {
    teachers: "https://onlinespinwheel.fun?utm_source=reddit&utm_medium=post&utm_campaign=teachers",
    webdev: "https://onlinespinwheel.fun?utm_source=reddit&utm_medium=post&utm_campaign=webdev",
    gaming: "https://onlinespinwheel.fun?utm_source=reddit&utm_medium=post&utm_campaign=gaming",
  },

  // Quora answer links
  quora: {
    answer: "https://onlinespinwheel.fun?utm_source=quora&utm_medium=answer&utm_campaign=q_and_a",
    profile: "https://onlinespinwheel.fun?utm_source=quora&utm_medium=profile&utm_campaign=author_bio",
  },

  // Pinterest pin links
  pinterest: {
    pin: "https://onlinespinwheel.fun?utm_source=pinterest&utm_medium=pin&utm_campaign=visual_content",
    board: "https://onlinespinwheel.fun?utm_source=pinterest&utm_medium=board&utm_campaign=collection",
  },

  // LinkedIn article links
  linkedin: {
    article: "https://onlinespinwheel.fun?utm_source=linkedin&utm_medium=article&utm_campaign=professional",
    post: "https://onlinespinwheel.fun?utm_source=linkedin&utm_medium=post&utm_campaign=network",
  },

  // Embed widget backlink
  embed: {
    widget: "https://onlinespinwheel.fun?utm_source=embed&utm_medium=widget&utm_campaign=backlink",
  },

  // Product Hunt
  producthunt: {
    listing: "https://onlinespinwheel.fun?utm_source=producthunt&utm_medium=listing&utm_campaign=launch",
  },

  // Guest posts
  guest_post: {
    education_blog: "https://onlinespinwheel.fun?utm_source=guest_post&utm_medium=article&utm_campaign=education",
    tech_blog: "https://onlinespinwheel.fun?utm_source=guest_post&utm_medium=article&utm_campaign=tech",
  },
};

// Helper function to generate custom UTM link
export const generateUTMLink = (
  source: string,
  medium: string,
  campaign: string,
  content?: string
): string => {
  const params = new URLSearchParams({
    utm_source: source,
    utm_medium: medium,
    utm_campaign: campaign,
  });

  if (content) {
    params.append("utm_content", content);
  }

  return `https://onlinespinwheel.fun?${params.toString()}`;
};

// Track when UTM links are used
export const trackUTMUsage = (platform: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "utm_link_generated", {
      event_category: "parasite_seo",
      event_label: platform,
      value: 1,
    });
  }
};

