import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Shield, Mail, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Hi Honey</title>
        <meta
          name="description"
          content="Read Hi Honey's privacy policy to understand how we protect your privacy while using our spin wheel tool."
        />
        <link rel="canonical" href="https://hihoney.site/privacy" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Your privacy matters to us
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Introduction
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to Hi Honey. We respect your privacy and are committed
                to protecting your personal information. This Privacy Policy
                explains how we collect, use, disclose, and safeguard your
                information when you visit our website.
              </p>
              <p>
                Please read this Privacy Policy carefully. By using Hi Honey,
                you agree to the collection and use of information in accordance
                with this policy. If you do not agree with the terms of this
                Privacy Policy, please do not access the Website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Information We Collect
            </h2>

            <div className="mb-6">
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                Information You Provide
              </h3>
              <p className="text-muted-foreground mb-3">
                When you use Hi Honey, you may provide the following
                information:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Wheel Content:</strong> Text, names, or options you
                    enter into the wheel spinner
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Contact Information:</strong> Email address when you
                    contact us at chaudhrayadam@gmail.com
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Feedback and Communications:</strong> Any messages,
                    suggestions, or feedback you send to us
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                Automatically Collected Information
              </h3>
              <p className="text-muted-foreground mb-3">
                When you visit our Website, we may automatically collect certain
                information, including:
              </p>
              <ul className="space-y-2 text-muted-foreground ml-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Device Information:</strong> Browser type, operating
                    system, device type
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Usage Data:</strong> Pages visited, time spent on
                    pages, click patterns, features used
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>IP Address:</strong> Your Internet Protocol address
                    for security and analytics purposes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    <strong>Cookies and Tracking Technologies:</strong> Data
                    collected through cookies and similar technologies (see
                    Cookies section below)
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect for the following purposes:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  To Provide and Maintain Our Service
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Operating and maintaining the wheel spinner functionality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Enabling you to use Website features</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Processing and responding to your inquiries</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  To Improve Our Service
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Understanding how users interact with our Website
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Analyzing usage patterns to improve functionality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Developing new features and enhancements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Fixing bugs and technical issues</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  To Communicate With You
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Responding to your questions and support requests
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Sending updates or notifications about the Website (if
                      applicable)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Gathering feedback to improve our service</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  For Security and Legal Compliance
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Protecting against fraudulent, unauthorized, or illegal
                      activity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Complying with legal obligations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Enforcing our terms and policies</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Data Storage and Retention
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Temporary Storage
                </h3>
                <p className="text-muted-foreground">
                  The content you enter into the wheel spinner (names, options,
                  etc.) is typically stored temporarily in your browser's local
                  storage and is not transmitted to our servers unless
                  explicitly stated.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Contact Information
                </h3>
                <p className="text-muted-foreground">
                  If you contact us via email, we retain your email address and
                  message content only as long as necessary to respond to your
                  inquiry and for reasonable record-keeping purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Analytics Data
                </h3>
                <p className="text-muted-foreground">
                  Usage and analytics data may be retained for a reasonable
                  period to help us understand trends and improve our service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Cookies and Tracking Technologies
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  What Are Cookies?
                </h3>
                <p className="text-muted-foreground">
                  Cookies are small text files stored on your device that help
                  websites remember your preferences and improve your
                  experience.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  How We Use Cookies
                </h3>
                <p className="text-muted-foreground mb-3">
                  We may use cookies and similar technologies to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Remember your preferences and settings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Analyze website traffic and user behavior</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Improve website functionality and performance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Understand how users interact with our features</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Types of Cookies We Use
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Essential Cookies:</strong> Necessary for the
                      Website to function properly
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Functionality Cookies:</strong> Enable enhanced
                      features and personalization
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Managing Cookies
                </h3>
                <p className="text-muted-foreground">
                  You can control cookies through your browser settings. Please
                  note that disabling cookies may affect the functionality of Hi
                  Honey. For more information on managing cookies, visit your
                  browser's help section.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Services
            </h2>
            <p className="text-muted-foreground mb-4">
              We may use third-party services for analytics, hosting, or other
              purposes. These third parties may have access to certain
              information to perform tasks on our behalf. Common third-party
              services may include:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Hosting Services:</strong> To maintain website
                  infrastructure
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  <strong>Email Services:</strong> To manage communications
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              These third parties are obligated to protect your information and
              use it only for the purposes we specify.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Data Sharing and Disclosure
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  With Your Consent
                </h3>
                <p className="text-muted-foreground">
                  When you explicitly agree to share information
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Service Providers
                </h3>
                <p className="text-muted-foreground">
                  With trusted third-party service providers who assist us in
                  operating our Website, subject to confidentiality agreements
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Legal Requirements
                </h3>
                <p className="text-muted-foreground">
                  When required by law, court order, or governmental regulation,
                  or to protect our rights and safety
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Business Transfers
                </h3>
                <p className="text-muted-foreground">
                  In connection with any merger, sale, or transfer of our
                  business or assets
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Data Security
            </h2>
            <p className="text-muted-foreground mb-4">
              We implement reasonable security measures to protect your
              information from unauthorized access, alteration, disclosure, or
              destruction. However, no method of transmission over the internet
              or electronic storage is 100% secure. While we strive to protect
              your information, we cannot guarantee absolute security.
            </p>
            <p className="text-muted-foreground mb-3">
              Security measures we employ include:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Secure server infrastructure</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Encryption of data in transit</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Regular security assessments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Access controls and authentication</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Your Privacy Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights
              regarding your personal information:
            </p>

            <div className="space-y-3">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Access and Portability
                </h3>
                <p className="text-muted-foreground">
                  Right to access and receive a copy of your personal
                  information
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Correction
                </h3>
                <p className="text-muted-foreground">
                  Right to request correction of inaccurate or incomplete
                  information
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Deletion
                </h3>
                <p className="text-muted-foreground">
                  Right to request deletion of your personal information
                  (subject to legal obligations)
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Opt-Out
                </h3>
                <p className="text-muted-foreground">
                  Right to opt out of certain data collection and marketing
                  communications
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Object to Processing
                </h3>
                <p className="text-muted-foreground">
                  Right to object to certain types of data processing
                </p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4">
              To exercise these rights, please contact us at{" "}
              <a
                href="mailto:chaudhrayadam@gmail.com"
                className="text-primary hover:underline font-semibold"
              >
                chaudhrayadam@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Children's Privacy
            </h2>
            <p className="text-muted-foreground">
              Hi Honey is not intended for children under the age of 13.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              International Users
            </h2>
            <p className="text-muted-foreground">
              Hi Honey is operated globally and may store information in various
              locations. By using our Website, you consent to the transfer of
              information to countries outside your country of residence, which
              may have different data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Do Not Track Signals
            </h2>
            <p className="text-muted-foreground">
              Some browsers have "Do Not Track" features. Currently, we do not
              respond to Do Not Track signals, but we are committed to
              respecting your privacy preferences.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Links to Third-Party Websites
            </h2>
            <p className="text-muted-foreground">
              Our Website may contain links to third-party websites. We are not
              responsible for the privacy practices or content of these external
              sites. We encourage you to review the privacy policies of any
              third-party sites you visit.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to update or modify this Privacy Policy at
              any time. We will update the "Last Updated" date at the top of
              this policy.
            </p>
            <p className="text-muted-foreground">
              We encourage you to review this Privacy Policy periodically to
              stay informed about how we protect your information. Your
              continued use of Hi Honey after changes are posted constitutes
              acceptance of those changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              California Privacy Rights (CCPA)
            </h2>
            <p className="text-muted-foreground mb-3">
              If you are a California resident, you have specific rights under
              the California Consumer Privacy Act (CCPA):
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Right to know what personal information is collected
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Right to know if personal information is sold or disclosed
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Right to request deletion of personal information</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Right to non-discrimination for exercising your rights
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              We do not sell personal information. To exercise your CCPA rights,
              contact us at{" "}
              <a
                href="mailto:chaudhrayadam@gmail.com"
                className="text-primary hover:underline font-semibold"
              >
                chaudhrayadam@gmail.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              European Privacy Rights (GDPR)
            </h2>
            <p className="text-muted-foreground mb-3">
              If you are in the European Economic Area (EEA), you have rights
              under the General Data Protection Regulation (GDPR):
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Right of access, correction, and deletion</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Right to restrict or object to processing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Right to data portability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Right to withdraw consent</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Right to lodge a complaint with supervisory authorities
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              Our legal basis for processing your information includes consent,
              contractual necessity, and legitimate interests.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions, concerns, or requests regarding this
              Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="flex items-center gap-2 text-lg">
              <Mail className="h-5 w-5 text-primary" />
              <span className="text-muted-foreground">Email:</span>
              <a
                href="mailto:chaudhrayadam@gmail.com"
                className="text-primary hover:underline font-semibold"
              >
                chaudhrayadam@gmail.com
              </a>
            </div>
            <p className="text-muted-foreground mt-4">
              We will respond to your inquiry within a reasonable timeframe.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Consent</h2>
            <p className="text-muted-foreground">
              By using Hi Honey, you acknowledge that you have read and
              understood this Privacy Policy and consent to the collection, use,
              and disclosure of your information as described herein.
            </p>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <p className="text-center text-base md:text-lg font-semibold text-foreground">
              Your privacy matters to us. Thank you for trusting Hi Honey!
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
              Review our terms and conditions to understand your rights and
              responsibilities
            </p>
          </div>
          <Link
            to="/terms"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto max-w-sm"
          >
            <FileText className="h-5 w-5" />
            <span>Terms & Conditions</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Card>
      </article>
    </>
  );
};

export default Privacy;
