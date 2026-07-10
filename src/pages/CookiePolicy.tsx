import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Cookie, ArrowRight, Shield, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/lib/schema";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Online Spin Wheel</title>
        <meta
          name="description"
          content="Cookie Policy for Online Spin Wheel: cookie types, Google AdSense and Consent Mode, browser local storage, how to manage cookies, DNT/GPC, and contact."
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
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
            Cookie Policy
          </h1>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed">
              This Cookie Policy explains how Online Spin Wheel (&quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;), operated by Online Spin Wheel, uses cookies and similar tracking technologies on
              our website at{" "}
              <a
                href="https://onlinespinwheel.fun"
                className="text-primary hover:underline font-medium break-all"
              >
                https://onlinespinwheel.fun
              </a>
              . By using the site, you agree to the use of cookies as described
              below.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              What Are Cookies?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Cookies are small text files stored on your device (e.g., computer,
              tablet or smartphone) by websites you visit. They help us provide a
              better, faster and safer user experience, remember your preferences and
              analyze how our website is being used. We also use similar technologies
              like web beacons, tracking pixels and local browser storage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Types of Cookies We Use
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We classify the cookies used on our site by their purpose and
              lifespan:
            </p>
            <div className="overflow-x-auto rounded-lg border border-border/60">
              <table className="w-full min-w-[640px] text-sm border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/20 bg-primary/5">
                    <th className="text-left p-3 font-semibold text-foreground">
                      Category
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Purpose
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Examples
                    </th>
                    <th className="text-left p-3 font-semibold text-foreground">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50 align-top">
                    <td className="p-3 font-semibold text-foreground">
                      Strictly Necessary
                    </td>
                    <td className="p-3">
                      Essential for the core operation of the site (e.g., ensuring the
                      wheel spins properly without lagging). No user consent is
                      required for these.
                    </td>
                    <td className="p-3">
                      Session IDs, security tokens.
                    </td>
                    <td className="p-3">
                      Session (deleted when you close your browser) or up to 1 year.
                    </td>
                  </tr>
                  <tr className="border-b border-border/50 align-top">
                    <td className="p-3 font-semibold text-foreground">
                      Performance &amp; Analytics
                    </td>
                    <td className="p-3">
                      Used to analyze site usage so we can improve speed, features and
                      user experience (e.g., tracking page load times).
                    </td>
                    <td className="p-3">
                      Google Analytics (_ga, _gid). Data is aggregated and anonymized.
                    </td>
                    <td className="p-3">Up to 2 years.</td>
                  </tr>
                  <tr className="border-b border-border/50 align-top">
                    <td className="p-3 font-semibold text-foreground">Functional</td>
                    <td className="p-3">
                      Remember your previous choices and settings (e.g., saved wheel
                      entries, color preferences or language).
                    </td>
                    <td className="p-3">
                      Preference and local storage cookies.
                    </td>
                    <td className="p-3">Up to 1 year.</td>
                  </tr>
                  <tr className="align-top">
                    <td className="p-3 font-semibold text-foreground">
                      Targeting &amp; Advertising
                    </td>
                    <td className="p-3">
                      Used to deliver ads and measure campaigns via Google AdSense and
                      related Google advertising technologies.
                    </td>
                    <td className="p-3">
                      Google DoubleClick DART, Ad IDs based on browsing habits.
                    </td>
                    <td className="p-3">Up to 13 months.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Local storage (not always a cookie)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We also save data in your browser&apos;s local storage for wheel entries,
              your cookie consent choice, theme preference, and basic referral
              attribution. This stays on your device unless you clear site data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Google Consent Mode
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Google Analytics and the AdSense script load with Consent Mode defaults
              set to denied until you choose Accept or Decline. Personalized ads and
              ad-related storage apply only after Accept. Your choice updates consent signals for ad_storage,
              analytics_storage, and related flags. Our banner is a custom implementation,
              not a Google-certified CMP for the EEA/UK/CH.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Cookies (Google AdSense &amp; Analytics)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To keep Online Spin Wheel free, Google Analytics may run after page load with
              consent-aware settings. Google AdSense is included in the page with Consent Mode;
              it may set cookies or serve ads according to your cookie choice. Both may measure
              traffic and understand how the site is used.
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Google Ads:</strong> Google uses
                  the DART cookie to serve personalized ads. You can learn how Google
                  uses this data and opt out by visiting the{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Google Ad and Content Network Privacy Policy
                  </a>
                  .
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  We do not have direct control over the cookies placed by third-party
                  advertisers. Please review their respective privacy policies for more
                  information.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How You Can Manage Cookies
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have full control over your cookie preferences. Here is how you can
              manage or disable them:
            </p>
            <ul className="space-y-4 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Consent banner &amp; Cookie settings:</strong>{" "}
                  On first visit you can accept or decline non-essential cookies. Use
                  <strong className="text-foreground"> Cookie settings</strong> in the
                  site footer anytime to reopen the banner and change your choice.
                  Declining limits personalized ads and analytics; the wheel still works.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Browser Settings:</strong> You
                  can clear existing cookies or block new ones directly through your
                  web browser settings (Chrome, Firefox, Safari, Edge).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <div>
                  <strong className="text-foreground">Ad Opt-Out Tools:</strong> You
                  can opt out of personalized third-party advertising networks using the
                  following tools:
                  <ul className="mt-2 space-y-2 ml-4 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">○</span>
                      <span>
                        <a
                          href="https://myadcenter.google.com/"
                          className="text-primary hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Google Ad Settings
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">○</span>
                      <span>
                        <a
                          href="https://optout.networkadvertising.org/"
                          className="text-primary hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Network Advertising Initiative (NAI)
                        </a>
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1 flex-shrink-0">○</span>
                      <span>
                        <a
                          href="https://optout.aboutads.info/"
                          className="text-primary hover:underline break-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Digital Advertising Alliance (DAA)
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Do Not Track (DNT) &amp; GPC:</strong>{" "}
                  We do not treat all DNT signals uniformly. Where supported, Global
                  Privacy Control (GPC) is honored as a request to limit sale/sharing of
                  personal information. Use our cookie banner and Google opt-out tools
                  for advertising controls.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Data Transfers and Security
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Any data collected via cookies remains on your device or is stored
              securely on our hosting servers. All data transfers comply with our
              comprehensive Privacy Policy, including protections under international
              laws like the GDPR and CCPA.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Changes to This Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may periodically update this Cookie Policy to reflect changes in our
              practices or legal requirements. Your continued use of the site
              signifies your acceptance of any updates.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions or concerns regarding our use of cookies,
              please contact us:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-primary hover:underline font-semibold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Website:</strong>{" "}
                  <a
                    href="https://onlinespinwheel.fun"
                    className="text-primary hover:underline break-all"
                  >
                    https://onlinespinwheel.fun
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Operated By:</strong>{" "}
                  Operated by Online Spin Wheel.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              For more detailed information on how we handle your data, please read
              our full{" "}
              <Link to="/privacy-policy" className="text-primary hover:underline font-medium">
                Privacy Policy
              </Link>
              .
            </p>
          </section>
        </Card>

        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Related policies</h3>
            <p className="text-muted-foreground">Privacy, terms, and disclaimer</p>
          </div>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-stretch max-w-2xl mx-auto">
            <Link
              to="/privacy-policy"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all"
            >
              <Shield className="h-5 w-5" />
              <span>Privacy Policy</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/terms-and-conditions"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all"
            >
              <FileText className="h-5 w-5" />
              <span>Terms &amp; Conditions</span>
            </Link>
            <Link
              to="/disclaimer"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all"
            >
              <FileText className="h-5 w-5" />
              <span>Disclaimer</span>
            </Link>
          </div>
        </Card>
      </article>
    </>
  );
};

export default CookiePolicy;
