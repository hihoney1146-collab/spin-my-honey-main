import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Cookie, Mail, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Hi Honey</title>
        <meta
          name="description"
          content="Learn about how Hi Honey uses cookies and similar technologies to enhance your experience on our spin wheel tool."
        />
        <link rel="canonical" href="https://hihoney.site/cookie-policy" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            How we use cookies and similar technologies
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Introduction
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                This Cookie Policy explains how Hi Honey ("we", "our", or "us")
                uses cookies and similar tracking technologies when you visit
                our website at hihoney.site ("Website"). This policy should be
                read in conjunction with our Privacy Policy, which provides
                additional information about how we collect, use, and protect
                your personal information.
              </p>
              <p>
                By using our Website, you consent to the use of cookies in
                accordance with this Cookie Policy. If you do not agree with our
                use of cookies, please adjust your browser settings accordingly
                or refrain from using our Website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What Are Cookies?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Cookies are small text files that are placed on your device
                (computer, smartphone, tablet) when you visit a website. These
                files store information about your visit and preferences,
                allowing websites to remember you and provide a better user
                experience on subsequent visits.
              </p>
              <p>Cookies can be categorized by their lifespan and source:</p>
              <ul className="space-y-3 text-muted-foreground ml-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Session Cookies:</strong> Temporary cookies that are
                    deleted when you close your browser. These enable basic
                    website functionality during your visit.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Persistent Cookies:</strong> Cookies that remain on
                    your device for a set period (days, months, or years) or
                    until you manually delete them. These remember your
                    preferences and settings across sessions.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>First-Party Cookies:</strong> Cookies set directly
                    by our Website that are only accessible by us.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Third-Party Cookies:</strong> Cookies set by
                    external services (such as Google Analytics) that we use on
                    our Website.
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Types of Cookies We Use
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Essential Cookies
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  These cookies are necessary for our Website to function
                  properly. They enable core functionality such as security,
                  network management, and accessibility. Without these cookies,
                  our services cannot be provided.
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Session Management:</strong> Maintain your session
                      while using our spin wheel tool
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Security:</strong> Protect against fraudulent
                      activity and ensure website security
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Load Balancing:</strong> Distribute website
                      traffic evenly across servers
                    </span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-3 text-sm">
                  <strong>Retention:</strong> These cookies are typically
                  session-based and expire when you close your browser.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Functional Cookies
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  These cookies enhance your experience by remembering your
                  preferences and choices. They allow our Website to provide
                  personalized features and improved functionality.
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Theme Preferences:</strong> Remember your
                      dark/light mode preference
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Wheel Configurations:</strong> Store your spin
                      wheel entries and settings locally (localStorage)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Language Settings:</strong> Remember your
                      preferred language
                    </span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-3 text-sm">
                  <strong>Retention:</strong> These cookies may persist for up
                  to 12 months or until you clear your browser data.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Analytics Cookies
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  We use analytics cookies to understand how visitors interact
                  with our Website. This helps us improve our services, enhance
                  user experience, and identify areas for optimization.
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Google Analytics:</strong> We use Google Analytics
                      to track website usage, page views, user interactions, and
                      demographic information. This service uses cookies to
                      collect anonymous statistical data.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Performance Metrics:</strong> Monitor page load
                      times, user engagement, and site performance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>User Behavior:</strong> Analyze how users navigate
                      our Website and interact with features
                    </span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-3 text-sm">
                  <strong>Retention:</strong> Analytics cookies typically expire
                  after 2 years. You can opt-out of Google Analytics tracking
                  using the Google Analytics Opt-out Browser Add-on.
                </p>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Advertising Cookies (Future Use)
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  When Google AdSense is approved and implemented on our
                  Website, we may use advertising cookies to deliver
                  personalized advertisements and measure ad campaign
                  effectiveness.
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Ad Personalization:</strong> Display relevant ads
                      based on your interests and browsing behavior
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Ad Performance:</strong> Measure the effectiveness
                      of advertisements
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Frequency Capping:</strong> Control how often you
                      see the same advertisement
                    </span>
                  </li>
                </ul>
                <p className="text-muted-foreground mt-3 text-sm">
                  <strong>Note:</strong> These cookies will only be used after
                  Google AdSense approval. You will be notified when advertising
                  cookies are implemented, and you can manage your preferences
                  accordingly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              LocalStorage and Similar Technologies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In addition to cookies, we use browser localStorage to store
                certain information on your device. Unlike cookies, localStorage
                data remains on your device until you manually clear it or clear
                your browser data.
              </p>
              <p>We use localStorage for:</p>
              <ul className="space-y-2 text-muted-foreground ml-4 mt-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Spin Wheel Entries:</strong> Store your custom wheel
                    entries, colors, and configurations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>User Preferences:</strong> Save theme settings,
                    display preferences, and customization choices
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Session Data:</strong> Maintain state during your
                    browsing session
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                You can clear localStorage at any time through your browser
                settings. Note that clearing localStorage will remove your saved
                wheel configurations and preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Services
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Our Website uses third-party services that may set their own
                cookies. These services have their own privacy policies and
                cookie practices:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-4 mt-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Google Analytics:</strong> We use Google Analytics
                    to analyze website traffic and user behavior. Google's use
                    of cookies is governed by their{" "}
                    <a
                      href="https://policies.google.com/privacy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://policies.google.com/technologies/cookies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Cookie Policy
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Google AdSense:</strong> When approved, Google
                    AdSense may set cookies for ad personalization and
                    measurement. Google's cookie practices are governed by their
                    advertising policies.
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                We do not have direct control over third-party cookies. Please
                refer to the respective third-party privacy policies for more
                information about their cookie practices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Managing Cookies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You have control over cookies and can manage them through your
                browser settings. Most browsers allow you to:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4 mt-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>View and delete cookies stored on your device</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Block all cookies or only third-party cookies</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>Receive notifications when cookies are set</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Configure cookie preferences for specific websites
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                <strong>Browser-Specific Instructions:</strong>
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4 mt-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Chrome:</strong> Settings → Privacy and Security →
                    Cookies and other site data
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Firefox:</strong> Options → Privacy & Security →
                    Cookies and Site Data
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Safari:</strong> Preferences → Privacy → Manage
                    Website Data
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Edge:</strong> Settings → Cookies and site
                    permissions → Cookies and site data
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                <strong>Important:</strong> Blocking or deleting cookies may
                affect your experience on our Website. Some features may not
                function properly without cookies. Essential cookies are
                necessary for basic functionality and cannot be disabled.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Opting Out of Analytics
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you prefer not to have your data collected by Google
                Analytics, you can opt-out using the following methods:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-4 mt-3">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Google Analytics Opt-out Browser Add-on:</strong>{" "}
                    Install the official Google Analytics opt-out browser
                    extension from{" "}
                    <a
                      href="https://tools.google.com/dlpage/gaoptout"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Google's website
                    </a>
                    .
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Browser Settings:</strong> Configure your browser to
                    block analytics cookies
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Ad Personalization:</strong> Manage your Google ad
                    personalization settings at{" "}
                    <a
                      href="https://adssettings.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      adssettings.google.com
                    </a>
                    .
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Updates to This Cookie Policy
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We may update this Cookie Policy from time to time to reflect
                changes in our practices, technology, legal requirements, or for
                other operational, legal, or regulatory reasons. The "Last
                Updated" date at the bottom of this page indicates when this
                policy was last revised.
              </p>
              <p>
                We encourage you to review this Cookie Policy periodically to
                stay informed about how we use cookies and similar technologies.
                Your continued use of our Website after any changes to this
                Cookie Policy constitutes your acceptance of those changes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                If you have questions, concerns, or requests regarding this
                Cookie Policy or our use of cookies, please contact us:
              </p>
              <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mt-4">
                <p className="mb-2">
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:chaudhrayadam@gmail.com"
                    className="text-primary hover:underline font-semibold"
                  >
                    chaudhrayadam@gmail.com
                  </a>
                </p>
                <p className="text-sm text-muted-foreground">
                  We aim to respond to all inquiries within 48 hours.
                </p>
              </div>
            </div>
          </section>

          <section className="border-t pt-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>
                <strong>Last Updated:</strong>{" "}
                {new Date().toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
              <p className="mt-2">
                This Cookie Policy is effective as of the date listed above and
                applies to all users of hihoney.site.
              </p>
            </div>
          </section>
        </Card>

        {/* Related Links */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Privacy Policy</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Learn how we protect your privacy and handle your personal
              information.
            </p>
            <Link
              to="/privacy"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Read Privacy Policy
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Mail className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Contact Us</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about our cookie practices? We're here to help.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </article>
    </>
  );
};

export default CookiePolicy;
