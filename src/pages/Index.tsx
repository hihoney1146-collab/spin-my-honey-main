import { SpinWheel } from "@/components/SpinWheel";
import { WheelDirectory } from "@/components/WheelDirectory";
import { Card } from "@/components/ui/card";
import {
  ListPlus,
  Play,
  Trophy,
  GraduationCap,
  Gift,
  Users,
  UtensilsCrossed,
  Gamepad2,
  ShieldCheck,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { ORGANIZATION_ID } from "@/lib/schema";
import { getAllBlogPosts } from "@/data/blogPosts";
import { useStreamerMode } from "@/lib/useStreamerMode";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";

const FEATURED_BLOG_SLUGS = [
  "random-name-picker-fair-fun-easy",
  "best-icebreaker-games-office-meetings",
  "virtual-secret-santa-online",
] as const;

const HOME_FAQS: { question: string; answer: string }[] = [
  {
    question: "What is the maximum number of entries I can add?",
    answer:
      "There is no hard limit. You can paste hundreds of names at once (up to 400 lines per paste) and the wheel resizes every segment automatically. For readability, keep it under about 20 visible slices; larger lists still pick fairly.",
  },
  {
    question: "Can I save a wheel to reuse later?",
    answer:
      "Yes. Your entries are stored in your browser's local storage, so the same names are waiting the next time you open the page on that device. Use Reset to bring back the sample names, or Clear all to start fresh.",
  },
  {
    question: "Can I share my wheel or the result?",
    answer:
      "Yes. Use Copy link above the wheel to bookmark your exact entries in the link (no account). After a giveaway spin on the winner picker, raffle, or name picker wheels, tap Get proof link for a verifiable result page you can paste on Instagram or TikTok.",
  },
  {
    question: "What is streamer mode?",
    answer:
      "Streamer mode switches the page to a solid chroma-key background (green, blue, or magenta by default — or pick any color) and hides the site header, footer, and marketing sections so OBS or Streamlabs can key out everything except the wheel. Turn it on with the toggle above any wheel, choose a background color, then use Copy link to share that stream-ready setup.",
  },
  {
    question: "Does it work on mobile phones and tablets?",
    answer:
      "Yes. The wheel is fully responsive and touch-friendly — just tap the wheel to spin — with no app to install. It runs in any modern browser on phones, tablets, laptops, and classroom smartboards.",
  },
  {
    question: "How do I remove a winner so they aren't picked again?",
    answer:
      "After a spin, the winner dialog has a Remove Winner button that deletes that entry from the wheel. You can also delete any entry manually in the list, which is ideal for multi-round draws.",
  },
  {
    question: "Is the wheel really random?",
    answer:
      "Yes. Each spin uses the browser's secure random number generator — the same kind of randomness used for encryption — and the pointer lands based on segment size, so every equal-sized entry has exactly the same chance. Spins are independent, so past results never affect the next one.",
  },
];

const HOW_TO_STEPS: {
  icon: typeof ListPlus;
  title: string;
  text: string;
}[] = [
  {
    icon: ListPlus,
    title: "Add your entries",
    text: "Type or paste names, numbers, or choices into the panel beside the wheel — one per line, up to 400 at a time.",
  },
  {
    icon: Play,
    title: "Spin it",
    text: "Click \u201CSpin the Wheel\u201D or tap the wheel itself, then watch it slow down until the red pointer settles on one segment.",
  },
  {
    icon: Trophy,
    title: "Use the winner",
    text: "Read the highlighted result, then remove that entry for a multi-round draw or spin again to pick another.",
  },
];

const USE_CASES: {
  icon: typeof GraduationCap;
  title: string;
  body: ReactNode;
}[] = [
  {
    icon: Gift,
    title: "Giveaways & raffles",
    body: (
      <>
        Run ticket-number draws with proof links on the{" "}
        <Link to="/raffle-wheel" className="text-primary hover:underline font-medium">
          raffle wheel
        </Link>{" "}
        or paste @handles on the{" "}
        <Link to="/winner-picker-wheel" className="text-primary hover:underline font-medium">
          winner picker wheel
        </Link>
        .
      </>
    ),
  },
  {
    icon: GraduationCap,
    title: "Teachers & classrooms",
    body: (
      <>
        Open the{" "}
        <Link to="/classroom-spinner" className="text-primary hover:underline font-medium">
          classroom spinner
        </Link>{" "}
        for student picking, teams, and a timer — or use the{" "}
        <Link to="/random-student-picker" className="text-primary hover:underline font-medium">
          random student picker
        </Link>
        .
      </>
    ),
  },
  {
    icon: Trophy,
    title: "Prize & promo spins",
    body: (
      <>
        Label slices for store giveaways and stream rewards with the{" "}
        <Link to="/prize-wheel" className="text-primary hover:underline font-medium">
          prize wheel
        </Link>
        .
      </>
    ),
  },
  {
    icon: Users,
    title: "Teams & meetings",
    body: (
      <>
        Assign tasks, pick a presenter, or split people into squads with the{" "}
        <Link to="/team-generator-wheel" className="text-primary hover:underline font-medium">
          team generator wheel
        </Link>
        .
      </>
    ),
  },
  {
    icon: UtensilsCrossed,
    title: "Food & movie nights",
    body: (
      <>
        Settle &ldquo;where do we eat?&rdquo; and &ldquo;what do we watch?&rdquo; with the{" "}
        <Link to="/dinner-picker-wheel" className="text-primary hover:underline font-medium">
          dinner picker wheel
        </Link>{" "}
        and{" "}
        <Link to="/movie-picker-wheel" className="text-primary hover:underline font-medium">
          movie picker wheel
        </Link>
        .
      </>
    ),
  },
  {
    icon: Gamepad2,
    title: "Name picker comparisons",
    body: (
      <>
        Evaluating WheelOfNames-style tools? Read our{" "}
        <Link to="/wheel-of-names-alternative" className="text-primary hover:underline font-medium">
          wheel of names alternative
        </Link>{" "}
        comparison or spin the{" "}
        <Link to="/random-name-picker-wheel" className="text-primary hover:underline font-medium">
          random name picker
        </Link>
        .
      </>
    ),
  },
];

const Index = () => {
  const { streamerMode } = useStreamerMode();
  const featuredPosts = FEATURED_BLOG_SLUGS.map((slug) =>
    getAllBlogPosts().find((p) => p.slug === slug),
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <Helmet>
        <title>
          Spin the Wheel - Free Online Spin Wheel &amp; Random Name Picker
        </title>
        <meta
          name="description"
          content="Spin the wheel for a fair, random pick. Add names, numbers, or choices and let crypto-grade randomness decide — no signup, works on any phone, tablet, or computer."
        />
        <link rel="canonical" href="https://onlinespinwheel.fun/" />

        <meta property="og:title" content="Spin the Wheel - Free Online Spin Wheel & Random Picker" />
        <meta
          property="og:description"
          content="Free online spin wheel and random picker. Add names or numbers, spin, and get a fair result powered by crypto-grade randomness. No signup, works on any device."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://onlinespinwheel.fun/" />
        <meta property="og:image" content="https://onlinespinwheel.fun/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Online Spin Wheel — free random picker" />
        <meta property="og:site_name" content="Online Spin Wheel" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Spin the Wheel - Free Online Spin Wheel & Random Picker" />
        <meta
          name="twitter:description"
          content="Free online spin wheel and random picker. Add names or numbers, spin, and get a fair result. No signup, works on any device."
        />
        <meta name="twitter:image" content="https://onlinespinwheel.fun/og-image.png" />
        <meta name="twitter:site" content="@OnlineSpinWheel" />
        <meta name="twitter:creator" content="@OnlineSpinWheel" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Online Spin Wheel",
            description:
              "Free online spin wheel and random picker for names, numbers, prizes, classrooms, teams, and fair decisions. Results use secure browser randomness and work on any device with no signup.",
            url: "https://onlinespinwheel.fun/",
            applicationCategory: "UtilityApplication",
            operatingSystem: "Web Browser",
            isAccessibleForFree: true,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            publisher: {
              "@id": ORGANIZATION_ID,
            },
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
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to spin the wheel",
            description:
              "Add your entries, spin the online wheel, and use the randomly selected winner.",
            step: [
              {
                "@type": "HowToStep",
                position: 1,
                name: "Add your entries",
                text: "Type or paste names, numbers, or choices into the panel beside the wheel, one per line, up to 400 at a time.",
                url: "https://onlinespinwheel.fun/#how-to-spin",
              },
              {
                "@type": "HowToStep",
                position: 2,
                name: "Spin it",
                text: "Click Spin the Wheel or tap the wheel, then watch it slow down until the red pointer settles on one segment.",
                url: "https://onlinespinwheel.fun/#how-to-spin",
              },
              {
                "@type": "HowToStep",
                position: 3,
                name: "Use the winner",
                text: "Read the highlighted result, then remove that entry for a multi-round draw or spin again to pick another.",
                url: "https://onlinespinwheel.fun/#how-to-spin",
              },
            ],
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: HOME_FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          })}
        </script>
      </Helmet>

      <article>
        {/* Hero Section — interactive wheel (unchanged) */}
        <section
          id="spin-wheel"
          className={`w-full pt-2 sm:pt-3 md:pt-4 lg:pt-5 pb-4 sm:pb-6 md:pb-8 lg:pb-10 relative ${
            streamerMode ? "" : "bg-gradient-to-b from-background to-muted/20"
          }`}
          itemScope
          itemType="https://schema.org/WebPageElement"
        >
          <SpinWheel />
        </section>

        {!streamerMode ? (
          <>
        {/* H1 + direct-answer paragraph */}
        <section
          id="intro-answer"
          className="w-full px-4 sm:px-6 lg:px-8 pt-2 pb-6 sm:pb-8"
        >
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Spin the Wheel — Free Online Spin Wheel &amp; Random Picker
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Online Spin Wheel is a free random picker: add names, numbers, or
              choices, then spin to get one fair result. It chooses winners with
              the same secure randomness browsers use for encryption, so every
              entry has an equal chance. No signup or install — it works instantly
              on phones, tablets, and computers.
            </p>
          </div>
        </section>

        {/* How to spin the wheel */}
        <section
          id="how-to-spin"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 bg-muted/30"
        >
          <div className="max-w-5xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
              How to spin the wheel
                </h2>
            <div className="grid gap-6 lg:grid-cols-2 items-center">
              <ol className="space-y-4 sm:space-y-5">
                {HOW_TO_STEPS.map((step, i) => (
                  <li key={step.title} className="flex gap-3 items-start">
                    <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold mb-1">
                        {i + 1}. {step.title}
                      </h3>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {step.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
              <figure className="m-0">
                <img
                  src="/spin-wheel-preview.svg"
                  width={640}
                  height={640}
                  loading="lazy"
                  alt="The Online Spin Wheel showing seven colored name segments, a white SPIN hub, and a red pointer on the right"
                  className="w-full max-w-sm mx-auto h-auto rounded-2xl border-2 border-border/50 shadow-lg"
                />
                <figcaption className="mt-2 text-center text-xs text-muted-foreground">
                  The wheel with its default sample names — tap it to spin.
                </figcaption>
              </figure>
                  </div>
          </div>
        </section>

        {/* What people use this wheel for */}
        <section
          id="use-cases"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14"
        >
          <div className="max-w-6xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
              What people use this wheel for
              </h2>
            <div className="grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {USE_CASES.map((uc) => (
                <Card key={uc.title} className="p-5 sm:p-6 border-2 border-border/50 h-full">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-3">
                    <uc.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-2">
                    {uc.title}
              </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {uc.body}
                  </p>
                </Card>
              ))}
              </div>
          </div>
        </section>

        {/* Why our results are fair */}
        <section
          id="why-fair"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14 bg-muted/30"
        >
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4 sm:mb-5 justify-center">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <ShieldCheck className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Why our results are fair
              </h2>
            </div>
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
              Every spin starts with a fresh random value from the browser&apos;s
              secure generator — the same kind of randomness used for encryption
              keys, not a simple predictable formula. That value sets the
              wheel&apos;s speed and friction, and where the pointer stops depends
              purely on each segment&apos;s size, so equal-sized slices give every
              entry identical odds. Spins are also independent: the wheel has no
              memory, so a name that just won is exactly as likely to win again next
              time. It all runs on your device — your entries never touch our
              servers. Learn more about{" "}
              <Link to="/how-randomness-works" className="text-primary hover:underline font-medium">
                how randomness works
              </Link>
              .
            </p>
          </div>
        </section>

        {featuredPosts.length > 0 && (
          <section
            id="featured-blog-posts"
            className="w-full px-4 lg:px-6 py-8 sm:py-10 bg-background border-t border-border/40"
          >
            <div className="max-w-4xl mx-auto">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">
                From our blog
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-6">
                Guides for fair picks, team icebreakers, and seasonal giveaways.
              </p>
              <ul className="grid gap-4 sm:grid-cols-1 md:grid-cols-3">
                {featuredPosts.map((post) => (
                  <li key={post.slug}>
                    <Card className="p-5 h-full border-2 border-border/50 hover:border-primary/40 transition-colors">
                      <Link
                        to={`${BLOG_INDEX_PATH}/${post.slug}`}
                        className="block group"
                      >
                        <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {post.title.replace(/\s*\|\s*Online Spin Wheel\s*$/i, "")}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <span className="inline-block mt-3 text-sm font-medium text-primary group-hover:underline">
                          Read article →
                        </span>
                      </Link>
                    </Card>
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm text-muted-foreground">
                <Link to={BLOG_INDEX_PATH} className="text-primary hover:underline font-medium">
                  View all blog posts
                </Link>
              </p>
            </div>
          </section>
        )}

        {/* Popular spin wheels — curated grid */}
        <WheelDirectory />

        {/* FAQ */}
        <section
          id="homepage-faq"
          className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-14"
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-6 sm:mb-8 text-center">
              Frequently asked questions
            </h2>
            <div className="space-y-4">
              {HOME_FAQS.map((faq) => (
                <Card key={faq.question} className="p-5 sm:p-6 border-2 border-border/50">
                  <h3 className="text-base sm:text-lg font-bold mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>
          </>
        ) : null}
      </article>
    </>
  );
};

export default Index;
