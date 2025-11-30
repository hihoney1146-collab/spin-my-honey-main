import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us - Hi Honey</title>
        <meta
          name="description"
          content="Learn about Hi Honey - Making Decisions Fun, One Spin at a Time. Discover our story, mission, and commitment to making choices enjoyable."
        />
        <link rel="canonical" href="https://hihoney.site/about" />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            About Us
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            Making Decisions Fun, One Spin at a Time
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Welcome to Hi Honey – where the age-old challenge of making
            decisions becomes an exciting adventure! We believe that choosing
            doesn't have to be stressful, and sometimes the best way forward is
            to let fate lend a hand.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p className="text-base md:text-lg">
              Born from a simple idea during a casual lunch debate about where
              to eat, Hi Honey emerged as a solution to one of life's most
              common dilemmas: decision fatigue. We realized that people
              everywhere face countless daily choices, from picking dinner
              options to selecting team members for projects, and we wanted to
              make that process more enjoyable.
            </p>
            <p className="text-base md:text-lg">
              What started as a small tool for personal use quickly grew into
              something we knew had to be shared with the world. Today, Hi Honey
              helps thousands of users transform their decision-making process
              from a burden into a moment of fun and anticipation.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            What We Do
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
            Hi Honey is a free, easy-to-use wheel spinner that helps you make
            random selections with style. Whether you're:
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
            Our customizable wheel puts the power in your hands while adding an
            element of excitement to every decision.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Why Choose Hi Honey?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Simple & Intuitive
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                No complicated setup or registration required. Just add your
                options and spin!
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Completely Free
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                We believe everyone should have access to great decision-making
                tools without barriers.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Customizable
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Personalize your wheel with different colors, options, and
                settings to match your needs.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Fair & Random
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Our algorithm ensures every spin is truly random and unbiased.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-semibold text-foreground">
                Mobile-Friendly
              </h3>
              <p className="text-sm md:text-base text-muted-foreground">
                Spin the wheel anywhere, anytime, from any device.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Our Mission
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            We're on a mission to bring more fun and spontaneity into everyday
            decision-making. We believe that not every choice needs to be
            agonized over, and sometimes embracing chance can lead to the best
            outcomes and unexpected adventures.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Community First
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Hi Honey thrives because of our amazing community of users who trust
            us with their daily decisions. We're constantly listening to
            feedback and improving our platform to serve you better. Your
            suggestions and ideas help shape the future of our tool.
          </p>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 bg-primary/5 border border-primary/20">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 md:h-16 md:w-16 text-primary mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
              Get In Touch
            </h2>
            <p className="text-base md:text-lg text-muted-foreground mb-4 max-w-2xl leading-relaxed">
              We'd love to hear from you! Whether you have questions, feedback,
              or just want to share how you've used Hi Honey, we're all ears.
            </p>
            <a
              href="mailto:chaudhrayadam@gmail.com"
              className="text-lg md:text-xl font-semibold text-primary hover:underline inline-flex items-center gap-2 transition-colors"
            >
              <Mail className="h-5 w-5" />
              chaudhrayadam@gmail.com
            </a>
            <p className="text-sm md:text-base text-muted-foreground mt-4 max-w-2xl">
              Have a feature suggestion? Found a bug? Want to share your success
              story? Don't hesitate to reach out. We read every message and
              genuinely appreciate your input.
            </p>
          </div>
        </Card>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">
            Looking Forward
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-4 leading-relaxed">
            As we continue to grow, we remain committed to keeping Hi Honey
            free, accessible, and fun for everyone. We have exciting features in
            the pipeline and can't wait to share them with you.
          </p>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Thank you for choosing Hi Honey to be part of your decision-making
            journey. Here's to making every choice a little more exciting!
          </p>
        </Card>

        <div className="text-center py-6 md:py-8">
          <p className="text-xl md:text-2xl font-bold text-primary">
            Spin with confidence. Decide with joy. Choose Hi Honey.
          </p>
        </div>

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
