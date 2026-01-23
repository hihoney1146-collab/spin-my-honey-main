import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, Mail, ArrowLeft, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Online Spin Wheel</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Online Spin Wheel homepage to use our spin wheel tool."
        />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/20 px-4 py-12">
        <Card className="max-w-2xl w-full p-8 md:p-12 text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
              <Search className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Oops! Page Not Found
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              The page you're looking for doesn't exist or has been moved. Let's
              get you back on track!
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <Link to="/">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                <Home className="w-5 h-5" />
                Go to Homepage
              </Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <Link to="/about" className="text-left">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">About Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn about our mission
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/blog" className="text-left">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Search className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Spin Wheel Guide</h3>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use our tool
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/contact" className="text-left">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Contact Us</h3>
                    <p className="text-sm text-muted-foreground">
                      Get help from our team
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/" className="text-left">
              <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer h-full">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ArrowLeft className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Try Spin Wheel</h3>
                    <p className="text-sm text-muted-foreground">
                      Start spinning now
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </div>

          <p className="text-sm text-muted-foreground">
            If you believe this is an error, please{" "}
            <Link to="/contact" className="text-primary hover:underline">
              contact us
            </Link>
            .
          </p>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
