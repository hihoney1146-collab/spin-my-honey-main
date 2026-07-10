import { Link } from "react-router-dom";
import { ABDAL_AUTHOR } from "@/lib/teamAuthors";
import { TEAM_LINKEDIN } from "@/lib/teamLinks";
import { ORG_NAME, CONTACT_EMAIL } from "@/lib/schema";
import { AuthorProfilePage } from "@/components/AuthorProfilePage";

const AuthorAbdalKhalid = () => (
  <AuthorProfilePage
    canonical={ABDAL_AUTHOR.url}
    title="Abdal Khalid — Social Media Expert, Online Spin Wheel"
    metaDescription="Abdal Khalid is Social Media Expert at Online Spin Wheel. He manages brand social channels, community engagement, and how we share wheel tips with teachers and creators."
    ogDescription="Meet Abdal Khalid, Social Media Expert at Online Spin Wheel — growing community around fair, free spin wheels."
    name={ABDAL_AUTHOR.name}
    roleLabel="Team"
    jobTitle={ABDAL_AUTHOR.jobTitle}
    initials="AK"
    linkedIn={TEAM_LINKEDIN.abdalKhalid}
  >
    <p>
      I&apos;m Abdal Khalid, Social Media Expert at{" "}
      <Link to="/" className="font-medium text-primary underline underline-offset-2 hover:opacity-90">
        {ORG_NAME}
      </Link>
      . I work with{" "}
      <Link to="/author/armghana-zeeshan" className="font-medium text-primary underline underline-offset-2">
        Armghana Zeeshan
      </Link>
      ,{" "}
      <Link to="/author/zoha-zeeshan" className="font-medium text-primary underline underline-offset-2">
        Zoha Zeeshan
      </Link>
      , and{" "}
      <Link to="/author/raja-jahangir" className="font-medium text-primary underline underline-offset-2">
        Raja Jahangir
      </Link>{" "}
      on a small team dedicated solely to this product — helping teachers, streamers, and everyday
      users discover free spin wheels that are fast, fair, and honest about how they pick.
    </p>
    <p>
      My role is to grow and serve the community around Online Spin Wheel on the channels where
      hosts and educators already spend time. That means sharing practical wheel tips, highlighting
      new specialty wheels, and responding to questions about giveaways, classroom games, and fair
      random picks — always pointing people to the live tool and our guides rather than hype.
    </p>
    <p>
      Social content here follows the same standards as the rest of the site. I do not overpromise
      what the wheels do, I link to{" "}
      <Link to="/how-randomness-works" className="font-medium text-primary underline underline-offset-2">
        how randomness works
      </Link>{" "}
      when fairness comes up, and I coordinate with Raja on published copy so posts match what the
      product actually ships.
    </p>
    <p>
      You will find Online Spin Wheel on{" "}
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
      </a>
      . Ideas for posts, collaborations, or community features? Email{" "}
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

export default AuthorAbdalKhalid;
