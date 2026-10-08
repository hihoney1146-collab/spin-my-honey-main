import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import { GraduationCap, Users, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { SITE_ORIGIN, RAJA_AUTHOR, siteIdentityJsonLd, articleJsonLd, breadcrumbListJsonLd } from "@/lib/schema";

const TITLE = "Fair Student Selection Example Scenario | Online Spin Wheel";
const DESCRIPTION =
  "An example scenario showing how a teacher could use a spin wheel for fair student selection, group forming and classroom routines, with setup steps and tips.";

const CaseStudySchoolUsingSpinWheels = () => {
  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link
          rel="canonical"
          href="https://onlinespinwheel.fun/case-study-school-using-spin-wheels"
        />
        <script type="application/ld+json">
          {JSON.stringify([
            ...siteIdentityJsonLd(),
            breadcrumbListJsonLd([
              { name: "Home", url: `${SITE_ORIGIN}/` },
              { name: "Fair Student Selection Example Scenario" },
            ]),
            articleJsonLd({
              title: "Example Scenario: Fair Student Selection with a Spin Wheel",
              description: DESCRIPTION,
              url: "https://onlinespinwheel.fun/case-study-school-using-spin-wheels",
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
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Example Scenario: Fair Student Selection with a Spin Wheel
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            How a teacher could keep participation even and routines quick
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="bg-muted/50 rounded-lg p-4 flex items-start gap-3">
              <Info className="h-5 w-5 text-primary mt-0.5 shrink-0" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-foreground">About this page:</strong>{" "}
                This is an example scenario for teachers, written to show how
                the tool can be used in a classroom. It is not a report about a
                real school, teacher or classroom, and it contains no survey
                results or statistics.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">The situation</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Imagine a teacher with a class of about 25 students. A few
                confident students answer most questions, quieter students
                rarely volunteer, and some students feel the same names always
                get called. Calling on students alphabetically, drawing
                popsicle sticks or keeping a tally sheet can all work, but they
                take time and can still feel predictable.
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
                  Open the{" "}
                  <Link to="/random-student-picker" className="text-primary underline">
                    random student picker
                  </Link>{" "}
                  and paste the class list once, one name per line.
                </li>
                <li>
                  Show the wheel on the classroom screen so everyone can see the
                  full list of names.
                </li>
                <li>
                  Explain the rule before the first spin: the wheel decides, and
                  the result stands unless there is a mistake, such as a student
                  who is absent.
                </li>
                <li>
                  Use it for the same routine tasks every day, such as answering
                  questions, reading aloud and presentation order, so students
                  learn to trust it.
                </li>
                <li>
                  For group work, use the{" "}
                  <Link to="/team-generator-wheel" className="text-primary underline">
                    team generator wheel
                  </Link>{" "}
                  to split the class into teams.
                </li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ways to adapt it
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground ml-4 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Deactivate a name after that student answers, so everyone gets
                  a turn during a longer lesson.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Keep separate wheels for different activities, for example
                  reading groups, review questions and helper roles.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Add small pictures next to names for younger students (see the{" "}
                  <Link
                    to="/tutorial-adding-images-to-spin-wheels"
                    className="text-primary underline"
                  >
                    image tutorial
                  </Link>
                  ).
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>
                  Keep labels short so names are readable from the back of the
                  room.
                </span>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              How to tell whether it is working
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Pick one simple measure and compare before and after. For
                example, count how many different students answer in one lesson,
                or note how long it takes to form groups. Treat the result as
                data about your own classroom, not as a promise of what any wheel
                will do.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Things to keep in mind
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                A random pick is fair, but it is not always the right pick. Use
                your judgment for students who need accommodations or who are
                not ready to answer on the spot. Randomness also means the same
                name can occasionally come up twice in a row, which is why
                deactivating names after they are chosen helps. Keep a backup,
                such as paper slips, in case the screen or internet fails.
              </p>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Try it in your classroom
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Start with one routine, such as picking who answers the next
              question, and add more uses once students are comfortable with it.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/classroom-spinner"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Your Classroom Wheel
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/random-student-picker"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Random student picker
                <GraduationCap className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Another example</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              See how prize draws could work at a community event.
            </p>
            <Link
              to="/case-study-community-event-using-spin-wheels"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Community event example
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Help</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about using spin wheels in your school?
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

export default CaseStudySchoolUsingSpinWheels;
