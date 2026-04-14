import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet";
import {
  CheckCircle2,
  Shield,
  ArrowRight,
  Sparkles,
  Wand2,
  Lightbulb,
  Users,
  Gift,
  PlayCircle,
  Trophy,
  Target,
} from "lucide-react";
import { Link } from "react-router-dom";

const SpinWheelPicker = () => {
  return (
    <>
      <Helmet>
        <title>
          Spin Wheel Picker: Free Online Wheel for Fair, Fun Random Choices | Online Spin Wheel
        </title>
        <meta
          name="description"
          content="A spin wheel picker is a simple online tool that lets you add options to a virtual wheel, spin it, and get a random result. Free for classrooms, giveaways, and events."
        />
        <meta
          name="keywords"
          content="spin wheel picker, random picker wheel, online spin wheel, wheel picker, random name picker wheel, spin wheel picker tool"
        />
        <link
          rel="canonical"
          href="https://onlinespinwheel.fun/spin-wheel-picker"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <article className="container relative mx-auto px-4 py-12 md:py-20 max-w-5xl z-10">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Spin Wheel Picker
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Free Online Wheel for Fair, Fun Random Choices
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            <section className="relative">
              <Card className="p-8 md:p-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-0 shadow-2xl rounded-3xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/5 to-purple-500/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="space-y-6 text-muted-foreground leading-relaxed text-lg relative z-10">
                  <p className="text-xl md:text-2xl font-light text-foreground/90 first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-1 first-letter:float-left">
                    A spin wheel picker is a simple online tool that lets you add options to a virtual wheel, spin it, and instantly get a
                    random result. It turns boring decisions into a quick, visual moment of excitement that feels fair for everyone
                    watching.
                  </p>
                  <p>
                    On onlinespinwheel.fun, you get a spin wheel picker that works right in your browser. Type names, numbers, or
                    prizes, click spin, and the wheel picker chooses one option with smooth animation on desktop or mobile.
                  </p>
                </div>
              </Card>
            </section>

            <section className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-950 dark:to-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Lightbulb className="h-8 w-8 text-yellow-400" />
                  <h2 className="text-3xl md:text-4xl font-bold">
                    What is a Spin Wheel Picker?
                  </h2>
                </div>
                <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
                  <p>
                    A spin wheel picker (also called a spin wheel picker tool, random picker wheel, or online spin wheel) is a digital
                    wheel divided into colored segments. Each segment represents an option you add—like student names,
                    giveaway prizes, tasks, or choices.
                  </p>
                  <p>
                    When you press the spin button, the wheel rotates and gradually slows down until it stops on one segment. That
                    segment is your selected result, similar to drawing a name from a hat but more transparent and fun.
                  </p>
                  <p>
                    Because it runs in the browser, a wheel picker is:
                  </p>
                  <ul className="space-y-3 ml-4">
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Easy to use with no downloads</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Reusable for different lists and events</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span>Simple to share on screen during classes, meetings, or streams</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-lg">
                  <Wand2 className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Why Use a Spin Wheel Picker Instead of Other Random Tools?
                </h2>
              </div>
              <Card className="p-8 md:p-10 bg-white dark:bg-slate-800/50 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-700">
                <p className="text-muted-foreground mb-6">
                  You could flip a coin or use a basic number generator, but a spin wheel picker has several advantages.
                </p>
                <div className="space-y-4">
                  {[
                    {
                      icon: <Shield className="h-5 w-5" />,
                      title: "Visual fairness",
                      desc: "Everyone can see the wheel spinning and stopping, which builds trust in classroom name picking or raffles."
                    },
                    {
                      icon: <Sparkles className="h-5 w-5" />,
                      title: "More than two options",
                      desc: "Unlike coins or yes/no generators, wheel pickers handle many names, prizes, or choices at once."
                    },
                    {
                      icon: <Target className="h-5 w-5" />,
                      title: "Customizable experience",
                      desc: "Colors, labels, and sometimes sounds make your online spin wheel match your event or brand."
                    },
                    {
                      icon: <PlayCircle className="h-5 w-5" />,
                      title: "Engagement",
                      desc: "The suspense of watching the wheel spin keeps students, viewers, and participants interested."
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-2 rounded-full bg-gradient-to-br from-primary/20 to-purple-500/20 flex-shrink-0">
                        {item.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-muted-foreground">
                  This makes tools like onlinespinwheel.fun ideal for teachers, content creators, event hosts, and anyone who
                  needs a random name picker wheel regularly.
                </p>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl shadow-lg">
                  <PlayCircle className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  How to Use Our Spin Wheel Picker (Step by Step)
                </h2>
              </div>
              <Card className="p-8 md:p-10 bg-white dark:bg-slate-800/50 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-700">
                <p className="text-muted-foreground mb-6 text-lg">
                  Using a spin wheel picker tool should be fast and simple. Here is a clear, beginner‑friendly workflow based on
                  how most popular wheels work.
                </p>
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 md:p-8">
                  <ol className="space-y-6 ml-4 relative">
                    <li className="pl-8 relative">
                      <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-bold">1</span>
                      <div>
                        <strong className="text-foreground block mb-1">Open the tool</strong>
                        <span className="text-muted-foreground">Visit onlinespinwheel.fun in your browser on a phone, tablet, or computer.</span>
                      </div>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 flex items-center justify-center text-xs font-bold">2</span>
                      <div>
                        <strong className="text-foreground block mb-1">Add your options</strong>
                        <ul className="mt-2 space-y-1 ml-4 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Type or paste your list of names, numbers, or prizes.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Put one item per line so each becomes its own segment on the wheel.</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-pink-100 dark:bg-pink-900 text-pink-600 dark:text-pink-300 flex items-center justify-center text-xs font-bold">3</span>
                      <div>
                        <strong className="text-foreground block mb-1">Customize if needed</strong>
                        <ul className="mt-2 space-y-1 ml-4 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Adjust colors or themes to match your class, stream, or brand style.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>Choose whether you want to remove winners after each spin or allow repeats.</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300 flex items-center justify-center text-xs font-bold">4</span>
                      <div>
                        <strong className="text-foreground block mb-1">Click Spin</strong>
                        <span className="text-muted-foreground">Press the spin button or the wheel itself. The spin wheel picker rotates, slows down, and stops on one segment, clearly showing the selected result.</span>
                      </div>
                    </li>
                    <li className="pl-8 relative">
                      <span className="absolute left-0 top-1 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 flex items-center justify-center text-xs font-bold">5</span>
                      <div>
                        <strong className="text-foreground block mb-1">Repeat or reset</strong>
                        <ul className="mt-2 space-y-1 ml-4 text-muted-foreground">
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>For multiple winners, spin again or hide already selected entries so they are not chosen twice.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>For a new game or event, replace the list with fresh options.</span>
                          </li>
                        </ul>
                      </div>
                    </li>
                  </ol>
                </div>
                <p className="mt-6 text-muted-foreground">
                  Because the tool runs in your browser, it works smoothly on most modern devices and does not require any registration.
                </p>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Best Ways to Use a Spin Wheel Picker
                </h2>
              </div>
              <Card className="p-8 md:p-10 bg-white dark:bg-slate-800/50 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-700">
                <p className="text-muted-foreground mb-6">
                  A spin wheel picker tool is flexible and can be used in many real‑life situations.
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: <Users className="h-5 w-5" />,
                      title: "Classroom random name picker",
                      desc: "Teachers can add student names and use the random name picker wheel to choose who answers questions, leads activities, or presents. This avoids bias and makes selection feel fair.",
                      color: "from-blue-500 to-cyan-500"
                    },
                    {
                      icon: <Gift className="h-5 w-5" />,
                      title: "Giveaways and raffles",
                      desc: "Streamers and brands can paste participant names or usernames into the wheel and spin live on stream to select a winner. Viewers can see the whole process, which builds trust.",
                      color: "from-purple-500 to-pink-500"
                    },
                    {
                      icon: <Target className="h-5 w-5" />,
                      title: "Team and office decisions",
                      desc: "Use the online decision wheel to assign tasks, pick meeting topics, or choose lunch spots so no one feels targeted.",
                      color: "from-red-500 to-orange-500"
                    },
                    {
                      icon: <PlayCircle className="h-5 w-5" />,
                      title: "Games, parties, and challenges",
                      desc: "Create a prize wheel spinner for birthdays, family game nights, or challenges like \"truth or dare\", \"dares\", or \"fun tasks\".",
                      color: "from-yellow-500 to-amber-500"
                    },
                    {
                      icon: <Sparkles className="h-5 w-5" />,
                      title: "Everyday choices",
                      desc: "Turn small daily decisions—like what movie to watch or which workout to do—into a quick spin with the wheel picker.",
                      color: "from-green-500 to-emerald-500"
                    }
                  ].map((item, idx) => (
                    <Card key={idx} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-slate-800 border-0 shadow-lg rounded-2xl overflow-hidden group">
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${item.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
                <p className="mt-6 text-muted-foreground">
                  By switching the list of options, the same spin wheel picker can adapt to almost any scenario that needs a random selection.
                </p>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  What Makes Our Spin Wheel Picker Different?
                </h2>
              </div>
              <Card className="p-8 md:p-10 bg-white dark:bg-slate-800/50 shadow-xl rounded-3xl border border-slate-200 dark:border-slate-700">
                <p className="text-muted-foreground mb-6">
                  Many spin wheel picker tools exist online, but onlinespinwheel.fun focuses on staying simple, fast, and
                  user‑first, similar to the best random name picker wheels on the web.
                </p>
                <div className="space-y-4">
                  {[
                    "No sign‑up required: You can start spinning immediately without creating an account or giving your email.",
                    "Fast loading: Lightweight code keeps the wheel responsive, so it works well even on slower connections.",
                    "Clean interface: The design keeps the focus on your wheel and result, not on heavy ads or confusing menus.",
                    "Flexible use cases: Whether you need a name picker, number wheel, prize wheel, or yes/no style decision wheel, you can build it from the same tool."
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-2 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-muted-foreground">
                  For a small, two‑person team, this focus on clarity, fairness, and privacy is how we show real‑world experience
                  and ongoing care for the tool.
                </p>
              </Card>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                  Tips for Getting the Best Results from a Spin Wheel Picker
                </h2>
              </div>
              <Card className="p-8 md:p-10 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-900 border-0 shadow-xl rounded-3xl">
                <p className="text-muted-foreground mb-6">
                  To make your spin wheel picker as helpful as possible, follow these simple tips:
                </p>
                <div className="space-y-4">
                  {[
                    "Keep labels short and readable, especially when you have many entries.",
                    "Group similar items or run multiple wheels if your list gets too long.",
                    "Test the wheel once or twice before sharing your screen in class or in a live stream.",
                    "If you are using the random name picker wheel for official giveaways, consider recording the screen so participants can see the whole spin."
                  ].map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-md hover:shadow-lg transition-shadow">
                      <div className="p-2 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex-shrink-0">
                        <CheckCircle2 className="h-5 w-5 text-white" />
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{tip}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </section>

            <section className="relative mt-16">
              <div className="absolute inset-0 bg-gradient-to-r from-primary via-purple-600 to-primary rounded-3xl blur opacity-20"></div>
              <Card className="relative p-8 md:p-12 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl border-0 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMC0zMGg2djZoLTZ2LTZ6bS0zMCAwdjZoLTZ2LTZoNnptMCAzMGgtNnYtNmg2djZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
                <div className="relative z-10 text-center space-y-6">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4">
                    Ready to Spin?
                  </h2>
                  <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                    Try our free spin wheel picker today for fair, fun random choices on desktop or mobile.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 mt-8">
                    <Link
                      to="/"
                      className="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-4 rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105 group"
                    >
                      Try Our Spin Wheel
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/#spin-wheel-seo-content"
                      className="inline-flex items-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full font-semibold hover:bg-white/10 backdrop-blur-sm transition-all duration-300 hover:border-white/50"
                    >
                      Read More Guides
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </div>
                </div>
                <div className="absolute top-10 left-10 w-20 h-20 bg-red-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl"></div>
              </Card>
            </section>
          </div>
        </article>
      </div>
    </>
  );
};

export default SpinWheelPicker;
