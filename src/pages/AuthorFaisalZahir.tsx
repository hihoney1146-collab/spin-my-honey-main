import { Link } from "react-router-dom";
import {
  FAISAL_AUTHOR,
  ARMGHANA_AUTHOR,
  ZOHA_AUTHOR,
  RAJA_AUTHOR,
} from "@/lib/teamAuthors";
import { TEAM_LINKEDIN, SITE_SOCIAL_LINKS } from "@/lib/teamLinks";
import { ORG_NAME, CONTACT_EMAIL } from "@/lib/schema";
import { AuthorProfilePage } from "@/components/AuthorProfilePage";

const AuthorFaisalZahir = () => (
  <AuthorProfilePage
    canonical={FAISAL_AUTHOR.url}
    title="Faisal Zahir, Digital Marketing | Performance Marketing | Meta Ads, Online Spin Wheel"
    metaDescription="Faisal Zahir handles digital and performance marketing for Online Spin Wheel, connecting teachers, giveaway hosts, and streamers with free fair spin wheels."
    ogDescription="Meet Faisal Zahir, Digital Marketing at Online Spin Wheel, reaching teachers, creators, and hosts through performance marketing and Meta Ads."
    name={FAISAL_AUTHOR.name}
    roleLabel="Marketing"
    jobTitle={FAISAL_AUTHOR.jobTitle}
    initials="FZ"
    linkedIn={TEAM_LINKEDIN.faisalZahir}
    showBrandSocial
    brandSocialLinks={SITE_SOCIAL_LINKS}
    extraSections={
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4 text-foreground">What I focus on</h2>
        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
          <li>
            Performance marketing that sends the right audience to the right specialty wheel or guide.
          </li>
          <li>
            Meta Ads campaigns that highlight free tools for classrooms, giveaways, and live streams.
          </li>
          <li>
            Landing paths that match what the page actually offers, no inflated claims about randomness
            or features.
          </li>
          <li>
            Coordinating launch timing with content and product so ads go live when pages are tested
            and accurate.
          </li>
          <li>
            Listening for audience feedback from ad traffic that should reach product and content teams.
          </li>
        </ul>
      </section>
    }
  >
    <p>
      I&apos;m Faisal Zahir, Digital Marketing | Performance Marketing | Meta Ads at{" "}
      <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
        {ORG_NAME}
      </Link>
      . I work with{" "}
      <Link to={ARMGHANA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Armghana Zeeshan
      </Link>
      ,{" "}
      <Link to={ZOHA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Zoha Zeeshan
      </Link>
      , and{" "}
      <Link to={RAJA_AUTHOR.path} className="font-medium text-primary underline underline-offset-2">
        Raja Jahangir
      </Link>{" "}
      on a small team dedicated solely to this product. My job is to help the right people find our
      free spin wheels: teachers running classroom picks, hosts running giveaways, and streamers who
      need a fair on-screen randomizer without logins or installs.
    </p>
    <p>
      Performance marketing here means matching intent to the live tool. Someone searching for a
      classroom spinner should land on the student picker or name picker wheel, not a generic homepage
      pitch. Someone planning an Instagram giveaway should see the winner picker and proof-link flow
      the product actually ships. I build Meta Ads and other paid paths that respect that match, and
      I measure whether traffic stays because the page delivers what the ad promised.
    </p>
    <p>
      Marketing claims follow the same bar as the rest of the site. I do not advertise features the
      wheels lack, and when fairness or privacy comes up I point to{" "}
      <Link to="/how-randomness-works" className="font-medium text-primary underline underline-offset-2">
        how randomness works
      </Link>{" "}
      and our guides on the{" "}
      <Link to="/blog" className="font-medium text-primary underline underline-offset-2">
        blog
      </Link>
      . I coordinate with Raja so ad copy aligns with reviewed page text, and with product on which
      specialty wheels are ready to promote after testing.
    </p>
    <p>
      Organic discovery still matters alongside paid reach. Brand profiles on{" "}
      <a
        href="https://www.instagram.com/onlinespinwheel/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        Instagram
      </a>
      ,{" "}
      <a
        href="https://x.com/onlinespinwheel"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        X
      </a>
      ,{" "}
      <a
        href="https://www.youtube.com/@OnlineSpinWheel"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        YouTube
      </a>
      , and{" "}
      <a
        href="https://www.pinterest.com/onlinespinwheel/"
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-primary underline underline-offset-2"
      >
        Pinterest
      </a>{" "}
      share practical wheel tips and new tool announcements. Questions about partnerships, campaigns,
      or audience ideas? Email{" "}
      <a href={`mailto:${CONTACT_EMAIL}`} className="font-medium text-primary underline underline-offset-2">
        {CONTACT_EMAIL}
      </a>{" "}
      or connect on LinkedIn. Read more on our{" "}
      <Link to="/about-us" className="font-medium text-primary underline underline-offset-2">
        About us
      </Link>{" "}
      page.
    </p>
  </AuthorProfilePage>
);

export default AuthorFaisalZahir;
