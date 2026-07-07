import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  RefreshCw,
  Search,
  Video,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { services as seoServices } from "@/lib/seo-data";
import { api } from "@/lib/api";
import { usePublicServices } from "@/hooks/usePublicServices";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead, buildBreadcrumbSchema, buildServiceSchema } from "@/components/SEOHead";

const iconMap: Record<string, typeof Globe> = {
  Globe,
  Search,
  Video,
  RefreshCw,
};

const Services = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const { items: publicServices } = usePublicServices();
  const serviceImages = new Map(publicServices.map((service) => [service.slug, service.imageUrl ?? service.image]));

  return (
    <Layout>
      <SEOHead
        title={isAr ? "خدمات رقمية في المغرب" : "Services création site web Maroc | SEO freelancer Maroc"}
        description={isAr
          ? "خدمات تصميم مواقع، سيو، مونتاج فيديو وتحويل أفضل للطلبات في المغرب."
          : "Prestations de création site web Maroc, WordPress developer Morocco et SEO freelancer Maroc pour les entreprises qui veulent plus de clients."}
        path="/services"
        jsonLd={[
          buildBreadcrumbSchema([
            { name: "Accueil", path: "/" },
            { name: "Services", path: "/services" },
          ]),
          buildServiceSchema({
            name: "Services digitaux au Maroc",
            description:
              "Création de sites, SEO local, refonte, montage vidéo et optimisation du parcours de conversion au Maroc.",
            path: "/services",
            areaServed: ["Morocco", "Casablanca", "Rabat", "Marrakech", "Meknes"],
          }),
        ]}
      />
      <Breadcrumb items={[{ label: t("nav.services") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "خدماتنا الرقمية في المغرب" : "Services création site web Maroc et SEO freelancer Maroc"}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-foreground/75">
            {isAr
              ? "ننفذ مواقع أسرع، SEO أوضح، مونتاج فيديو احترافي ومسارات تواصل أقرب إلى النتيجة التجارية."
              : "Nous alignons site, SEO, refonte et vidéo pour transformer votre trafic en demandes qualifiees."}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container space-y-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? "ماذا نطلق لك هذا الشهر" : "WordPress developer Morocco, developpeur web freelance Maroc et SEO local"}
            </h2>
          </div>

          {seoServices.map((service) => {
            const Icon = iconMap[service.icon] || Globe;
            const features = isAr ? service.featuresAr : service.features;
            const serviceImage = serviceImages.get(service.slug);
            const imageSrc = serviceImage ? api.asset(serviceImage) : null;

            return (
              <Card key={service.slug} className="overflow-hidden border-border/50">
                <CardContent className="grid gap-8 p-8 md:grid-cols-2 md:p-12">
                  <div>
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-accent/10">
                      <Icon className="h-7 w-7 text-accent" />
                    </div>
                    <h2 className="mb-3 text-2xl font-bold">{isAr ? service.nameAr : service.name}</h2>
                    <p className="mb-2 leading-relaxed text-muted-foreground">
                      {isAr ? service.shortDescAr : service.shortDesc}
                    </p>
                    <p className="mb-6 text-sm font-semibold text-accent">
                      {isAr
                        ? "الأسعار عند الطلب — اتصل بي للحصول على عرض سعر مخصص"
                        : "Prix sur demande — Contactez-moi pour un devis personnalisé"}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/contact">
                          {t("nav.quote")}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                      <Button asChild variant="outline">
                        <Link to={`/services/${service.slug}`}>{t("services.cta")}</Link>
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {imageSrc && (
                      <div className="overflow-hidden rounded-lg border border-border/50 bg-muted">
                        <img
                          src={imageSrc}
                          alt={isAr ? service.nameAr : service.name}
                          className="aspect-[16/9] w-full object-cover"
                          loading="lazy"
                          decoding="async"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                    )}
                    <ul className="grid grid-cols-2 gap-3">
                      {features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-accent" />
                          {feature}
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

      <section className="bg-muted/30 py-10">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <Link to="/blog" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent">
              Tous les articles
            </Link>
            <Link to="/agence-digitale-maroc" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
              Agence Digitale Maroc
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Services;
