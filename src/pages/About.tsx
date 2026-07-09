import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Mail, ArrowRight, Shield, Zap, FlaskConical, Bug, Database } from "lucide-react";
import { Link } from "react-router-dom";
import { OptimizedImage } from "@/components/OptimizedImage";
import jahangirSeo from "@/assets/Jahangir-SEO.jpeg";
import { CONTACT_EMAIL, RAJA_AUTHOR } from "@/lib/schema";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Online Spin Wheel</title>
        <meta
          name="description"
          content="Online Spin Wheel is an independent project built and maintained by Raja Jahangir. Learn the story, how every wheel is tested across 10,000 spins, and what data we do and don't collect."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/about-us" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About Online Spin Wheel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Making Fair Random Choices Accessible to Everyone
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 border-primary/15 bg-primary/5">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-28 w-28 rounded-full overflow-hidden border border-border/60 shrink-0">
              <OptimizedImage
                src={jahangirSeo}
                alt="Raja Jahangir, creator of Online Spin Wheel"
                className="h-full w-full object-cover"
                width={224}
                height={224}
                loading="lazy"
              />
            </div>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed text-center sm:text-left">
              Online Spin Wheel is an independent project built and maintained by{" "}
              <Link
                to="/author/raja-jahangir"
                className="font-semibold text-primary hover:underline"
              >
                Raja Jahangir
              </Link>
              . It&apos;s a one-person project — not a company or agency. Raja
              designs the tools, writes the code, publishes every wheel, and
              answers your emails, working from {RAJA_AUTHOR.locality},{" "}
              {RAJA_AUTHOR.country}.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Welcome to onlinespinwheel.fun. This site started because too many
            online spinners were slow, buried in ads, or vague about whether
            their results were genuinely random. In early 2026 it launched as a
            straightforward, cleanly designed way to make random choices, pick
            contest winners, and gamify classrooms without the hassle.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A simple decision should not turn into a long argument, and an online
            giveaway should not lose trust because the picker looked fake. That
            is why the wheel works flawlessly on any device and makes every
            decision both transparent and fun.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              It began with a simple giveaway problem: picking a fair winner
              without forcing people into logins, subscriptions, or bloated
              interfaces. The answer was a clean, mathematically fair wheel that
              runs instantly in the browser with no app required.
            </p>
            <p className="text-base md:text-lg">
              Today, teachers, creators, and businesses use it daily because it
              stays fast, private, and free. The wheel does not jump to a result
              — it spins and slows naturally with momentum and friction
              simulation. No hidden scripts, no favoritism, just the fair result
              you need.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <FlaskConical className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">
              How Every Wheel Is Tested
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Fairness is not assumed here — it is measured. Every wheel is
              tested for uniform distribution across 10,000 automated spins
              before launch. If any equal-sized segment wins noticeably more or
              less often than the rest, the wheel is not published until the
              distribution is even.
            </p>
            <p className="text-base md:text-lg">
              The randomness itself comes from your browser&apos;s Web Crypto API
              (<code>crypto.getRandomValues()</code>), the same cryptographically
              secure source used for encryption keys — never the predictable{" "}
              <code>Math.random()</code>. Because each segment&apos;s probability
              equals its arc divided by 360 degrees, equal slices give every
              entry identical odds, and each spin is independent of the last. You
              can read the full explanation on our{" "}
              <Link
                to="/how-randomness-works"
                className="text-primary hover:underline font-medium"
              >
                how randomness works
              </Link>{" "}
              page.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            The Science of Fairness
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">
                  Cryptographic Security
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                We use crypto.getRandomValues() for hardware-level random seeds.
                Every spin is unpredictable and mathematically fair.
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">
                  Real-World Physics
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                The wheel simulates momentum and friction, so it spins and
                decelerates naturally instead of abruptly snapping to a winner.
              </p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Database className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">
              What Data We Do &amp; Don&apos;t Collect
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                We never collect
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    The names, numbers, or options you type into the wheel — they
                    stay on your device and are never sent to a server.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Accounts, sign-ups, or passwords — none are required.</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                We do process
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Standard, privacy-respecting analytics and ad measurement to
                    keep the tool free (see our{" "}
                    <Link to="/privacy-policy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    ).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>
                    Your email and message if you contact us — used only to reply.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <Bug className="h-6 w-6 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold">
              Updates &amp; Reporting a Bug
            </h2>
          </div>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Content is reviewed regularly and refreshed whenever tools, best
              practices, or your feedback call for it. Every tool page and blog
              post shows a visible &quot;Last updated&quot; date wired to real
              content changes, so you always know how current a page is.
            </p>
            <p className="text-base md:text-lg">
              Found a bug or spotted an error? Email{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-primary hover:underline font-medium"
              >
                {CONTACT_EMAIL}
              </a>{" "}
              with the page URL, your device and browser, and what happened versus
              what you expected. A screen recording helps for anything visual.
              Reports are reviewed and, where valid, fixed and re-dated within 48
              hours.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 bg-primary/5 border border-primary/20">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Get In Touch
            </h2>
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
            <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
              Thank you for choosing Online Spin Wheel as your trusted
              decision-maker. The goal stays the same: fast, fair, and free for
              everyone.
            </p>
          </div>
        </Card>

        {/* Next Step Navigation */}
        <Card className="p-6 md:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20">
          <div className="text-center mb-4">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-muted-foreground">
              Have questions or need help? We're here for you!
            </p>
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
