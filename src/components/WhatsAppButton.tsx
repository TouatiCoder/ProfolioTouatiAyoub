import { Link, useLocation } from "react-router-dom";
import { Globe, MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";

export function WhatsAppButton() {
  const { locale, setLocale } = useI18n();
  const location = useLocation();

  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-center gap-3 md:flex">
        <button
          onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
          aria-label="Changer la langue"
          className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <Globe className="h-6 w-6" />
        </button>
        <a
          href={CONTACT.whatsappMessage}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contactez-nous sur WhatsApp"
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
        >
          <MessageCircle className="h-7 w-7" />
        </a>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/96 px-4 pb-[calc(env(safe-area-inset-bottom)+0.75rem)] pt-3 shadow-2xl backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <button
            onClick={() => setLocale(locale === "fr" ? "ar" : "fr")}
            aria-label="Changer la langue"
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-border bg-card text-foreground"
          >
            <Globe className="h-5 w-5" />
          </button>

          <a
            href={CONTACT.whatsappMessage}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-[#25D366] px-5 py-3 text-white shadow-lg"
          >
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold">WhatsApp prioritaire</span>
              <span className="block truncate text-xs text-white/85">Reponse rapide pour les projets en cours</span>
            </span>
            <MessageCircle className="ml-3 h-5 w-5 shrink-0" />
          </a>

          <Link
            to="/contact"
            className="hidden rounded-full border border-border bg-card px-4 py-3 text-sm font-medium text-foreground sm:inline-flex"
          >
            Devis
          </Link>
        </div>
      </div>
    </>
  );
}
