import { useEffect, useRef, useState } from "react";
import { readCookieConsent } from "@/lib/consentStorage";
import { ADSENSE_CLIENT, loadAdSenseScript } from "@/lib/loadAdSense";

type AdSlotProps = {
  /** Reserved for post-approval ad unit IDs */
  adSlot?: string;
  className?: string;
  label?: string;
};

/**
 * Renders an AdSense unit when consent is accepted and a slot ID is configured.
 * Returns null (zero height) until both are present — no empty placeholder gap.
 */
export function AdSlot({
  adSlot,
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [consent, setConsent] = useState(() => readCookieConsent());
  const ready = consent === "accepted";

  useEffect(() => {
    const sync = () => setConsent(readCookieConsent());
    sync();
    window.addEventListener("storage", sync);
    window.addEventListener("cookie-consent-changed", sync);
    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("cookie-consent-changed", sync);
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    loadAdSenseScript();
  }, [ready]);

  useEffect(() => {
    if (!ready || !adSlot || !ref.current) return;
    try {
      const w = window as Window & { adsbygoogle?: unknown[] };
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
    } catch {
      /* ignore fill errors until approved */
    }
  }, [ready, adSlot]);

  if (!ready || !adSlot) {
    return null;
  }

  return (
    <div className={`min-h-[280px] w-full ${className}`} aria-label={label}>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1 text-center pt-2">
        {label}
      </p>
      <ins
        ref={ref}
        className="adsbygoogle block min-h-[250px]"
        style={{ display: "block", minHeight: 250 }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
