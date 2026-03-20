import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";
import { supabase } from "@/integrations/supabase/client";

interface DbPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  published_at: string | null;
}

interface BlogArticle {
  slug: string;
  title: string;
  metaTitle: string;
  metaDesc: string;
  category: string;
  date: string;
  readTime: string;
  sections: { heading: string; content: string }[];
  relatedServices: { label: string; href: string }[];
}

const articles: Record<string, BlogArticle> = {
  "combien-coute-site-web-maroc": {
    slug: "combien-coute-site-web-maroc",
    title: "Combien coûte un site web au Maroc en 2026 ?",
    metaTitle: "Combien coûte un site web au Maroc en 2026 ? Prix & Guide",
    metaDesc: "Guide complet des prix de création de sites web au Maroc : site vitrine dès 1 500 DH, e-commerce dès 8 000 DH. Tous les facteurs qui influencent le prix.",
    category: "Web",
    date: "2026-03-15",
    readTime: "8 min",
    sections: [
      {
        heading: "Les prix de création de sites web au Maroc en 2026",
        content: "Le marché de la création de sites web au Maroc a considérablement évolué. En 2026, les prix varient de 1000 DH pour un site vitrine simple à plus de 50 000 DH pour une application web complexe. Cette fourchette dépend de nombreux facteurs : le type de site, les fonctionnalités, le design, l'optimisation SEO et le prestataire choisi. Comprendre ces facteurs vous permet de budgétiser efficacement votre projet digital et d'éviter les mauvaises surprises.",
      },
      {
        heading: "Site vitrine : de 1 500 à 10 000 DH",
        content: "Un site vitrine présente votre entreprise, vos services et vos coordonnées de manière professionnelle. C'est le choix idéal pour les freelancers, les PME et les professionnels libéraux (médecins, avocats, architectes). À partir de 1 500 DH, vous obtenez un site de 5 à 7 pages responsive, optimisé pour le mobile et le SEO de base. Pour un design premium avec des animations, un formulaire de contact avancé et une optimisation SEO complète, comptez entre 6 000 et 10 000 DH. La livraison se fait généralement en 1 à 2 semaines.",
      },
      {
        heading: "Site e-commerce : de 1 000 à 25 000 DH",
        content: "Un site e-commerce vous permet de vendre vos produits en ligne avec un catalogue, un panier d'achat et un système de paiement sécurisé. Au Maroc, les solutions de paiement les plus utilisées sont CMI, Payzone et le paiement à la livraison. Un e-commerce basique avec 50 produits démarre à 8 000 DH. Pour un catalogue de plus de 500 produits avec gestion des stocks avancée, filtres de recherche, programme de fidélité et intégration avec des outils de marketing, les prix montent entre 15 000 et 25 000 DH.",
      },
      {
        heading: "Application web sur mesure : à partir de 5 000 DH",
        content: "Les applications web sur mesure répondent à des besoins spécifiques : systèmes de réservation en ligne pour les hôtels et restaurants, plateformes de gestion interne pour les entreprises, marketplaces ou portails clients. Ces projets nécessitent un développement personnalisé avec une base de données, des API, une authentification utilisateur et souvent des intégrations tierces. Les prix démarrent à 15 000 DH et peuvent atteindre 50 000 DH ou plus selon la complexité.",
      },
      {
        heading: "Les facteurs qui influencent le prix",
        content: "Plusieurs facteurs déterminent le coût final de votre site web au Maroc. Le design : un template adapté coûte moins cher qu'un design sur mesure créé de zéro. Les fonctionnalités : chaque fonctionnalité supplémentaire (blog, multilingue, espace membre, paiement en ligne) augmente le coût. L'optimisation SEO : un site optimisé pour Google nécessite un travail technique supplémentaire sur la vitesse, la structure et le contenu. La maintenance : un forfait de maintenance mensuel (500 à 1 500 DH/mois) assure la sécurité et les mises à jour de votre site.",
      },
      {
        heading: "Freelancer vs agence : que choisir ?",
        content: "Au Maroc, vous avez le choix entre un freelancer et une agence digitale. Un freelancer expert offre généralement un meilleur rapport qualité-prix, une communication directe et plus de flexibilité. Les agences offrent plus de ressources mais à des tarifs souvent 2 à 3 fois plus élevés. L'essentiel est de vérifier le portfolio, les avis clients et les compétences techniques du prestataire. Méfiez-vous des prix trop bas (moins de 2 000 DH) qui indiquent souvent l'utilisation de templates WordPress basiques sans personnalisation ni optimisation.",
      },
      {
        heading: "Pourquoi investir dans un site web professionnel ?",
        content: "En 2026, plus de 70% des consommateurs marocains recherchent en ligne avant d'acheter. Un site web professionnel est votre meilleur commercial : il travaille 24h/24, 7j/7. Les entreprises avec un site web optimisé génèrent en moyenne 3 fois plus de leads que celles qui n'en ont pas. Le retour sur investissement d'un site web professionnel se mesure en quelques mois grâce à l'augmentation du trafic, des contacts et des ventes. C'est un investissement, pas une dépense.",
      },
    ],
    relatedServices: [
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
      { label: "Refonte de Site Web", href: "/services/refonte-site-web" },
      { label: "Nos tarifs", href: "/tarifs" },
    ],
  },
  "seo-maroc-guide-complet": {
    slug: "seo-maroc-guide-complet",
    title: "SEO au Maroc : Le Guide Complet 2026",
    metaTitle: "SEO au Maroc : Le Guide Complet 2026 — Référencement Google",
    metaDesc: "Comment référencer votre site en première page de Google au Maroc. Stratégies SEO on-page, off-page et technique pour dominer les résultats.",
    category: "SEO",
    date: "2026-03-12",
    readTime: "12 min",
    sections: [
      {
        heading: "Pourquoi le SEO est crucial pour les entreprises au Maroc",
        content: "Le référencement naturel (SEO) est le levier d'acquisition le plus rentable pour les entreprises marocaines en 2026. Contrairement à la publicité payante qui coûte de plus en plus cher, le SEO génère du trafic gratuit et qualifié en continu. Au Maroc, la majorité des recherches Google sont effectuées en français et en arabe dialectal. Les entreprises qui maîtrisent le SEO captent ce trafic organique et transforment les visiteurs en clients sans payer de publicité.",
      },
      {
        heading: "SEO On-Page : les fondamentaux",
        content: "Le SEO on-page comprend toutes les optimisations réalisées directement sur votre site. Les éléments essentiels : les balises title (moins de 60 caractères avec votre mot-clé principal), les meta descriptions (moins de 160 caractères qui incitent au clic), les balises H1 à H6 structurées hiérarchiquement, les URLs propres et descriptives, le maillage interne entre vos pages et l'optimisation des images (compression, attributs alt, format WebP). Chaque page doit cibler un mot-clé principal et 3 à 5 mots-clés secondaires.",
      },
      {
        heading: "SEO Technique : la base de votre performance",
        content: "Un site techniquement optimisé est la fondation d'un bon référencement. Les Core Web Vitals de Google mesurent la vitesse de chargement (LCP < 2.5s), l'interactivité (FID < 100ms) et la stabilité visuelle (CLS < 0.1). Au Maroc, où les connexions mobiles sont souvent plus lentes, la performance technique est encore plus importante. Utilisez des technologies modernes comme React au lieu de WordPress pour des temps de chargement ultra-rapides. Assurez-vous que votre site est 100% responsive mobile, que le certificat SSL est actif et que le fichier robots.txt et le sitemap XML sont correctement configurés.",
      },
      {
        heading: "SEO Local : dominez Google Maps au Maroc",
        content: "Le SEO local est essentiel pour les entreprises qui ciblent une ville ou une région. Optimisez votre fiche Google My Business avec des photos professionnelles, des horaires à jour, une description riche en mots-clés et des réponses à tous les avis. Créez des pages localisées pour chaque ville ciblée avec du contenu unique mentionnant les spécificités locales. Obtenez des citations sur les annuaires marocains (Pages Jaunes Maroc, Avito, etc.) avec des informations NAP (Nom, Adresse, Téléphone) cohérentes.",
      },
      {
        heading: "Stratégie de contenu SEO pour le marché marocain",
        content: "Le contenu est le carburant du SEO. Au Maroc, créez du contenu en français (et en arabe si votre audience le justifie) qui répond aux questions que se posent vos clients potentiels. Identifiez les mots-clés à fort volume de recherche avec des outils comme Google Keyword Planner, Ubersuggest ou Semrush. Rédigez des articles de blog de 1 000 à 2 000 mots qui couvrent le sujet en profondeur. Intégrez des liens internes vers vos pages de services et des CTAs stratégiques pour convertir les lecteurs en leads.",
      },
      {
        heading: "Netlinking : construisez votre autorité",
        content: "Les backlinks (liens entrants depuis d'autres sites) sont un facteur de classement majeur pour Google. Au Maroc, les meilleures stratégies de netlinking incluent : les articles invités sur des blogs et médias marocains, les inscriptions sur les annuaires professionnels locaux, les partenariats avec d'autres entreprises complémentaires, les témoignages clients avec lien retour et la création de contenu de qualité qui attire naturellement les liens. Évitez les techniques de spam (achat de liens en masse) qui peuvent entraîner des pénalités Google.",
      },
      {
        heading: "Combien de temps pour voir des résultats SEO ?",
        content: "Le SEO est un investissement à moyen-long terme. Les premiers résultats apparaissent généralement entre 1 et 3 mois : amélioration du positionnement pour les mots-clés peu concurrentiels, augmentation du trafic organique. Les résultats significatifs (positions en première page pour des mots-clés compétitifs) sont atteints entre 3 et 6 mois. Après 12 mois d'efforts constants, le trafic organique peut augmenter de 300 à 500%. Le ROI du SEO est exceptionnel : contrairement à la publicité payante, les résultats persistent même si vous réduisez vos efforts.",
      },
    ],
    relatedServices: [
      { label: "Référencement SEO", href: "/services/referencement-seo" },
      { label: "Audit SEO Gratuit", href: "/audit-seo-gratuit" },
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
    ],
  },
  "marketing-digital-pme-maroc": {
    slug: "marketing-digital-pme-maroc",
    title: "Marketing Digital pour les PME au Maroc : Stratégies Efficaces",
    metaTitle: "Marketing Digital PME Maroc — Stratégies Efficaces 2026",
    metaDesc: "Les stratégies de marketing digital les plus rentables pour les PME marocaines. Facebook Ads, SEO, email marketing et plus.",
    category: "Marketing",
    date: "2026-03-10",
    readTime: "10 min",
    sections: [
      {
        heading: "Pourquoi le marketing digital est vital pour les PME marocaines",
        content: "Les PME marocaines représentent 93% du tissu économique du pays, mais moins de 30% ont une présence digitale efficace. En 2026, le marketing digital n'est plus optionnel — c'est une nécessité pour survivre et croître. Les consommateurs marocains passent en moyenne 3 heures par jour sur les réseaux sociaux et effectuent des millions de recherches Google quotidiennement. Les PME qui investissent dans le digital obtiennent un avantage concurrentiel décisif : visibilité accrue, acquisition de clients à moindre coût et fidélisation efficace.",
      },
      {
        heading: "Facebook Ads : le canal roi pour les PME au Maroc",
        content: "Avec plus de 22 millions d'utilisateurs Facebook au Maroc, c'est le canal publicitaire le plus puissant pour les PME. Un budget de 1 000 à 3 000 DH/mois peut générer des résultats significatifs si les campagnes sont bien optimisées. Les clés du succès : un ciblage précis par ville, âge, centres d'intérêt et comportements ; des visuels professionnels qui captent l'attention en 3 secondes ; des copies publicitaires qui adressent les problèmes de votre audience ; et un suivi des conversions pour mesurer le ROI de chaque dirham dépensé.",
      },
      {
        heading: "SEO : le trafic gratuit qui ne s'arrête jamais",
        content: "Le référencement naturel est l'investissement le plus rentable à long terme pour les PME. Un site bien référencé génère du trafic gratuit 24h/24. Pour une PME au Maroc, les mots-clés locaux (\"restaurant marrakech\", \"plombier casablanca\", \"avocat rabat\") sont souvent moins compétitifs et plus faciles à positionner que les mots-clés nationaux. L'investissement en SEO (2 000 à 4 000 DH/mois) se rentabilise en quelques mois grâce au trafic organique gratuit.",
      },
      {
        heading: "Instagram et TikTok : engagez votre audience",
        content: "Instagram est incontournable pour les entreprises B2C au Maroc, surtout dans la restauration, la mode, la beauté et l'événementiel. TikTok explose avec une audience jeune (18-34 ans) très engagée et des coûts publicitaires encore 40% inférieurs à Facebook. Créez du contenu authentique : coulisses de votre entreprise, témoignages clients, tutoriels et conseils. La régularité est clé : publiez 3 à 5 fois par semaine avec un mix de photos, vidéos courtes (Reels/TikTok) et Stories.",
      },
      {
        heading: "Email marketing : fidélisez et vendez",
        content: "L'email marketing offre le meilleur ROI de tous les canaux digitaux : 42 DH pour chaque 1 DH dépensé en moyenne. Pour les PME marocaines, c'est un outil puissant pour fidéliser les clients existants et générer des ventes récurrentes. Construisez votre liste email avec des lead magnets (guides gratuits, réductions), envoyez des newsletters bimensuelles avec du contenu utile et des promotions, et automatisez les séquences de bienvenue et de relance. Des outils comme Brevo (ex-Sendinblue) offrent des forfaits gratuits pour commencer.",
      },
      {
        heading: "Budget marketing digital recommandé pour les PME",
        content: "Pour une PME au Maroc, nous recommandons un budget marketing digital mensuel de 3 000 à 10 000 DH réparti comme suit : 40% en publicité (Facebook Ads et/ou Google Ads), 30% en SEO et création de contenu, 20% en gestion des réseaux sociaux et 10% en email marketing et automatisation. Commencez par un canal, mesurez les résultats, puis élargissez progressivement. L'erreur la plus courante est de vouloir tout faire en même temps avec un budget insuffisant. Concentrez vos efforts là où votre audience est la plus active.",
      },
    ],
    relatedServices: [
      { label: "Marketing Digital", href: "/services/marketing-digital" },
      { label: "Publicité Réseaux Sociaux", href: "/services/publicite-reseaux-sociaux" },
      { label: "Email Marketing", href: "/services/email-marketing" },
    ],
  },
  "creer-site-rentable-maroc": {
    slug: "creer-site-rentable-maroc",
    title: "Comment créer un site web rentable au Maroc",
    metaTitle: "Comment créer un site web rentable au Maroc — Guide 2026",
    metaDesc: "Guide étape par étape pour créer un site web qui génère des clients au Maroc. De la conception à l'optimisation conversion.",
    category: "Web",
    date: "2026-03-08",
    readTime: "9 min",
    sections: [
      {
        heading: "Un site rentable vs un simple site vitrine",
        content: "La plupart des sites web au Maroc ne génèrent aucun retour sur investissement. Ils existent, mais ne travaillent pas pour l'entreprise. Un site web rentable est conçu dès le départ pour atteindre des objectifs business : générer des leads, vendre des produits ou prendre des rendez-vous. La différence réside dans l'approche : au lieu de simplement afficher des informations, chaque page est optimisée pour guider le visiteur vers une action précise.",
      },
      {
        heading: "Étape 1 : Définir vos objectifs de conversion",
        content: "Avant de coder la première ligne, définissez clairement ce que votre site doit accomplir. Pour un restaurant : réservations en ligne. Pour un e-commerce : ventes de produits. Pour un prestataire de services : demandes de devis. Chaque objectif se traduit par un KPI mesurable. Un site sans objectif clair est un site qui coûte de l'argent sans en rapporter.",
      },
      {
        heading: "Étape 2 : Concevoir pour la conversion",
        content: "Le design de votre site doit servir la conversion. Placez votre proposition de valeur unique au-dessus de la ligne de flottaison. Utilisez des CTAs (appels à l'action) visibles et contrastés à chaque scroll. Intégrez des preuves sociales : témoignages clients, logos de partenaires, nombre de projets réalisés. Simplifiez la navigation : en 3 clics maximum, un visiteur doit pouvoir vous contacter ou acheter. Sur mobile, ajoutez un bouton WhatsApp sticky pour le contact instantané.",
      },
      {
        heading: "Étape 3 : Optimiser pour Google (SEO)",
        content: "Un site web rentable doit être visible sur Google. Optimisez chaque page pour un mot-clé principal. Créez du contenu de qualité qui répond aux questions de vos clients potentiels. Assurez-vous que votre site se charge en moins de 2 secondes. Construisez un maillage interne solide entre vos pages. Un site bien référencé génère du trafic organique gratuit qui se convertit en clients sans budget publicitaire.",
      },
      {
        heading: "Étape 4 : Mesurer et optimiser en continu",
        content: "Installez Google Analytics et Google Search Console pour suivre vos performances. Mesurez le taux de conversion de chaque page, le parcours utilisateur, les sources de trafic et le coût d'acquisition par canal. Testez régulièrement des variations (textes, couleurs de boutons, positionnement des CTAs) pour améliorer le taux de conversion. Un site rentable n'est jamais \"terminé\" — il est constamment optimisé.",
      },
    ],
    relatedServices: [
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
      { label: "Référencement SEO", href: "/services/referencement-seo" },
      { label: "Nos tarifs", href: "/tarifs" },
    ],
  },
  "facebook-ads-maroc-guide": {
    slug: "facebook-ads-maroc-guide",
    title: "Facebook Ads au Maroc : Guide Complet pour Débutants",
    metaTitle: "Facebook Ads Maroc — Guide Complet Débutants 2026",
    metaDesc: "Comment lancer des campagnes publicitaires rentables sur Facebook et Instagram au Maroc. Ciblage, budget, formats et optimisation.",
    category: "Marketing",
    date: "2026-03-05",
    readTime: "11 min",
    sections: [
      {
        heading: "Facebook Ads au Maroc : un potentiel énorme",
        content: "Le Maroc compte plus de 22 millions d'utilisateurs Facebook et 10 millions sur Instagram. C'est le pays d'Afrique du Nord avec le plus fort taux de pénétration des réseaux sociaux. Pour les entreprises, cela représente une opportunité publicitaire colossale. Les coûts publicitaires au Maroc restent parmi les plus bas au monde : un CPM (coût pour 1 000 impressions) de 5 à 15 DH contre 30 à 80 DH en Europe. Cette accessibilité permet aux PME marocaines de rivaliser avec les grandes entreprises en termes de visibilité.",
      },
      {
        heading: "Ciblage : touchez les bonnes personnes",
        content: "Le ciblage est la clé du succès de vos campagnes Facebook Ads. Au Maroc, combinez plusieurs critères : la géolocalisation (ville, rayon en km), les données démographiques (âge, genre, statut), les centres d'intérêt (mode, technologie, gastronomie) et les comportements (acheteurs en ligne, voyageurs fréquents). Les audiences lookalike basées sur vos clients existants sont souvent les plus performantes. Créez des audiences personnalisées à partir des visiteurs de votre site web pour le retargeting.",
      },
      {
        heading: "Formats publicitaires qui fonctionnent au Maroc",
        content: "Les formats les plus performants au Maroc : les vidéos courtes (15-30 secondes) génèrent 3 fois plus d'engagement. Les carrousels permettent de montrer plusieurs produits ou étapes. Les Reels Ads captent l'attention des 18-34 ans. Les Stories Ads offrent une expérience immersive en plein écran. Pour les visuels statiques, utilisez des images de haute qualité avec un texte minimal (moins de 20% de l'image). Les copies publicitaires en français ou en darija marocaine fonctionnent mieux que le français académique.",
      },
      {
        heading: "Budget et enchères : optimisez chaque dirham",
        content: "Commencez avec un budget de 30 à 50 DH/jour par campagne. Utilisez l'optimisation automatique du budget (CBO) pour que Facebook distribue votre budget vers les audiences les plus performantes. Testez 3 à 5 variations de visuels et de textes dans chaque campagne. Après 3 à 5 jours de données, désactivez les variantes sous-performantes et réallouez le budget. Un ROAS (Return On Ad Spend) de 3x à 5x est un objectif réaliste pour une campagne bien optimisée au Maroc.",
      },
      {
        heading: "Erreurs à éviter dans vos campagnes",
        content: "Les erreurs les plus courantes : ciblage trop large (tout le Maroc sans segmentation), absence de suivi des conversions (pixel Facebook non installé), visuels amateurs, copie publicitaire sans appel à l'action clair, budget trop faible par campagne (moins de 20 DH/jour), ne pas tester plusieurs variantes et optimiser trop tôt (avant d'avoir accumulé assez de données). Évitez aussi de dupliquer les campagnes qui fonctionnent — élargissez progressivement l'audience à la place.",
      },
    ],
    relatedServices: [
      { label: "Publicité Réseaux Sociaux", href: "/services/publicite-reseaux-sociaux" },
      { label: "Marketing Digital", href: "/services/marketing-digital" },
      { label: "Google Ads", href: "/services/google-ads" },
    ],
  },
  "email-marketing-guide-maroc": {
    slug: "email-marketing-guide-maroc",
    title: "Email Marketing au Maroc : Guide Pratique",
    metaTitle: "Email Marketing Maroc — Guide Pratique 2026",
    metaDesc: "Comment construire une liste email et créer des campagnes qui convertissent au Maroc. Automatisation, newsletters et séquences.",
    category: "Email",
    date: "2026-03-03",
    readTime: "8 min",
    sections: [
      {
        heading: "L'email marketing au Maroc : un canal sous-exploité",
        content: "L'email marketing est le canal digital le plus rentable avec un ROI de 42:1 en moyenne. Au Maroc, très peu d'entreprises l'utilisent correctement, ce qui représente une opportunité énorme. Pendant que vos concurrents dépensent des milliers de dirhams en publicité Facebook, vous pouvez toucher vos clients directement dans leur boîte email pour une fraction du coût. L'email est le seul canal où vous possédez réellement votre audience — contrairement aux réseaux sociaux où les algorithmes peuvent réduire votre portée du jour au lendemain.",
      },
      {
        heading: "Construire votre liste email",
        content: "La qualité de votre liste email détermine le succès de vos campagnes. N'achetez jamais de listes : elles sont remplies d'adresses invalides et vos emails finiront en spam. Construisez votre liste organiquement avec des lead magnets : guides gratuits PDF, checklist, réductions exclusives, accès anticipé à vos promotions. Placez des formulaires d'inscription sur votre site web (header, footer, popup intelligent après 30 secondes), sur vos réseaux sociaux et dans votre signature email professionnelle.",
      },
      {
        heading: "Automatisation : vendez pendant que vous dormez",
        content: "Les séquences email automatisées sont le secret des entreprises qui scalent. Séquence de bienvenue (3-5 emails sur 7 jours) : présentez votre marque, partagez votre histoire, offrez de la valeur et proposez votre premier produit/service. Séquence de relance panier abandonné (pour l'e-commerce) : récupérez 15-25% des ventes perdues avec 3 emails dans les 48h. Séquence de nurturing B2B : éduquez vos prospects avec du contenu utile avant de proposer vos services. Des outils comme Brevo ou Mailchimp automatisent tout le processus.",
      },
      {
        heading: "Newsletters qui engagent",
        content: "Envoyez 2 à 4 newsletters par mois avec un ratio 80/20 : 80% de contenu utile, 20% de promotion. Les sujets d'email performants au Maroc : les chiffres (\"5 astuces pour...\"), les questions (\"Votre site web est-il visible sur Google ?\"), l'urgence (\"Dernière chance : -30% ce week-end\"). Personnalisez avec le prénom du destinataire. Optimisez pour le mobile car 70% des emails sont lus sur smartphone. Le meilleur moment d'envoi au Maroc : mardi et jeudi entre 10h et 14h.",
      },
    ],
    relatedServices: [
      { label: "Email Marketing", href: "/services/email-marketing" },
      { label: "Marketing Digital", href: "/services/marketing-digital" },
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
    ],
  },
  "meilleur-freelance-web-maroc": {
    slug: "meilleur-freelance-web-maroc",
    title: "Comment choisir le meilleur freelance web au Maroc",
    metaTitle: "Meilleur Freelance Web Maroc — Comment Choisir en 2026",
    metaDesc: "Les critères essentiels pour sélectionner un développeur web freelance au Maroc. Portfolio, technologies, prix et garanties.",
    category: "Web",
    date: "2026-02-28",
    readTime: "7 min",
    sections: [
      {
        heading: "Freelancer vs agence au Maroc : les différences clés",
        content: "Le marché du développement web au Maroc offre deux options principales : les freelancers et les agences. Les freelancers offrent un contact direct, des prix compétitifs (30 à 50% moins cher qu'une agence) et plus de flexibilité. Les agences apportent plus de ressources et de spécialistes, mais à un coût plus élevé. Pour les PME et les projets de taille moyenne, un freelancer expérimenté est souvent le meilleur choix en termes de rapport qualité-prix.",
      },
      {
        heading: "Les critères pour choisir votre freelance web",
        content: "Vérifiez ces 5 critères avant de choisir : 1) Le portfolio avec des projets similaires au vôtre et des résultats mesurables. 2) Les technologies utilisées : React/TypeScript est supérieur à WordPress en termes de performance. 3) Les avis clients vérifiables. 4) La réactivité et la communication. 5) Les garanties : délais de livraison écrits, nombre de révisions incluses, support post-livraison. Demandez toujours un devis détaillé et un planning avant de vous engager.",
      },
      {
        heading: "Les red flags à surveiller",
        content: "Méfiez-vous de : prix anormalement bas (moins de 2 000 DH pour un site), absence de portfolio, promesses irréalistes (\"premier sur Google en 1 semaine\"), pas de contrat écrit, demande de paiement intégral avant le début du projet, utilisation exclusive de templates WordPress sans personnalisation. Un professionnel sérieux accepte toujours un acompte de 50% avec le solde à la livraison et fournit un contrat détaillé.",
      },
    ],
    relatedServices: [
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
      { label: "Nos tarifs", href: "/tarifs" },
      { label: "Nos réalisations", href: "/realisations" },
    ],
  },
  "seo-local-maroc": {
    slug: "seo-local-maroc",
    title: "SEO Local au Maroc : Dominez Google Maps dans votre ville",
    metaTitle: "SEO Local Maroc — Dominez Google Maps dans votre ville",
    metaDesc: "Guide complet du SEO local pour les entreprises marocaines. Google My Business, citations locales, avis clients et contenu localisé.",
    category: "SEO",
    date: "2026-02-25",
    readTime: "9 min",
    sections: [
      {
        heading: "Le SEO local : une mine d'or pour les entreprises marocaines",
        content: "46% de toutes les recherches Google ont une intention locale. Quand quelqu'un tape \"dentiste casablanca\" ou \"restaurant près de moi\", Google affiche les résultats locaux en priorité : la carte Google Maps avec les 3 premiers résultats (le Local Pack). Être dans ce Top 3 signifie une visibilité massive et un flux constant de clients. Pour les entreprises avec une localisation physique au Maroc, le SEO local est la stratégie la plus rentable.",
      },
      {
        heading: "Google My Business : votre vitrine gratuite",
        content: "Google My Business (GMB) est la pierre angulaire du SEO local. Créez et optimisez votre fiche avec : toutes vos informations à jour (horaires, téléphone, adresse exacte), des photos professionnelles de votre établissement (Google favorise les fiches avec 10+ photos), une description riche en mots-clés locaux, la catégorie d'activité la plus précise possible, les services proposés et les zones desservies. Publiez régulièrement des posts GMB (promotions, actualités) pour montrer à Google que votre fiche est active.",
      },
      {
        heading: "Avis clients : le facteur de classement #1",
        content: "Les avis Google sont le facteur de classement local le plus important. Les entreprises avec plus de 50 avis et une note supérieure à 4.5 dominent les résultats locaux. Demandez systématiquement à vos clients satisfaits de laisser un avis : envoyez un lien direct par WhatsApp ou email après chaque prestation. Répondez à TOUS les avis, positifs comme négatifs, dans les 24h. Les réponses montrent à Google et aux futurs clients que vous êtes engagé.",
      },
      {
        heading: "Contenu localisé et pages de villes",
        content: "Créez des pages de contenu optimisées pour chaque ville que vous ciblez. Chaque page doit contenir du contenu unique mentionnant les spécificités locales : économie, industries, population, défis. Intégrez des mots-clés locaux naturellement : \"création site web casablanca\", \"agence SEO rabat\". Ajoutez un schéma LocalBusiness JSON-LD sur chaque page locale. Construisez un maillage interne entre votre page principale, vos pages de services et vos pages locales.",
      },
    ],
    relatedServices: [
      { label: "Référencement SEO", href: "/services/referencement-seo" },
      { label: "Audit SEO Gratuit", href: "/audit-seo-gratuit" },
      { label: "Agence Digitale Maroc", href: "/agence-digitale-maroc" },
    ],
  },
  "optimisation-site-web-maroc": {
    slug: "optimisation-site-web-maroc",
    title: "Optimisation de la vitesse d'un site web au Maroc",
    metaTitle: "Optimiser la vitesse de votre site web au Maroc — Guide",
    metaDesc: "Comment accélérer votre site pour un meilleur SEO et UX. Core Web Vitals, compression, CDN et bonnes pratiques.",
    category: "Web",
    date: "2026-02-22",
    readTime: "8 min",
    sections: [
      {
        heading: "Pourquoi la vitesse de votre site est cruciale au Maroc",
        content: "Au Maroc, où une grande partie du trafic web provient de connexions mobiles 4G, la vitesse de chargement est encore plus critique qu'ailleurs. 53% des visiteurs mobiles quittent un site qui met plus de 3 secondes à charger. Google utilise la vitesse comme facteur de classement SEO depuis 2018 avec les Core Web Vitals. Un site lent ne se contente pas de frustrer vos visiteurs — il vous rend invisible sur Google.",
      },
      {
        heading: "Core Web Vitals : les métriques qui comptent",
        content: "Google mesure 3 métriques clés : LCP (Largest Contentful Paint) mesure le temps d'affichage du plus grand élément visible — objectif : moins de 2.5 secondes. FID (First Input Delay) mesure le temps de réponse à la première interaction — objectif : moins de 100ms. CLS (Cumulative Layout Shift) mesure la stabilité visuelle — objectif : moins de 0.1. Testez votre site avec Google PageSpeed Insights et visez un score de 90+.",
      },
      {
        heading: "Techniques d'optimisation pratiques",
        content: "Les techniques les plus efficaces : compression des images en format WebP (réduction de 30-50% du poids), lazy loading des images hors écran, minification du CSS et JavaScript, utilisation d'un CDN (CloudFlare est gratuit), mise en cache du navigateur, suppression des scripts tiers inutiles, optimisation des polices web (utilisation de font-display: swap) et préchargement des ressources critiques. Pour les sites WordPress, désactivez les plugins inutiles — chaque plugin ajoute du poids.",
      },
    ],
    relatedServices: [
      { label: "Création de Sites Web", href: "/services/creation-site-web" },
      { label: "Refonte de Site Web", href: "/services/refonte-site-web" },
      { label: "Référencement SEO", href: "/services/referencement-seo" },
    ],
  },
  "strategie-digitale-maroc": {
    slug: "strategie-digitale-maroc",
    title: "Stratégie digitale pour entreprises marocaines en 2026",
    metaTitle: "Stratégie digitale entreprises Maroc — Guide Complet 2026",
    metaDesc: "Comment construire une stratégie digitale complète au Maroc : site web, SEO, réseaux sociaux, publicité payante et email marketing.",
    category: "Marketing",
    date: "2026-02-20",
    readTime: "13 min",
    sections: [
      {
        heading: "Les 5 piliers d'une stratégie digitale gagnante au Maroc",
        content: "Une stratégie digitale efficace au Maroc repose sur 5 piliers interconnectés : 1) Un site web performant qui convertit. 2) Le référencement SEO pour du trafic gratuit. 3) La publicité payante (Facebook Ads, Google Ads) pour des résultats immédiats. 4) Les réseaux sociaux pour la notoriété et l'engagement. 5) L'email marketing pour la fidélisation. Chaque pilier renforce les autres. Un site web sans trafic ne sert à rien. Du trafic sans conversion est du gaspillage. L'objectif est de construire un système intégré.",
      },
      {
        heading: "Audit de votre présence digitale actuelle",
        content: "Avant de construire votre stratégie, réalisez un audit complet : votre site web est-il rapide, responsive et optimisé SEO ? Avez-vous une fiche Google My Business optimisée ? Quelle est votre visibilité sur Google pour vos mots-clés principaux ? Quelle est votre présence sur les réseaux sociaux ? Avez-vous une liste email ? Analysez aussi vos concurrents : que font-ils en ligne et comment pouvez-vous faire mieux ?",
      },
      {
        heading: "Planification et budget",
        content: "Répartissez votre budget selon vos objectifs. Pour la notoriété : 60% réseaux sociaux, 40% contenu. Pour la génération de leads : 50% publicité payante, 30% SEO, 20% contenu. Pour la fidélisation : 50% email marketing, 30% réseaux sociaux, 20% contenu. Un budget mensuel minimum de 5 000 DH est recommandé pour une stratégie digitale complète. Commencez par les canaux avec le ROI le plus rapide (publicité payante) et investissez progressivement dans les canaux à long terme (SEO, contenu).",
      },
      {
        heading: "Mesure des résultats et KPIs",
        content: "Définissez des KPIs clairs pour chaque canal : trafic web (sessions, pages vues, taux de rebond), SEO (positions, trafic organique, mots-clés positionnés), publicité (ROAS, CPA, taux de conversion), réseaux sociaux (portée, engagement, clics), email (taux d'ouverture, taux de clic, conversions). Utilisez Google Analytics, Google Search Console, les insights Facebook/Instagram et les statistiques de votre outil d'emailing. Créez un tableau de bord mensuel pour suivre l'évolution.",
      },
    ],
    relatedServices: [
      { label: "Marketing Digital", href: "/services/marketing-digital" },
      { label: "Référencement SEO", href: "/services/referencement-seo" },
      { label: "Audit SEO Gratuit", href: "/audit-seo-gratuit" },
    ],
  },
};

const DbBlogPost = ({ post }: { post: DbPost }) => {
  const displayDate = post.published_at ? new Date(post.published_at) : new Date(post.created_at);
  return (
    <Layout>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        path={`/blog/${post.slug}`}
      />
      <Breadcrumb items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
      <article>
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl mx-auto">{post.excerpt}</p>
              )}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {displayDate.toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div
              className="mx-auto max-w-3xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-accent/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Besoin d'aide pour votre projet digital ?</h3>
                <p className="text-muted-foreground mb-6">Obtenez un devis gratuit personnalisé sous 24h. Sans engagement.</p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-10 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" /> Tous les articles
              </Link>
              <Link to="/services" className="inline-flex items-center text-sm font-semibold text-accent">
                Nos services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const [dbPost, setDbPost] = useState<DbPost | null>(null);
  const [dbLoading, setDbLoading] = useState(false);

  const article = postSlug ? articles[postSlug] : null;

  useEffect(() => {
    if (!article && postSlug) {
      setDbLoading(true);
      setDbPost(null);
      supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", postSlug)
        .eq("published", true)
        .maybeSingle()
        .then(({ data }) => {
          setDbPost(data as DbPost | null);
          setDbLoading(false);
        });
    }
  }, [postSlug, article]);

  if (!article && dbLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (!article && dbPost) {
    return <DbBlogPost post={dbPost} />;
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Article non trouvé</h1>
          <Link to="/blog" className="text-accent mt-4 inline-block">← Retour au blog</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDesc}
        path={`/blog/${article.slug}`}
      />

      <Breadcrumb items={[
        { label: "Blog", href: "/blog" },
        { label: article.title },
      ]} />

      <article>
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-accent mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {article.title}
              </h1>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {article.readTime} de lecture
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-12">
              {article.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-4 md:text-2xl">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA mid-article */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-accent/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-3">Besoin d'aide pour votre projet digital ?</h3>
                <p className="text-muted-foreground mb-6">
                  Obtenez un devis gratuit personnalisé sous 24h. Sans engagement.
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">
                      Demander un devis gratuit <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related services */}
        <section className="py-10">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h3 className="text-lg font-bold mb-4">Services associés</h3>
              <div className="flex flex-wrap gap-2">
                {article.relatedServices.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  to="/audit-seo-gratuit"
                  className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
                >
                  Audit SEO gratuit →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" /> Tous les articles
              </Link>
              <Link to="/services" className="inline-flex items-center text-sm font-semibold text-accent">
                Nos services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>

      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: article.title,
            description: article.metaDesc,
            datePublished: article.date,
            dateModified: article.date,
            author: {
              "@type": "Person",
              name: CONTACT.name,
              url: "https://ayoubtouati.com",
            },
            publisher: {
              "@type": "Organization",
              name: CONTACT.name,
              url: "https://ayoubtouati.com",
            },
            mainEntityOfPage: `https://ayoubtouati.com/blog/${article.slug}`,
          }),
        }}
      />
    </Layout>
  );
};

export default BlogPost;
