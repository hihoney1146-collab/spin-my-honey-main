import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Building2, Clock, Mail, MapPin, MessageSquare, Send } from "lucide-react";
import { Helmet } from "react-helmet";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

const SITE_ORIGIN = "https://onlinespinwheel.fun";

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name must be less than 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Please enter a valid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  message: z
    .string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = contactSchema.parse(formData);

      // Using Web3Forms for unlimited free email sending
      const formDataToSend = new FormData();
      formDataToSend.append(
        "access_key",
        "30f8123a-facc-4a22-85ac-60d581a98949"
      ); // Get your key from web3forms.com
      formDataToSend.append("subject", `Contact from ${validated.name}`);
      formDataToSend.append("name", validated.name);
      formDataToSend.append("email", validated.email);
      formDataToSend.append("message", validated.message);
      formDataToSend.append("to", "onlinespinwheel@gmail.com");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast.error(firstError.message);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
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
          content="Contact Online Spin Wheel, operated by Auroxa Tech. Reach our team for support, feedback, business inquiries, privacy questions, and advertising-related requests."
        />
        <link rel="canonical" href={`${SITE_ORIGIN}/contact-us`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Online Spin Wheel",
            url: `${SITE_ORIGIN}/contact-us`,
            about: {
              "@type": "Organization",
              name: "Online Spin Wheel",
              legalName: "Auroxa Tech",
              url: SITE_ORIGIN,
              email: "onlinespinwheel@gmail.com",
              areaServed: "Worldwide",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Rawalpindi",
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  type="text"
                  aria-label="Your name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Your name"
                  required
                  maxLength={100}
                />
              </div>

              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  aria-label="Your email address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="your.email@example.com"
                  required
                  maxLength={255}
                />
              </div>

              <div>
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  aria-label="Your message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Tell us what's on your mind..."
                  rows={6}
                  required
                  maxLength={1000}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-4 w-4" />
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
                    href="mailto:onlinespinwheel@gmail.com"
                    className="text-primary hover:underline font-semibold"
                  >
                    onlinespinwheel@gmail.com
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
                    <p>Online Spin Wheel is operated by Auroxa Tech.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-foreground">Operational base</p>
                    <p>Rawalpindi, Pakistan. We serve users worldwide online.</p>
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
                <li>• Check our FAQ section before contacting us</li>
              </ul>
            </Card>
          </div>
        </div>

      </section>
    </>
  );
};

export default Contact;
