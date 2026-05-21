import { useState, useEffect, useCallback, useId, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  readCookieConsent,
  writeCookieConsent,
  type CookieConsentValue,
} from "@/lib/consentStorage";
import { COOKIE_SETTINGS_OPEN } from "@/lib/cookieConsentEvents";
import { gtagConsentUpdate } from "@/lib/analytics";
import { loadAdSenseScript } from "@/lib/loadAdSense";

type ConsentState = "granted" | "denied";

function consentToGtag(value: CookieConsentValue): ConsentState {
  return value === "accepted" ? "granted" : "denied";
}

export const CookieConsent = () => {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [storedChoice, setStoredChoice] = useState<CookieConsentValue | null>(
    null,
  );

  const applyChoice = useCallback((value: CookieConsentValue) => {
    writeCookieConsent(value);
    setStoredChoice(value);
    gtagConsentUpdate(consentToGtag(value));
    if (value === "accepted") {
      loadAdSenseScript();
    }
    setIsVisible(false);
  }, []);

  useEffect(() => {
    const existing = readCookieConsent();
    setStoredChoice(existing);
    if (existing) {
      gtagConsentUpdate(consentToGtag(existing));
      if (existing === "accepted") {
        loadAdSenseScript();
      }
      return;
    }
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onOpenSettings = () => setIsVisible(true);
    window.addEventListener(COOKIE_SETTINGS_OPEN, onOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_OPEN, onOpenSettings);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-end justify-center p-4 md:p-6 pointer-events-none"
          role="presentation"
        >
          <Card
            ref={dialogRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="pointer-events-auto max-w-4xl w-full bg-background/95 backdrop-blur-md border-primary/20 shadow-lg shadow-primary/5 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 outline-none relative"
          >
            <div className="flex items-start gap-4 flex-1 w-full">
              <div className="bg-primary/10 p-2 rounded-full hidden sm:block shrink-0">
                <Cookie className="h-6 w-6 text-primary" aria-hidden />
              </div>
              <div className="space-y-2 flex-1">
                <h2
                  id={titleId}
                  className="font-semibold text-lg flex items-center gap-2"
                >
                  <Cookie className="h-5 w-5 text-primary sm:hidden" aria-hidden />
                  Cookie preferences
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We use cookies and similar technologies for essential site
                  function, analytics, and advertising (including Google AdSense).
                  You can accept all cookies or decline non-essential use. Read
                  our{" "}
                  <Link
                    to="/cookie-policy"
                    className="text-primary hover:underline font-medium"
                  >
                    Cookie Policy
                  </Link>
                  ,{" "}
                  <Link
                    to="/privacy-policy"
                    className="text-primary hover:underline font-medium"
                  >
                    Privacy Policy
                  </Link>
                  , and{" "}
                  <Link
                    to="/disclaimer"
                    className="text-primary hover:underline font-medium"
                  >
                    Disclaimer
                  </Link>
                  .
                </p>
                {storedChoice ? (
                  <p className="text-xs text-muted-foreground">
                    Current choice:{" "}
                    <span className="font-medium text-foreground">
                      {storedChoice === "accepted" ? "Accepted" : "Declined"}
                    </span>
                    . Change anytime via Cookie settings in the footer.
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => applyChoice("declined")}
                className="flex-1 md:flex-none"
              >
                Decline non-essential
              </Button>
              <Button
                type="button"
                onClick={() => applyChoice("accepted")}
                className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Accept all
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Close cookie preferences"
            >
              <X className="h-4 w-4" />
            </button>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
