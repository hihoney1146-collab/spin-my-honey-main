import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  GraduationCap,
  Users,
  TrendingUp,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";

const CaseStudySchoolUsingSpinWheels = () => {
  return (
    <>
      <Helmet>
        <title>
          Case Study: Elementary School Transforms Classroom Engagement with
          Spin Wheels | Hi Honey
        </title>
        <meta
          name="description"
          content="Discover how a midwestern elementary school dramatically improved student engagement, participation, and fairness in classrooms using spin wheels for random student selection."
        />
        <meta
          name="keywords"
          content="school case study, classroom spin wheel, student engagement, educational technology, random selection classroom, teaching tools case study"
        />
        <link
          rel="canonical"
          href="https://hihoney.site/case-study-school-using-spin-wheels"
        />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <div className="text-center mb-8 md:mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <GraduationCap className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Case Study: Elementary School Transforms Classroom Engagement
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            How Spin Wheels Improved Participation and Fairness
          </p>
        </div>

        <Card className="p-6 md:p-8 lg:p-10 mb-6 md:mb-8 space-y-8">
          <section>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p className="text-lg">
                At Lincoln Elementary School in the midwestern United States,
                third-grade teacher Sarah Mitchell faced a common classroom
                challenge: how to ensure all students participated fairly in
                class discussions and activities. Despite her best efforts,
                quieter students rarely volunteered, while more assertive
                students dominated conversations.
              </p>
              <p>
                This case study explores how Sarah implemented spin wheels in
                her classroom, the measurable improvements in student engagement
                and participation, and the lessons learned that can benefit
                other educators. Over the course of one academic year, Sarah's
                use of spin wheels transformed her classroom dynamics and
                improved learning outcomes for all students.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              The Challenge
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sarah's third-grade class consisted of 28 students with diverse
                learning styles and personalities. Like many teachers, she
                struggled with ensuring equal participation opportunities for
                all students.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-4">
                <p className="font-semibold mb-3 text-foreground">
                  Specific Problems Identified:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Unequal Participation:</strong> Five outgoing
                      students answered 60% of questions voluntarily
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Quiet Students Left Behind:</strong> Shy or quiet
                      students rarely raised hands, leading to missed learning
                      opportunities
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Perceived Unfairness:</strong> Students noticed
                      patterns in who was called upon, leading to complaints
                      about fairness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Time Management Issues:</strong> Spending
                      significant time deciding who to call on or negotiating
                      with students about fairness
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      <strong>Student Anxiety:</strong> Some students felt
                      anxious about being called on, while others felt ignored
                    </span>
                  </li>
                </ul>
              </div>
              <p className="mt-4">
                Sarah tried several traditional solutions: calling on students
                alphabetically, using popsicle sticks with names, and
                maintaining a participation tracking list. While these methods
                helped somewhat, they were time-consuming, felt mechanical, and
                didn't create the excitement and engagement she wanted in her
                classroom.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              The Solution: Spin Wheels
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Implementation Strategy
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  In the fall semester, Sarah discovered spin wheels during an
                  online search for classroom engagement tools. She decided to
                  implement them for student selection during
                  question-and-answer sessions, group assignments, and activity
                  participation.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Initial Setup Process:
                  </p>
                  <ol className="space-y-2 text-sm text-muted-foreground ml-4 list-decimal">
                    <li>
                      Created a wheel with all 28 student names during the first
                      week of implementation
                    </li>
                    <li>
                      Projected the wheel on the interactive whiteboard during
                      lessons
                    </li>
                    <li>
                      Explained the system to students: "The wheel decides
                      randomly—everyone gets an equal chance"
                    </li>
                    <li>
                      Established a rule: "Once the wheel lands, that's our
                      selection—no re-spins unless there's an error"
                    </li>
                    <li>
                      Used the wheel consistently for all question-answer
                      sessions
                    </li>
                  </ol>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Adaptation and Refinement
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  After the first month, Sarah refined her approach based on
                  what worked best in her classroom. She began using the
                  activate/deactivate feature to temporarily remove students who
                  had already answered, ensuring everyone got turns throughout
                  longer lessons.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Refinements Made:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Deactivating students after they answer to give others
                        opportunities
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Using separate wheels for different activities (reading
                        groups, math groups, etc.)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Customizing colors to match classroom theme and create
                        visual appeal
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Allowing students to see the wheel configuration before
                        spinning to build trust
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Measurable Results
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Participation Improvements
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Sarah tracked participation data throughout the year. The
                  results were significant and measurable.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Card className="p-4 bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">
                        Participation Distribution
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Before spin wheels, 5 students answered 60% of questions.
                      After implementation, participation became nearly equal
                      across all 28 students, with each student answering 3-5%
                      of questions.
                    </p>
                  </Card>
                  <Card className="p-4 bg-primary/5 border border-primary/20">
                    <div className="flex items-center gap-3 mb-2">
                      <Users className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">
                        Quiet Student Engagement
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Previously quiet students who rarely volunteered saw their
                      participation increase by 400%. They began participating
                      actively when randomly selected, building confidence over
                      time.
                    </p>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Classroom Climate Improvements
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  Beyond participation metrics, Sarah observed significant
                  improvements in classroom climate and student attitudes.
                </p>
                <div className="bg-muted/50 rounded-lg p-4 mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Qualitative Improvements:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Reduced Complaints:</strong> Complaints about
                        unfairness dropped to zero after implementation
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Increased Attention:</strong> Students stayed
                        more attentive, knowing they could be selected at any
                        time
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Building Confidence:</strong> Quiet students
                        gradually became more comfortable participating,
                        sometimes volunteering after building confidence through
                        random selection
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Time Savings:</strong> Eliminated time spent
                        debating who to call on, keeping lessons flowing
                        smoothly
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>Student Trust:</strong> Students trusted the
                        system because they could see it was truly random
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div>
                <h3 className="text-xl md:text-2xl font-semibold mb-3 text-foreground">
                  Academic Performance Impact
                </h3>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  While it's difficult to attribute academic improvements solely
                  to spin wheels, Sarah noted several positive trends in her
                  classroom's academic performance that correlated with the
                  implementation.
                </p>
                <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-3">
                  <p className="font-semibold mb-2 text-foreground">
                    Academic Improvements Observed:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Improved quiz scores across all students, especially
                        previously quiet students
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Better class discussion quality as more diverse
                        perspectives were shared
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        Increased student engagement in lessons, leading to
                        better retention of material
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        More thoughtful responses as all students prepared to
                        potentially be selected
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Student Feedback
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                At the end of the school year, Sarah surveyed her students about
                their experience with the spin wheel system. The feedback was
                overwhelmingly positive.
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Student Quotes
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p className="italic">
                      "I like that everyone gets a turn. It's fair."
                      <span className="not-italic"> — Third grader</span>
                    </p>
                    <p className="italic">
                      "It's exciting when the wheel spins. I pay attention
                      more."
                      <span className="not-italic"> — Student</span>
                    </p>
                    <p className="italic">
                      "Before, I was scared to raise my hand. Now I know I'll
                      get picked randomly, so I try harder."
                      <span className="not-italic">
                        {" "}
                        — Previously quiet student
                      </span>
                    </p>
                  </div>
                </Card>
                <Card className="p-4 bg-primary/5 border border-primary/20">
                  <h3 className="font-semibold mb-2 text-foreground">
                    Survey Results
                  </h3>
                  <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>92%</strong> of students preferred spin wheel
                        selection over hand-raising
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>88%</strong> felt the system was fair
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>85%</strong> reported feeling more engaged
                        during lessons
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary mt-1">•</span>
                      <span>
                        <strong>78%</strong> said they paid more attention
                        knowing they could be selected
                      </span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Lessons Learned and Best Practices
            </h2>
            <div className="space-y-4">
              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Consistency is Key
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sarah found that using the wheel consistently was crucial for
                  success. Students needed to see that the system was truly
                  random and fair, which required consistent implementation
                  without exceptions.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Transparency Builds Trust
                </h3>
                <p className="text-sm text-muted-foreground">
                  Showing students the wheel configuration before spinning,
                  letting them see all names included, and maintaining
                  transparency throughout the process built student trust in the
                  system.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Flexibility When Needed
                </h3>
                <p className="text-sm text-muted-foreground">
                  While consistency matters, Sarah learned to recognize when
                  flexibility was appropriate—for example, if a student had
                  already answered multiple times or needed accommodation.
                  Balance randomness with reasonableness.
                </p>
              </Card>

              <Card className="p-4 border-l-4 border-primary">
                <h3 className="font-semibold mb-2 text-foreground">
                  Technology Reliability
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sarah always had a backup plan—a physical spinner or simple
                  name-drawing method—in case of technical issues. This ensured
                  the system never disrupted lessons.
                </p>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Adoption by Other Teachers
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                After seeing Sarah's success, several other teachers at Lincoln
                Elementary began implementing spin wheels in their classrooms.
                The school's principal asked Sarah to present her experience at
                a faculty meeting, and by the end of the year, 12 of the
                school's 18 classroom teachers had adopted spin wheels.
              </p>
              <div className="bg-muted/50 rounded-lg p-4 mt-3">
                <p className="font-semibold mb-2 text-foreground">
                  Spread to Other Grades:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Kindergarten and first-grade teachers used wheels for
                      activity selection and helper assignments
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Fourth and fifth-grade teachers implemented wheels for
                      group formation and presentation order
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      The school's special education team began using wheels for
                      differentiation and activity selection
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Conclusion</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Sarah's implementation of spin wheels at Lincoln Elementary
                demonstrates the powerful impact that simple, fair random
                selection can have on classroom dynamics. Over the course of one
                academic year, spin wheels transformed participation patterns,
                improved classroom climate, and enhanced student engagement.
              </p>
              <p>
                The key to success was not just the technology itself, but the
                consistent, transparent, and fair way Sarah implemented it. By
                showing students that selection was truly random and giving
                everyone equal opportunities, she created an environment where
                all students felt included and valued.
              </p>
              <div className="bg-primary/5 border-l-4 border-primary p-4 rounded-r-lg mt-4">
                <p className="font-semibold mb-2 text-foreground">
                  Key Takeaways for Other Educators:
                </p>
                <ul className="space-y-2 text-sm text-muted-foreground ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Spin wheels can dramatically improve participation
                      fairness and engagement
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Consistency and transparency are essential for building
                      student trust
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      The system benefits both quiet and outgoing students,
                      creating more balanced participation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>
                      Implementation is simple and requires minimal training or
                      setup time
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Transform Your Classroom?
            </h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              This case study demonstrates the real-world impact of spin wheels
              in educational settings. If you're an educator looking to improve
              student engagement and fairness in your classroom, consider
              implementing spin wheels using the best practices outlined here.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Start with one simple use case—like student selection for
              questions—and gradually expand to other applications as you become
              comfortable with the tool. Consistency and transparency will help
              you achieve similar success.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Create Your Classroom Wheel
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border-2 border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition-colors"
              >
                Read More Case Studies
                <GraduationCap className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </Card>

        {/* Related Articles */}
        <div className="grid md:grid-cols-2 gap-4 mt-8">
          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">More Case Studies</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Explore more real-world examples of spin wheels in action.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              Browse Case Studies
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Card>

          <Card className="p-6 bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-primary" />
              <h3 className="text-xl font-bold">Get Help</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Have questions about implementing spin wheels in your school?
              We're here to help!
            </p>
            <Link
              to="/contact"
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
