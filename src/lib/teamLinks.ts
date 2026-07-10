/** Official profile links for E-E-A-T attribution. */

/** Real, live public profile(s) for the Online Spin Wheel team. */
export const TEAM_LINKEDIN = {
  armghanaZeeshan: "https://www.linkedin.com/in/armghana-zeeshan-bb157924a/",
  zohaZeeshan: "https://www.linkedin.com/in/zoha-zeeshan-7b9957352/",
  rajaJahangir: "https://www.linkedin.com/in/raja-jahangir",
  abdalKhalid: "https://www.linkedin.com/in/abdal-khalid",
} as const;

/** Footer / About leadership links (author profile pages). */
export const TEAM_AUTHOR_LINKS = [
  { to: "/author/armghana-zeeshan", label: "Armghana Zeeshan", role: "CEO" },
  { to: "/author/zoha-zeeshan", label: "Zoha Zeeshan", role: "Co-Founder" },
  { to: "/author/raja-jahangir", label: "Raja Jahangir", role: "Content & SEO Lead" },
  { to: "/author/abdal-khalid", label: "Abdal Khalid", role: "Social Media Expert" },
] as const;

/** Verified live brand profiles for Online Spin Wheel (footer + author page). */
export const SITE_SOCIAL_LINKS = [
  {
    href: "https://www.pinterest.com/onlinespinwheel/",
    label: "Pinterest",
  },
  {
    href: "https://www.instagram.com/onlinespinwheel/",
    label: "Instagram",
  },
  {
    href: "https://x.com/onlinespinwheel",
    label: "X",
  },
  {
    href: "https://www.youtube.com/@OnlineSpinWheel",
    label: "YouTube",
  },
] as const;

export const editorialAttributionClass =
  "font-medium text-primary underline underline-offset-2 hover:opacity-90";
