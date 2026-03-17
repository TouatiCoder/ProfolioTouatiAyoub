import { Link } from "react-router-dom";
import { Globe, Search, Megaphone, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    href: "/services/creation-site-web",
  },
  {
    icon: Search,
    titleKey: "services.seo.title",
    descKey: "services.seo.desc",
    href: "/services/referencement-seo",
  },
  {
    icon: Megaphone,
    titleKey: "services.marketing.title",
    descKey: "services.marketing.desc",
    href: "/services/marketing-digital",
  },
];

export function ServicesGrid() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("services.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("services.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Card className="group relative overflow-hidden border-border/50 bg-card transition-all hover:shadow-gold hover:border-accent/30">
                <CardContent className="p-8">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{t(service.titleKey)}</h3>
                  <p className="mb-6 text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
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
          ))}
        </div>
      </div>
    </section>
  );
}
