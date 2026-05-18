export const serviceContent: Record<string, {
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
      { metric: "Projets livrés", value: "9+" },
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
  "refonte-site-web": {
    sections: [
      {
        title: "Pourquoi refondre votre site web au Maroc ?",
        content: "Un site web vieillissant coûte plus cher qu'une refonte. Chaque jour avec un site lent et obsolète, vous perdez des clients potentiels. Les utilisateurs forment leur première impression en 0.05 secondes. Un design daté, un temps de chargement supérieur à 3 secondes ou une expérience mobile défaillante font fuir 53% de vos visiteurs. La refonte de votre site est un investissement qui se rentabilise en quelques mois grâce à l'amélioration du taux de conversion.",
      },
      {
        title: "De WordPress à la performance moderne",
        content: "Si votre site actuel est sous WordPress avec des dizaines de plugins, il souffre probablement de lenteur, de failles de sécurité et de limitations techniques. Nous migrons votre site vers des technologies modernes (React, TypeScript) qui offrent des temps de chargement inférieurs à 2 secondes, une sécurité renforcée et une expérience utilisateur fluide. Le résultat : un score PageSpeed qui passe de 30-40 à 90+.",
      },
      {
        title: "Migration SEO sans perte de trafic",
        content: "La refonte d'un site web comporte un risque majeur : la perte de positionnement SEO. Notre méthodologie inclut un audit SEO complet avant la refonte, la mise en place de redirections 301 pour chaque URL, le transfert de tout le contenu optimisé et une vérification post-migration pour garantir zéro perte de trafic organique.",
      },
      {
        title: "Optimisation UX pour maximiser les conversions",
        content: "Chaque élément de votre nouveau site sera conçu pour convertir. Nous analysons le comportement de vos utilisateurs, identifions les points de friction et concevons des parcours optimisés. Navigation intuitive, CTAs stratégiquement placés, formulaires simplifiés et preuves sociales bien positionnées — chaque détail est pensé pour transformer vos visiteurs en clients.",
      },
    ],
    faqs: [
      { q: "Combien coûte une refonte de site web au Maroc ?", a: "La refonte démarre à 5 000 DH pour un site vitrine simple. Un e-commerce complet à partir de 12 000 DH. Le prix dépend de la complexité, du nombre de pages et des fonctionnalités souhaitées. Devis gratuit sous 24h." },
      { q: "Vais-je perdre mon référencement Google pendant la refonte ?", a: "Non. Notre méthodologie inclut un plan de redirection 301 complet, le transfert de tout le contenu SEO et une vérification post-migration. La plupart de nos clients voient une amélioration de leur positionnement après la refonte." },
      { q: "Combien de temps prend une refonte de site web ?", a: "En moyenne 2 à 4 semaines pour un site vitrine, 4 à 8 semaines pour un e-commerce. Nous travaillons avec des points de suivi hebdomadaires pour garantir le respect des délais." },
      { q: "Mon contenu actuel sera-t-il conservé ?", a: "Oui, tout le contenu pertinent est migré et optimisé. Nous pouvons aussi améliorer vos textes existants et créer du nouveau contenu SEO-optimisé pour maximiser votre visibilité." },
    ],
    pricing: [
      { name: "Refonte Vitrine", price: "5 000 DH", features: ["Audit UX/UI", "Redesign complet", "Migration contenu", "SEO technique", "Mobile responsive", "Livraison 2-3 semaines"] },
      { name: "Refonte E-Commerce", price: "12 000 DH", features: ["Audit + stratégie", "Design premium", "Migration produits", "Optimisation conversion", "SEO avancé", "Livraison 4-6 semaines"] },
      { name: "Refonte Application", price: "20 000 DH", features: ["Audit complet", "Architecture moderne", "Migration données", "Tests A/B", "Performance premium", "Livraison 6-8 semaines"] },
    ],
    results: [
      { metric: "Score PageSpeed moyen", value: "90+" },
      { metric: "Amélioration conversion", value: "+200%" },
      { metric: "Temps de chargement", value: "<2s" },
      { metric: "Sites refondus", value: "30+" },
    ],
  },
  "publicite-reseaux-sociaux": {
    sections: [
      {
        title: "Facebook Ads & Instagram Ads au Maroc : le guide expert",
        content: "Avec plus de 22 millions d'utilisateurs Facebook et 10 millions sur Instagram au Maroc, les réseaux sociaux sont le canal publicitaire le plus puissant pour toucher votre audience. Mais lancer des campagnes sans expertise, c'est gaspiller votre budget. Nos campagnes sont conçues scientifiquement avec du ciblage avancé, du creative testing systématique et une optimisation continue pour maximiser chaque dirham investi.",
      },
      {
        title: "TikTok Ads : le nouveau canal de croissance au Maroc",
        content: "TikTok explose au Maroc avec des millions d'utilisateurs actifs quotidiens, principalement dans la tranche 18-34 ans. Les coûts publicitaires sur TikTok sont encore 40% inférieurs à Facebook, offrant une opportunité unique d'acquisition à bas coût. Nous créons des vidéos publicitaires natives qui s'intègrent naturellement dans le feed TikTok et génèrent des taux d'engagement 3 fois supérieurs aux formats traditionnels.",
      },
      {
        title: "Retargeting avancé : convertissez les visiteurs hésitants",
        content: "97% de vos visiteurs quittent votre site sans acheter ou vous contacter. Le retargeting les ramène avec des messages personnalisés au bon moment. Nous mettons en place des audiences personnalisées, du retargeting dynamique pour l'e-commerce et des séquences de nurturing publicitaire qui transforment les visiteurs froids en clients chauds. Résultat : un coût par conversion réduit de 40%.",
      },
      {
        title: "Création de visuels et copies qui convertissent",
        content: "Le succès d'une campagne publicitaire repose à 80% sur le créatif. Notre équipe crée des visuels percutants, des vidéos courtes engageantes et des copies publicitaires optimisées pour la conversion. Nous testons systématiquement 3 à 5 variantes par campagne et utilisons les données pour identifier les gagnants. Chaque visuel est conçu en respectant les spécificités culturelles du marché marocain.",
      },
    ],
    faqs: [
      { q: "Quel budget pub minimum recommandez-vous ?", a: "Nous recommandons un minimum de 1 000 DH/mois de budget publicitaire pour des résultats significatifs, en plus de nos frais de gestion. Plus le budget est élevé, plus les résultats sont rapides." },
      { q: "Combien de temps pour voir des résultats ?", a: "Les premières conversions arrivent généralement dans les 48-72h après le lancement. L'optimisation complète des campagnes prend 2 à 4 semaines pour atteindre un ROAS optimal." },
      { q: "Créez-vous les visuels publicitaires ?", a: "Oui. Notre service inclut la création de tous les visuels, vidéos courtes et copies publicitaires. Nous testons plusieurs variantes pour identifier les plus performantes." },
      { q: "Gérez-vous aussi le compte publicitaire ?", a: "Oui, nous gérons intégralement votre compte : création de campagnes, ciblage, optimisation quotidienne et reporting transparent. Vous gardez la propriété totale de votre compte." },
    ],
    pricing: [
      { name: "Starter", price: "2 000 DH/mois", features: ["1 plateforme", "2 campagnes", "Ciblage basique", "Visuels inclus", "Reporting mensuel", "Support email"] },
      { name: "Growth", price: "4 000 DH/mois", features: ["2 plateformes", "5 campagnes", "Retargeting", "Creative testing", "Reporting bi-mensuel", "Support prioritaire"] },
      { name: "Scale", price: "8 000 DH/mois", features: ["Toutes plateformes", "Campagnes illimitées", "Retargeting avancé", "A/B testing continu", "Reporting hebdomadaire", "Account manager dédié"] },
    ],
    results: [
      { metric: "ROAS moyen", value: "x5" },
      { metric: "Réduction CPA", value: "-40%" },
      { metric: "Leads/mois générés", value: "150+" },
      { metric: "Campagnes gérées", value: "100+" },
    ],
  },
  "google-ads": {
    sections: [
      {
        title: "Google Ads au Maroc : captez les recherches à forte intention",
        content: "Google Ads est le canal d'acquisition le plus prévisible et le plus mesurable. Quand un internaute tape 'création site web Casablanca' ou 'restaurant japonais Rabat', il exprime une intention d'achat claire. Nos campagnes Search captent ces recherches à haute intention et les transforment en clients. Contrairement aux réseaux sociaux où vous interrompez les utilisateurs, Google Ads vous positionne exactement quand ils vous cherchent.",
      },
      {
        title: "Optimisation du Quality Score pour réduire vos coûts",
        content: "Le Quality Score de Google détermine combien vous payez par clic. Un score élevé réduit vos coûts de 30 à 50%. Nous optimisons les 3 facteurs clés : pertinence des annonces (textes alignés avec les mots-clés), expérience de la page de destination (vitesse, contenu, UX) et taux de clic attendu (annonces attractives avec extensions). Résultat : plus de clics pour moins cher.",
      },
      {
        title: "Google Shopping : vendez vos produits en ligne",
        content: "Pour les e-commerçants marocains, Google Shopping est un levier de vente puissant. Vos produits apparaissent directement dans les résultats de recherche avec photo, prix et nom de votre boutique. Nous configurons votre flux Google Merchant Center, optimisons vos fiches produits et créons des campagnes Shopping intelligentes qui maximisent votre retour sur investissement publicitaire.",
      },
      {
        title: "Remarketing Google : ne perdez plus aucun prospect",
        content: "Le remarketing Google Display vous permet de suivre vos visiteurs sur des millions de sites web avec des bannières personnalisées. Un visiteur qui a consulté votre page 'création site web' verra vos annonces pendant sa navigation, renforçant la notoriété de votre marque et l'incitant à revenir pour convertir. Nos campagnes de remarketing génèrent un ROI 3 à 5 fois supérieur aux campagnes classiques.",
      },
    ],
    faqs: [
      { q: "Quel budget minimum pour Google Ads au Maroc ?", a: "Nous recommandons un minimum de 1 500 DH/mois de budget publicitaire pour des résultats significatifs, en plus de nos frais de gestion de 2 500 DH/mois. Le budget optimal dépend de votre secteur et de la concurrence." },
      { q: "En combien de temps mes annonces seront visibles ?", a: "Vos annonces sont visibles dans les 24h après le lancement. L'optimisation pour atteindre un ROAS optimal prend 2 à 4 semaines de collecte de données et d'ajustements." },
      { q: "Google Ads est-il rentable pour les PME au Maroc ?", a: "Absolument. Nos clients PME obtiennent un ROAS moyen de 3 à 8x. La clé est le ciblage précis des mots-clés à forte intention et l'optimisation continue des campagnes." },
      { q: "Puis-je arrêter Google Ads à tout moment ?", a: "Oui, il n'y a aucun engagement minimum. Vous pouvez ajuster ou arrêter vos campagnes à tout moment. Nous recommandons cependant un minimum de 3 mois pour des résultats optimaux." },
    ],
    pricing: [
      { name: "Search Starter", price: "2 500 DH/mois", features: ["Campagnes Search", "20 mots-clés", "Extensions d'annonces", "Suivi conversions", "Reporting mensuel", "Support email"] },
      { name: "Search + Display", price: "5 000 DH/mois", features: ["Search + Display", "50 mots-clés", "Remarketing", "A/B testing annonces", "Reporting bi-mensuel", "Support prioritaire"] },
      { name: "Full Google", price: "10 000 DH/mois", features: ["Search + Display + Shopping", "Mots-clés illimités", "Remarketing avancé", "YouTube Ads", "Reporting hebdomadaire", "Account manager dédié"] },
    ],
    results: [
      { metric: "ROAS moyen", value: "x4.5" },
      { metric: "CPC moyen réduit", value: "-35%" },
      { metric: "Taux conversion", value: "8.5%" },
      { metric: "Campagnes gérées", value: "80+" },
    ],
  },
};
