import { SpinWheel } from "@/components/SpinWheel";
import { Card } from "@/components/ui/card";
import {
  Sparkles,
  Users,
  Shuffle,
  Zap,
  GraduationCap,
  Briefcase,
  PartyPopper,
  Home,
  BookOpen,
  Mail,
  Info,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>
          Online Spin Wheel - Free Customizable Random Picker for Names, Numbers
          & Prizes
        </title>
        <meta
          name="description"
          content="Free customizable online spin wheel. Add names or numbers, click spin, get instant random results. No account needed. Spin now at onlinespinwheel.fun!"
        />
        <meta
          name="keywords"
          content="spin wheel, free spin wheel, random name picker, decision maker wheel, prize wheel generator"
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/" />

        <meta property="og:title" content="Online Spin Wheel - Free Spin Wheel Tool" />
        <meta
          property="og:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onlinespinwheel.fun/" />
        <meta property="og:image" content="https://onlinespinwheel.fun/logo.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Online Spin Wheel Spin Wheel - Free Random Picker Tool"
        />
        <meta property="og:site_name" content="Online Spin Wheel" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Online Spin Wheel - Free Spin Wheel Tool" />
        <meta
          name="twitter:description"
          content="Make random decisions fun with our interactive spin wheel. Perfect for teachers, teams, and anyone who needs to pick randomly."
        />
        <meta name="twitter:image" content="https://onlinespinwheel.fun/logo.png" />
        <meta name="twitter:site" content="@OnlineSpinWheel" />
        <meta name="twitter:creator" content="@OnlineSpinWheel" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Online Spin Wheel Spin Wheel",
            description:
              "Free online spin wheel tool for random selection and decision making. Making Decisions Fun, One Spin at a Time.",
            url: "https://onlinespinwheel.fun",
            applicationCategory: "UtilityApplication",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.8",
              ratingCount: "2847",
            },
            keywords:
              "spin wheel, random picker, name picker wheel, wheel of names, decision maker, wheel spinner",
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://onlinespinwheel.fun/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Spin Wheel",
                item: "https://onlinespinwheel.fun/#spin-wheel",
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is an Online Spin Wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel is a free online tool that lets you add names, numbers, or choices to a colorful wheel and spin to pick a completely random result for games, classes, and giveaways.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel free to use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, Online Spin Wheel is free to use in your browser and does not require any download or subscription for normal spinning and basic customization.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to create an account to use the wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No account is required to start using Online Spin Wheel; you can open the page, enter your options, and spin immediately for a quick decision.",
                },
              },
              {
                "@type": "Question",
                name: "How do I use Online Spin Wheel?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Type or paste your list of names, numbers, or options into the input area, customize the wheel if you like, then click the spin button and wait for the pointer to stop on a random result.",
                },
              },
              {
                "@type": "Question",
                name: "Can I create a custom online spin wheel with my own colors and labels?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can create a custom online spin wheel by adding your own labels and adjusting settings such as the entries and appearance so the wheel matches your activity or brand.",
                },
              },
              {
                "@type": "Question",
                name: "Is there a limit to how many names or options I can add?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel supports many entries on a single wheel, so you can use it for small groups or larger lists like classrooms, raffles, or follower giveaways.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel truly random?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The wheel relies on a random or pseudo-random algorithm so each entry has an equal chance of being chosen on every spin, making it suitable for fair selection.",
                },
              },
              {
                "@type": "Question",
                name: "Can the same name be selected more than once?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, if you keep all entries on the wheel, the same name or number can appear again on later spins. You can manually remove winners if you want unique results each time.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel safe for classroom and student use?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "The tool is designed to run directly in the browser without requiring personal accounts, which makes it practical for teachers who want a simple, engaging random picker for students.",
                },
              },
              {
                "@type": "Question",
                name: "What data does Online Spin Wheel store?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Entries are typed directly into your browser session, and you control what information you input; following best-practice privacy guidance, tools like this avoid collecting sensitive personal data unnecessarily.",
                },
              },
              {
                "@type": "Question",
                name: "Does Online Spin Wheel work on mobile phones and tablets?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel is built to work in modern browsers on desktop, tablets, and smartphones so you can run spins in class, at home, or on the go.",
                },
              },
              {
                "@type": "Question",
                name: "Do I need to install an app or software to use it?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "No installation is required; you simply open this onlinespinwheel.fun website in a browser, making it easy to share the wheel on screens, projectors, and live streams.",
                },
              },
              {
                "@type": "Question",
                name: "Can I use Online Spin Wheel for giveaways and contests?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Yes, you can paste in participant names or ticket numbers and spin live on screen so audiences can clearly see that winners are picked randomly and transparently.",
                },
              },
              {
                "@type": "Question",
                name: "Is Online Spin Wheel good for classroom activities?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Teachers can use the wheel to call on students, form random groups, pick topics, or decide the order of presentations, turning routine classroom tasks into fun moments.",
                },
              },
              {
                "@type": "Question",
                name: "Can I embed or share Online Spin Wheel in live streams or meetings?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "You can screen-share the wheel in video calls or streaming software so viewers watch the spin in real time, which is popular for Q&A, games, and prize draws.",
                },
              },
              {
                "@type": "Question",
                name: "How can I make my spins more transparent and trustworthy?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Explain your rules before spinning, show the full wheel on screen, and keep a simple record of winners so participants can see that every result comes from the same fair process.",
                },
              },
              {
                "@type": "Question",
                name: "How to use the wheel spinner?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Type your entries in the box beside the wheel, click the wheel to spin for a random result, then use Customize to adjust colors, add images, and spin time.",
                },
              },
              {
                "@type": "Question",
                name: "Is my data private?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text: "Online Spin Wheel safeguards your privacy and data with strong security, compliance, and transparent practices.",
                },
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Use Spin Wheel Online",
            description:
              "Step-by-step guide to using the free online spin wheel for random selection",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Add Your Entries",
                text: "Add your entries in the list on the right. You can add as many options as you want.",
                url: "https://onlinespinwheel.fun/#step-1",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Customize Colors",
                text: "Each entry gets a unique color automatically. Edit or remove entries as needed.",
                url: "https://onlinespinwheel.fun/#step-2",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Spin the Wheel",
                text: "Click the Spin the Wheel button and watch the magic happen.",
                url: "https://onlinespinwheel.fun/#step-3",
              },
              {
                "@type": "HowToStep",
                position: 4,
                name: "Celebrate the Winner",
                text: "The wheel will spin and randomly select a winner with confetti celebration.",
                url: "https://onlinespinwheel.fun/#step-4",
              },
            ],
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <article>
        <section
          id="spin-wheel"
          className="w-full pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-6 md:pb-8 lg:pb-10 bg-gradient-to-b from-background to-muted/20 relative"
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          <h1 className="sr-only">
            Online Spin Wheel - Free Customizable Random Picker for Names,
            Numbers & Prizes
          </h1>
          <SpinWheel />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-3 sm:mt-4">
            <p className="text-[11px] sm:text-xs text-muted-foreground/90">
              Expertly Verified Resource Written by Raja Jahangir (SEO Expert).
              Powered by Auroxa Tech. Last Updated: 14 Apr 2026.
            </p>
          </div>
        </section>

        <section
          id="spin-wheel-features"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16 bg-muted/30"
          itemScope
          itemType="https://schema.org/ItemList"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              <h2
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight px-2"
                itemProp="name"
              >
                Why Use Our Spin Wheel?
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto px-4 leading-relaxed">
                Discover the features that make our spin wheel the perfect
                choice for any decision-making scenario
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Sparkles className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Completely Free
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  No sign-up required. Use our spin wheel tool absolutely free,
                  anytime, anywhere.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Users className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Perfect for Groups
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Ideal for classrooms, team meetings, parties, and family game
                  nights.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Shuffle className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Truly Random
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Our algorithm ensures fair and unbiased random selection every
                  time.
                </p>
              </Card>

              <Card className="p-4 sm:p-5 md:p-6 text-center hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg">
                  <Zap className="h-6 w-6 sm:h-6.5 sm:w-6.5 md:h-7 md:w-7 text-white" />
                </div>
                <h3 className="text-base sm:text-lg md:text-lg font-bold mb-2 sm:mb-3">
                  Easy to Use
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                  Add your options, click spin, and get instant results with fun
                  animations.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section
          id="how-to-use-spin-wheel"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 lg:py-16"
          itemScope
          itemType="https://schema.org/HowTo"
        >
          <div className="max-w-4xl mx-auto">
            <Card className="p-5 sm:p-6 md:p-8 lg:p-10 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-2 border-primary/20 shadow-2xl backdrop-blur-sm">
              <div className="text-center mb-6 sm:mb-8 md:mb-10">
                <h2
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 tracking-tight px-2"
                  itemProp="name"
                >
                  How to Use the Spin Wheel
                </h2>
                <p className="text-sm sm:text-base md:text-base text-muted-foreground px-2">
                  Get started in just a few simple steps
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        1
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Add Your Entries
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Add your entries in the list on the right. You can add
                        as many options as you want.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        2
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Customize Colors
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Each entry gets a unique color automatically. Edit or
                        remove entries as needed.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        3
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Add Images
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Upload logos or photos to segments so every option stands out at a glance.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        4
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Spin the Wheel
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        Click the "Spin the Wheel!" button and watch the magic
                        happen.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm sm:text-base font-bold text-primary-foreground">
                        5
                      </span>
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base md:text-base font-semibold mb-1 sm:mb-2">
                        Celebrate the Winner
                      </h3>
                      <p className="text-xs sm:text-sm md:text-sm text-muted-foreground leading-relaxed">
                        The wheel will spin and randomly select a winner with
                        confetti celebration!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section
          id="spin-wheel-uses"
          className="w-full px-4 lg:px-6 py-8 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-b from-muted/30 to-background"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 md:mb-5 tracking-tight">
                Popular Uses for Our Spin Wheel
              </h2>
              <p className="text-sm sm:text-base md:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto">
                Discover how our spin wheel can transform decision-making across
                different settings
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6 md:gap-7">
              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                    <GraduationCap className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Education
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Random student selection for questions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Picking presentation orders
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Selecting group leaders
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                    Choosing classroom activities
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Briefcase className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Business
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Team meeting ice breakers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Selecting meeting speakers
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Choosing lunch locations
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                    Giveaway winner selection
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                    <PartyPopper className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Entertainment
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Party game decisions
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Movie night selections
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Restaurant choices
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full flex-shrink-0"></div>
                    Truth or dare spinner
                  </li>
                </ul>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-border/50 bg-white/80 dark:bg-background/80 backdrop-blur-sm">
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                  <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Home className="w-6 h-6 sm:w-6.5 h-6.5 md:w-7 md:h-7 text-white" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold">
                    Family
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3 text-xs sm:text-sm md:text-sm text-muted-foreground">
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Chore assignment
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Deciding family activities
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Picking who goes first in games
                  </li>
                  <li className="flex items-center gap-2.5">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full flex-shrink-0"></div>
                    Settling friendly disputes
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* SEO Content Section - Updated Long-form Guide */}
        <section
          id="spin-wheel-seo-content"
          className="w-full px-4 lg:px-6 py-8 sm:py-10 md:py-12 bg-muted/10"
        >
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                Have you ever needed to make a quick decision but could not
                agree with your friends? Or maybe you are a teacher looking for
                a fun way to pick a student for a task? An online spin wheel
                might be exactly what you need. Making choices is a big part of
                our daily routine. From figuring out what to cook for dinner to
                selecting a winner for a big company contest, we face countless
                choices every single day.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-5 leading-relaxed">
                This is where a digital spinning wheel comes to the rescue. At
                onlinespinwheel.fun, we believe that making choices should be a
                fun and exciting experience rather than a boring task. Whether
                you want to run a giveaway, make classroom activities more
                exciting, or add fun to your decision-making, these digital
                spinners are incredibly useful.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
                As a professional software agency named Auroxa Tech, we
                specialize in web development and agentic AI web development. In
                this detailed guide, we walk through what our online spin wheel
                is, how to use it, and where it works best.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Quick Summary
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                An Online Spin Wheel is a free digital tool that helps you make
                random choices quickly and fairly. It is perfect for teachers
                using random name picker tools, businesses running social media
                giveaways, and friends deciding what to watch. Plus, as a web
                development agency, we can help businesses integrate these tools
                directly into their own applications.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Table of Contents
              </h2>
              <ol className="list-decimal list-inside space-y-1 text-sm sm:text-base text-muted-foreground mb-8">
                <li>Exploring the Online Spin Wheel</li>
                <li>Everything About Random Name Picker Tools</li>
                <li>Exciting Spin Wheel Games for Everyone</li>
                <li>Understanding Online Spin Wheel Decision Makers</li>
                <li>Essential Features and Common Mistakes</li>
                <li>Conclusion</li>
                <li>Frequently Asked Questions</li>
                <li>Meet the Team</li>
              </ol>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Exploring the Online Spin Wheel
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The concept of a spinning wheel has existed for a long time in
                game shows and board games. Today, the digital version is
                popular because it is easy to use. You can customize it with
                names, numbers, prizes, or choices, click spin, and let it land
                on one option.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                How to Use an Online Spin Wheel for Decision Making
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Gather your options, enter them into the wheel, and click spin.
                For example, if you are choosing a vacation city, list several
                cities and let the wheel decide. It removes stress and speeds up
                decision-making.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                How Does Our Random Algorithm Work?
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Many tools claim to be random without explaining how. Here is
                how onlinespinwheel.fun ensures fairness:
              </p>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 mt-4">
                Step 1: Seed Generation
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                We generate a random seed using crypto.getRandomValues() — the
                same cryptographically secure method browsers use for passwords.
                The seed comes from hardware entropy and is unpredictable.
              </p>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 mt-4">
                Step 2: Physics Simulation
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                The seed initializes wheel physics: velocity, friction, and
                deceleration. The wheel spins naturally and slows down like a
                physical wheel instead of jumping to a result.
              </p>
              <h4 className="text-base sm:text-lg md:text-xl font-semibold mb-2 mt-4">
                Step 3: Winner Determination
              </h4>
              <p className="text-sm sm:text-base text-muted-foreground mb-6 leading-relaxed">
                The engine calculates where the pointer stops based on momentum
                and segment angles. With equal segment sizes, every entry has
                the same probability.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Top Free Online Spin Wheel Tools
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                A great tool should load quickly, look clean, and be free to
                use. onlinespinwheel.fun focuses on speed, no installation,
                unlimited entries, and a smooth cross-device experience.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Benefits of Using a Spin Wheel Online
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                The biggest benefits are fairness, speed, and excitement. It
                removes favoritism, resolves debates quickly, and adds fun while
                waiting for a result.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Creating Custom Spin Wheels Online
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                You can personalize slices, labels, and visuals for classrooms,
                brands, and events. Customization helps match your activity
                style while keeping the process transparent.
              </p>

              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Best Practices for Online Spin Wheel Games
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Keep labels short and readable. Avoid too many slices; under 20
                entries usually gives the best visual and practical experience.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Everything About Random Name Picker Tools
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Random name pickers are useful in classrooms and businesses where
                fairness and transparency matter.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Top Random Name Picker Tool for Teachers
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Teachers can call on students fairly without repeating the same
                few names. This increases engagement because everyone knows they
                could be selected next.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                How to Use a Random Name Picker for Contests
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Paste participant names, spin live, and share the spin process
                for transparency. This helps build trust with your audience.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Features to Look for in a Name Picker Tool
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Look for save/reuse capability, remove-winner options, smooth
                animation, and clear winner states.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Creating a Fun Random Name Picker Game
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Convert quizzes and classroom activities into game-show style
                moments by spinning for prompts or participants.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Comparison of Random Name Picker Apps
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Browser-based tools avoid installs and updates, work across
                devices, and stay current automatically.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Exciting Spin Wheel Games for Everyone
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                Beyond decisions and winner picking, spin wheels are widely used
                for pure entertainment and engagement.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Popular Spin the Wheel Games for Parties
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Truth or Dare, karaoke selectors, and dance challenges are easy
                to set up and keep guests involved.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Creating a Spin Wheel Game for Students
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Use the wheel for classroom prompts, physical education
                activities, and review drills.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Variations of Spin the Wheel Games
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                You can run mystery-prize wheels, elimination rounds, and
                challenge-based formats with custom segments.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Benefits of Spin Wheel Games for Team Building
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                In remote or hybrid teams, shared spins during calls can improve
                participation, laughter, and team connection.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                DIY Spin Wheel Game Ideas
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Combine digital randomization with physical tasks, such as
                obstacle courses and challenge stations.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Understanding Online Spin Wheel Decision Makers
              </h2>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                How Spin Wheel Decision Makers Work
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                These tools combine secure randomness with physics simulation.
                Seed generation, momentum modeling, and segment-angle math
                determine results fairly.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Real Life Applications of Spin Wheel Decision Makers
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Families assign chores, couples pick restaurants, teachers run
                classroom activities, and creators choose prompts or winners.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Choosing the Right Online Spin Wheel for Decisions
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Choose tools with privacy clarity, transparent behavior, and
                reliable performance. onlinespinwheel.fun keeps calculations in
                browser and prioritizes simplicity.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Advantages of Using a Spin Wheel for Decisions
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                It reduces decision fatigue, saves time, and resolves disputes
                with a visible, neutral process.
              </p>
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4 mt-6">
                Integrating Spin Wheel Decision Makers with Apps
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Businesses can embed wheel mechanics into promotions, workflows,
                and AI-assisted tools to boost engagement.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Essential Features and Common Mistakes
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Great wheels support dark/light mode, flexible entry types, and
                smooth performance across devices.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Common mistakes include too many segments and unclear labels.
                Keep entries readable and test before live events.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Conclusion
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-8 leading-relaxed">
                Online spin wheels turn stressful decisions into fair, exciting
                outcomes for classrooms, parties, teams, and giveaways. At
                onlinespinwheel.fun, we provide this tool free while Auroxa Tech
                supports custom integrations for businesses needing tailored
                interactive experiences.
              </p>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4 mb-8">
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">What is an Online Spin Wheel?</h3>
                  <p className="text-muted-foreground">
                    Online Spin Wheel is a free tool to add names, numbers, or
                    choices and spin for a random result.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Is the result truly random?</h3>
                  <p className="text-muted-foreground">
                    Yes. Secure randomness and physics simulation ensure each
                    equal segment has the same chance.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Do I need an account?</h3>
                  <p className="text-muted-foreground">
                    No account is required. Open the site, add entries, and spin
                    immediately.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Can I use it on mobile?</h3>
                  <p className="text-muted-foreground">
                    Yes. The tool is optimized for desktop, tablets, and mobile
                    screens.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">How many names can I add?</h3>
                  <p className="text-muted-foreground">
                    The wheel supports large lists; keep practical readability in
                    mind for the best experience.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Can Auroxa Tech build a custom wheel for my business?</h3>
                  <p className="text-muted-foreground">
                    Yes. We provide custom web and agentic AI solutions,
                    including branded wheel integrations.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Is it safe for classroom use?</h3>
                  <p className="text-muted-foreground">
                    Yes. It works in browser without requiring personal accounts.
                  </p>
                </Card>
                <Card className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-lg font-bold mb-2">Can the same name be selected more than once?</h3>
                  <p className="text-muted-foreground">
                    Yes, unless you remove winners between spins.
                  </p>
                </Card>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-5 md:mb-6">
                Meet the Team
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-3 leading-relaxed">
                Online Spin Wheel is built by a focused team creating fast,
                intuitive, privacy-aware random decision tools.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground mb-2 leading-relaxed">
                Raja Jahangir, SEO Expert, ensures the platform remains
                user-centric and easy to discover for people seeking reliable
                spin wheel solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Internal Links Section - Critical for SEO Crawling */}
        <section className="w-full px-4 lg:px-6 py-10 sm:py-12 md:py-14 lg:py-16 bg-gradient-to-b from-muted/10 to-background">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Explore More
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground">
                Learn more about Online Spin Wheel and how we make decision-making fun
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Info className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  About Online Spin Wheel
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Discover our story, mission, and commitment to making choices
                  enjoyable. Learn how we're revolutionizing decision-making one
                  spin at a time.
                </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Learn More
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  Complete Spin Wheel Guide
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Master the art of using spin wheels for decision-making,
                  classroom activities, business applications, and more. Read
                  our comprehensive guide.
                </p>
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Read Guide
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>

              <Card className="p-5 sm:p-6 md:p-7 hover:shadow-lg transition-shadow">
                <div className="w-11 h-11 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center mb-3 sm:mb-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3">
                  Contact Our Team
                </h3>
                <p className="text-xs sm:text-sm md:text-sm text-muted-foreground mb-3 sm:mb-4 leading-relaxed">
                  Have questions, feedback, or suggestions? We'd love to hear
                  from you. Get in touch with our friendly support team today.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 sm:gap-2 text-sm sm:text-base text-primary hover:underline font-semibold"
                >
                  Contact Us
                  <span className="text-base sm:text-lg">→</span>
                </Link>
              </Card>
            </div>
          </div>
        </section>
      </article>
    </>
  );
};

export default Index;
