import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Star, TrendingUp, Clock, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { services, cities, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";
import { ServicePortfolio } from "@/components/service/ServicePortfolio";
import { SEOHead } from "@/components/SEOHead";
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

  const service = services.find((s) => s.slug === serviceSlug);
  if (!service) {
    return <Layout><div className="container py-20 text-center"><h1 className="text-2xl font-bold">Service non trouvé</h1></div></Layout>;
  }

  const content = serviceContent[service.slug];
  const features = isAr ? service.featuresAr : service.features;
  const topCities = cities.slice(0, 8);

  return (
    <Layout>
      <SEOHead
        title={isAr ? `${service.nameAr} في المغرب | أيوب التواتي` : `${service.name} au Maroc — Expert Digital | Ayoub Touati`}
        description={isAr
          ? `${service.shortDescAr} في المغرب. أسعار تبدأ من ${service.pricingFrom}. عرض أسعار مجاني خلال 24 ساعة. +50 مشروع ناجح.`
          : `${service.shortDesc} au Maroc. À partir de ${service.pricingFrom}. Devis gratuit sous 24h. +50 projets réussis.`}
        path={`/services/${service.slug}`}
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
              {isAr
                ? `أسعار تبدأ من ${service.pricingFrom}. عرض أسعار مجاني خلال 24 ساعة.`
                : `À partir de ${service.pricingFrom}. Devis gratuit sous 24h.`}
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
            {isAr ? "ما نقدمه" : "Ce que nous proposons"}
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

      {/* Pricing */}
      {content?.pricing && (
        <section className="py-16 md:py-24">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-4 md:text-3xl">
              {isAr ? "عروضنا وأسعارنا" : "Nos offres & tarifs"}
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
              {isAr ? "أسعار شفافة بدون مفاجآت. كل عرض يتضمن ضمان الرضا." : "Des tarifs transparents, sans surprises. Chaque offre inclut notre garantie de satisfaction."}
            </p>
            <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
              {content.pricing.map((plan, i) => (
                <Card key={plan.name} className={`border-border/50 ${i === 1 ? "border-accent shadow-gold relative" : ""}`}>
                  {i === 1 && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                      Populaire
                    </div>
                  )}
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold">{plan.name}</h3>
                    <div className="mt-2 text-3xl font-extrabold text-accent">{plan.price}</div>
                    <ul className="mt-6 space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 shrink-0 text-accent" /> {f}
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link to="/contact">{t("hero.cta.quote")}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Why choose us */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "لماذا تختارنا؟" : "Pourquoi nous choisir ?"}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <TrendingUp className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "نتائج مثبتة" : "Résultats prouvés"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "+50 مشروع ناجح مع عائد استثمار قابل للقياس" : "+50 projets réussis avec un ROI mesurable"}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Clock className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "سرعة التنفيذ" : "Rapidité d'exécution"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "مواعيد تسليم سريعة ودعم متواصل" : "Délais de livraison rapides et support continu"}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Shield className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "ضمان الرضا" : "Garantie satisfaction"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "لا ندفع حتى تكون راضيًا بنسبة 100%" : "Vous ne payez que si vous êtes 100% satisfait"}</p>
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

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: content.faqs.map((faq) => ({
                    "@type": "Question",
                    name: faq.q,
                    acceptedAnswer: { "@type": "Answer", text: faq.a },
                  })),
                }),
              }}
            />
          </div>
        </section>
      )}

      {/* Portfolio projects for this service */}
      <ServicePortfolio serviceSlug={service.slug} />

      {/* Internal links: other services */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">{isAr ? "خدمات أخرى" : "Nos autres services"}</h2>
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

      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: service.name,
            description: service.shortDesc,
            provider: {
              "@type": "LocalBusiness",
              name: CONTACT.name,
              telephone: CONTACT.phone,
              url: "https://touatiayoub.com",
            },
            areaServed: {
              "@type": "Country",
              name: "Morocco",
            },
            ...(content?.pricing?.[0] ? {
              offers: content.pricing.map((p) => ({
                "@type": "Offer",
                name: p.name,
                price: p.price.replace(/[^\d]/g, ""),
                priceCurrency: "MAD",
              })),
            } : {}),
          }),
        }}
      />

      <ContactCTA />
    </Layout>
  );
};

export default ServiceDetail;

