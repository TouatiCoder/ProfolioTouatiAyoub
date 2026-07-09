import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { usePublicTestimonials } from "@/hooks/usePublicTestimonials";

export function Testimonials() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { items } = usePublicTestimonials(3);

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr ? "نتائج حقيقية يشاركها عملائي" : "Développeur web freelance recommandé par de vrais clients au Maroc"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isAr
              ? "شهادات مختصرة من مشاريع ركزت على السرعة والظهور المحلي وتحسين التواصل عبر واتساب."
              : "Des preuves sociales courtes, crédibles et orientées conversion pour rassurer avant le premier contact."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item, index) => (
            <motion.div
              key={`${item.client_name}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Card className="h-full border-border/50">
                <CardContent className="flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, ratingIndex) => (
                        <Star key={ratingIndex} className="h-4 w-4 fill-accent text-accent" />
                      ))}
                    </div>

                    <p className="leading-relaxed text-foreground/80">
                      "{isAr ? item.quote_ar || item.quote : item.quote}"
                    </p>
                  </div>

                  <div className="mt-6 border-t border-border pt-4">
                    <p className="font-semibold text-foreground">{item.client_name}</p>
                    <p className="text-sm text-muted-foreground">
                      {isAr ? item.company_ar || item.company : item.company}
                    </p>
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
