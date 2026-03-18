import { MessageCircle, Globe } from "lucide-react";
import { CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";

export function WhatsAppButton() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
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
  );
}
