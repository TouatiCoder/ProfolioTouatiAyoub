import { Link } from "react-router-dom";
import { Globe, Search, Megaphone, Video, Mail, ArrowRight, RefreshCw, Target, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const serviceItems = [
  { icon: Globe, titleKey: "services.web.title", descKey: "services.web.desc", href: "/services/creation-site-web" },
  { icon: Search, titleKey: "services.seo.title", descKey: "services.seo.desc", href: "/services/referencement-seo" },
  { icon: Megaphone, titleKey: "services.marketing.title", descKey: "services.marketing.desc", href: "/services/marketing-digital" },
  { icon: Video, titleKey: "services.video.title", descKey: "services.video.desc", href: "/services/montage-video" },
  { icon: Mail, titleKey: "services.email.title", descKey: "services.email.desc", href: "/services/email-marketing" },
  { icon: RefreshCw, titleFr: "Refonte de Site Web", titleAr: "إعادة تصميم المواقع", descFr: "Modernisez votre site existant pour plus de performance, de conversions et de visibilité.", descAr: "حدّث موقعك الحالي لمزيد من الأداء والتحويلات والظهور.", href: "/services/refonte-site-web" },
  { icon: Target, titleFr: "Publicité Réseaux Sociaux", titleAr: "إعلانات التواصل الاجتماعي", descFr: "Campagnes Facebook, Instagram et TikTok Ads qui génèrent des leads qualifiés.", descAr: "حملات Facebook و Instagram و TikTok Ads التي تولد عملاء محتملين مؤهلين.", href: "/services/publicite-reseaux-sociaux" },
  { icon: Zap, titleFr: "Google Ads", titleAr: "إعلانات Google", descFr: "Captez les clients au moment exact où ils recherchent vos services sur Google.", descAr: "اجذب العملاء في اللحظة التي يبحثون فيها عن خدماتك على Google.", href: "/services/google-ads" },
];

export function ServicesGrid() {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("services.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {serviceItems.map((service, i) => {
            const title = (service as any).titleKey ? t((service as any).titleKey) : (isAr ? (service as any).titleAr : (service as any).titleFr);
            const desc = (service as any).descKey ? t((service as any).descKey) : (isAr ? (service as any).descAr : (service as any).descFr);

            return (
              <motion.div
                key={service.href}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <Card className="group relative overflow-hidden border-border/50 bg-card transition-all hover:shadow-gold hover:border-accent/30 h-full">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                      <service.icon className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="mb-2 text-lg font-bold">{title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    <Link
                      to={service.href}
                      className="inline-flex items-center text-sm font-semibold text-accent transition-colors hover:text-accent/80"
                    >
                      {t("services.cta")}
                      <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
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
