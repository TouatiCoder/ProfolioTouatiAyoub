import { useCallback, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Globe, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

const navLinks = [
  { key: "nav.home", href: "/" },
  { key: "nav.about", href: "/a-propos" },
  { key: "nav.services", href: "/services" },
  { key: "nav.portfolio", href: "/realisations" },
  { key: "nav.technologies", href: "/#stack" },
  { key: "nav.blog", href: "/blog" },
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
  }, [location.pathname, location.hash, closeMenu]);

  useEffect(() => {
    if (!location.hash) return;

    window.requestAnimationFrame(() => {
      document.querySelector(location.hash)?.scrollIntoView({ block: "start", behavior: "smooth" });
    });
  }, [location.hash]);

  const isAr = locale === "ar";

  const isActive = (href: string) => {
    if (href.includes("#")) {
      return location.pathname === "/" && location.hash === href.slice(href.indexOf("#"));
    }

    return href === "/" ? location.pathname === "/" && !location.hash : location.pathname.startsWith(href);
  };

  return (
    <header
      dir={dir}
      className={cn(
        "sticky top-0 z-50 border-b border-border/70 bg-white/95 transition-shadow duration-200",
        scrolled && "shadow-sm shadow-zinc-950/5",
      )}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Ayoub Touati">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-accent/20 bg-accent/10 text-sm font-bold text-accent">
            AT
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-foreground">
              Ayoub Touati
            </span>
            <span className="hidden text-xs font-medium text-muted-foreground sm:block">
              Full-Stack / Cloud Developer
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t("nav.menu")}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "rounded-sm px-3 py-2 text-sm font-medium transition-colors duration-150",
                isActive(link.href)
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
            onClick={switchLocale}
            className="rounded-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={t("nav.language")}
          >
            <Globe className="h-4 w-4" />
            {isAr ? "Français" : "العربية"}
          </Button>
          <Button asChild size="sm" className="rounded-sm bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">
              {t("nav.quote")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border bg-white transition-colors duration-150 hover:bg-muted lg:hidden"
          onClick={toggleMenu}
          aria-label={mobileOpen ? t("nav.close") : t("nav.menu")}
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={cn(
          "overflow-hidden border-t border-border bg-white transition-all duration-200 lg:hidden",
          mobileOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0",
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="container py-4">
          <nav className={cn("flex flex-col gap-1", isAr ? "items-end text-right" : "items-start text-left")}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={closeMenu}
                className={cn(
                  "w-full rounded-sm px-3 py-2.5 text-sm font-medium transition-colors duration-150",
                  isActive(link.href)
                    ? "bg-accent/10 text-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {t(link.key)}
              </Link>
            ))}
          </nav>

          <div className={cn("mt-4 flex items-center gap-2", isAr ? "justify-end" : "justify-start")}>
            <Button
              variant="outline"
              size="sm"
              onClick={switchLocale}
              className="rounded-sm"
              aria-label={t("nav.language")}
            >
              <Globe className="h-4 w-4" />
              {isAr ? "Français" : "العربية"}
            </Button>
            <Button asChild size="sm" className="flex-1 rounded-sm bg-accent text-accent-foreground">
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
