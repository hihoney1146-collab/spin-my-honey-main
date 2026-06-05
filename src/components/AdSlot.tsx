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
 * Placeholder ad region. Renders nothing until the user accepts cookies.
 * Do not pass a live adSlot until AdSense approval.
 */
export function AdSlot({
  adSlot,
  className = "",
  label = "Advertisement",
}: AdSlotProps) {
  const ref = useRef<HTMLModElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const consent = readCookieConsent();
    if (consent !== "accepted") return;

    loadAdSenseScript();
    setReady(true);
  }, []);

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

  const consent = readCookieConsent();
  if (consent !== "accepted") return null;

  if (!adSlot) {
    return (
      <div
        className={`min-h-[90px] rounded-lg border border-dashed border-border/80 bg-muted/30 flex items-center justify-center text-xs text-muted-foreground ${className}`}
        aria-hidden
      >
        {label} (enabled after AdSense approval)
      </div>
    );
  }

  return (
    <aside className={className} aria-label={label}>
      <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1 text-center">
        {label}
      </p>
      <ins
        ref={ref}
        className="adsbygoogle block"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </aside>
  );
}
