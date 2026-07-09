import { Helmet } from "react-helmet";
import { Link, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { decodeResultId, RESULT_METHOD } from "@/lib/resultProof";
import { SITE_ORIGIN } from "@/lib/schema";
import { ShieldCheck, Home } from "lucide-react";

function formatUtc(isoMs: number): string {
  return new Date(isoMs).toISOString().replace("T", " ").replace(/\.\d{3}Z$/, " UTC");
}

const ResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const proof = id ? decodeResultId(id) : null;
  const canonical = `${SITE_ORIGIN}/result/${id ?? ""}`;

  const title = proof
    ? `Verified spin result — ${proof.w.join(", ")} | Online Spin Wheel`
    : "Spin result verification | Online Spin Wheel";

  const description = proof
    ? `${proof.w.length} winner(s) from ${proof.n} entries. Drawn ${formatUtc(proof.t)} using ${RESULT_METHOD}.`
    : "This proof link is invalid or expired.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonical} />
      </Helmet>

      <article className="container mx-auto px-4 py-10 md:py-14 max-w-xl">
        {!proof ? (
          <Card className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-3">Invalid proof link</h1>
            <p className="text-muted-foreground mb-6">
              This verification URL could not be read. Ask the host to generate a new proof link
              after their spin.
            </p>
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to home
              </Link>
            </Button>
          </Card>
        ) : (
          <>
            <div className="flex items-center gap-2 text-primary mb-4">
              <ShieldCheck className="h-6 w-6" />
              <p className="text-sm font-semibold uppercase tracking-wide">
                Verified spin result
              </p>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-6">Spin proof record</h1>

            <Card className="p-6 md:p-8 space-y-5 border-primary/25 bg-primary/5">
              <dl className="space-y-4 m-0">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Winner(s)</dt>
                  <dd className="text-xl font-bold mt-1">
                    {proof.w.map((name) => (
                      <div key={name}>{name}</div>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Entries in pool</dt>
                  <dd className="text-lg font-semibold mt-1">{proof.n}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Drawn (UTC)</dt>
                  <dd className="text-lg font-semibold mt-1">{formatUtc(proof.t)}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Randomness method</dt>
                  <dd className="text-lg font-semibold mt-1">
                    {proof.m === "crypto-rng"
                      ? "Cryptographic RNG (crypto.getRandomValues)"
                      : proof.m}
                  </dd>
                </div>
                {proof.s && proof.s !== "legacy" ? (
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">Wheel</dt>
                    <dd className="mt-1">
                      <Link
                        to={`/${proof.s}`}
                        className="text-primary font-medium hover:underline"
                      >
                        /{proof.s}
                      </Link>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </Card>

            <p className="text-sm text-muted-foreground mt-6 leading-relaxed">
              This page is a read-only record encoded in the link itself — no account or database
              lookup. Hosts share it on Instagram, TikTok, or email so entrants can verify the draw
              was fair.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {proof.s && proof.s !== "legacy" ? (
                <Button asChild variant="default">
                  <Link to={`/${proof.s}`}>Open wheel</Link>
                </Button>
              ) : null}
              <Button asChild variant="outline">
                <Link to="/">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Link>
              </Button>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default ResultPage;
