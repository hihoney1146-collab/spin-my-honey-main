/** Load Google AdSense only after the user accepts cookies (AdSense policy + Consent Mode). */
export const ADSENSE_CLIENT = "ca-pub-2823129698767735";

let adSenseRequested = false;

export function loadAdSenseScript(): void {
  if (typeof document === "undefined" || adSenseRequested) return;
  if (document.querySelector('script[data-adsense-loader="true"]')) {
    adSenseRequested = true;
    return;
  }

  adSenseRequested = true;
  const script = document.createElement("script");
  script.async = true;
  script.crossOrigin = "anonymous";
  script.dataset.adsenseLoader = "true";
  script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`;
  document.head.appendChild(script);
}
