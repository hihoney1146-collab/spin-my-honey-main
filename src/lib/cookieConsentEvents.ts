/** Lets footer "Cookie settings" reopen the consent UI without prop drilling. */
export const COOKIE_SETTINGS_OPEN = "cookie-settings-open";

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_OPEN));
  }
}
