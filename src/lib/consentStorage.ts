export type CookieConsentValue = "accepted" | "declined";

const STORAGE_KEY = "cookie-consent";

export function readCookieConsent(): CookieConsentValue | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    if (v === "accepted" || v === "declined") return v;
    return null;
  } catch {
    return null;
  }
}

export function writeCookieConsent(value: CookieConsentValue): boolean {
  try {
    localStorage.setItem(STORAGE_KEY, value);
    return true;
  } catch {
    return false;
  }
}

export function clearCookieConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* storage unavailable */
  }
}
