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
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Welcome to Online Spin Wheel. We are a small, dedicated team building simple tools that make random choices
            fair, fun, and effortless for everyone. Our mission is to make fair random choices accessible to classrooms,
            communities, and creators worldwide.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Who We Are
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Online Spin Wheel was launched in 2025 as a browser-based random picker for names, numbers, and prizes
              that works on any modern device. Behind the wheel is a full-stack web developer with 4 years of experience and
              an SEO/WordPress specialist with 3 years of experience building fast, user-friendly web tools.
            </p>
            <p className="text-base md:text-lg">
              Together, this team focuses on reliability, clear UX, and honest communication rather than bloated features you never use.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            What We Do
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
            Online Spin Wheel helps teachers, event hosts, creators, and teams make unbiased decisions with a visual
            wheel instead of arguments, favoritism, or manual draws. You can paste in names or numbers, spin live on
            screen, and let everyone see that the result is random and transparent. The tool is free to use, requires no login
            for normal spinning, and is designed to be ready in seconds for last-minute classes, meetings, or streams.
          </p>
          <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
            Online Spin Wheel is a free, easy-to-use wheel spinner that helps you make random selections with style.
            Whether you're:
          </p>
          <ul className="space-y-3 text-base md:text-lg text-muted-foreground">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Choosing tonight's dinner destination</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Picking a movie for family night</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Selecting winners for giveaways</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Deciding classroom activities</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Assigning team tasks</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1 text-xl">•</span>
              <span>Making any choice that needs a fair, random outcome</span>
            </li>
          </ul>
          <p className="text-base md:text-lg text-muted-foreground mt-4 leading-relaxed">
            Our customizable wheel puts the power in your hands while adding an element of excitement to every decision.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Why We Built This
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Online Spin Wheel started after noticing that many online spinners were cluttered with confusing ads, slow
            loading times, or unclear rules about how randomness and data were handled. The goal was to create a clean,
            trustworthy wheel that teachers could safely use in class, streamers could show on camera, and organizers
            could rely on for fair giveaways. Every update aims to keep the wheel simple enough for beginners but flexible
            enough for power users who run regular games and contests.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Why Choose Online Spin Wheel?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Simple & Intuitive</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                No complicated setup or registration required. Just add your options and spin!
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Completely Free</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                We believe everyone should have access to great decision-making tools without barriers.
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Users className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Customizable</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Personalize your wheel with different colors, options, and settings to match your needs.
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Fair & Random</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Our algorithm ensures every spin is truly random and unbiased.
              </p>
            </Card>
            <Card className="p-4 bg-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-2">
                <Zap className="h-5 w-5 text-primary" />
                <h3 className="text-lg md:text-xl font-semibold">Mobile-Friendly</h3>
              </div>
              <p className="text-sm md:text-base text-muted-foreground">
                Spin the wheel anywhere, anytime, from any device.
              </p>
            </Card>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            How We Ensure Fairness and Safety
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              The wheel uses a random or pseudo-random algorithm so each entry has an equal chance to be selected on
              every spin, making it suitable for draws, name picking, and task assignment. Entries are typed directly into your
              browser session, and you stay in control of what information you enter, following best-practice guidance to
              avoid collecting sensitive personal data unnecessarily.
            </p>
            <p className="text-base md:text-lg">
              Online Spin Wheel is hosted over HTTPS and is regularly checked for performance and stability to offer a smooth
              experience during live use.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Promise to You
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Online Spin Wheel is committed to keeping the core wheel free, fast, and easy to use so you can focus on your
            class, event, or community instead of the tool. Feedback from teachers, students, streamers, and organizers
            directly shapes future improvements, ensuring the wheel continues to match real-world needs. Clear contact
            details and a transparent privacy policy are provided so you always know who is behind the tool and how your
            data is treated.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 bg-primary/5 border border-primary/20">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Contact us with any questions or suggestions
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to share how you've used Online Spin Wheel, we're all ears.
            </p>
            <a
              href="mailto:onlinespinwheel@gmail.com"
              className="text-lg md:text-xl font-semibold text-primary hover:underline inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              onlinespinwheel@gmail.com
            </a>
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
