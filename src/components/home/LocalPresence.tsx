import { MapPin, Globe2, MessageCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";

// Coordinates and place URL as provided — deliberately no opening hours,
// review count/rating, or business category rendered here: none of that is
// verifiable from this repo, and the project's own rule is to never fabricate
// or infer Google Business Profile data that can't be confirmed.
const MAPS_PLACE_URL = "https://www.google.com/maps/place/Developpeur+Ayoub/@33.8600158,-5.5693032,902m/";
const MAPS_EMBED_SRC = "https://www.google.com/maps?q=33.8600158,-5.5693032&z=14&output=embed";

export function LocalPresence() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2">
          <div>
            <span className="badge-teal mb-3 inline-block">{isAr ? "الموقع" : "Localisation"}</span>
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? "مطوّر ويب مقره مكناس، المغرب" : "Développeur web basé à Meknès, Maroc"}
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {isAr
                ? "أعمل من مكناس وأتنقّل عند الحاجة إلى مدن أخرى بالمغرب للاجتماعات المهمة."
                : "Je travaille depuis Meknès et je me déplace si besoin vers d'autres villes du Maroc pour les réunions importantes."}
            </p>

            <div className="mt-6 space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground">{CONTACT.location}</span>
              </div>
              <div className="flex items-start gap-3">
                <Globe2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm text-foreground">
                  {isAr
                    ? "أعمل أيضًا عن بُعد مع عملاء في المغرب والخارج."
                    : "Je travaille également à distance avec des clients au Maroc et à l'international."}
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={MAPS_PLACE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <MapPin className="h-4 w-4" />
                {isAr ? "فتح في خرائط Google" : "Ouvrir dans Google Maps"}
              </a>
              <a
                href={CONTACT.whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
              >
                <MessageCircle className="h-4 w-4" />
                {isAr ? "تواصل عبر واتساب" : "Contacter sur WhatsApp"}
              </a>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border/50 shadow-sm">
            <iframe
              src={MAPS_EMBED_SRC}
              title={isAr ? "موقع مطور ويب مستقل في مكناس" : "Localisation — développeur web freelance à Meknès"}
              width="100%"
              height="360"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
