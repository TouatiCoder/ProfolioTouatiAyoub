import { Link } from "react-router-dom";
import { Globe, Search, Megaphone, ArrowRight, CheckCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/lib/i18n";

const services = [
  {
    icon: Globe,
    titleKey: "services.web.title",
    descKey: "services.web.desc",
    href: "/services/creation-site-web",
    features: ["Site vitrine", "E-commerce", "Application web", "Landing page", "Responsive design", "Maintenance"],
  },
  {
    icon: Search,
    titleKey: "services.seo.title",
    descKey: "services.seo.desc",
    href: "/services/referencement-seo",
    features: ["Audit SEO", "Optimisation on-page", "Netlinking", "Contenu SEO", "SEO local", "Reporting"],
  },
  {
    icon: Megaphone,
    titleKey: "services.marketing.title",
    descKey: "services.marketing.desc",
    href: "/services/marketing-digital",
    features: ["Réseaux sociaux", "Publicité Facebook/Google", "Email marketing", "Stratégie contenu", "Branding", "Analytics"],
  },
];

const Services = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {t("services.title")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container space-y-12">
          {services.map((service, i) => (
            <Card key={service.href} className="overflow-hidden border-border/50">
              <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                    <service.icon className="h-7 w-7 text-accent" />
                  </div>
                  <h2 className="mb-3 text-2xl font-bold">{t(service.titleKey)}</h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">{t(service.descKey)}</p>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">
                      {t("nav.quote")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div>
                  <ul className="grid grid-cols-2 gap-3">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default Services;
