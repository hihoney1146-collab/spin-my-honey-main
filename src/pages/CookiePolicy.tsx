import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Cookie, Mail, ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Online Spin Wheel</title>
        <meta
          name="description"
          content="Learn about how Online Spin Wheel uses cookies and tracking technologies on our website."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/cookie-policy" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Cookie className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Understanding how we use cookies and tracking technologies
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed">
              This Cookie Policy explains how Online Spin Wheel ("we", "us", or "our") uses cookies and similar tracking
              technologies on our website at https://onlinespinwheel.fun (the "Site"). By using the Site, you agree to the use of cookies as described below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What Are Cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device (e.g., computer, phone) by websites you visit. They help us
              provide a better experience, remember preferences, and analyze usage. We also use similar technologies like
              web beacons, pixels, and local storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-muted-foreground mb-4">
              We classify cookies by purpose and lifespan:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20 bg-primary/5">
                    <th className="text-left p-3 font-semibold">Category</th>
                    <th className="text-left p-3 font-semibold">Purpose</th>
                    <th className="text-left p-3 font-semibold">Examples</th>
                    <th className="text-left p-3 font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-semibold">Strictly Necessary</td>
                    <td className="p-3">Essential for Site operation (e.g., wheel functionality). No consent needed.</td>
                    <td className="p-3">Session ID, security tokens.</td>
                    <td className="p-3">Session (deleted on browser close) or up to 1 year.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-semibold">Performance/Analytics</td>
                    <td className="p-3">Analyze usage to improve speed/features (e.g., page load times, spin interactions).</td>
                    <td className="p-3">Google Analytics (_ga, _gid). Aggregated, anonymized data.</td>
                    <td className="p-3">2 years max.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-semibold">Functional</td>
                    <td className="p-3">Remember choices (e.g., wheel entries, language).</td>
                    <td className="p-3">Preference cookies.</td>
                    <td className="p-3">Up to 1 year.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-3 font-semibold">Targeting/Advertising</td>
                    <td className="p-3">Personalized ads via partners like Google (e.g., DoubleClick DART). Opt-out available.</td>
                    <td className="p-3">Ad IDs based on visits.</td>
                    <td className="p-3">Up to 13 months.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How Cookies Are Managed
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Consent Banner
                </h3>
                <p className="text-muted-foreground">
                  On first visit, you'll see a banner to accept/reject non-essential cookies. Rejecting disables analytics/ads but keeps necessary ones.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Your Controls
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Browser settings:</strong> Clear cookies or blocks via Chrome/Firefox tools.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Opt-outs:</strong> Google Analytics (<a href="https://tools.google.com/dlpage/gaoptout" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">tools.google.com</a>),
                      DART (<a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/ads</a>).
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span><strong>Do Not Track:</strong> We honor browser signals where possible.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Cookies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Partners like Google may set cookies independently:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Google Ads/Analytics:</strong> For performance and ads{" "}
                    <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
                      https://policies.google.com/technologies/ads
                    </a>.
                  </span>
                </li>
              </ul>
              <p className="mt-4">
                We do not control these; review their policies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Data Transfers and Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookie data stays on your device or secure servers (e.g., hosting providers). Transfers comply with Privacy
              Policy, including EEA protections via Standard Contractual Clauses.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this policy; check the date above. Continued use means acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Contact Us
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>Questions? Contact us:</p>
              <div className="flex items-center gap-2 text-lg">
                <Mail className="h-5 w-5 text-primary" />
                <span>Email:</span>
                <a
                  href="mailto:onlinespinwheel@gmail.com"
                  className="text-primary hover:underline font-semibold"
                >
                  onlinespinwheel@gmail.com
                </a>
              </div>
              <p>Website: <a href="https://onlinespinwheel.fun" className="text-primary hover:underline">https://onlinespinwheel.fun</a></p>
              <p className="mt-4">
                Read our{" "}
                <Link to="/privacy" className="text-primary hover:underline font-semibold">
                  Privacy Policy
                </Link>
                {" "}and{" "}
                <Link to="/terms" className="text-primary hover:underline font-semibold">
                  Terms
                </Link>.
              </p>
              <p className="text-sm mt-4 italic">
                For stricter compliance, implement a cookie consent tool (e.g., CookieYes) and link this policy site-wide. This
                pairs well with your existing pages for AdSense approval.
              </p>
            </div>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <p className="text-center text-base md:text-lg font-semibold text-foreground">
              We value your privacy and transparency in how we use cookies.
            </p>
          </div>
        </Card>

        {/* Next Step Navigation */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Know Your Rights
            </h3>
            <p className="text-muted-foreground">
              Review our privacy policy and terms of service
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/privacy"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Shield className="h-5 w-5" />
              <span>Privacy Policy</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/terms"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
            >
              <Shield className="h-5 w-5" />
              <span>Terms & Conditions</span>
            </Link>
          </div>
        </Card>
      </article>
    </>
  );
};

export default CookiePolicy;
