import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Menu,
  X,
  Home,
  Info,
  BookOpen,
  Mail,
  Shield,
  Lock,
} from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { OptimizedImage } from "./OptimizedImage";
import { SocialShare } from "./SocialShare";
import { ThemeToggle } from "./ThemeToggle";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: Home },
    { to: "/about", label: "About", icon: Info },
    { to: "/blog", label: "Blog", icon: BookOpen },
    { to: "/contact", label: "Contact", icon: Mail },
    { to: "/disclaimer", label: "Disclaimer", icon: Shield },
    { to: "/privacy", label: "Privacy", icon: Lock },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b bg-card/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-16 lg:h-17">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center group relative flex-shrink-0"
            >
              <div className="relative">
                <OptimizedImage
                  src={logo}
                  alt="Hi Honey Logo - Spin Wheel Decision Maker"
                  width={48}
                  height={48}
                  className="h-9 sm:h-10 md:h-11 lg:h-12 w-9 sm:w-10 md:w-11 lg:w-12 px-1 sm:px-1.5 transform group-hover:scale-110 transition-transform duration-300 object-contain"
                  loading="eager"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base sm:text-lg md:text-lg lg:text-xl xl:text-2xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                    Hi
                  </span>
                  <span className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    {" "}
                    Ho
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    ne
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    y
                  </span>
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1.5 xl:gap-3">
              {navLinks.map((link) => {
                const active = isActive(link.to);
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`
                      relative px-3 xl:px-4 py-2 rounded-lg font-medium text-sm xl:text-base
                      transition-all duration-300 ease-out
                      ${
                        active
                          ? "text-primary bg-primary/10 shadow-sm"
                          : "text-foreground/70 hover:text-primary hover:bg-primary/5"
                      }
                      whitespace-nowrap
                    `}
                  >
                    <span>{link.label}</span>
                    {active && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full" />
                    )}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 ml-2">
                <ThemeToggle />
                <SocialShare />
              </div>
            </div>

            {/* Mobile Actions - Theme Toggle & Menu */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative h-10 w-10 hover:bg-primary/10"
                  >
                    <Menu className="h-5 w-5 sm:h-6 sm:w-6 transition-transform" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[85vw] max-w-[340px] sm:w-[340px] flex flex-col"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <OptimizedImage
                        src={logo}
                        alt="Hi Honey Logo"
                        width={32}
                        height={32}
                        className="h-8 w-8"
                        loading="eager"
                      />
                      <span className="font-bold">
                        <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                          Hi
                        </span>
                        <span className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                          {" "}
                          Ho
                        </span>
                        <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                          ne
                        </span>
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                          y
                        </span>
                      </span>
                    </SheetTitle>
                  </SheetHeader>

                  {/* Navigation Links */}
                  <div className="flex flex-col gap-2 mt-8">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      const active = isActive(link.to);
                      return (
                        <Link
                          key={link.to}
                          to={link.to}
                          onClick={() => setMobileMenuOpen(false)}
                          className={`
                          flex items-center gap-3 px-4 py-3 rounded-lg
                          transition-all duration-200
                          ${
                            active
                              ? "bg-primary/10 text-primary font-semibold border-l-4 border-primary"
                              : "text-foreground/70 hover:bg-primary/5 hover:text-primary border-l-4 border-transparent"
                          }
                        `}
                        >
                          <Icon className="h-5 w-5 flex-shrink-0" />
                          <span className="text-base">{link.label}</span>
                        </Link>
                      );
                    })}
                  </div>

                  {/* Contact Info - Bottom */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <p className="text-xs text-center text-muted-foreground mb-1">
                        Need help? Contact us
                      </p>
                      <a
                        href="mailto:hihoney1146@gmail.com"
                        className="text-sm font-semibold text-primary hover:underline block text-center"
                      >
                        hihoney1146@gmail.com
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="relative border-t bg-card/95 backdrop-blur-md mt-auto">
        {/* Decorative line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 via-primary to-primary/50" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10 py-8 sm:py-12 md:py-16">
            {/* Brand Section */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link
                to="/"
                className="inline-flex items-center gap-2 mb-4 group"
              >
                <OptimizedImage
                  src={logo}
                  alt="Hi Honey - Free Spin Wheel Tool"
                  width={40}
                  height={40}
                  className="h-10 w-10 transform group-hover:scale-110 transition-transform duration-300"
                />
                <span className="font-bold text-xl">
                  <span className="bg-gradient-to-r from-orange-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
                    Hi
                  </span>
                  <span className="bg-gradient-to-r from-green-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                    {" "}
                    Ho
                  </span>
                  <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
                    ne
                  </span>
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                    y
                  </span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                Making Decisions Fun, One Spin at a Time. The ultimate spin
                wheel tool for random, fair, and exciting choices.
              </p>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">
                  Online & Ready to Spin
                </span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                <Home className="h-4 w-4 text-primary" />
                Quick Links
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/", label: "Home" },
                  { to: "/about", label: "About Us" },
                  { to: "/blog", label: "Blog" },
                  { to: "/contact", label: "Contact" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Legal
              </h3>
              <ul className="space-y-3">
                {[
                  { to: "/privacy", label: "Privacy Policy" },
                  { to: "/cookie-policy", label: "Cookie Policy" },
                  { to: "/terms", label: "Terms & Conditions" },
                  { to: "/disclaimer", label: "Disclaimer" },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 inline-flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-px bg-primary transition-all duration-300" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                Get in Touch
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/5 rounded-lg border border-primary/20 hover:border-primary/40 transition-all duration-300 group">
                  <p className="text-xs text-muted-foreground mb-2">
                    Email us at:
                  </p>
                  <a
                    href="mailto:hihoney1146@gmail.com"
                    className="text-sm font-semibold text-primary hover:underline flex items-center gap-2 group-hover:gap-3 transition-all duration-300"
                  >
                    <Mail className="h-4 w-4 flex-shrink-0" />
                    <span className="break-all">hihoney1146@gmail.com</span>
                  </a>
                </div>
                <p className="text-xs text-muted-foreground italic">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-border/50 py-4 sm:py-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-muted-foreground">
                © {new Date().getFullYear()} Hi Honey. All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Decorative background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none" />
      </footer>
    </div>
  );
};
