import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Mail, ArrowRight, Users, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Online Spin Wheel</title>
        <meta
          name="description"
          content="Learn about Online Spin Wheel. We are a small, dedicated team building simple tools that make random choices fair, fun, and effortless for everyone."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/about" />
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

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            Welcome to onlinespinwheel.fun. We are a small team of developers,
            educators, and digital creators who got tired of slow spinners,
            cluttered layouts, and unclear randomness claims. In 2025, we
            launched Online Spin Wheel as a straightforward, beautifully
            designed way to make random choices, pick contest winners, and
            gamify classrooms without hassle.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We understand how frustrating it is when a simple decision turns
            into a long argument or when an online giveaway loses trust because
            the random picker looked fake. That is why we built a seamless
            solution that works flawlessly on any device, making decisions both
            transparent and exciting.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              It started with a simple giveaway problem: picking a fair winner
              without forcing users into logins, subscriptions, or bloated
              interfaces. We built a clean, mathematically fair wheel that runs
              instantly in the browser with no app required.
            </p>
            <p className="text-base md:text-lg">
              Today, teachers, creators, and businesses use it daily because it
              stays fast, private, and free. We proudly operate from
              Rawalpindi, Pakistan, and support users around the world.
            </p>
            <p className="text-base md:text-lg">
              We have handled tens of thousands of spins without a hitch. Our
              wheel does not jump to a result. It spins and slows naturally
              with momentum and friction simulation. No hidden scripts, no
              favoritism, just the fair result you need.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Meet the Team
          </h2>
          <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Tabish Irfan — CEO & Founder, Auroxa Tech</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Hammas Ali — CTO & Co-founder, Auroxa Tech</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>
                Raja Jahangir — SEO, Custom Websites & Growth Specialist
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Abdal Khalid — Social Media & Community Expert</span>
            </li>
          </ul>
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
            <Card className="p-4 bg-primary/5 border border-primary/20 sm:col-span-2">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">
                  Equal Probability
                </h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Every segment chance is calculated from its angle, guaranteeing
                equal probability for all entries.
              </p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Vision & Commitment
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
            We started this project after noticing the web was full of slow,
            ad-heavy spinners that frustrated users. Our goal was to build a
            clean, trustworthy alternative. Our commitment to you is simple:
          </p>
          <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>100% Free & Unlimited with no premium tiers or hidden caps</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Universally accessible on desktop, tablet, and mobile</span>
            </li>
          </ul>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Partner With Auroxa Tech
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            If you like the technology behind our wheel, our team at Auroxa
            Tech can build custom interactive tools, advanced web portals, and
            agentic AI solutions integrated into your business platforms.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 bg-primary/5 border border-primary/20">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Get In Touch
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              We are here to help and love hearing from our community.
            </p>
            <ul className="text-base md:text-lg text-muted-foreground space-y-2 mb-4">
              <li>Email: onlinespinwheel@gmail.com</li>
              <li>Response time: typically within 24-48 hours</li>
            </ul>
            <a
              href="mailto:onlinespinwheel@gmail.com"
              className="text-lg md:text-xl font-semibold text-primary hover:underline inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              onlinespinwheel@gmail.com
            </a>
            <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
              Thank you for choosing Online Spin Wheel as your trusted
              decision-maker. We remain committed to keeping your experience
              fast, fair, and free.
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
            to="/contact"
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
