import { Link } from "react-router-dom";
import {
  ArrowRight,
  Globe,
  RefreshCw,
  Search,
  Video,
} from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { usePublicServices } from "@/hooks/usePublicServices";
import { useState } from "react";
import { api } from "@/lib/api";

const iconMap = {
  Globe,
  Search,
  Video,
  RefreshCw,
};

// خيارات الصور الافتراضية لكل خدمة
const defaultServiceImages: Record<string, string> = {
  "creation-site-web": "/images/services/web-development.jpg",
  "referencement-seo": "/images/services/seo.jpg",
  "montage-video": "/images/services/video-editing.jpg",
  "refonte-site-web": "/images/services/website-redesign.jpg",
};

export function ServicesGrid() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { items } = usePublicServices({ featured: true, limit: 8 });
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr
              ? "خدماتنا لتحويل الزيارات إلى عملاء في المغرب"
              : "creation site web Maroc, WordPress developer Morocco et SEO freelancer Maroc"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isAr
              ? "من صفحات الهبوط إلى السيو المحلي والإعلانات، نركب لك مساراً عملياً يرفع الطلبات ويقصر وقت اتخاذ القرار."
              : "Chaque offre est pensee pour convertir plus vite, renforcer la confiance et donner une presence rentable a votre business au Maroc."}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {items.map((service, index) => {
            const Icon = iconMap[(service.icon as keyof typeof iconMap) ?? "Globe"] ?? Globe;
            const title = isAr ? service.name_ar || service.name : service.name;
            const description = isAr ? service.short_description_ar || service.short_description : service.short_description;
            const imageSrc = service.imageUrl || service.image
              ? api.asset(service.imageUrl ?? service.image)
              : defaultServiceImages[service.slug];

            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
              >
                <Card className="group h-full overflow-hidden border-border/50 bg-card transition-all hover:border-accent/30 hover:shadow-gold">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                        <Icon className="h-6 w-6 text-accent" />
                      </div>
                      {service.badge && (
                        <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                          {service.badge}
                        </span>
                      )}
                    </div>

                    {/* صورة الخدمة */}
                    {imageSrc && !imageErrors[service.slug] && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={imageSrc}
                          alt={title}
                          className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={() => setImageErrors(prev => ({ ...prev, [service.slug]: true }))}
                        />
                      </div>
                    )}

                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{description}</p>

                    <div className="mt-auto space-y-4">
                      <p className="text-sm font-semibold text-accent">
                        {isAr
                          ? "الأسعار عند الطلب — اتصل بي للحصول على عرض سعر مخصص"
                          : "Prix sur demande — Contactez-moi pour un devis personnalisé"}
                      </p>

                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                      >
                        {isAr ? "اكتشف الخدمة" : service.cta_label || "Voir le detail"}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
