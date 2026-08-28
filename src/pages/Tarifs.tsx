import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useI18n } from "@/lib/i18n";
import { CONTACT, cities, services, technologies } from "@/lib/seo-data";
import { usePublicTestimonials } from "@/hooks/usePublicTestimonials";
import {
  SEOHead,
  BASE_URL,
  buildOfferCatalogSchema,
  buildFaqSchema,
  buildReviewSchema,
  type JsonLdBlock,
} from "@/components/SEOHead";

const TIER1_CITY_SLUGS = ["casablanca", "rabat", "marrakech", "meknes", "fes", "tanger"];
const tier1Cities = cities.filter((city) => TIER1_CITY_SLUGS.includes(city.slug));

const faqs = [
    {
      q: "Combien coûte un site web au Maroc ?",
      qAr: "كم تكلفة إنشاء موقع إلكتروني في المغرب؟",
      a: "Un site vitrine simple démarre à 1 500 MAD",
      aAr: "موقع تعريفي بسيط يبدأ من 1500 درهم ",
    },
  {
    q: "Les prix affichés sont-ils définitifs ?",
    qAr: "هل هذه الأسعار نهائية؟",
    a: "Non, il s'agit de prix indicatifs de départ. Chaque projet est différent — vous recevez un devis personnalisé et gratuit sous 24h après avoir décrit votre besoin.",
    aAr: "لا، هذه أسعار أولية. كل مشروع مختلف — ستحصل على عرض سعر مخصص ومجاني خلال أقل من 24 ساعة بعد وصف احتياجك.",
  },
  {
    q: "Les prix incluent-ils l'hébergement et le nom de domaine ?",
    qAr: "هل يشمل السعر الاستضافة واسم النطاق؟",
    a: "Cela dépend du projet — le devis final précise clairement ce qui est inclus (hébergement, nom de domaine, maintenance) selon vos besoins.",
    aAr: "يختلف حسب المشروع — يوضح عرض السعر النهائي بالتحديد ما هو مشمول (استضافة، اسم نطاق، صيانة) حسب احتياجك.",
  },
  {
    q: "Quelles sont les modalités de paiement ?",
    qAr: "كيف تتم عملية الدفع؟",
    a: "Les modalités de paiement (acompte, échéances) sont définies ensemble selon la taille et la durée du projet, précisées dans le devis avant de démarrer.",
    aAr: "يتم الاتفاق على طريقة الدفع (دفعة مقدمة، دفعات) معًا حسب حجم المشروع ومدته، وتكون واضحة في عرض السعر قبل البدء.",
  },
  {
    q: "Pourquoi vos tarifs sont-ils inférieurs à ceux d'une agence ?",
    qAr: "لماذا أسعارك أقل من أسعار الوكالة؟",
    a: "Vous payez uniquement le travail — pas de commercial, pas de chef de projet, pas de frais de structure d'agence. Même qualité technique (React, TypeScript, SEO), contact direct avec la personne qui code.",
    aAr: "تدفع ثمن الخدمة فقط — بلا مندوب مبيعات، بلا مدير مشروع، بلا مصاريف مكتب. نفس الجودة التقنية، وتواصل مباشر مع الشخص الذي يكتب الكود.",
  },
];

const Tarifs = () => {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { items: testimonials } = usePublicTestimonials(3);

  const pricedServices = services.filter((service) => service.pricing && service.pricing.length > 0);

  const offerCatalogSchemas: JsonLdBlock[] = pricedServices.map((service) =>
    buildOfferCatalogSchema({
      path: "/tarifs",
      catalogName: `Tarifs — ${service.name}`,
      offers: service.pricing!.map((tier) => ({
        name: tier.name,
        description: tier.description,
        fromMAD: tier.fromMAD,
        unit: tier.unit,
      })),
    }),
  );

  const reviewSchemas = buildReviewSchema(
    testimonials.map((item) => ({
      author: item.client_name,
      reviewBody: isAr ? item.quote_ar || item.quote : item.quote,
      ratingValue: item.rating,
    })),
  );

  return (
    <Layout>
      <SEOHead
        title={
          isAr
            ? "أسعار تصميم المواقع و SEO بالمغرب 2026 | أيوب التواتي"
            : "Prix Site Web & SEO Maroc 2026 | Tarifs Transparents | Ayoub Touati"
        }
        description={
          isAr
            ? "اكتشف الأسعار الأولية لتصميم المواقع، SEO، إعادة التصميم ومونتاج الفيديو بالمغرب. عرض سعر مجاني ومخصص فأقل من 24 ساعة."
            : "Découvrez les tarifs indicatifs pour la création de site web, le SEO, la refonte et le montage vidéo au Maroc. Devis gratuit et personnalisé sous 24h."
        }
        path="/tarifs"
        mainEntityId={`${BASE_URL}/tarifs#offercatalog-creation-site-web`}
        jsonLd={[
          ...offerCatalogSchemas,
          buildFaqSchema(faqs.map((faq) => ({ question: isAr ? faq.qAr : faq.q, answer: isAr ? faq.aAr : faq.a }))),
          ...reviewSchemas,
        ]}
      />
      <Breadcrumb items={[{ label: isAr ? "الأسعار" : "Tarifs" }]} />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero-animated py-16 md:py-24">
        <div className="container relative text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "الأسعار — تصميم المواقع و SEO بالمغرب" : "Tarifs — Création de Site Web et SEO au Maroc"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/75">
            {isAr
              ? "أسعار أولية وواضحة. يحصل كل مشروع على عرض سعر مجاني ومخصص خلال أقل من 24 ساعة."
              : "Des prix indicatifs et transparents. Chaque projet reçoit un devis gratuit et personnalisé sous 24h."}
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent px-8 text-base text-accent-foreground shadow-gold hover:bg-accent/90">
              <Link to="/contact">
                {isAr ? "اطلب عرض السعر" : "Recevoir mon devis"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {isAr ? "واتساب مباشر" : "WhatsApp direct"}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing tiers, per service */}
      <section className="py-16 md:py-24">
        <div className="container space-y-16">
          {pricedServices.map((service) => (
            <div key={service.slug}>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold md:text-3xl">{isAr ? service.nameAr : service.name}</h2>
                  <p className="mt-2 text-muted-foreground">{isAr ? service.shortDescAr : service.shortDesc}</p>
                </div>
                <Link
                  to={`/services/${service.slug}`}
                  className="inline-flex items-center text-sm font-semibold text-accent hover:underline"
                >
                  {isAr ? "اكتشف الخدمة" : "Découvrir le service"}
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {service.pricing!.map((tier) => (
                  <Card key={tier.name} className="flex flex-col border-border/50">
                    <CardContent className="flex flex-1 flex-col p-6">
                      <h3 className="text-lg font-bold">{isAr ? tier.nameAr : tier.name}</h3>
                      <p className="mt-3">
                        <span className="text-3xl font-extrabold text-accent">
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
                      <Button asChild className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90">
                        <Link to="/contact">{isAr ? "اطلب عرض السعر" : "Demander un devis"}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related technologies — trust signal, not linked (no dedicated tech pages yet) */}
      <section className="border-y border-border bg-muted/30 py-10">
        <div className="container text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {isAr ? "تقنيات نعمل بها" : "Technologies maîtrisées"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {technologies.map((tech) => (
              <span
                key={tech.slug}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground"
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related locations — real links to live city hubs */}
      <section className="py-10">
        <div className="container text-center">
          <p className="mb-4 text-sm font-semibold text-muted-foreground">
            {isAr ? "أسعار صالحة في جميع مدن المغرب" : "Tarifs valables dans toutes les villes du Maroc"}
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {tier1Cities.map((city) => (
              <Link
                key={city.slug}
                to={`/agence-digitale-${city.slug}`}
                className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                {isAr ? city.nameAr : city.name}
              </Link>
            ))}
            <Link
              to="/agence-digitale-maroc"
              className="rounded-full border border-accent bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent"
            >
              {isAr ? "كل المغرب" : "Tout le Maroc"}
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />
      <Process />

      {/* FAQ */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="mb-10 text-center text-2xl font-bold md:text-3xl">
            {isAr ? "أسئلة متكررة حول الأسعار" : "Questions fréquentes sur nos tarifs"}
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-lg border border-border/50 bg-card px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-accent">
                    {isAr ? faq.qAr : faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {isAr ? faq.aAr : faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Tarifs;
