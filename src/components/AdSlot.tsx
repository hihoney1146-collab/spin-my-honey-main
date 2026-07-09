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
 * Reserved ad region with fixed min-height to limit CLS before/after AdSense fill.
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
  const reserved = (
    <div
      className={`min-h-[280px] w-full rounded-lg border border-dashed border-border/80 bg-muted/20 ${className}`}
      aria-label={label}
    >
      {consent === "accepted" && adSlot ? (
        <>
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
        </>
      ) : (
        <div className="flex min-h-[280px] items-center justify-center px-4 text-center text-xs text-muted-foreground">
          {consent === "accepted"
            ? `${label} (enabled after AdSense approval)`
            : `${label} — reserved slot`}
        </div>
      )}
    </div>
  );

  return reserved;
}
