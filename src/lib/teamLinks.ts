/** Official profile links for E-E-A-T attribution. */

import {
  ARMGHANA_AUTHOR,
  ZOHA_AUTHOR,
  RAJA_AUTHOR,
  ABDAL_AUTHOR,
} from "./teamAuthors";

/** Real, live public profile(s) for the Online Spin Wheel team. */
export const TEAM_LINKEDIN = {
  armghanaZeeshan: ARMGHANA_AUTHOR.linkedIn,
  zohaZeeshan: ZOHA_AUTHOR.linkedIn,
  rajaJahangir: RAJA_AUTHOR.linkedIn,
  abdalKhalid: ABDAL_AUTHOR.linkedIn,
} as const;

/** About / team profile links (role-based paths, no names in URLs). */
export const TEAM_AUTHOR_LINKS = [
  { to: ARMGHANA_AUTHOR.path, label: ARMGHANA_AUTHOR.name, role: ARMGHANA_AUTHOR.shortRole },
  { to: ZOHA_AUTHOR.path, label: ZOHA_AUTHOR.name, role: ZOHA_AUTHOR.shortRole },
  { to: RAJA_AUTHOR.path, label: RAJA_AUTHOR.name, role: RAJA_AUTHOR.shortRole },
  { to: ABDAL_AUTHOR.path, label: ABDAL_AUTHOR.name, role: ABDAL_AUTHOR.shortRole },
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
