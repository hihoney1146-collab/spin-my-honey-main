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
import BlogPost from "./pages/BlogPost";
import AuthorRajaJahangir from "./pages/AuthorRajaJahangir";
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
const WheelOfNamesAlternative = lazy(
  () => import("./pages/WheelOfNamesAlternative")
);
const HowRandomnessWorks = lazy(() => import("./pages/HowRandomnessWorks"));
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const AllSpinWheelsPage = lazy(() => import("./pages/AllSpinWheelsPage"));
const BlogIndex = lazy(() => import("./pages/BlogIndex"));
const WheelProgrammaticPage = lazy(
  () => import("./pages/WheelProgrammaticPage")
);
const NotFound = lazy(() => import("./pages/NotFound"));
const Embed = lazy(() => import("./pages/Embed"));
import { ReferralTracker } from "./components/ReferralTracker";
import { CookieConsent } from "./components/CookieConsent";
import { PageLoadingFallback } from "./components/PageLoadingFallback";

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
                  <Suspense fallback={<PageLoadingFallback />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/contact-us"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="/privacy-policy"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Privacy />
                  </Suspense>
                }
              />
              <Route
                path="/cookie-policy"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
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
                  <Suspense fallback={<PageLoadingFallback />}>
                    <TutorialAddingImagesToSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/case-study-school-using-spin-wheels"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <CaseStudySchoolUsingSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/case-study-community-event-using-spin-wheels"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <CaseStudyCommunityEventUsingSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-spin-wheel-vs-random-number-generator"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <ComparisonSpinWheelVsRandomNumberGenerator />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-spin-wheel-vs-traditional-methods"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <ComparisonSpinWheelVsTraditionalMethods />
                  </Suspense>
                }
              />
              <Route
                path="/comparison-online-vs-physical-spin-wheels"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <ComparisonOnlineVsPhysicalSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/wheel-of-names-alternative"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <WheelOfNamesAlternative />
                  </Suspense>
                }
              />
              <Route
                path="/how-randomness-works"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <HowRandomnessWorks />
                  </Suspense>
                }
              />
              <Route
                path="/terms-and-conditions"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Terms />
                  </Suspense>
                }
              />
              <Route
                path="/disclaimer"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <Disclaimer />
                  </Suspense>
                }
              />
              <Route
                path="/all-spin-wheels"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <AllSpinWheelsPage />
                  </Suspense>
                }
              />
              <Route
                path="/blog"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <BlogIndex />
                  </Suspense>
                }
              />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/author/raja-jahangir" element={<AuthorRajaJahangir />} />
              {/* Consolidated doorway pages → canonical targets (edge 301s live in vercel.json) */}
              <Route
                path="/exercise-spin-wheel"
                element={<Navigate to="/exercise-picker-wheel" replace />}
              />
              <Route
                path="/date-night-idea-wheel"
                element={<Navigate to="/date-night-wheel" replace />}
              />
              <Route
                path="/what-movie-should-i-watch-wheel"
                element={<Navigate to="/movie-picker-wheel" replace />}
              />
              <Route
                path="/giveaway-winner-picker-wheel"
                element={<Navigate to="/winner-picker-wheel" replace />}
              />
              <Route
                path="/zodiac-sign-wheel-game"
                element={<Navigate to="/zodiac-sign-wheel" replace />}
              />
              <Route
                path="/zodiac-wheel-dates"
                element={<Navigate to="/zodiac-sign-wheel" replace />}
              />
              <Route
                path="/zodiac-wheel-planets"
                element={<Navigate to="/zodiac-sign-wheel" replace />}
              />
              <Route
                path="/wheel-of-fortune-zodiac"
                element={<Navigate to="/daily-horoscope-wheel" replace />}
              />
              <Route
                path="/egyptian-zodiac-wheel"
                element={<Navigate to="/zodiac-sign-wheel" replace />}
              />
              <Route
                path="/:slug"
                element={
                  <Suspense fallback={<PageLoadingFallback />}>
                    <WheelProgrammaticPage />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="/embed"
              element={
                <Suspense fallback={<PageLoadingFallback />}>
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
                <Suspense fallback={<PageLoadingFallback />}>
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
