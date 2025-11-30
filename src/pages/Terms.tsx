import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  FileText,
  Mail,
  AlertCircle,
  ArrowRight,
  Home,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Hi Honey</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Hi Honey's spin wheel tool."
        />
        <link rel="canonical" href="https://hihoney.site/terms" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Please read these terms carefully before using our service
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Agreement to Terms
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Welcome to Hi Honey. These Terms and Conditions ("Terms") govern
                your access to and use of Hi Honey, including any content,
                functionality, and services offered on or through the Website.
              </p>
              <p>
                By accessing or using Hi Honey, you agree to be bound by these
                Terms and all applicable laws and regulations. If you do not
                agree with any part of these Terms, you must not use our
                Website.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Changes to Terms
            </h2>
            <p className="text-muted-foreground">
              We reserve the right to modify, update, or replace these Terms at
              any time at our sole discretion. Your continued use of Hi Honey
              after any changes constitutes acceptance of the new Terms.
            </p>
            <p className="text-muted-foreground mt-3">
              We will update the "Last Updated" date at the top of this page
              when changes are made.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Eligibility and Account
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Age Requirements
                </h3>
                <p className="text-muted-foreground mb-2">
                  You must be at least 13 years of age to use Hi Honey. By using
                  this Website, you represent and warrant that you meet this age
                  requirement.
                </p>
                <p className="text-muted-foreground">
                  Users under 18 should use this Website with parental or
                  guardian supervision and consent.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Acceptance of Terms
                </h3>
                <p className="text-muted-foreground mb-2">
                  By using Hi Honey, you represent that:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      All information you provide is accurate and truthful
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      You will use the Website in accordance with these Terms
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Permitted Use
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  License to Use
                </h3>
                <p className="text-muted-foreground">
                  Subject to these Terms, we grant you a limited, non-exclusive,
                  non-transferable, revocable license to access and use Hi Honey
                  for personal, non-commercial purposes.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Acceptable Use
                </h3>
                <p className="text-muted-foreground mb-2">
                  You may use Hi Honey to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Create custom wheel spinners for decision-making
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Generate random selections for personal or organizational
                      use
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Share results from the wheel spinner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Access and use all publicly available features</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Prohibited Conduct
            </h2>
            <p className="text-muted-foreground mb-4">
              You agree NOT to use Hi Honey to:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Illegal Activities
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Engage in any unlawful, fraudulent, or malicious activity
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Violate any local, state, national, or international law
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Use the Website for gambling or betting purposes where
                      prohibited
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Infringe upon intellectual property rights of others
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Harmful Actions
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Transmit viruses, malware, or any harmful code</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Attempt to gain unauthorized access to our systems
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Interfere with or disrupt the Website's functionality
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Overload or attempt to disable our servers</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Inappropriate Content
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Input offensive, defamatory, or inappropriate content
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Include hate speech, harassment, or discriminatory content
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Upload content that violates others' privacy or rights
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Share sexually explicit or violent content</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Commercial Misuse
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Use automated systems (bots, scrapers) without permission
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Resell or commercially exploit the Website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Frame or mirror any part of the Website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Remove or alter any copyright or proprietary notices
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Prohibited Representations
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Impersonate any person or entity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Claim endorsement by us without written permission
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Intellectual Property Rights
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Your Limited Rights
                </h3>
                <p className="text-muted-foreground mb-2">You may:</p>
                <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>View and use the Website for personal purposes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Take screenshots of your wheel spinner results</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Share links to Hi Honey</span>
                  </li>
                </ul>

                <p className="text-muted-foreground mb-2">You may NOT:</p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Copy, reproduce, or distribute our Website code or design
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Create derivative works based on our Website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Use our branding or logo without written permission
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  User-Generated Content
                </h3>
                <p className="text-muted-foreground">
                  Any content you input into the wheel spinner (names, options,
                  etc.) remains your property. By using our Website, you grant
                  us a limited license to process this content solely for the
                  purpose of providing the service.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Third-Party Links and Services
            </h2>
            <p className="text-muted-foreground mb-3">
              Hi Honey may contain links to third-party websites or services.
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Content on third-party websites</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Privacy practices of external sites</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Products or services offered by third parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Any damages arising from your use of third-party services
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Disclaimer of Warranties
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  "AS IS" Basis
                </h3>
                <p className="text-muted-foreground mb-2">
                  Hi Honey is provided on an "AS IS" and "AS AVAILABLE" basis
                  without warranties of any kind, either express or implied,
                  including but not limited to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Warranties of merchantability</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Fitness for a particular purpose</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Non-infringement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Accuracy, reliability, or completeness</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  No Guarantees
                </h3>
                <p className="text-muted-foreground mb-2">
                  We do not warrant that:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      The Website will be uninterrupted, secure, or error-free
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Results or outcomes will be accurate or reliable
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Defects will be corrected</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Random Selection Tool
                </h3>
                <p className="text-muted-foreground mb-2">
                  While we strive to provide fair and random results, we make no
                  guarantees regarding:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>The absolute randomness of every spin</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Suitability for legally binding decisions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Outcomes or consequences of using results</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Limitation of Liability
            </h2>
            <p className="text-muted-foreground mb-4">
              To the fullest extent permitted by law, Hi Honey, its owners,
              operators, employees, and affiliates shall NOT be liable for any:
            </p>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Direct Damages
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Loss of data or content</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Service interruptions or technical failures</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Errors or omissions in content</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Indirect Damages
                </h3>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Lost profits or business opportunities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Consequential or incidental damages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Punitive damages</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Any damages arising from your use of the Website
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Maximum Liability
                </h3>
                <p className="text-muted-foreground">
                  In no event shall our total liability exceed the amount you
                  paid to use Hi Honey (which is currently zero, as our service
                  is free).
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Exceptions
                </h3>
                <p className="text-muted-foreground">
                  Some jurisdictions do not allow limitation of liability for
                  certain damages. In such jurisdictions, our liability is
                  limited to the maximum extent permitted by law.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Indemnification
            </h2>
            <p className="text-muted-foreground mb-3">
              You agree to defend, indemnify, and hold harmless Hi Honey, its
              owners, operators, employees, and affiliates from any claims,
              damages, losses, liabilities, and expenses (including reasonable
              attorneys' fees) arising from:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Your use or misuse of the Website</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Your violation of these Terms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Your violation of any rights of third parties</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  Your violation of any applicable laws or regulations
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Content you input into the wheel spinner</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>Decisions made based on wheel spinner results</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              User Responsibilities
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Decision-Making
                </h3>
                <p className="text-muted-foreground mb-2">
                  You acknowledge that:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Hi Honey is a tool for entertainment and assistance
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      You are solely responsible for decisions made using our
                      service
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Random selection should not be the sole basis for
                      important decisions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      We are not liable for outcomes or consequences of your
                      decisions
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Content Responsibility
                </h3>
                <p className="text-muted-foreground mb-2">
                  You are responsible for:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>All content you enter into the wheel spinner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Ensuring content is appropriate and legal</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Respecting others' privacy and rights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Not inputting sensitive or confidential information
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Contests and Giveaways
                </h3>
                <p className="text-muted-foreground mb-2">
                  If you use Hi Honey for contests, giveaways, or selections
                  involving third parties:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      You must comply with all applicable laws and regulations
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      You are responsible for clearly communicating rules to
                      participants
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>You assume all liability for disputes or issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>We are not responsible for mediating conflicts</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Privacy and Data Protection
            </h2>
            <p className="text-muted-foreground">
              Your use of Hi Honey is also governed by our Privacy Policy, which
              is incorporated into these Terms by reference. Please review our{" "}
              <a
                href="/privacy"
                className="text-primary hover:underline font-semibold"
              >
                Privacy Policy
              </a>{" "}
              to understand our data practices.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Termination</h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Our Right to Terminate
                </h3>
                <p className="text-muted-foreground mb-2">
                  We reserve the right to:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Suspend or terminate your access at any time</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Refuse service to anyone for any reason</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Remove or disable content that violates these Terms
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Take legal action for violations of these Terms</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Termination Actions
                </h3>
                <p className="text-muted-foreground mb-2">
                  We may terminate or suspend access without prior notice for:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Violation of these Terms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Fraudulent or illegal activity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Misuse of the Website</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Any conduct we deem harmful to our service or users
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Effect of Termination
                </h3>
                <p className="text-muted-foreground mb-2">Upon termination:</p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>Your right to use Hi Honey immediately ceases</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Provisions that should survive termination will remain in
                      effect
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      We are not liable for any losses resulting from
                      termination
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Governing Law and Dispute Resolution
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Governing Law
                </h3>
                <p className="text-muted-foreground">
                  These Terms shall be governed by and construed in accordance
                  with applicable laws, without regard to conflict of law
                  principles.
                </p>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Dispute Resolution
                </h3>
                <p className="text-muted-foreground mb-3">
                  Any disputes arising from these Terms or your use of Hi Honey
                  shall be resolved through:
                </p>
                <ul className="space-y-2 text-muted-foreground ml-4">
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Informal Resolution:</strong> We encourage you to
                      contact us first at chaudhrayadam@gmail.com to resolve any
                      issues informally.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Arbitration or Court:</strong> If informal
                      resolution fails, disputes may be subject to binding
                      arbitration or litigation in courts of appropriate
                      jurisdiction, as determined by applicable law.
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                  Class Action Waiver
                </h3>
                <p className="text-muted-foreground">
                  To the extent permitted by law, you agree to resolve disputes
                  on an individual basis and waive any right to participate in
                  class actions.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Severability
            </h2>
            <p className="text-muted-foreground">
              If any provision of these Terms is found to be unenforceable or
              invalid by a court of competent authority, that provision shall be
              limited or eliminated to the minimum extent necessary, and the
              remaining provisions shall remain in full force and effect.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Entire Agreement
            </h2>
            <p className="text-muted-foreground">
              These Terms, together with our Privacy Policy and Disclaimer,
              constitute the entire agreement between you and Hi Honey regarding
              your use of the Website and supersede all prior agreements and
              understandings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Waiver</h2>
            <p className="text-muted-foreground">
              No waiver shall be effective unless in writing and signed by us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Contact Information
            </h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions, concerns, or requests regarding these
              Terms and Conditions, please contact us:
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
              We will make reasonable efforts to respond to your inquiries in a
              timely manner.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Acknowledgment
            </h2>
            <p className="text-muted-foreground mb-3">
              By using Hi Honey, you acknowledge that:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  You have read and understood these Terms and Conditions
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>You agree to be bound by these Terms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  You understand that failure to comply may result in
                  termination of access
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">•</span>
                <span>
                  You accept all risks associated with using the Website
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-4">
              If you do not agree to these Terms, please discontinue use of Hi
              Honey immediately.
            </p>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
              <p className="text-base md:text-lg text-foreground">
                <strong>
                  Thank you for choosing Hi Honey. Spin responsibly and enjoy
                  making decisions fun!
                </strong>
              </p>
            </div>
          </div>
        </Card>

        {/* Blog Link Navigation */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Learn More</h3>
            <p className="text-muted-foreground">
              Discover tips, tricks, and creative ways to use spin wheels
            </p>
          </div>
          <Link
            to="/blog"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto max-w-sm"
          >
            <BookOpen className="h-5 w-5" />
            <span>Read Our Blog</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Card>

        {/* Next Step Navigation */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 mt-8">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Ready to Spin?
            </h3>
            <p className="text-muted-foreground">
              Start making decisions fun with our interactive spin wheel tool
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto max-w-sm"
          >
            <Home className="h-5 w-5" />
            <span>Go to Spin Wheel</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Card>
      </article>
    </>
  );
};

export default Terms;
