import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Cookie } from "lucide-react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export const CookieConsent = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) {
            // Show banner after a small delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookie-consent", "declined");
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
                >
                    <Card className="max-w-4xl mx-auto bg-background/95 backdrop-blur-md border-primary/20 shadow-lg shadow-primary/5 p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <div className="flex items-start gap-4 flex-1">
                            <div className="bg-primary/10 p-2 rounded-full hidden sm:block">
                                <Cookie className="h-6 w-6 text-primary" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg flex items-center gap-2">
                                    <Cookie className="h-5 w-5 text-primary sm:hidden" />
                                    We value your privacy
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    We use cookies to enhance your browsing experience, serve
                                    personalized ads or content, and analyze our traffic. By
                                    clicking "Accept", you consent to our use of cookies. Read our{" "}
                                    <Link
                                        to="/cookie-policy"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Cookie Policy
                                    </Link>{" "}
                                    and{" "}
                                    <Link
                                        to="/privacy"
                                        className="text-primary hover:underline font-medium"
                                    >
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 w-full md:w-auto">
                            <Button
                                variant="outline"
                                onClick={handleDecline}
                                className="flex-1 md:flex-none"
                            >
                                Decline
                            </Button>
                            <Button
                                onClick={handleAccept}
                                className="flex-1 md:flex-none bg-primary text-primary-foreground hover:bg-primary/90"
                            >
                                Accept
                            </Button>
                        </div>

                        <button
                            onClick={handleDecline}
                            className="absolute top-2 right-2 p-1 text-muted-foreground hover:text-foreground md:hidden"
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </Card>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
