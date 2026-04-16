import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Online Spin Wheel</title>
        <meta
          name="description"
          content="Privacy Policy for Online Spin Wheel (onlinespinwheel.fun), operated by Auroxa Tech: what we collect, cookies, ads, CCPA/CPRA, GDPR, COPPA, and how to contact us."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/privacy-policy" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your privacy matters to us
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <p className="text-muted-foreground leading-relaxed mb-4">
              This Privacy Policy describes how Online Spin Wheel (&quot;we&quot;,
              &quot;us&quot; or &quot;our&quot;), operated by Auroxa Tech, collects, uses and
              protects information when you use our website and tools at{" "}
              <a
                href="https://onlinespinwheel.fun"
                className="text-primary hover:underline font-medium"
              >
                https://onlinespinwheel.fun
              </a>
              .
            </p>
            <p className="text-muted-foreground leading-relaxed">
              By using our website, you agree to the collection and use of
              information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Because Online Spin Wheel is designed to work directly in your
              browser, the actual inputs (names, numbers, prizes) you type into
              the wheel remain on your local device and are not collected by our
              servers. However, to keep our site running and to serve relevant
              advertisements, we collect the following data:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Log Data:</strong> Like most
                  website operators, we collect information that your browser sends
                  whenever you visit our site. This may include your
                  computer&apos;s Internet Protocol (IP) address, browser type,
                  browser version, the pages of our site that you visit, the time
                  and date of your visit and the time spent on those pages.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Device Information:</strong>{" "}
                  We may collect information about the device you are using,
                  including the operating system and unique device identifiers.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Contact Information:</strong>{" "}
                  If you reach out to us via email for support or inquiries, we
                  will collect your email address and the contents of your message.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Cookies and Web Beacons
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Online Spin Wheel uses &quot;cookies&quot; and similar tracking technologies
              (like web beacons and pixels) to track activity on our service and
              hold certain information.
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Essential Cookies:</strong>{" "}
                  Necessary for the website to function properly.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Analytical/Performance Cookies:
                  </strong>{" "}
                  Allow us to recognize and count the number of visitors and see how
                  visitors move around our website.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Targeting/Advertising Cookies:
                  </strong>{" "}
                  Used to deliver advertisements more relevant to you and your
                  interests.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Google AdSense, Ezoic and Programmatic Advertising
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              To keep our tool 100% free, we use third-party advertising companies
              to serve ads when you visit our website. These companies (including
              Google AdSense and Ezoic/Google AdX) use programmatic advertising and
              real-time bidding to show you relevant ads.
            </p>
            <h3 className="text-lg md:text-xl font-semibold mb-3 text-foreground">
              Google DoubleClick DART Cookie:
            </h3>
            <ul className="space-y-3 text-muted-foreground ml-1 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  Google, as a third-party vendor, uses cookies to serve ads on our
                  site.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  Google&apos;s use of the DART cookie enables it and its partners to
                  serve ads to our users based on their visit to our site and other
                  sites on the Internet.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  Users may opt out of the use of the DART cookie by visiting the
                  Google Ad and Content Network privacy policy at:{" "}
                  <a
                    href="https://policies.google.com/technologies/ads"
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://policies.google.com/technologies/ads
                  </a>
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mb-4">
              <strong className="text-foreground">Ezoic and Ad Exchange (AdX):</strong>{" "}
              We may partner with Ezoic to manage our programmatic ad delivery. These
              third-party ad servers or ad networks use technologies like cookies,
              JavaScript or Web Beacons in their respective advertisements and links
              that appear on Online Spin Wheel. They automatically receive your IP
              address when this occurs. These technologies are used to measure the
              effectiveness of their advertising campaigns and/or to personalize the
              advertising content that you see.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Note:</strong> Online Spin Wheel has
              no access to or control over these cookies that are used by
              third-party advertisers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Opting Out of Personalized Advertising
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              You have the right to opt out of personalized advertising. You can
              manage your cookie preferences and opt out of targeted ads through the
              following resources:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Google Ads Settings:</strong>{" "}
                  <a
                    href="https://myadcenter.google.com/"
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://myadcenter.google.com/
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Network Advertising Initiative (NAI):
                  </strong>{" "}
                  <a
                    href="https://optout.networkadvertising.org/"
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://optout.networkadvertising.org/
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Digital Advertising Alliance (DAA):
                  </strong>{" "}
                  <a
                    href="https://optout.aboutads.info/"
                    className="text-primary hover:underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://optout.aboutads.info/
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  You can also choose to disable cookies through your individual
                  browser options.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              CCPA/CPRA Privacy Rights (For California Residents)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under the California Consumer Privacy Act (CCPA) and the California
              Privacy Rights Act (CPRA), California residents have specific rights
              regarding their personal information:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Right to Know:</strong> You can
                  request disclosure of the categories and specific pieces of
                  personal data we have collected about you.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Right to Delete:</strong> You
                  can request the deletion of your personal data.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Right to Opt-Out of Sale:
                  </strong>{" "}
                  We do not sell your personal data to third parties. However,
                  sharing data with advertising networks may be considered a
                  &quot;sale&quot; under CCPA. You can request that we do not
                  &quot;sell&quot; or share your personal information.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    Right to Non-Discrimination:
                  </strong>{" "}
                  We will not discriminate against you for exercising your privacy
                  rights.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              If you would like to exercise any of these rights, please contact us.
              We have one month to respond to your request.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              GDPR Data Protection Rights (For EEA/UK Residents)
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you are a resident of the European Economic Area (EEA) or the
              United Kingdom, you have the following data protection rights:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">The right to access:</strong> You
                  have the right to request copies of your personal data.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">The right to rectification:</strong>{" "}
                  You have the right to request that we correct any information you
                  believe is inaccurate or incomplete.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">The right to erasure:</strong> You
                  have the right to request that we erase your personal data, under
                  certain conditions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    The right to restrict processing:
                  </strong>{" "}
                  You have the right to request that we restrict the processing of
                  your personal data, under certain conditions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    The right to object to processing:
                  </strong>{" "}
                  You have the right to object to our processing of your personal
                  data, under certain conditions.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">
                    The right to data portability:
                  </strong>{" "}
                  You have the right to request that we transfer the data we have
                  collected to another organization or directly to you, under
                  certain conditions.
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground leading-relaxed">
              We rely on your explicit consent (via our Cookie Consent Banner) to
              process non-essential advertising cookies. You can withdraw this
              consent at any time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Children&apos;s Privacy (COPPA Compliance)
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website complies with the Children&apos;s Online Privacy Protection
              Act (COPPA). Online Spin Wheel does not knowingly collect personally
              identifiable information from children under the age of 13. If you are
              a parent or guardian and you are aware that your child has provided us
              with personal data, please contact us immediately so we can remove that
              information from our servers.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Privacy Policies
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Our Privacy Policy does not apply to other advertisers or websites. We
              advise you to consult the respective Privacy Policies of these
              third-party ad servers for more detailed information on their
              practices and opt-out instructions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update our Privacy Policy from time to time. We will notify you
              of any changes by posting the new Privacy Policy on this page and
              updating the &quot;Effective Date&quot; at the top. You are advised to review
              this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              If you have any questions, concerns or requests regarding this Privacy
              Policy or how your data is handled, please reach out to us:
            </p>
            <ul className="space-y-3 text-muted-foreground ml-1">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1.5 flex-shrink-0">●</span>
                <span>
                  <strong className="text-foreground">Email:</strong>{" "}
                  <a
                    href="mailto:onlinespinwheel@gmail.com"
                    className="text-primary hover:underline font-semibold"
                  >
                    onlinespinwheel@gmail.com
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
                  <strong className="text-foreground">Operated by:</strong> Auroxa
                  Tech
                </span>
              </li>
            </ul>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <p className="text-center text-base md:text-lg font-semibold text-foreground">
              Your privacy matters to us. Thank you for trusting Online Spin Wheel!
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Know Your Rights
            </h3>
            <p className="text-muted-foreground">
              Review our terms, disclaimer, and related policies
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch max-w-xl mx-auto">
            <Link
              to="/terms-and-conditions"
              className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <FileText className="h-5 w-5" />
              <span>Terms &amp; Conditions</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/disclaimer"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all"
            >
              <FileText className="h-5 w-5" />
              <span>Disclaimer</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </Card>
      </article>
    </>
  );
};

export default Privacy;
