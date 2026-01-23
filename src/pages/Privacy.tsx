import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Shield, Mail, ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - Online Spin Wheel</title>
        <meta
          name="description"
          content="Read Online Spin Wheel's privacy policy to understand how we protect your privacy while using our spin wheel tool."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/privacy" />
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
            <p className="text-muted-foreground leading-relaxed">
              This Privacy Policy describes how Online Spin Wheel ("Online Spin Wheel", "we", "us", or "our") collects, uses,
              and protects information when you use our website and tools at https://onlinespinwheel.fun. By using our
              website, you agree to the practices described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              1. Who we are
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Online Spin Wheel is a free, browser-based random picker that lets you add names, numbers, and choices to a
                wheel and spin for a random result. Our goal is to provide a simple, fair, and fun decision-making tool for
                classrooms, communities, and creators worldwide.
              </p>
              <p>
                If you have any questions about this Privacy Policy, you can contact us at:{" "}
                <a href="mailto:onlinespinwheel@gmail.com" className="text-primary hover:underline font-semibold">
                  onlinespinwheel@gmail.com
                </a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              2. Information we collect
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Because Online Spin Wheel is designed to work directly in your browser, most entries (names, numbers, prizes)
                stay on your device and are not sent to us as personal data. However, like most websites, we may process
                limited technical and usage data:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Basic device and browser information (e.g., browser type, operating system, language).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Approximate location based on IP address, where required for security, analytics, or legal compliance.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Usage data such as pages visited, time spent on pages, and interactions with buttons or features.</span>
                </li>
              </ul>
              <p>If you contact us (for example via email or contact form), we may collect:</p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Name or nickname you provide.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Email address.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The content of your message and any attachments.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              3. How we collect information
            </h2>
            <p className="text-muted-foreground mb-4">
              We collect information in three main ways:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Directly from you:</strong> When you contact us, send feedback, or request support.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>Automatically:</strong> Through cookies, log files, and similar technologies when you use our website.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>From third-party tools:</strong> Such as analytics or hosting providers that help us run and improve the site.</span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              4. How we use your information
            </h2>
            <p className="text-muted-foreground mb-4">
              We use the information we collect to:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Operate, maintain, and improve Online Spin Wheel.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Monitor performance, detect errors, and keep the website secure and reliable.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Understand how users interact with our tool so we can improve features and usability.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Respond to your questions, feedback, or support requests.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Comply with legal obligations and enforce our terms.</span>
              </li>
            </ul>
            <p className="text-muted-foreground mt-4 font-semibold">
              We do not sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              5. How we share information
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We only share information with third parties when necessary to operate and improve Online Spin Wheel, or when
                required by law. These third parties may include:
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Hosting providers and server infrastructure.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Analytics and performance monitoring tools.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Service providers that help us send emails or manage support.</span>
                </li>
              </ul>
              <p>All such providers are required to handle your information securely and only for the purposes we specify.</p>
              <p className="font-semibold">We do not sell personal information to third parties.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              6. Consent
            </h2>
            <p className="text-muted-foreground">
              By using our website, you hereby consent to our Privacy Policy and agree to its terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              7. Cookies and Web Beacons
            </h2>
            <p className="text-muted-foreground">
              Like any other website, Online Spin Wheel uses 'cookies'. These cookies are used to store information including
              visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used
              to optimize the users' experience by customizing our web page content based on visitors' browser type and/or
              other information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              8. Google DoubleClick DART Cookie
            </h2>
            <p className="text-muted-foreground">
              Google is one of the third-party vendors on our site. It also uses cookies, known as DART cookies, to serve ads
              to our site visitors based upon their visits to www.website.com and other sites on the internet. However, visitors
              may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at
              the following URL – <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              9. Our Advertising Partners
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Some advertisers on our site may use cookies and web beacons. Our advertising partners are listed below.
                Each of our advertising partners has its own Privacy Policy for their policies on user data. For easier access, we
                hyperlinked to their Privacy Policies below.
              </p>
              <ul className="ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Google <a href="https://policies.google.com/technologies/ads" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">https://policies.google.com/technologies/ads</a>
                  </span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              10. Advertising Partners Privacy Policies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                You may consult this list to find the Privacy Policy for each of the advertising partners of Online Spin Wheel.
              </p>
              <p>
                Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used
                in their respective advertisements and links that appear on Online Spin Wheel, which are sent directly to users'
                browsers. They automatically receive your IP address when this occurs. These technologies are used to
                measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that
                you see on websites that you visit.
              </p>
              <p>
                Note that Online Spin Wheel has no access to or control over these cookies that are used by third-party
                advertisers.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              11. Third Party Privacy Policies
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Online Spin Wheel's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to
                consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may
                include their practices and instructions about how to opt out of certain options.
              </p>
              <p>
                You can choose to disable cookies through your individual browser options. To know more detailed information
                about cookie management with specific web browsers, it can be found on the browsers' respective websites.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              12. CCPA Privacy Rights (Do Not Sell My Personal Information)
            </h2>
            <p className="text-muted-foreground mb-4">
              Under the CCPA, among other rights, California consumers have the right to:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request that a business deletes any personal data about the consumer that a business has collected.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these rights,
              please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              13. GDPR Data Protection Rights
            </h2>
            <p className="text-muted-foreground mb-4">
              We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled
              to the following:
            </p>
            <ul className="space-y-2 text-muted-foreground ml-4 mb-4">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to access</strong> – You have the right to request copies of your personal data. We may charge you a small fee for this service.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to restrict processing</strong> – You have the right to request that we restrict the processing of your personal data, under certain conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to object to processing</strong> – You have the right to object to our processing of your personal data, under certain conditions.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span><strong>The right to data portability</strong> – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              If you make a request, we have one month to respond to you. If you would like to exercise any of these
              rights, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              14. Data retention
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                We keep personal information only for as long as necessary to fulfil the purposes described in this policy, or as
                required by law.
              </p>
              <ul className="space-y-2 ml-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Contact emails and support messages may be stored for a reasonable period to follow up and improve our services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Technical logs may be kept for a limited time for security, troubleshooting, and analytics, then deleted or anonymized.</span>
                </li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              15. Data security
            </h2>
            <p className="text-muted-foreground">
              We use reasonable technical and organizational measures to protect your information, including HTTPS
              encryption and secure hosting. While no system can be 100% secure, we work to reduce risks of unauthorized
              access, misuse, or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              16. Your rights and choices
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>Depending on your location, you may have certain rights regarding your personal data, such as:</p>
              <ul className="space-y-2 ml-4 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to access the personal data we hold about you.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to correct or update inaccurate information.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to request deletion of your personal data, subject to legal obligations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to object to or restrict certain types of processing.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>The right to withdraw consent where processing is based on consent.</span>
                </li>
              </ul>
              <p>
                To exercise these rights, contact us at <a href="mailto:onlinespinwheel@gmail.com" className="text-primary hover:underline font-semibold">onlinespinwheel@gmail.com</a>. We may need to verify your identity before responding.
              </p>
              <p>
                If you are located in the EEA/UK, you also have the right to lodge a complaint with your local data protection
                authority.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              17. Children's privacy
            </h2>
            <p className="text-muted-foreground">
              Online Spin Wheel is not intended for children under 13 (or the minimum age in your country) without
              supervision from a parent, teacher, or guardian. We do not knowingly collect personal information from children.
              If you believe a child has provided us with personal data, please contact us so we can delete it.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              18. International data transfers
            </h2>
            <p className="text-muted-foreground">
              Our website may be hosted on servers located outside your country. By using Online Spin Wheel, you
              understand that your information may be processed in countries that may have different data protection laws
              than your own, but we will protect your information as described in this policy.
            </p>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              21. How to contact us
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                If you have any questions, concerns, or requests about this Privacy Policy or how we handle your data, please
                contact us at:
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
              <p className="text-sm">
                For stricter compliance (GDPR, CCPA, etc.), consider running this text through a dedicated generator or legal
                service and enabling a cookie banner if you use non-essential cookies or analytics.
              </p>
            </div>
          </section>

          <div className="bg-primary/5 p-6 md:p-8 rounded-lg border border-primary/20 mt-8">
            <p className="text-center text-base md:text-lg font-semibold text-foreground">
              Your privacy matters to us. Thank you for trusting Online Spin Wheel!
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
              Review our terms and conditions to understand your rights and responsibilities
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
