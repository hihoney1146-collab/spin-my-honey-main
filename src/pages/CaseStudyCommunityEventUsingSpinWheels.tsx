import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { Users, Heart, ArrowRight, Award, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_ORIGIN, RAJA_AUTHOR, siteIdentityJsonLd, articleJsonLd, breadcrumbListJsonLd } from "@/lib/schema";

const TITLE = "Community Event Prize Draw Example | Online Spin Wheel";
const DESCRIPTION =
  "An example scenario showing how organizers could run transparent prize draws and raffles at a community event with a spin wheel, with setup steps and tips.";

const CaseStudyCommunityEventUsingSpinWheels = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link
          rel="canonical"
          href="https://onlinespinwheel.fun/case-study-community-event-using-spin-wheels"
        />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Community Event Prize Draw Example" },
            ]),
            articleJsonLd({
              title: "Example Scenario: Transparent Prize Draws at a Community Event",
              description: DESCRIPTION,
              url: "https://onlinespinwheel.fun/case-study-community-event-using-spin-wheels",
              dateModified: "2026-10-09",
              authorName: RAJA_AUTHOR.name,
            }),
          ])}
        </script>
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Example Scenario: Transparent Prize Draws at a Community Event
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            How organizers could make winner selection visible and fair
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">About this page:</strong>{" "}
                This example scenario is written for event organizers, to show
                how the tool can be used at a live draw. It is not a report
                about a real event, and it contains no survey results,
                statistics or testimonials.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The situation</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Imagine a volunteer-run community festival with several prize
                draws: a children&apos;s colouring contest, a baking
                competition and a raffle. The organizers want everyone in the
                crowd to be able to see that winners are chosen fairly. Drawing
                names from a box happens out of sight, and picking winners by
                hand can lead to accusations of bias.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Setting it up
            </h2>
            <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg">
              <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                <li>
                  List the draws and prepare the entries for each one, using
                  ticket numbers or names.
                </li>
                <li>
                  Open the{" "}
                  <Link to="/winner-picker-wheel" className="text-primary underline">
                    winner picker wheel
                  </Link>{" "}
                  on a laptop connected to the venue screen or projector, paste
                  in the entries and do a practice spin before the event starts.
                </li>
                <li>
                  Announce the rules before each draw: the full wheel is shown
                  on screen, there is one spin per prize, and the result
                  stands.
                </li>
                <li>
                  Run each draw live so the audience watches the result in real
                  time, and remove the winner before the next prize so nobody
                  wins twice.
                </li>
                <li>
                  If you want to share proof afterwards, record the screen
                  during each spin.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Handling several prize tiers
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                For events with several prizes, run the wheel once per tier and
                remove each winner before the next spin. Keep the grand prize
                for last and let the crowd count down the spin together. This
                keeps the pacing lively and makes the biggest moment feel
                transparent. For a ticket-based draw, the{" "}
                <Link to="/raffle-wheel" className="text-primary underline">
                  raffle wheel
                </Link>{" "}
                works the same way.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to tell whether it is working
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Decide in advance what you will track and compare it with your
                previous event: for example, how many people stay for the draw,
                how many questions about fairness you receive, or how long each
                draw takes. Treat the result as data about your own event, not
                as a promise of what any wheel will do.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Things to keep in mind
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Rules for raffles and contests differ by place, so check any
                local requirements before you run a draw. Use ticket numbers
                instead of full names on a public screen when privacy matters.
                Test the wheel and the projector beforehand, keep labels short
                so they are readable from a distance, and have a backup device
                ready.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Try it for your event
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Start with one contest or giveaway and run the draw live on a
              screen where everyone can see it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/winner-picker-wheel"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Open the winner picker
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/random-name-picker-wheel"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Random name picker
                <Heart className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Another example</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              See how a teacher could use a wheel for fair student selection.
            </p>
            <Link
              to="/case-study-school-using-spin-wheels"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Classroom example
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Help</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Questions about using spin wheels for your event?
            </p>
            <Link
              to="/contact-us"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>
        </div>
      </article>
    </>
  );
};

export default CaseStudyCommunityEventUsingSpinWheels;
