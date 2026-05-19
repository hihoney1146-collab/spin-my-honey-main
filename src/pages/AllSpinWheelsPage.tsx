import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getAllWheelRecords } from "@/lib/wheelPages";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";
import { ArrowLeft } from "lucide-react";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

const AllSpinWheelsPage = () => {
  const wheels = getAllWheelRecords();
  const categories = [...new Set(wheels.map((w) => w.category).filter(Boolean))];

  return (
    <>
      <Helmet>
        <title>All specialty spin wheels | Online Spin Wheel</title>
        <meta
          name="description"
          content="Browse every free specialty spin wheel on Online Spin Wheel—decision wheels, classroom pickers, party games, yes/no tools, and more. Open any wheel and spin in your browser."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}/all-spin-wheels`} />
        <meta property="og:title" content="All specialty spin wheels | Online Spin Wheel" />
        <meta
          property="og:description"
          content="Browse every free specialty spin wheel—decision wheels, pickers, games, and more."
        />
        <meta property="og:url" content={`${SITE_ORIGIN}/all-spin-wheels`} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <nav className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </nav>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          All specialty spin wheels
        </h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-3xl">
          Every page below is a ready-to-use spin wheel with preset options, how-to
          steps, and FAQs. Pick the tool that matches your situation, then customize
          entries if you need to.
        </p>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 space-y-4 text-muted-foreground">
          <p>
            Not sure where to start? Use the{" "}
            <Link to="/" className="text-primary hover:underline font-medium">
              main spin wheel
            </Link>{" "}
            for a blank slate, or jump to a specialty wheel when you already know the
            format—classroom name picker, yes/no decision, random number, party game, or
            team icebreaker.
          </p>
          <p>
            Specialty wheels are grouped by category when it helps you compare options.
            {categories.length > 0 ? (
              <>
                {" "}
                We currently highlight themes such as{" "}
                {categories.slice(0, 5).join(", ")}
                {categories.length > 5 ? ", and more" : ""}.
              </>
            ) : null}{" "}
            Each wheel runs in your browser; your list stays on your device unless you
            choose to share results yourself.
          </p>
          <p>
            For deeper guides—fair giveaways, classroom pickers, Secret Santa, and
            meeting icebreakers—see our{" "}
            <Link to={BLOG_INDEX_PATH} className="text-primary hover:underline font-medium">
              blog
            </Link>
            . If you embed a wheel on another site, use our{" "}
            <Link to="/embed" className="text-primary hover:underline font-medium">
              embed widget
            </Link>{" "}
            (widget pages are not indexed as main content).
          </p>
          <h2 className="text-xl font-semibold text-foreground mt-6 mb-2">
            How to choose the right wheel
          </h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong className="text-foreground">Names or people:</strong> look for
              classroom, team, or giveaway pickers.
            </li>
            <li>
              <strong className="text-foreground">Yes or no decisions:</strong> use a
              two-option or decision wheel instead of a long name list.
            </li>
            <li>
              <strong className="text-foreground">Numbers or ranges:</strong> pick a
              random number wheel when you need digits, not labels.
            </li>
            <li>
              <strong className="text-foreground">Parties and games:</strong> browse
              party and family wheels for chores, prizes, or turn order.
            </li>
          </ul>
        </div>

        <Card className="p-4 md:p-6">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Full directory ({wheels.length} wheels)
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
            {wheels.map((w) => (
              <li key={w.slug}>
                <Link
                  to={`/${w.slug}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group py-1"
                >
                  <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300" />
                  <span className="font-medium text-foreground group-hover:text-primary">
                    {w.keywordPrimary || w.h1}
                  </span>
                  {w.category ? (
                    <span className="text-xs text-muted-foreground/80 shrink-0">
                      ({w.category})
                    </span>
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </Card>
      </article>
    </>
  );
};

export default AllSpinWheelsPage;
