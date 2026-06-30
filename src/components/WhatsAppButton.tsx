import { Link, useLocation } from "react-router-dom";
import { Globe, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";

const WA_MESSAGES = {
  fr: "Bonjour%20Ayoub%2C%20je%20cherche%20un%20expert%20digital%20au%20Maroc.%20Pouvez-vous%20m%27aider%20%3F",
  ar: "%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20%D8%A3%D9%8A%D9%88%D8%A8%2C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%A7%D9%84%D8%A7%D8%B3%D8%AA%D9%81%D8%B3%D8%A7%D8%B1%20%D8%B9%D9%86%20%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%D9%83%20%D8%A7%D9%84%D8%B1%D9%82%D9%85%D9%8A%D8%A9",
};

export function WhatsAppButton() {
  const { locale, setLocale } = useI18n();
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  const waLink = `https://wa.me/${CONTACT.phoneClean}?text=${WA_MESSAGES[locale] ?? WA_MESSAGES.fr}`;
  const isAr = locale === "ar";

  return (
    <>
      {/* Desktop: floating buttons */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-center gap-3 md:flex">
        <button
          onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
          aria-label={isAr ? "تغيير اللغة" : "Changer la langue"}
          title={isAr ? "تغيير اللغة" : "Changer la langue"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">{isAr ? "عربي / Français" : "Français / عربي"}</span>
        </button>

        {/* Phone call button */}
        <a
          href={`tel:${CONTACT.phone}`}
          aria-label={isAr ? "اتصل بنا" : "Appeler"}
          title={isAr ? "اتصل بنا" : "Appeler"}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <Phone className="h-5 w-5" />
        </a>

        {/* WhatsApp button with pulse animation */}
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={isAr ? "تواصل معنا على واتساب" : "Contactez-nous sur WhatsApp"}
          title="WhatsApp"
          className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110 active:scale-95"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />
          <MessageCircle className="h-8 w-8" />
        </a>
      </div>

      {/* Mobile: sticky bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/96 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-2">
          {/* Lang toggle */}
          <button
            onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
            aria-label={isAr ? "تغيير اللغة" : "Changer la langue"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            <Globe className="h-5 w-5" />
          </button>

          {/* Phone */}
          <a
            href={`tel:${CONTACT.phone}`}
            aria-label={isAr ? "اتصل بنا" : "Appeler"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            <Phone className="h-5 w-5" />
          </a>

          {/* WhatsApp CTA */}
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-bold">
                {isAr ? "واتساب — رد سريع" : "WhatsApp — Réponse rapide"}
              </span>
              <span className="block truncate text-xs text-white/85">
                {isAr ? "عرض سعر مجاني خلال 24 ساعة" : "Devis gratuit sous 24h"}
              </span>
            </span>
            <MessageCircle className="ml-3 h-5 w-5 shrink-0" />
          </a>

          <Link
            to="/contact"
            className="hidden shrink-0 rounded-full border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground sm:inline-flex"
          >
            {isAr ? "تواصل" : "Devis"}
          </Link>
        </div>
      </div>
    </>
  );
}
