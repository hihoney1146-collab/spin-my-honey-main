import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User } from "lucide-react";
import { BLOG_INDEX_PATH } from "@/lib/siteInternalLinks";
import { getAllBlogPosts } from "@/data/blogPosts";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

const BlogIndex = () => {
  const posts = getAllBlogPosts();
  const canonical = `${SITE_ORIGIN}${BLOG_INDEX_PATH}`;

  return (
    <>
      <Helmet>
        <title>Blog | Online Spin Wheel</title>
        <meta
          name="description"
          content="Tips and guides for random name pickers, classroom spin wheels, office icebreakers, couples' dinner decisions, and virtual Secret Santa—fair decisions made fun."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content="Blog | Online Spin Wheel" />
        <meta
          property="og:description"
          content="Fair picks, classroom ideas, team icebreakers, date-night spins, and holiday gifting—all with spin wheels."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <article className="container mx-auto px-4 py-8 md:py-12 max-w-5xl">
        <header className="text-center mb-10 md:mb-14">
          <p className="text-sm font-medium text-primary mb-2">Blog</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Guides & ideas
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Practical articles on fair random selection, classrooms, teams, couples, and
            celebrations—powered by Online Spin Wheel.
          </p>
        </header>

        <ul className="space-y-6 md:space-y-8 list-none p-0 m-0">
          {posts.map((post) => (
            <li key={post.slug}>
              <Card className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors">
                <Link
                  to={`${BLOG_INDEX_PATH}/${post.slug}`}
                  className="block p-6 md:p-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors leading-snug">
                        {post.title.split("|")[0].trim()}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5">
                          <User className="h-4 w-4 shrink-0 text-primary/80" />
                          {post.author}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <Calendar className="h-4 w-4 shrink-0 text-primary/80" />
                          Last updated{" "}
                          {new Date(post.updated + "T12:00:00").toLocaleDateString(undefined, {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-2 text-primary font-semibold shrink-0 md:mt-1">
                      Read article
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </article>
    </>
  );
};

export default BlogIndex;
