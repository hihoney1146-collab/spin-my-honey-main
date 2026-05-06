import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { getAllWheelRecords } from "@/lib/wheelPages";
import { ArrowLeft } from "lucide-react";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

const AllSpinWheelsPage = () => {
  const wheels = getAllWheelRecords();

  return (
    <>
      <Helmet>
        <title>All specialty spin wheels | Online Spin Wheel</title>
        <meta
          name="description"
          content="Browse every free specialty spin wheel on Online Spin Wheel—decision wheels, pickers, games, and more. Open any wheel and spin in your browser."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}/all-spin-wheels`} />
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
        <p className="text-lg text-muted-foreground mb-8 max-w-3xl">
          Pick a wheel below. Each page includes a ready-to-spin wheel, how to use it, and FAQs.
        </p>

        <Card className="p-4 md:p-6">
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
