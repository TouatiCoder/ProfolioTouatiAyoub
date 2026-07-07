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
        content: "Le référencement naturel (SEO) est le levier le plus rentable pour acquérir des clients en ligne. Contrairement aux actions ponctuelles qui s'arrêtent dès que vous cessez d'investir, le SEO génère du trafic qualifié en continu, 24h/24, 7j/7. Nous positionnons votre site en première page de Google pour les mots-clés que vos clients recherchent réellement au Maroc.",
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
      { q: "Quelle est la différence entre SEO technique et contenu SEO ?", a: "Le SEO technique améliore la vitesse, la structure HTML, l'indexation et les Core Web Vitals. Le contenu SEO répond aux recherches de vos clients avec des pages utiles, bien structurées et reliées entre elles." },
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
  "montage-video": {
    sections: [
      {
        title: "Le pouvoir du montage vidéo professionnel",
        content: "Une vidéo bien montée capte l'attention dès les premières secondes, donne du rythme à votre message et rend votre marque plus mémorable. Que ce soit pour des formats courts, des présentations produit, des vidéos YouTube ou du contenu corporate, le montage transforme des rushs simples en supports clairs, dynamiques et professionnels.",
      },
      {
        title: "Vidéos promotionnelles claires et rythmées",
        content: "Nous créons des vidéos professionnelles conçues pour présenter votre produit, votre service ou votre histoire avec un rendu propre. Chaque vidéo est livrée dans les formats adaptés : vertical 9:16, horizontal 16:9 ou carré 1:1. Script, sélection des plans, montage, sous-titrage et export — nous gérons tout le processus créatif.",
      },
      {
        title: "Motion graphics et animation",
        content: "Les animations et motion graphics donnent vie à votre marque avec un professionnalisme qui marque les esprits. Parfaits pour expliquer un produit complexe, présenter des statistiques de manière visuelle ou créer une identité visuelle mémorable. Nous réalisons des animations de logo, des infographies animées et des vidéos explicatives.",
      },
    ],
    faqs: [
      { q: "Combien coûte un montage vidéo professionnel ?", a: "À partir de 500 DH pour un Reel/Story simple. Les vidéos promotionnelles complètes démarrent à 1 500 DH. Les projets plus complexes (corporate, motion graphics) à partir de 3 000 DH." },
      { q: "Fournissez-vous le tournage vidéo ?", a: "Nous nous spécialisons dans le montage et le post-production. Pour le tournage, nous travaillons avec un réseau de vidéastes au Maroc ou nous pouvons monter vos rushs existants." },
      { q: "Quels formats vidéo produisez-vous ?", a: "Tous les formats : vertical (9:16), YouTube (16:9), carré (1:1), vidéos corporate, motion graphics, animations de logo et sous-titrage." },
    ],
    pricing: [
      { name: "Reels & Stories", price: "500 DH", features: ["Format vertical 9:16", "Sous-titrage", "Musique & effets", "Livraison 48h", "1 révision incluse", "Formats optimisés"] },
      { name: "Vidéo Promotionnelle", price: "1 500 DH", features: ["Script + storyboard", "Montage professionnel", "Motion graphics", "Musique licenciée", "3 révisions", "Multi-format export"] },
      { name: "Vidéo Corporate", price: "3 000 DH", features: ["Direction artistique", "Motion graphics avancé", "Animation de logo", "Voice-over", "Révisions illimitées", "Tous formats"] },
    ],
    results: [
      { metric: "Engagement vidéo", value: "+1000%" },
      { metric: "Vues moyennes/vidéo", value: "50K+" },
      { metric: "Vidéos produites", value: "200+" },
      { metric: "Délai de livraison", value: "48h" },
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
};
