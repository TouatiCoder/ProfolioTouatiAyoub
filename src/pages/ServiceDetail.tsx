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

const serviceContent: Record<string, {
  sections: { title: string; content: string }[];
  faqs: { q: string; a: string }[];
  pricing: { name: string; price: string; features: string[] }[];
  results: { metric: string; value: string }[];
}> = {
  "creation-site-web": {
    sections: [
      {
        title: "Pourquoi créer un site web professionnel au Maroc ?",
        content: "En 2026, plus de 70% des consommateurs marocains recherchent des produits et services en ligne avant d'acheter. Un site web professionnel n'est plus un luxe — c'est une nécessité pour toute entreprise qui veut croître. Votre site web est votre vitrine digitale, accessible 24h/24, 7j/7, depuis n'importe quelle ville du Maroc. Les entreprises avec un site web professionnel génèrent en moyenne 3 fois plus de leads que celles qui n'en ont pas.",
      },
      {
        title: "Site vitrine, e-commerce ou application web ?",
        content: "Un site vitrine présente votre entreprise et vos services de manière professionnelle. Un site e-commerce vous permet de vendre en ligne avec paiement intégré et gestion des stocks. Une application web sur mesure offre des fonctionnalités avancées comme les réservations en ligne, les tableaux de bord analytiques ou les systèmes de gestion internes. Chaque type de site est optimisé pour la performance et le référencement naturel.",
      },
      {
        title: "Technologies modernes pour des performances maximales",
        content: "Nous utilisons les technologies les plus modernes : React, TypeScript, TailwindCSS pour des sites ultra-rapides. Contrairement aux sites WordPress lourds qui se chargent en 5+ secondes, nos créations se chargent en moins de 2 secondes, sont optimisées pour le SEO et offrent une expérience utilisateur exceptionnelle sur mobile. Chaque site est testé sur Google PageSpeed Insights pour garantir un score supérieur à 90.",
      },
      {
        title: "Maintenance et support continu",
        content: "Un site web nécessite un entretien régulier pour rester performant et sécurisé. Nous proposons des forfaits de maintenance incluant les mises à jour de sécurité, l'optimisation des performances, le monitoring de disponibilité et le support technique réactif. Votre site reste toujours à jour et protégé contre les menaces.",
      },
    ],
    faqs: [
      { q: "Combien coûte la création d'un site web au Maroc ?", a: "Le prix varie selon la complexité : un site vitrine démarre à 3 000 DH, un e-commerce à partir de 8 000 DH, et une application web sur mesure à partir de 15 000 DH. Chaque projet reçoit un devis gratuit personnalisé sous 24h." },
      { q: "Combien de temps faut-il pour créer un site web ?", a: "Un site vitrine est livré en 1 à 2 semaines. Un e-commerce entre 2 et 4 semaines. Les projets plus complexes prennent 4 à 8 semaines avec des points de suivi réguliers." },
      { q: "Mon site sera-t-il optimisé pour le SEO ?", a: "Absolument. Chaque site est construit avec les meilleures pratiques SEO : structure sémantique HTML5, meta tags optimisés, vitesse de chargement rapide, responsive mobile-first, et schema markup intégré." },
      { q: "Proposez-vous l'hébergement et le nom de domaine ?", a: "Oui, nous proposons des solutions d'hébergement performant avec certificat SSL gratuit, CDN et sauvegardes automatiques. Nous pouvons aussi gérer l'achat et la configuration de votre nom de domaine." },
      { q: "Puis-je modifier mon site moi-même après la livraison ?", a: "Oui. Selon le type de site, nous intégrons un système de gestion de contenu (CMS) intuitif ou nous vous formons à l'utilisation des outils de mise à jour." },
    ],
    pricing: [
      { name: "Site Vitrine", price: "3 000 DH", features: ["Design responsive", "5-7 pages", "Formulaire de contact", "Optimisation SEO de base", "Certificat SSL", "Livraison 1-2 semaines"] },
      { name: "E-Commerce", price: "8 000 DH", features: ["Catalogue produits", "Paiement en ligne", "Gestion des stocks", "Tableau de bord admin", "SEO avancé", "Livraison 2-4 semaines"] },
      { name: "Application Web", price: "15 000 DH", features: ["Fonctionnalités sur mesure", "Base de données", "API personnalisées", "Authentification", "Support premium", "Livraison 4-8 semaines"] },
    ],
    results: [
      { metric: "Temps de chargement moyen", value: "<2s" },
      { metric: "Score PageSpeed", value: "90+" },
      { metric: "Augmentation de leads", value: "+300%" },
      { metric: "Projets livrés", value: "50+" },
    ],
  },
  "referencement-seo": {
    sections: [
      {
        title: "Dominez Google au Maroc avec le SEO",
        content: "Le référencement naturel (SEO) est le levier le plus rentable pour acquérir des clients en ligne. Contrairement à la publicité payante qui s'arrête dès que vous cessez de payer, le SEO génère du trafic qualifié en continu, 24h/24, 7j/7. Nous positionnons votre site en première page de Google pour les mots-clés que vos clients recherchent réellement au Maroc.",
      },
      {
        title: "SEO Local : dominez votre ville",
        content: "Le SEO local est crucial pour les entreprises qui ciblent une zone géographique. Nous optimisons votre fiche Google My Business, créons du contenu localisé pour chaque ville ciblée et construisons des citations locales cohérentes. Résultat : votre entreprise apparaît en premier dans les recherches locales — que ce soit à Casablanca, Rabat, Marrakech ou Meknès.",
      },
      {
        title: "Notre méthodologie SEO en 4 étapes",
        content: "1) Audit SEO complet de votre site existant avec analyse de plus de 200 facteurs. 2) Recherche de mots-clés à fort potentiel commercial avec analyse de la concurrence. 3) Optimisation technique et on-page complète incluant la structure des URLs, les balises meta, le maillage interne et la vitesse de chargement. 4) Stratégie de contenu et netlinking pour construire l'autorité de votre site. Résultats visibles dès les 3 premiers mois.",
      },
      {
        title: "Reporting transparent et mesurable",
        content: "Chaque mois, vous recevez un rapport détaillé montrant l'évolution de vos positions sur Google, le volume de trafic organique, les conversions générées et les actions réalisées. Nous utilisons Google Search Console, Google Analytics et des outils SEO professionnels pour un suivi précis de chaque KPI.",
      },
    ],
    faqs: [
      { q: "Combien de temps faut-il pour voir des résultats en SEO ?", a: "Les premiers résultats apparaissent généralement entre 1 et 3 mois. Les résultats significatifs (positions en première page) sont atteints entre 3 et 6 mois selon la concurrence des mots-clés ciblés." },
      { q: "Quelle est la différence entre SEO et SEA ?", a: "Le SEO (référencement naturel) génère du trafic gratuit et durable via les résultats organiques de Google. Le SEA (Google Ads) est de la publicité payante avec des résultats immédiats mais qui s'arrêtent quand vous cessez de payer. L'idéal est de combiner les deux." },
      { q: "Proposez-vous un audit SEO gratuit ?", a: "Oui ! Nous offrons un audit SEO gratuit de votre site web incluant l'analyse technique, l'analyse des mots-clés et des recommandations prioritaires." },
      { q: "Le SEO fonctionne-t-il pour toutes les entreprises au Maroc ?", a: "Oui. Que vous soyez un restaurant, un cabinet médical, un e-commerce ou une entreprise B2B, le SEO est pertinent. Nous adaptons la stratégie à votre secteur et à votre zone géographique." },
    ],
    pricing: [
      { name: "SEO Essentiel", price: "2 000 DH/mois", features: ["Audit initial", "10 mots-clés ciblés", "Optimisation on-page", "Reporting mensuel", "Google My Business", "Support email"] },
      { name: "SEO Croissance", price: "4 000 DH/mois", features: ["30 mots-clés ciblés", "Création de contenu", "Netlinking", "SEO technique avancé", "Reporting bi-mensuel", "Support prioritaire"] },
      { name: "SEO Domination", price: "8 000 DH/mois", features: ["50+ mots-clés ciblés", "Stratégie contenu complète", "Netlinking premium", "SEO local multi-villes", "Reporting hebdomadaire", "Account manager dédié"] },
    ],
    results: [
      { metric: "Augmentation trafic moyen", value: "+450%" },
      { metric: "Mots-clés en 1ère page", value: "85%" },
      { metric: "ROI moyen", value: "x10" },
      { metric: "Clients satisfaits", value: "40+" },
    ],
  },
  "marketing-digital": {
    sections: [
      {
        title: "Publicité Facebook et Instagram au Maroc",
        content: "Avec plus de 22 millions d'utilisateurs Facebook au Maroc, les réseaux sociaux sont le canal publicitaire le plus efficace pour toucher votre audience. Nos campagnes ciblées génèrent en moyenne 3x plus de leads qualifiés que les approches traditionnelles, avec un coût par acquisition optimisé grâce à notre expertise en ciblage et en creative testing.",
      },
      {
        title: "Gestion des réseaux sociaux",
        content: "Une présence active et cohérente sur les réseaux sociaux renforce votre marque et fidélise vos clients. Nous créons du contenu engageant adapté à chaque plateforme, gérons votre communauté avec réactivité et analysons les performances pour maximiser votre visibilité et votre engagement organique.",
      },
      {
        title: "Google Ads : captez les recherches à forte intention",
        content: "Google Ads vous permet de capter les clients au moment exact où ils recherchent vos services. Nous créons et optimisons vos campagnes Search, Display et Shopping pour maximiser le retour sur investissement, avec un suivi transparent des conversions et du coût par lead. Notre expertise garantit un ROAS minimum de 3x.",
      },
      {
        title: "Stratégie de contenu qui convertit",
        content: "Le content marketing est le pilier d'une stratégie digitale durable. Nous créons du contenu à forte valeur ajoutée — articles de blog, infographies, vidéos — qui attire votre audience cible, établit votre expertise et génère des leads qualifiés organiquement. Chaque pièce de contenu est optimisée pour le SEO et la conversion.",
      },
    ],
    faqs: [
      { q: "Quel budget minimum pour la publicité Facebook au Maroc ?", a: "Nous recommandons un budget publicitaire minimum de 1 000 DH/mois pour des résultats significatifs, en plus de nos frais de gestion. Plus le budget est élevé, plus les résultats sont rapides et importants." },
      { q: "Gérez-vous les comptes Instagram et TikTok ?", a: "Oui. Nous gérons Facebook, Instagram, TikTok, LinkedIn et YouTube. Chaque plateforme reçoit du contenu adapté à son format et son audience." },
      { q: "Comment mesurez-vous les résultats ?", a: "Nous mesurons les KPIs clés : portée, engagement, clics, leads générés, coût par lead et ROAS. Vous recevez un rapport détaillé chaque mois." },
      { q: "Créez-vous aussi les visuels et vidéos publicitaires ?", a: "Oui. Notre offre inclut la création de visuels, de vidéos courtes (Reels/Stories) et de copies publicitaires optimisées pour la conversion." },
    ],
    pricing: [
      { name: "Pack Starter", price: "2 500 DH/mois", features: ["1 plateforme", "8 publications/mois", "Community management", "Reporting mensuel", "1 campagne pub", "Support email"] },
      { name: "Pack Business", price: "5 000 DH/mois", features: ["2 plateformes", "16 publications/mois", "Stories & Reels", "Google Ads inclus", "2 campagnes pub", "Reporting bi-mensuel"] },
      { name: "Pack Premium", price: "10 000 DH/mois", features: ["Toutes plateformes", "30 publications/mois", "Vidéo marketing", "Stratégie complète", "Campagnes illimitées", "Account manager dédié"] },
    ],
    results: [
      { metric: "Leads générés/mois", value: "100+" },
      { metric: "ROAS moyen", value: "x5" },
      { metric: "Réduction CPA", value: "-40%" },
      { metric: "Taux d'engagement", value: "+250%" },
    ],
  },
  "montage-video": {
    sections: [
      {
        title: "Le pouvoir de la vidéo en marketing digital",
        content: "La vidéo est le format le plus engageant sur les réseaux sociaux. Les publications vidéo génèrent 10x plus d'engagement que les images statiques. Les algorithmes de Facebook, Instagram et TikTok favorisent massivement le contenu vidéo. Que ce soit pour des Reels Instagram, des publicités Facebook ou du contenu YouTube, la vidéo est un outil incontournable pour se démarquer au Maroc.",
      },
      {
        title: "Vidéos publicitaires qui convertissent",
        content: "Nous créons des vidéos publicitaires professionnelles conçues pour capter l'attention dans les 3 premières secondes et inciter à l'action. Chaque vidéo est optimisée pour la plateforme de diffusion : format vertical 9:16 pour Instagram/TikTok, horizontal 16:9 pour YouTube, carré 1:1 pour le feed Facebook. Script, tournage et montage — nous gérons tout le processus créatif.",
      },
      {
        title: "Motion graphics et animation",
        content: "Les animations et motion graphics donnent vie à votre marque avec un professionnalisme qui marque les esprits. Parfaits pour expliquer un produit complexe, présenter des statistiques de manière visuelle ou créer une identité visuelle mémorable. Nous réalisons des animations de logo, des infographies animées et des vidéos explicatives.",
      },
    ],
    faqs: [
      { q: "Combien coûte un montage vidéo professionnel ?", a: "À partir de 500 DH pour un Reel/Story simple. Les vidéos publicitaires complètes démarrent à 1 500 DH. Les projets plus complexes (corporate, motion graphics) à partir de 3 000 DH." },
      { q: "Fournissez-vous le tournage vidéo ?", a: "Nous nous spécialisons dans le montage et le post-production. Pour le tournage, nous travaillons avec un réseau de vidéastes au Maroc ou nous pouvons monter vos rushs existants." },
      { q: "Quels formats vidéo produisez-vous ?", a: "Tous les formats : Reels (9:16), YouTube (16:9), Feed (1:1 et 4:5), Stories, publicités vidéo, vidéos corporate, motion graphics, animations de logo et sous-titrage." },
    ],
    pricing: [
      { name: "Reels & Stories", price: "500 DH", features: ["Format vertical 9:16", "Sous-titrage", "Musique & effets", "Livraison 48h", "1 révision incluse", "Formats optimisés"] },
      { name: "Vidéo Publicitaire", price: "1 500 DH", features: ["Script + storyboard", "Montage professionnel", "Motion graphics", "Musique licenciée", "3 révisions", "Multi-format export"] },
      { name: "Vidéo Corporate", price: "3 000 DH", features: ["Direction artistique", "Motion graphics avancé", "Animation de logo", "Voice-over", "Révisions illimitées", "Tous formats"] },
    ],
    results: [
      { metric: "Engagement vidéo", value: "+1000%" },
      { metric: "Vues moyennes/vidéo", value: "50K+" },
      { metric: "Vidéos produites", value: "200+" },
      { metric: "Délai de livraison", value: "48h" },
    ],
  },
  "email-marketing": {
    sections: [
      {
        title: "L'email marketing : le ROI le plus élevé du marketing digital",
        content: "L'email marketing offre un retour sur investissement moyen de 42 DH pour chaque 1 DH dépensé — le canal de marketing digital le plus rentable qui existe. Contrairement aux réseaux sociaux où la portée organique ne cesse de diminuer, l'email vous donne un accès direct à votre audience. Nous concevons des campagnes email qui nourrissent vos leads, fidélisent vos clients et génèrent des ventes récurrentes.",
      },
      {
        title: "Automatisation marketing : vendez pendant que vous dormez",
        content: "Les séquences email automatisées travaillent pour vous 24h/24, 7j/7. Séquences de bienvenue pour les nouveaux abonnés qui présentent votre marque et construisent la confiance. Relances de paniers abandonnés pour l'e-commerce qui récupèrent 15-25% des ventes perdues. Séquences de nurturing pour les leads B2B qui transforment les prospects froids en clients chauds. Nous configurons des systèmes qui convertissent automatiquement.",
      },
      {
        title: "Newsletters qui engagent et fidélisent",
        content: "Une newsletter bien conçue maintient votre marque en tête de l'esprit de vos clients et génère du trafic récurrent vers votre site. Nous créons des templates sur mesure à votre image, rédigeons du contenu pertinent et engageant, segmentons votre audience pour des messages personnalisés et optimisons les heures d'envoi pour maximiser les taux d'ouverture et de clics.",
      },
    ],
    faqs: [
      { q: "Quel outil d'email marketing utilisez-vous ?", a: "Nous travaillons avec les meilleurs outils du marché : Mailchimp, Brevo (ex-Sendinblue), ConvertKit ou ActiveCampaign selon vos besoins et votre budget. Nous pouvons aussi migrer vos listes existantes." },
      { q: "Comment construire une liste email ?", a: "Nous mettons en place des stratégies d'acquisition : formulaires optimisés sur votre site, lead magnets (guides gratuits, checklist), popups intelligents et intégration avec vos réseaux sociaux." },
      { q: "Quel taux d'ouverture puis-je espérer ?", a: "Avec nos bonnes pratiques, nos clients obtiennent en moyenne 25-35% de taux d'ouverture (contre 15-20% en moyenne au Maroc). Le taux de clic moyen est de 3-5%." },
    ],
    pricing: [
      { name: "Starter", price: "1 500 DH/mois", features: ["2 newsletters/mois", "Template sur mesure", "1 séquence auto", "Jusqu'à 2 000 contacts", "Reporting mensuel", "Support email"] },
      { name: "Business", price: "3 000 DH/mois", features: ["4 newsletters/mois", "3 séquences auto", "Segmentation avancée", "Jusqu'à 10 000 contacts", "A/B testing", "Support prioritaire"] },
      { name: "Enterprise", price: "5 000 DH/mois", features: ["8 newsletters/mois", "Séquences illimitées", "Segmentation avancée", "Contacts illimités", "Reporting avancé", "Account manager dédié"] },
    ],
    results: [
      { metric: "ROI moyen", value: "x42" },
      { metric: "Taux d'ouverture", value: "32%" },
      { metric: "Paniers récupérés", value: "+25%" },
      { metric: "Emails envoyés/mois", value: "100K+" },
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
              url: "https://ayoubtouati.com",
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
