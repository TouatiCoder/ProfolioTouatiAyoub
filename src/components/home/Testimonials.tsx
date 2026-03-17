import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Ahmed B.",
    company: "Restaurant Le Palais, Meknès",
    quote: "Grâce à leur travail sur notre site web et notre SEO, nous avons triplé nos réservations en ligne en 3 mois.",
    quoteAr: "بفضل عملهم على موقعنا وتحسين محركات البحث، ضاعفنا حجوزاتنا عبر الإنترنت ثلاث مرات في 3 أشهر.",
    rating: 5,
  },
  {
    name: "Fatima Z.",
    company: "Boutique Zellige, Fès",
    quote: "Une équipe professionnelle et à l'écoute. Notre boutique en ligne génère maintenant 60% de notre chiffre d'affaires.",
    quoteAr: "فريق محترف ومستمع. متجرنا الإلكتروني يولد الآن 60% من رقم أعمالنا.",
    rating: 5,
  },
  {
    name: "Youssef M.",
    company: "Cabinet Juridique, Meknès",
    quote: "Notre visibilité sur Google a été multipliée par 10. Le retour sur investissement est exceptionnel.",
    quoteAr: "تضاعفت ظهورنا على Google بعشر مرات. العائد على الاستثمار استثنائي.",
    rating: 5,
  },
];

export function Testimonials() {
  const { t, locale } = useI18n();

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("testimonials.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("testimonials.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star key={j} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="leading-relaxed text-foreground/80">
                      "{locale === "ar" ? item.quoteAr : item.quote}"
                    </p>
                  </div>
                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.company}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
