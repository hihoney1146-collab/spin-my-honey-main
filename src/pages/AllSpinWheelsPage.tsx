import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getAllWheelRecords } from "@/lib/wheelPages";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";
import { ArrowLeft } from "lucide-react";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

function groupWheelsByCategory(
  wheels: ReturnType<typeof getAllWheelRecords>,
): { category: string; wheels: ReturnType<typeof getAllWheelRecords> }[] {
  const map = new Map<string, ReturnType<typeof getAllWheelRecords>>();
  for (const w of wheels) {
    const cat = w.category?.trim() || "Other";
    const list = map.get(cat) ?? [];
    list.push(w);
    map.set(cat, list);
  }
  return [...map.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([category, items]) => ({
      category,
      wheels: items.sort((x, y) => x.title.localeCompare(y.title)),
    }));
}

const AllSpinWheelsPage = () => {
  const wheels = getAllWheelRecords();
  const grouped = groupWheelsByCategory(wheels);
  const categories = grouped.map((g) => g.category);

  return (
    <>
      <Helmet>
        <title>All specialty spin wheels | Online Spin Wheel</title>
        <meta
          name="description"
          content="Browse every free specialty spin wheel on Online Spin Wheel, decision wheels, classroom pickers, party games, yes/no tools, and more. Open any wheel and spin in your browser."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}/all-spin-wheels`} />
        <meta property="og:title" content="All specialty spin wheels | Online Spin Wheel" />
        <meta
          property="og:description"
          content="Browse every free specialty spin wheel, decision wheels, pickers, games, and more."
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

        <Card className="p-5 md:p-6 mb-8 border-primary/20 bg-primary/5">
          <h2 className="text-lg font-bold mb-3">Popular money pages</h2>
          <p className="text-sm text-muted-foreground mb-4">
            High-intent tools for raffles, prizes, classrooms, and name-picker
            comparisons:
          </p>
          <ul className="grid sm:grid-cols-2 gap-2 text-sm">
            <li>
              <Link to="/raffle-wheel" className="text-primary font-medium hover:underline">
                Raffle wheel — ticket numbers &amp; proof links
              </Link>
            </li>
            <li>
              <Link to="/prize-wheel" className="text-primary font-medium hover:underline">
                Prize wheel — labeled giveaway slices
              </Link>
            </li>
            <li>
              <Link to="/classroom-spinner" className="text-primary font-medium hover:underline">
                Classroom spinner — teacher hub
              </Link>
            </li>
            <li>
              <Link to="/wheel-of-names-alternative" className="text-primary font-medium hover:underline">
                Wheel of names alternative — honest comparison
              </Link>
            </li>
          </ul>
        </Card>

        <div className="prose prose-neutral dark:prose-invert max-w-none mb-8 space-y-4 text-muted-foreground">
          <p>
            Not sure where to start? Use the{" "}
            <Link to="/" className="text-primary hover:underline font-medium">
              main spin wheel
            </Link>{" "}
            for a blank slate, or jump to a specialty wheel when you already know the
            format, classroom name picker, yes/no decision, random number, party game, or
            team icebreaker.
          </p>
          <p>
            Specialty wheels are grouped by category below.
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
            For deeper guides, fair giveaways, classroom pickers, Secret Santa, and
            meeting icebreakers, see our{" "}
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

        <div className="space-y-8">
          <h2 className="text-lg font-semibold text-foreground">
            Full directory ({wheels.length} wheels by category)
          </h2>
          {grouped.map(({ category, wheels: categoryWheels }) => (
            <Card key={category} className="p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold mb-3 text-foreground border-b border-border/60 pb-2">
                {category}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({categoryWheels.length})
                </span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {categoryWheels.map((w) => (
                  <li key={w.slug}>
                    <Link
                      to={`/${w.slug}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2 group py-1"
                    >
                      <span className="group-hover:underline">{w.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </article>
    </>
  );
};

export default AllSpinWheelsPage;
