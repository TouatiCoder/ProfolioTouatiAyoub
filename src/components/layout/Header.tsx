import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, X } from "lucide-react";
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
  const { t, locale, setLocale, dir } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = useCallback(() => {
    setMobileOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setMobileOpen(false);
  }, []);

  const switchLocale = useCallback(() => {
    setLocale(locale === "fr" ? "ar" : "fr");
  }, [locale, setLocale]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  const isAr = locale === "ar";

  return (
    <header
      dir={dir}
      className={cn(
        "sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl transition-all duration-300 ease-out",
        scrolled && "border-border/80 shadow-sm shadow-black/5"
      )}
    >
      <div className="container flex h-16 items-center justify-between transition-all duration-300 md:h-[4.25rem]">
        <Link to="/" className="flex items-center gap-2 transition-transform duration-300 hover:opacity-90">
          <img
            src="/logo.png"
            alt={t("nav.logoAlt")}
            className={cn(
              "w-auto object-contain transition-all duration-300 ease-out",
              scrolled
                ? "h-12 sm:h-14 md:h-16 lg:h-18 scale-90"
                : "h-14 sm:h-16 md:h-20 lg:h-24 scale-100"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = link.href === "/"
              ? location.pathname === link.href
              : location.pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-accent/10 text-accent shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Button
            variant="ghost"
            size="sm"
            onClick={switchLocale}
            className="gap-1.5 rounded-full"
            aria-label={t("nav.language")}
          >
            <Globe className="h-4 w-4" />
            {isAr ? "Français" : "العربية"}
          </Button>
          <Button asChild size="sm" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">{t("nav.quote")}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full p-2 transition-colors duration-200 hover:bg-muted md:hidden"
          onClick={toggleMenu}
          aria-label={mobileOpen ? t("nav.close") : t("nav.menu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/95 transition-all duration-300 ease-out md:hidden",
          mobileOpen ? "max-h-[24rem] translate-y-0 opacity-100" : "max-h-0 -translate-y-2 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="container px-4 py-4">
          <nav className={cn("flex flex-col gap-1", isAr ? "items-end text-right" : "items-start text-left")}>
            {navLinks.map((link) => {
              const isActive = link.href === "/"
                ? location.pathname === link.href
                : location.pathname.startsWith(link.href);

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "w-full rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-muted text-accent"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  {t(link.key)}
                </Link>
              );
            })}
          </nav>

          <div className={cn("mt-4 flex items-center gap-2", isAr ? "justify-end" : "justify-start")}>
            <Button
              variant="outline"
              size="sm"
              onClick={switchLocale}
              className="gap-1.5 rounded-full"
              aria-label={t("nav.language")}
            >
              <Globe className="h-4 w-4" />
              {isAr ? "Français" : "العربية"}
            </Button>
            <Button asChild size="sm" className="flex-1 rounded-full bg-accent text-accent-foreground">
              <Link to="/contact" onClick={closeMenu}>
                {t("nav.quote")}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
