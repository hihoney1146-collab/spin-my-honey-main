import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Mail, ArrowRight, Shield, Zap, FlaskConical, Bug, Database, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/lib/schema";
import { TEAM_AUTHOR_LINKS } from "@/lib/teamLinks";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Online Spin Wheel</title>
        <meta
          name="description"
          content="Online Spin Wheel is built by a small dedicated team: Armghana Zeeshan (CEO), Zoha Zeeshan (Co-Founder), Raja Jahangir (Content & SEO Lead), and Abdal Khalid (Social Media Expert). Learn how we test every wheel across 10,000 spins."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/about-us" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About Online Spin Wheel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            A small team making fair random choices accessible to everyone
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 border-primary/15 bg-primary/5">
          <div className="flex items-center gap-3 mb-4">
            <Users className="h-6 w-6 text-primary" />
            <h2 className="text-2xl font-bold">Our team</h2>
          </div>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
            Online Spin Wheel is built and maintained by a small independent team dedicated solely to
            this product, not a multi-property agency. We focus on one job: free, fast, trustworthy
            spin wheels for classrooms, giveaways, streamers, and everyday decisions.
          </p>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TEAM_AUTHOR_LINKS.map((member) => (
              <li key={member.to}>
                <Link
                  to={member.to}
                  className="block rounded-lg border border-border/60 bg-background/60 p-4 hover:border-primary/40 transition-colors"
                >
                  <p className="font-semibold text-foreground">{member.label}</p>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Why we built it</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              The site started because too many online spinners were slow, buried in ads, or vague
              about whether their results were genuinely random. In early 2026 we launched a
              straightforward, cleanly designed way to make random choices, pick contest winners, and
              gamify classrooms without logins or bloated interfaces.
            </p>
            <p className="text-base md:text-lg">
              A simple decision should not turn into a long argument, and an online giveaway should
              not lose trust because the picker looked fake. That is why the wheel works on any device
              and makes every decision both transparent and fun.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">What each of us does</h2>
          <div className="space-y-6 text-muted-foreground leading-relaxed">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                <Link to="/team/ceo" className="text-primary hover:underline">
                  Armghana Zeeshan
                </Link>
                , CEO
              </h3>
              <p className="text-base md:text-lg">
                Sets product direction and business priorities: which wheels ship, how we keep the core
                tool free, and how we communicate about fairness and privacy with users and partners.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                <Link to="/team/co-founder" className="text-primary hover:underline">
                  Zoha Zeeshan
                </Link>
                , Co-Founder
              </h3>
              <p className="text-base md:text-lg">
                Co-Founder responsibilities include company direction with the CEO, user experience
                across phones and projectors, specialty-wheel roadmap priorities, honest trust signals,
                and releasing new pages with accurate content and testing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                <Link to="/team/content" className="text-primary hover:underline">
                  Raja Jahangir
                </Link>
                , Content &amp; SEO Lead
              </h3>
              <p className="text-base md:text-lg">
                Owns content, SEO, and quality review: wheel copy, guides, blog posts, structured
                data, and the pre-launch testing checklist every page must pass.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                <Link to="/team/social" className="text-primary hover:underline">
                  Abdal Khalid
                </Link>
                , Social Media Expert
              </h3>
              <p className="text-base md:text-lg">
                Manages brand social channels and community engagement: sharing wheel tips, highlighting
                new tools, and connecting with teachers, streamers, and creators on Instagram, X, YouTube,
                and Pinterest.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <FlaskConical className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">How every wheel is tested</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Fairness is a team practice, not a marketing line. Every wheel is tested for uniform
              distribution across 10,000 automated spins before launch. If any equal-sized segment
              wins noticeably more or less often than the rest, the wheel is not published until the
              distribution is even.
            </p>
            <p className="text-base md:text-lg">
              Randomness comes from your browser&apos;s built-in secure generator, the same kind of randomness used for encryption keys, never a simple
              predictable formula. Read the full explanation on our{" "}
              <Link to="/how-randomness-works" className="text-primary hover:underline font-medium">
                how randomness works
              </Link>{" "}
              page and our{" "}
              <Link to="/spin-wheel-fairness-study" className="text-primary hover:underline font-medium">
                100,000-spin fairness study
              </Link>
              .
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">The science of fairness</h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Cryptographic security</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                We use the browser&apos;s secure random generator for hardware-level
                random seeds. Every spin is unpredictable and mathematically fair.
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Real-world physics</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                The wheel simulates momentum and friction, so it spins and decelerates naturally
                instead of abruptly snapping to a winner.
              </p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Database className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">
              What data we do &amp; don&apos;t collect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">We never collect</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    The names, numbers, or options you type into the wheel, they stay on your device.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Accounts, sign-ups, or passwords, none are required.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">We do process</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Standard analytics and ad measurement to keep the tool free (see our{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    ).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Your email and message if you contact us, used only to reply.</span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Bug className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">Updates &amp; reporting a bug</h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Content is reviewed regularly and refreshed whenever tools, best practices, or your
              feedback call for it. Every tool page and blog post shows a visible &quot;Last updated&quot;
              date wired to real content changes.
            </p>
            <p className="text-base md:text-lg">
              Found a bug or spotted an error? Email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:underline font-medium">
                {CONTACT_EMAIL}
              </a>{" "}
              with the page URL, your device and browser, and what happened versus what you expected.
              Reports are reviewed and, where valid, fixed and re-dated within 48 hours.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 bg-primary/5 border border-primary/20">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Get in touch</h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              Questions, feedback, or ideas for a new wheel are always welcome.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-lg md:text-xl font-semibold text-primary hover:underline inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              {CONTACT_EMAIL}
            </a>
          </div>
        </Card>

        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground">Have questions or need help? We&apos;re here for you.</p>
          </div>
          <Link
            to="/contact-us"
            className="flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl mx-auto max-w-sm"
          >
            <Mail className="h-5 w-5" />
            <span>Contact Us</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </Card>
      </article>
    </>
  );
};

export default About;
