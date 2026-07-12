import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Star, TrendingUp, Clock, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { services, cities, technologies, industries, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import { usePublicServices } from "@/hooks/usePublicServices";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ServicePortfolio } from "@/components/service/ServicePortfolio";
import {
  SEOHead,
  BASE_URL,
  buildBreadcrumbSchema,
  buildServiceSchema,
  buildFaqSchema,
  buildOfferCatalogSchema,
  type JsonLdBlock,
} from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { serviceContent } from "@/data/services-content";

const ServiceDetail = () => {
  const { serviceSlug } = useParams<{ serviceSlug: string }>();
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const { items: publicServices } = usePublicServices();

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    return <Layout><div className="container py-20 text-center"><h1 className="text-2xl font-bold">Service non trouvé</h1></div></Layout>;
  }

  const content = serviceContent[service.slug];
  const features = isAr ? service.featuresAr : service.features;
  const topCities = cities.slice(0, 8);
  const publicService = publicServices.find((item) => item.slug === service.slug);
  const serviceImage = publicService?.imageUrl || publicService?.image
    ? api.asset(publicService.imageUrl ?? publicService.image)
    : null;

  // Centralized schema — replaces the previous hand-rolled <script> tags that
  // re-declared LocalBusiness inline (entity duplication) and weren't tagged
  // for cleanup on client-side navigation. Also adds Breadcrumb schema, which
  // was missing entirely despite the visual Breadcrumb above.
  const jsonLd: JsonLdBlock[] = [
    buildBreadcrumbSchema([
      { name: t("nav.services"), path: "/services" },
      { name: isAr ? service.nameAr : service.name, path: `/services/${service.slug}` },
    ]),
    buildServiceSchema({
      name: service.name,
      description: service.metaDescription ?? service.shortDesc,
      path: `/services/${service.slug}`,
      serviceType: service.primaryKeyword,
    }),
    ...(content?.faqs?.length
      ? [buildFaqSchema(content.faqs.map((faq) => ({ question: faq.q, answer: faq.a })))]
      : []),
    ...(service.pricing?.length
      ? [
          buildOfferCatalogSchema({
            path: `/services/${service.slug}`,
            catalogName: `Tarifs — ${service.name}`,
            offers: service.pricing.map((tier) => ({
              name: tier.name,
              description: tier.description,
              fromMAD: tier.fromMAD,
              unit: tier.unit,
            })),
          }),
        ]
      : []),
  ];

  return (
    <Layout>
      <SEOHead
        title={service.metaTitle ?? (isAr ? `${service.nameAr} في المغرب | مبرمج مستقل — أيوب التواتي` : `${service.name} au Maroc — Freelance Expert, Prix Indépendant | Ayoub Touati`)}
        description={isAr
          ? `${service.shortDescAr} من مبرمج مستقل، ماشي وكالة. تواصل مباشر معايا لعرض سعر مخصص. +50 مشروع ناجح.`
          : (service.metaDescription ?? `${service.shortDesc} par un développeur freelance, pas une agence. Contact direct avec moi pour un devis personnalisé. +50 projets réussis.`)}
        path={`/services/${service.slug}`}
        ogImage={serviceImage ?? undefined}
        mainEntityId={`${BASE_URL}/services/${service.slug}#service`}
        jsonLd={jsonLd}
      />
      {/* Breadcrumb */}
      <Breadcrumb items={[
        { label: t("nav.services"), href: "/services" },
        { label: isAr ? service.nameAr : service.name },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
              {isAr ? service.nameAr : service.name}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
              {isAr ? service.shortDescAr : service.shortDesc}.{" "}
              {isAr ? (
                <>
                  شوف <Link to="/tarifs" className="underline hover:no-underline">الأثمنة التفصيلية</Link> أو اطلب عرض سعر مخصص.
                </>
              ) : (
                <>
                  Voir nos <Link to="/tarifs" className="underline hover:no-underline">tarifs détaillés</Link> ou demander un devis personnalisé.
                </>
              )}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                <Link to="/contact">{t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" /></Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-1 text-accent">
              {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
              <span className="ml-2 text-sm text-primary-foreground/60">+50 {isAr ? "مشروع ناجح" : "projets réussis"}</span>
            </div>
            {serviceImage && (
              <div className="mx-auto mt-10 max-w-3xl overflow-hidden rounded-lg border border-primary-foreground/15 bg-black/20 shadow-gold">
                <img
                  src={serviceImage}
                  alt={isAr ? service.nameAr : service.name}
                  className="aspect-[16/9] w-full object-cover"
                  loading="eager"
                  decoding="async"
                  sizes="(min-width: 768px) 768px, 100vw"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results bar */}
      {content?.results && (
        <section className="border-y border-border bg-muted/50 py-10">
          <div className="container">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {content.results.map((r) => (
                <div key={r.metric} className="text-center">
                  <div className="text-2xl font-extrabold text-accent md:text-3xl">{r.value}</div>
                  <div className="mt-1 text-xs font-medium text-muted-foreground">{r.metric}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold mb-10 text-center md:text-3xl">
            {isAr ? "ما أقدمه" : "Ce que je propose"}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-5">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="font-medium text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep content sections */}
      {content && (
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-12">
              {content.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-4 md:text-2xl">{section.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            {isAr ? "مشروعك يحتاج عرضًا مخصصًا" : "Votre projet mérite un devis personnalisé"}
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-muted-foreground">
            {isAr ? "عرض سعر مجاني ومخصص فأقل من 24 ساعة" : "Devis gratuit et personnalisé sous 24h"}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">{t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/tarifs">{isAr ? "شوف الأثمنة" : "Voir les tarifs"}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "علاش فريلانسر ماشي وكالة؟" : "Pourquoi un freelance plutôt qu'une agence ?"}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <TrendingUp className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "نتائج مثبتة" : "Résultats prouvés"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "+50 مشروع ناجح مع عائد استثمار قابل للقياس" : "+50 projets réussis avec un ROI mesurable"}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Clock className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "تواصل مباشر معايا" : "Contact direct avec moi"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "بلا كوميرسيال وبلا وسيط، جواب سريع فواتساب" : "Pas de commercial ni d'intermédiaire, réponse rapide sur WhatsApp"}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Shield className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "ثمن فريلانسر، جودة وكالة" : "Prix freelance, qualité agence"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "بلا هامش وكالة، بلا مصاريف زايدة" : "Sans marge d'agence, sans frais de structure superflus"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      {content?.faqs && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-10 md:text-3xl">
              {isAr ? "الأسئلة الشائعة" : "Questions fréquentes"}
            </h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="space-y-3">
                {content.faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="rounded-lg border border-border/50 bg-card px-6"
                  >
                    <AccordionTrigger className="text-left font-semibold hover:text-accent">
                      {faq.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      {faq.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}

      {/* Portfolio projects for this service (case studies) */}
      <ServicePortfolio serviceSlug={service.slug} />

      {/* Pricing teaser */}
      {service.pricing && service.pricing.length > 0 && (
        <section className="border-y border-border bg-muted/30 py-16 md:py-24">
          <div className="container">
            <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
              {isAr ? "أثمنة" : "Tarifs"} {isAr ? service.nameAr : service.name}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {service.pricing.map((tier) => (
                <Card key={tier.name} className="flex flex-col border-border/50">
                  <CardContent className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-bold">{isAr ? tier.nameAr : tier.name}</h3>
                    <p className="mt-3">
                      <span className="text-2xl font-extrabold text-accent">
                        {isAr ? "بداية من " : "à partir de "}
                        {tier.fromMAD.toLocaleString("fr-MA")} MAD
                      </span>
                      {tier.unit === "monthly" && (
                        <span className="ml-1 text-sm font-normal text-muted-foreground">{isAr ? "/شهر" : "/mois"}</span>
                      )}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {isAr ? tier.descriptionAr : tier.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link to="/tarifs" className="inline-flex items-center text-sm font-semibold text-accent hover:underline">
                {isAr ? "شوف كل الأثمنة" : "Voir tous les tarifs"}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Related technologies — trust signal, not linked (no dedicated tech pages yet) */}
      <section className="py-10">
        <div className="container text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {isAr ? "تقنيات نعمل بها" : "Technologies maîtrisées"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span key={tech.slug} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries served — not linked yet (no dedicated /secteurs pages today) */}
      <section className="border-y border-border bg-muted/30 py-10">
        <div className="container text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {isAr ? "قطاعات نشتغل معها" : "Secteurs que j'accompagne"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {industries.map((industry) => (
              <span key={industry.slug} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
                {isAr ? industry.nameAr : industry.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Internal links: other services */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">{isAr ? "خدمات أخرى" : "Mes autres services"}</h2>
          <div className="flex flex-wrap gap-2">
            {services.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? s.nameAr : s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* City links */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">
            {isAr ? `${service.nameAr} في جميع المدن المغربية` : `${service.name} dans toutes les villes du Maroc`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {topCities.map((city) => (
              <Link
                key={city.slug}
                to={`/${service.slug}-${city.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${service.nameAr} ${city.nameAr}` : `${service.name} ${city.name}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default ServiceDetail;

