import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.services", href: "/services" },
  { key: "nav.portfolio", href: "/realisations" },
  { key: "nav.blog", href: "/blog" },
  { key: "nav.about", href: "/a-propos" },
  { key: "nav.contact", href: "/contact" },
];

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/favicon.ico" alt="Ayoub Touati" className="h-9 w-9" />
          <span className="text-lg font-bold text-foreground">
            Ayoub<span className="text-accent">Touati</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-muted hover:text-foreground",
                location.pathname === link.href
                  ? "text-accent"
                  : "text-muted-foreground"
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
            className="gap-1.5"
          >
            <Globe className="h-4 w-4" />
            {locale === "fr" ? "العربية" : "Français"}
          </Button>
          <Button asChild size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">{t("nav.quote")}</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  location.pathname === link.href
                    ? "bg-muted text-accent"
                    : "text-muted-foreground hover:bg-muted"
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
              className="gap-1.5"
            >
              <Globe className="h-4 w-4" />
              {locale === "fr" ? "العربية" : "Français"}
            </Button>
            <Button asChild size="sm" className="flex-1 bg-accent text-accent-foreground">
              <Link to="/contact" onClick={() => setMobileOpen(false)}>
                {t("nav.quote")}
              </Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
