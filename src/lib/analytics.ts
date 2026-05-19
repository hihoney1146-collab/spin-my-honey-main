export type GtagConsentState = "granted" | "denied";

export function gtagConsentUpdate(consent: GtagConsentState): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    ad_storage: consent,
    ad_user_data: consent,
    ad_personalization: consent,
    analytics_storage: consent,
  });
}

export function gtagEvent(
  event: string,
  params?: Record<string, string | number | boolean>,
): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", event, params);
}
