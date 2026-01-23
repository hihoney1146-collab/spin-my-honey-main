import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  FileText,
  Mail,
  AlertCircle,
  ArrowRight,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - Online Spin Wheel</title>
        <meta
          name="description"
          content="Read the terms and conditions for using Online Spin Wheel's spin wheel tool."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/terms" />
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
            <p className="text-muted-foreground leading-relaxed">
              These Terms and Conditions ("Terms") govern your use of the Online Spin Wheel website and tool at
              https://onlinespinwheel.fun (the "Site" and "Service"). By accessing or using the Site, you agree to be bound by these
              Terms.
            </p>
            <p className="text-muted-foreground mt-4 font-semibold">
              If you do not agree to these Terms, you must not use this website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              1. About Online Spin Wheel
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Online Spin Wheel ("we", "us", "our") provides a free, browser-based random picker that allows you to add names,
              numbers, or options to a wheel and spin to generate a random selection. The Service is provided "as is" for
              entertainment, educational, and general decision-making support only.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              2. Eligibility and acceptable use
            </h2>
            <ul className="space-y-3 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You must be at least 13 years old, or the minimum age in your country, to use the Site without supervision.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>If you are under 18, you should use the Site under the supervision of a parent, teacher, or guardian when
                  required by local law.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You agree not to use the Site for any unlawful purpose, or to submit content that is illegal, harmful,
                  abusive, hateful, or otherwise inappropriate.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You agree not to attempt to interfere with the normal operation, security, or performance of the Site,
                  including by hacking, scraping, or reverse-engineering.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              3. No accounts / user content
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Online Spin Wheel currently does not require a user account for basic spinning features. Any names, numbers, or
                options you enter into the wheel remain your responsibility, and you should avoid entering sensitive personal
                information.
              </p>
              <p>
                If you send us feedback, suggestions, or other content (for example by email or contact form), you grant us a
                non-exclusive, worldwide, royalty-free license to use that feedback to improve the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              4. Randomness and decision-making
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Online Spin Wheel uses a random or pseudo-random process to select results from the entries provided, but we
                do not guarantee perfect randomness or suitability for high-stakes decisions (for example, legal or financial
                outcomes).
              </p>
              <p>By using the Site, you acknowledge that:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>You are solely responsible for how you use the results produced by the wheel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Online Spin Wheel is not responsible for disputes or outcomes arising from decisions made using the
                    Service.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              5. Intellectual property
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Unless stated otherwise, all content on the Site – including the wheel interface, design, text, graphics, logos, and
                code – is owned by Online Spin Wheel or its licensors and is protected by applicable copyright and other
                intellectual property laws.
              </p>
              <p className="font-semibold mt-4">You may not:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Copy, modify, distribute, sell, or lease any part of the Site or its content.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Use our brand name, logo, or design elements without prior written permission.</span>
                </li>
              </ul>
              <p className="mt-4">
                You may display the Site on your own devices and share screen recordings or streams showing the wheel as part
                of your normal use, as long as you do not misrepresent our tool or remove copyright notices.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              6. Disclaimer
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                By accessing and registering on the platform and using the functionalities available on the platform, you accept
                personal responsibility for the results of the use of the platform and the functionalities available on the platform.
              </p>
              <p>
                You agree that Online Spin Wheel does not guarantee the results of any action nor does it guarantee any results,
                whether or not advised by this platform or the functionalities available on the platform. Users are solely and
                exclusively responsible for the use of the functionalities available on the platform. Users are solely and
                exclusively responsible for the content they share through the platform and the links they share with third parties
                and other users. Users are solely and exclusively responsible for the use of the platform when it is embedded in
                the websites of users or third parties.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              7. Third-party services and links
            </h2>
            <p className="text-muted-foreground">
              The Site may contain links to third-party websites, tools, or services that are not owned or controlled by Online
              Spin Wheel. We are not responsible for the content, policies, or practices of any third-party sites, and you access
              them at your own risk.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              8. Service availability and changes
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We aim to keep Online Spin Wheel available, fast, and reliable, but we do not guarantee uninterrupted or
                error-free operation.
              </p>
              <p>We may, at any time and without notice:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Change or update features.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Suspend or discontinue part or all of the Service.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Restrict access to parts of the Site for maintenance or security reasons.</span>
                </li>
              </ul>
              <p className="mt-4">
                We are not liable to you for any modification, suspension, or discontinuation of the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              9. Disclaimer of warranties
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The Site and Service are provided on an "as is" and "as available" basis, without warranties of any kind, whether
                express or implied.
              </p>
              <p>
                To the fullest extent permitted by law, Online Spin Wheel disclaims all warranties, including but not limited to
                implied warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant
                that the Site will be error-free, secure, or available at all times.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              10. Limitation of liability
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                To the maximum extent permitted by law, Online Spin Wheel and its team will not be liable for any indirect,
                incidental, special, consequential, or punitive damages, or any loss of profits or data, arising out of or in
                connection with your use of the Site or these Terms.
              </p>
              <p>
                Our total liability to you for any claim related to the Site will not exceed the amount you paid us (if any) for using
                the Service in the 3 months before the claim arose, or the minimum amount permitted by law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              11. Indemnification
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You agree to defend, indemnify, and hold harmless Online Spin Wheel and its team from and against any claims,
                damages, liabilities, losses, and expenses (including reasonable legal fees) arising out of or related to:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your use of the Site or Service.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your violation of these Terms.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your violation of any rights of another person or entity.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              12. Governing law and jurisdiction
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                These Terms are governed by the laws of Pakistan, without regard to its conflict of law rules.
              </p>
              <p>
                Any disputes arising out of or relating to these Terms or your use of the Site will be resolved in the courts of
                Rawalpindi, Pakistan, unless a different jurisdiction is required by consumer protection law.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              13. Changes to these Terms
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We may update these Terms from time to time. When we do, we will update the "Last updated" date at the top of
                this page, and, where appropriate, we may provide additional notice on the Site.
              </p>
              <p>
                If you continue to use the Site after changes take effect, you agree to the updated Terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              14. Contact us
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions about these Terms and Conditions, you can contact us at:
              </p>
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
              </p>
            </div>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <p className="text-center text-base md:text-lg font-semibold text-foreground">
              Thank you for using Online Spin Wheel responsibly!
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
              Review our privacy policy and cookie policy
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
              to="/cookie-policy"
              className="flex items-center justify-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-all duration-300 transform hover:scale-105"
            >
              <FileText className="h-5 w-5" />
              <span>Cookie Policy</span>
            </Link>
          </div>
        </Card>
      </article>
    </>
  );
};

export default Terms;
