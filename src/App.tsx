import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LayoutWrapper } from "@/components/LayoutWrapper";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
// Lazy load non-critical pages for better initial load performance
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Blog = lazy(() => import("./pages/Blog"));
const Privacy = lazy(() => import("./pages/Privacy"));
const CookiePolicy = lazy(() => import("./pages/CookiePolicy"));
const HowToUseSpinWheelsInClassrooms = lazy(
  () => import("./pages/HowToUseSpinWheelsInClassrooms")
);
const HowToCreateFairGiveawaysWithSpinWheels = lazy(
  () => import("./pages/HowToCreateFairGiveawaysWithSpinWheels")
);
const HowToUseSpinWheelsForTeamBuilding = lazy(
  () => import("./pages/HowToUseSpinWheelsForTeamBuilding")
);
const HowToOrganizeEventsWithRandomSelection = lazy(
  () => import("./pages/HowToOrganizeEventsWithRandomSelection")
);
const HowToMakeDecisionsFasterWithSpinWheels = lazy(
  () => import("./pages/HowToMakeDecisionsFasterWithSpinWheels")
);
const TutorialCreatingYourFirstSpinWheel = lazy(
  () => import("./pages/TutorialCreatingYourFirstSpinWheel")
);
const Terms = lazy(() => import("./pages/Terms"));
const Disclaimer = lazy(() => import("./pages/Disclaimer"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Embed = lazy(() => import("./pages/Embed"));
import { ReferralTracker } from "./components/ReferralTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      storageKey="hihoney-theme"
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ReferralTracker />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route element={<LayoutWrapper />}>
              <Route path="/" element={<Index />} />
              <Route
                path="/about"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <About />
                  </Suspense>
                }
              />
              <Route
                path="/contact"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Contact />
                  </Suspense>
                }
              />
              <Route
                path="/blog"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <Blog />
                  </Suspense>
                }
              />
              <Route
                path="/privacy"
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
                path="/how-to-use-spin-wheels-in-classrooms"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <HowToUseSpinWheelsInClassrooms />
                  </Suspense>
                }
              />
              <Route
                path="/how-to-create-fair-giveaways-with-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <HowToCreateFairGiveawaysWithSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/how-to-use-spin-wheels-for-team-building"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <HowToUseSpinWheelsForTeamBuilding />
                  </Suspense>
                }
              />
              <Route
                path="/how-to-organize-events-with-random-selection"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <HowToOrganizeEventsWithRandomSelection />
                  </Suspense>
                }
              />
              <Route
                path="/how-to-make-decisions-faster-with-spin-wheels"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <HowToMakeDecisionsFasterWithSpinWheels />
                  </Suspense>
                }
              />
              <Route
                path="/tutorial-creating-your-first-spin-wheel"
                element={
                  <Suspense fallback={<div className="min-h-screen" />}>
                    <TutorialCreatingYourFirstSpinWheel />
                  </Suspense>
                }
              />
              <Route
                path="/terms"
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
            </Route>
            <Route
              path="/embed"
              element={
                <Suspense fallback={<div className="min-h-screen" />}>
                  <Embed />
                </Suspense>
              }
            />
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
