import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { services, cities, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";

const serviceContent: Record<string, { sections: { title: string; content: string }[] }> = {
  "creation-site-web": {
    sections: [
      {
        title: "Pourquoi créer un site web professionnel au Maroc ?",
        content: "En 2025, plus de 70% des consommateurs marocains recherchent des produits et services en ligne avant d'acheter. Un site web professionnel n'est plus un luxe — c'est une nécessité pour toute entreprise qui veut croître. Votre site web est votre vitrine digitale, accessible 24h/24, 7j/7, depuis n'importe quelle ville du Maroc.",
      },
      {
        title: "Site vitrine, e-commerce ou application web ?",
        content: "Un site vitrine présente votre entreprise et vos services (à partir de 3 000 DH). Un site e-commerce vous permet de vendre en ligne avec paiement intégré (à partir de 8 000 DH). Une application web sur mesure offre des fonctionnalités avancées comme les réservations, les tableaux de bord ou les systèmes de gestion (à partir de 15 000 DH).",
      },
      {
        title: "Technologies modernes pour des performances maximales",
        content: "Nous utilisons les technologies les plus modernes : React, TypeScript, TailwindCSS pour des sites ultra-rapides. Contrairement aux sites WordPress lourds, nos créations se chargent en moins de 2 secondes, sont optimisées pour le SEO et offrent une expérience utilisateur exceptionnelle sur mobile.",
      },
    ],
  },
  "referencement-seo": {
    sections: [
      {
        title: "Dominez Google au Maroc avec le SEO",
        content: "Le référencement naturel (SEO) est le levier le plus rentable pour acquérir des clients en ligne. Contrairement à la publicité payante, le SEO génère du trafic qualifié en continu. Nous positionnons votre site en première page de Google pour les mots-clés que vos clients recherchent réellement.",
      },
      {
        title: "SEO Local : dominez votre ville",
        content: "Le SEO local est crucial pour les entreprises qui ciblent une zone géographique. Nous optimisons votre fiche Google My Business, créons du contenu localisé et construisons des citations locales pour que votre entreprise apparaisse en premier dans les recherches locales — que ce soit à Casablanca, Rabat, Marrakech ou Meknès.",
      },
      {
        title: "Notre méthodologie SEO en 4 étapes",
        content: "1) Audit SEO complet de votre site existant. 2) Recherche de mots-clés à fort potentiel commercial. 3) Optimisation technique et on-page complète. 4) Stratégie de contenu et netlinking pour construire l'autorité de votre site. Résultats visibles dès les 3 premiers mois.",
      },
    ],
  },
  "marketing-digital": {
    sections: [
      {
        title: "Publicité Facebook et Instagram au Maroc",
        content: "Avec plus de 22 millions d'utilisateurs Facebook au Maroc, les réseaux sociaux sont le canal publicitaire le plus efficace pour toucher votre audience. Nos campagnes ciblées génèrent en moyenne 3x plus de leads qualifiés que les approches traditionnelles, avec un coût par acquisition optimisé.",
      },
      {
        title: "Gestion des réseaux sociaux",
        content: "Une présence active sur les réseaux sociaux renforce votre marque et fidélise vos clients. Nous créons du contenu engageant, gérons votre communauté et analysons les performances pour maximiser votre visibilité et votre engagement.",
      },
      {
        title: "Google Ads : captez les recherches à forte intention",
        content: "Google Ads vous permet de capter les clients au moment exact où ils recherchent vos services. Nous créons et optimisons vos campagnes pour maximiser le retour sur investissement, avec un suivi transparent des conversions et du coût par lead.",
      },
    ],
  },
  "montage-video": {
    sections: [
      {
        title: "Le pouvoir de la vidéo en marketing digital",
        content: "La vidéo est le format le plus engageant sur les réseaux sociaux. Les publications vidéo génèrent 10x plus d'engagement que les images statiques. Que ce soit pour des Reels Instagram, des publicités Facebook ou du contenu YouTube, la vidéo est un outil incontournable pour se démarquer.",
      },
      {
        title: "Vidéos publicitaires qui convertissent",
        content: "Nous créons des vidéos publicitaires professionnelles conçues pour capter l'attention dans les 3 premières secondes et inciter à l'action. Chaque vidéo est optimisée pour la plateforme de diffusion : format vertical pour Instagram/TikTok, horizontal pour YouTube, carré pour Facebook.",
      },
      {
        title: "Motion graphics et animation",
        content: "Les animations et motion graphics donnent vie à votre marque. Parfaits pour expliquer un produit complexe, présenter des statistiques ou créer une identité visuelle mémorable. Nous réalisons des animations de logo, des infographies animées et des vidéos explicatives.",
      },
    ],
  },
  "email-marketing": {
    sections: [
      {
        title: "L'email marketing : le ROI le plus élevé du marketing digital",
        content: "L'email marketing offre un retour sur investissement moyen de 42 DH pour chaque 1 DH dépensé. C'est le canal de marketing digital le plus rentable. Nous concevons des campagnes email qui nourrissent vos leads, fidélisent vos clients et génèrent des ventes récurrentes.",
      },
      {
        title: "Automatisation marketing : vendez pendant que vous dormez",
        content: "Les séquences email automatisées travaillent pour vous 24h/24. Séquences de bienvenue pour les nouveaux abonnés, relances de paniers abandonnés pour l'e-commerce, séquences de nurturing pour les leads B2B — nous configurons des systèmes qui convertissent automatiquement.",
      },
      {
        title: "Newsletters qui engagent",
        content: "Une newsletter bien conçue maintient votre marque en tête de l'esprit de vos clients. Nous créons des templates sur mesure, rédigeons du contenu pertinent et optimisons les heures d'envoi pour maximiser les taux d'ouverture et de clics.",
      },
    ],
  },
};

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

      {/* City links */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-xl font-bold mb-6">
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

      {/* CTA */}
      <ContactCTA />
    </Layout>
  );
};

export default ServiceDetail;
