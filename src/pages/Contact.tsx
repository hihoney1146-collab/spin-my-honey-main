import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Building2,
  CheckCircle2,
  Clock,
  Loader2,
  Mail,
  MapPin,
  MessageSquare,
  Send,
} from "lucide-react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/lib/schema";
import { RAJA_AUTHOR } from "@/lib/teamAuthors";
import { useState } from "react";

const SITE_ORIGIN = "https://onlinespinwheel.fun";
const WEB3FORMS_ACCESS_KEY = "8d63b09d-3b24-4cf3-bce7-cf3595326c83";
const DEFAULT_SUBJECT = "New message from Online Spin Wheel contact form";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emptyForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
  botcheck: "",
};

const Contact = () => {
  const [formData, setFormData] = useState(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (status !== "idle") {
      setStatus("idle");
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const subject = formData.subject.trim() || DEFAULT_SUBJECT;
    const message = formData.message.trim();

    if (!name || !email || !message) {
      setStatus("error");
      setErrorMessage("Please fill in your name, email, and message.");
      return;
    }

    if (!EMAIL_PATTERN.test(email)) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address so we can reply.");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name,
          email,
          subject,
          message,
          botcheck: formData.botcheck,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormData(emptyForm);
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage(
          typeof result.message === "string" && result.message
            ? result.message
            : "We couldn't send your message. Please try again, or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setErrorMessage(
        "We couldn't send your message. Please check your connection and try again, or email us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Online Spin Wheel</title>
        <meta
          name="description"
          content="Contact Online Spin Wheel. Reach out for support, feedback, business inquiries, privacy questions, and advertising-related requests."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}/contact-us`} />
        <meta property="og:title" content="Contact Us | Online Spin Wheel" />
        <meta
          property="og:description"
          content="Contact Online Spin Wheel for support, feedback, business inquiries, privacy questions, and advertising-related requests."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${SITE_ORIGIN}/contact-us`} />
        <meta property="og:image" content={`${SITE_ORIGIN}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Online Spin Wheel",
            url: `${SITE_ORIGIN}/contact-us`,
            about: {
              "@type": "Person",
              name: "Raja Jahangir",
              url: RAJA_AUTHOR.url,
              email: CONTACT_EMAIL,
              jobTitle: "SEO/AEO/AIO/GEO/SXO Strategist, Online Spin Wheel",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Islamabad",
                addressCountry: "PK",
              },
            },
          })}
        </script>
      </Helmet>

      <section className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Get in Touch
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            We'd love to hear from you! Send us a message and we'll respond as
            soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {status === "success" && (
                <Alert className="border-primary/30 bg-primary/5">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  <AlertTitle>Message sent</AlertTitle>
                  <AlertDescription>
                    Thanks — we'll get back to you within 24–48 hours.
                  </AlertDescription>
                </Alert>
              )}

              {status === "error" && (
                <Alert variant="destructive">
                  <AlertTitle>Couldn't send your message</AlertTitle>
                  <AlertDescription>
                    {errorMessage} You can also email us at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="font-semibold underline underline-offset-2"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  aria-label="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  maxLength={100}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  aria-label="Your email address"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  maxLength={255}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  aria-label="Message subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What's this about? (optional)"
                  maxLength={150}
                  disabled={isSubmitting}
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  name="message"
                  aria-label="Your message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                  maxLength={1000}
                  disabled={isSubmitting}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={handleChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
                style={{ display: "none" }}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Send className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Email Us</h3>
                  <p className="text-muted-foreground mb-2">
                    For general inquiries, feedback, or support:
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-primary underline underline-offset-2 font-semibold"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Feedback</h3>
                  <p className="text-muted-foreground">
                    We're always looking to improve! Share your thoughts,
                    suggestions, or report any issues you encounter. Your
                    feedback helps us make Online Spin Wheel better for everyone.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4">Business Information</h3>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div className="flex items-start gap-3">
                  <Building2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Operator</p>
                    <p>
                      <Link to="/" className="text-primary underline underline-offset-2 font-medium">
                        Online Spin Wheel
                      </Link>{" "}
                      is operated by a small team dedicated solely to this website,
                      based in Islamabad, Pakistan and serving users worldwide.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Based in</p>
                    <p>
                      <strong className="text-foreground">Islamabad, Pakistan</strong>.
                      {" "}Serving users worldwide online.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Response time</p>
                    <p>Most support, privacy, and business emails receive a reply within 24-48 hours.</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-primary/5 border border-primary/20">
              <h3 className="font-semibold text-lg mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Be as specific as possible when reporting issues</li>
                <li>• Include your device type and browser if relevant</li>
                <li>• We typically respond within 24-48 hours</li>
                <li>
                  • Check our{" "}
                  <Link to="/#homepage-faq" className="text-primary underline underline-offset-2 font-medium">
                    FAQ section
                  </Link>{" "}
                  on the homepage before contacting us
                </li>
              </ul>
            </Card>
          </div>
        </div>

      </section>
    </>
  );
};

export default Contact;
