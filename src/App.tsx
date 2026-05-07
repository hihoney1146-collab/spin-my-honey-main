import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
// Lazy load non-critical pages for better initial load performance
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const TutorialAddingImagesToSpinWheels = lazy(
  () => import("./pages/TutorialAddingImagesToSpinWheels")
);
const CaseStudySchoolUsingSpinWheels = lazy(
  () => import("./pages/CaseStudySchoolUsingSpinWheels")
);
const CaseStudyCommunityEventUsingSpinWheels = lazy(
  () => import("./pages/CaseStudyCommunityEventUsingSpinWheels")
);
const ComparisonSpinWheelVsRandomNumberGenerator = lazy(
  () => import("./pages/ComparisonSpinWheelVsRandomNumberGenerator")
);
const ComparisonSpinWheelVsTraditionalMethods = lazy(
  () => import("./pages/ComparisonSpinWheelVsTraditionalMethods")
);
const ComparisonOnlineVsPhysicalSpinWheels = lazy(
  () => import("./pages/ComparisonOnlineVsPhysicalSpinWheels")
);
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const AllSpinWheelsPage = lazy(() => import("./pages/AllSpinWheelsPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const WheelProgrammaticPage = lazy(
  () => import("./pages/WheelProgrammaticPage")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Embed = lazy(() => import("./pages/Embed"));
import { ReferralTracker } from "./components/ReferralTracker";
import { CookieConsent } from "./components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="onlinespinwheel-theme"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ReferralTracker />
        <BrowserRouter>
          <ScrollToTop />
          <CookieConsent />
          <Routes>
            <Route element={<LayoutWrapper />}>
              <Route path="/" element={<Index />} />
              <Route
                path="/about-us"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Privacy />
                  </Suspense>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <CookiePolicy />
                  </Suspense>
                }
              />
              <Route
                path="/spin-wheel-free"
                element={<Navigate to="/all-spin-wheels" replace />}
              />
              <Route
                path="/spin-wheel-picker"
                element={<Navigate to="/all-spin-wheels" replace />}
              />
              <Route
                path="/how-to-use-spin-wheels-in-classrooms"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/how-to-create-fair-giveaways-with-spin-wheels"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/how-to-use-spin-wheels-for-team-building"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/how-to-organize-events-with-random-selection"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/how-to-make-decisions-faster-with-spin-wheels"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/tutorial-creating-your-first-spin-wheel"
                element={<Navigate to="/tutorial-adding-images-to-spin-wheels" replace />}
              />
              <Route
                path="/tutorial-customizing-spin-wheel-colors"
                element={<Navigate to="/tutorial-adding-images-to-spin-wheels" replace />}
              />
              <Route
                path="/tutorial-managing-spin-wheel-entries"
                element={<Navigate to="/tutorial-adding-images-to-spin-wheels" replace />}
              />
              <Route
                path="/tutorial-advanced-spin-wheel-features"
                element={<Navigate to="/tutorial-adding-images-to-spin-wheels" replace />}
              />
              <Route
                path="/case-study-corporate-event-using-spin-wheels"
                element={<Navigate to="/blog" replace />}
              />
              <Route
                path="/tutorial-adding-images-to-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <TutorialAddingImagesToSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/case-study-school-using-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <CaseStudySchoolUsingSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/case-study-community-event-using-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <CaseStudyCommunityEventUsingSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-spin-wheel-vs-random-number-generator"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <ComparisonSpinWheelVsRandomNumberGenerator />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-spin-wheel-vs-traditional-methods"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <ComparisonSpinWheelVsTraditionalMethods />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-online-vs-physical-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <ComparisonOnlineVsPhysicalSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/terms-and-conditions"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Terms />
                  </Suspense>
                }
              />
              <Route
                path="/disclaimer"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Disclaimer />
                  </Suspense>
                }
              />
              <Route
                path="/all-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <AllSpinWheelsPage />
                  </Suspense>
                }
              />
              <Route
                path="/blog"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <BlogIndex />
                  </Suspense>
                }
              />
              <Route
                path="/blog/:slug"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <BlogPost />
                  </Suspense>
                }
              />
              <Route
                path="/:slug"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <WheelProgrammaticPage />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/embed"
              element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Embed />
                </Suspense>
              }
            />
            <Route path="/about" element={<Navigate to="/about-us" replace />} />
            <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
            <Route path="/privacy" element={<Navigate to="/privacy-policy" replace />} />
            <Route path="/terms" element={<Navigate to="/terms-and-conditions" replace />} />
            <Route
              path="*"
              element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
