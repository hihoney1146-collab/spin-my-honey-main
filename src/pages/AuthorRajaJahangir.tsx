import { Link } from "react-router-dom";
import jahangirSeo from "@/assets/Jahangir-SEO.jpeg";
import { RAJA_AUTHOR, ARMGHANA_AUTHOR, ZOHA_AUTHOR } from "@/lib/teamAuthors";
import { TEAM_LINKEDIN, SITE_SOCIAL_LINKS } from "@/lib/teamLinks";
import { ORG_NAME, CONTACT_EMAIL } from "@/lib/schema";
import { AuthorProfilePage } from "@/components/AuthorProfilePage";

const AuthorRajaJahangir = () => {
  const location = `${RAJA_AUTHOR.locality}, ${RAJA_AUTHOR.country}`;

  return (
    <AuthorProfilePage
      canonical={RAJA_AUTHOR.url}
      title="Raja Jahangir, Content & SEO Lead, Online Spin Wheel"
      metaDescription="Raja Jahangir leads content, SEO, and quality review for Online Spin Wheel. Learn how the team tests every wheel for fair, uniform random results."
      ogDescription="Meet Raja Jahangir, Content & SEO Lead at Online Spin Wheel, content, SEO, and 10,000-spin fairness checks."
      name={RAJA_AUTHOR.name}
      roleLabel="Content & SEO"
      jobTitle={RAJA_AUTHOR.jobTitle}
      location={location}
      image={{
        src: jahangirSeo,
        alt: "Raja Jahangir, Content & SEO Lead at Online Spin Wheel",
      }}
      linkedIn={TEAM_LINKEDIN.rajaJahangir}
      ogImage={RAJA_AUTHOR.image}
      showBrandSocial
      brandSocialLinks={SITE_SOCIAL_LINKS}
      extraSections={
        <section className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-foreground">How I work on the team</h2>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>Write and review wheel pages, guides, and blog posts for accuracy and clarity.</li>
            <li>
              Test each wheel for uniform distribution across 10,000 automated spins before launch.
            </li>
            <li>
              Use cryptographically secure randomness and keep processing on the user&apos;s device.
            </li>
            <li>
              Maintain server-rendered, structured content so pages stay accessible to crawlers and
              screen readers.
            </li>
            <li>Refresh visible last-updated dates when published content changes.</li>
          </ul>
        </section>
      }
    >
      <p>
        I&apos;m Raja Jahangir, Content &amp; SEO Lead at{" "}
        <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
          {ORG_NAME}
        </Link>
        . I work with{" "}
        <Link to={ARMGHANA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
          Armghana Zeeshan
        </Link>{" "}
        and{" "}
        <Link to={ZOHA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
          Zoha Zeeshan
        </Link>{" "}
        on a small team dedicated solely to this product, free spin wheels that are fast, honest, and
        privacy-respecting for teachers, creators, and small businesses worldwide.
      </p>
      <p>
        I own the words on the site: specialty wheel copy, comparison guides, blog posts, and the SEO
        structure that helps people find the right tool. Before a page ships, I check that it answers
        a real use case, links to the live wheel, and does not overpromise what the software does.
      </p>
      <p>
        Fairness is measured, not assumed. Before any wheel goes live, I run automated checks across
        10,000 spins to confirm each equal-sized segment wins at the same rate. Randomness comes from
        the browser&apos;s secure generator, not a simple predictable formula, and entries you type
        stay on your device. I document that mechanism on the{" "}
        <Link to="/how-randomness-works" className="font-medium text-primary underline underline-offset-2">
          how randomness works
        </Link>{" "}
        page and in our{" "}
        <Link to="/spin-wheel-fairness-study" className="font-medium text-primary underline underline-offset-2">
          fairness study
        </Link>
        .
      </p>
      <p>
        When I update a tool page or guide, I refresh its visible last-updated date so you always know
        how current the instructions are. Editorial corrections and bug reports go to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
          {CONTACT_EMAIL}
        </a>, include the page URL and what you expected versus what happened.
      </p>
    </AuthorProfilePage>
  );
};

export default AuthorRajaJahangir;
