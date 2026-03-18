import { Link } from "react-router-dom";
import { Globe, Search, Megaphone, Video, Mail, ArrowRight, CheckCircle, RefreshCw, Target, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { services as seoServices, CONTACT } from "@/lib/seo-data";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";

const iconMap: Record<string, any> = { Globe, Search, Megaphone, Video, Mail, RefreshCw, Target, Zap };

const Services = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <Layout>
      <Breadcrumb items={[{ label: t("nav.services") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "خدماتنا الرقمية في المغرب" : "Services Digitaux au Maroc"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            {t("services.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container space-y-12">
          {seoServices.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            const features = isAr ? service.featuresAr : service.features;
            return (
              <Card key={service.slug} className="overflow-hidden border-border/50">
                <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
                  <div>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h2 className="mb-3 text-2xl font-bold">{isAr ? service.nameAr : service.name}</h2>
                    <p className="mb-2 text-muted-foreground leading-relaxed">{isAr ? service.shortDescAr : service.shortDesc}</p>
                    <p className="mb-6 text-sm font-semibold text-accent">{isAr ? `من ${service.pricingFrom}` : `À partir de ${service.pricingFrom}`}</p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/contact">
                          {t("nav.quote")} <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to={`/services/${service.slug}`}>
                          {t("services.cta")}
                        </Link>
                      </Button>
                    </div>
                  </div>
                  <div>
                    <ul className="grid grid-cols-2 gap-3">
                      {features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Internal links to blog */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">{isAr ? "مقالات ذات صلة" : "Articles connexes"}</h2>
          <div className="flex flex-wrap gap-2">
            <Link to="/blog" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">
              {isAr ? "جميع المقالات" : "Tous les articles"} →
            </Link>
            <Link to="/agence-digitale-maroc" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
              {isAr ? "وكالة رقمية في المغرب" : "Agence Digitale Maroc"}
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Services;
