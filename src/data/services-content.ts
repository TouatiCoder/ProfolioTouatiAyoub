export const serviceContent: Record<string, {
  sections: { title: string; titleAr: string; content: string; contentAr: string }[];
  faqs: { q: string; qAr: string; a: string; aAr: string }[];
  results: { metric: string; metricAr: string; value: string; valueAr?: string }[];
}> = {
  "creation-site-web": {
    sections: [
      {
        title: "Pourquoi créer un site web professionnel au Maroc ?",
        titleAr: "لماذا تحتاج إلى موقع ويب احترافي في المغرب؟",
        content: "En 2026, plus de 70% des consommateurs marocains recherchent des produits et services en ligne avant d'acheter. Un site web professionnel n'est plus un luxe, c'est une base solide pour toute entreprise qui veut croître. Votre site web est votre vitrine digitale, accessible 24h/24, 7j/7, depuis n'importe quelle ville du Maroc.",
        contentAr: "في 2026، أكثر من 70% من المستهلكين المغاربة يبحثون عن المنتجات والخدمات عبر الإنترنت قبل الشراء. لم يعد الموقع الاحترافي رفاهية، بل أساسًا متينًا لأي مشروع يريد النمو. موقعك هو واجهتك الرقمية، متاحة على مدار الساعة طوال أيام الأسبوع، من أي مدينة في المغرب.",
      },
      {
        title: "Site vitrine, e-commerce ou application web ?",
        titleAr: "موقع تعريفي، متجر إلكتروني أم تطبيق ويب؟",
        content: "Un site vitrine présente votre entreprise et vos services de manière professionnelle. Un site e-commerce vous permet de vendre en ligne avec paiement intégré et gestion des stocks. Une application web sur mesure offre des fonctionnalités avancées comme les réservations en ligne, les tableaux de bord analytiques ou les systèmes de gestion internes.",
        contentAr: "الموقع التعريفي يعرض شركتك وخدماتك بشكل احترافي. المتجر الإلكتروني يتيح لك البيع عبر الإنترنت مع دفع إلكتروني مدمج وإدارة للمخزون. أما تطبيق الويب المخصص فيوفر ميزات متقدمة مثل الحجز عبر الإنترنت، لوحات التحليلات أو أنظمة الإدارة الداخلية.",
      },
      {
        title: "Technologies modernes pour des performances maximales",
        titleAr: "تقنيات حديثة لأداء استثنائي",
        content: "Nous utilisons React, TypeScript, TailwindCSS et des outils modernes pour créer des sites rapides, stables et faciles à faire évoluer. Chaque site est pensé pour le SEO, le mobile et la conversion.",
        contentAr: "نستخدم React وTypeScript وTailwindCSS وأدوات حديثة لإنشاء مواقع سريعة، مستقرة وسهلة التطوير مستقبلاً. كل موقع مصمم مع مراعاة تحسين محركات البحث والتوافق مع الجوال والتحويل.",
      },
      {
        title: "Maintenance et support continu",
        titleAr: "صيانة ودعم مستمر",
        content: "Un site web nécessite un entretien régulier pour rester performant et sécurisé. Nous pouvons vous accompagner sur les mises à jour, les performances, le monitoring et les améliorations continues.",
        contentAr: "يحتاج الموقع إلى صيانة دورية للحفاظ على أدائه وأمانه. يمكنني مرافقتك في التحديثات، تحسين الأداء، المراقبة والتحسينات المستمرة.",
      },
    ],
    faqs: [
      { q: "Comment obtenir un devis pour la création d'un site web ?", qAr: "كيف أحصل على عرض سعر لإنشاء موقع ويب؟", a: "Chaque projet est différent. Contactez-moi avec vos objectifs, vos pages souhaitées et vos fonctionnalités clés, puis je vous prépare une proposition personnalisée.", aAr: "كل مشروع مختلف. تواصل معي وأخبرني بأهدافك، الصفحات المطلوبة وأهم الميزات، وسأعدّ لك عرضًا مخصصًا." },
      { q: "Combien de temps faut-il pour créer un site web ?", qAr: "كم من الوقت يستغرق إنشاء موقع ويب؟", a: "Un site vitrine est généralement livré en 1 à 2 semaines. Un e-commerce ou une application web demande plus de cadrage, avec des points de suivi réguliers.", aAr: "يُسلَّم الموقع التعريفي عادة خلال أسبوع إلى أسبوعين. أما المتجر الإلكتروني أو تطبيق الويب فيحتاج تأطيرًا أكبر، مع متابعة منتظمة." },
      { q: "Mon site sera-t-il optimisé pour le SEO ?", qAr: "هل سيكون موقعي محسّنًا لمحركات البحث؟", a: "Oui. Chaque site est construit avec les bonnes pratiques SEO : structure HTML propre, meta tags, vitesse de chargement, responsive mobile-first et schema markup lorsque c'est utile.", aAr: "نعم. يُبنى كل موقع وفق أفضل ممارسات السيو: بنية HTML نظيفة، وسوم meta، سرعة تحميل عالية، توافق كامل مع الجوال، وschema markup عند الحاجة." },
      { q: "Proposez-vous l'hébergement et le nom de domaine ?", qAr: "هل تقدمون خدمة الاستضافة واسم النطاق؟", a: "Oui, je peux vous accompagner sur l'hébergement, le certificat SSL, les sauvegardes et la configuration du domaine.", aAr: "نعم، يمكنني مرافقتك في الاستضافة، شهادة SSL، النسخ الاحتياطي وإعداد اسم النطاق." },
      { q: "Puis-je modifier mon site moi-même après la livraison ?", qAr: "هل يمكنني تعديل موقعي بنفسي بعد التسليم؟", a: "Oui. Selon le type de site, nous pouvons prévoir un CMS simple ou une formation pour gérer les contenus courants.", aAr: "نعم. حسب نوع الموقع، يمكننا توفير نظام إدارة محتوى بسيط أو تدريب لإدارة المحتوى الأساسي." },
    ],
    results: [
      { metric: "Temps de chargement moyen", metricAr: "متوسط زمن التحميل", value: "<2s" },
      { metric: "Score PageSpeed", metricAr: "نتيجة PageSpeed", value: "90+" },
      { metric: "Augmentation de leads", metricAr: "زيادة العملاء المحتملين", value: "+300%" },
      { metric: "Projets livrés", metricAr: "مشاريع مُسلَّمة", value: "9+" },
    ],
  },
  "referencement-seo": {
    sections: [
      {
        title: "Dominez Google au Maroc avec le SEO",
        titleAr: "تصدّر نتائج Google في المغرب عبر تحسين محركات البحث",
        content: "Le référencement naturel est un levier durable pour acquérir des clients en ligne. Nous travaillons la technique, le contenu, le maillage interne et la présence locale pour positionner votre site sur les recherches utiles à votre activité.",
        contentAr: "تحسين محركات البحث رافعة مستدامة لجلب العملاء عبر الإنترنت. نعمل على الجانب التقني، المحتوى، الروابط الداخلية والحضور المحلي لترتيب موقعك في عمليات البحث المفيدة لنشاطك.",
      },
      {
        title: "SEO local : dominez votre ville",
        titleAr: "السيو المحلي: تصدّر مدينتك",
        content: "Le SEO local est crucial pour les entreprises qui ciblent une zone géographique. Nous optimisons votre fiche Google Business Profile, vos pages locales, vos contenus et vos signaux de confiance.",
        contentAr: "السيو المحلي أساسي للشركات التي تستهدف منطقة جغرافية محددة. نحسّن ملفك على Google Business Profile، صفحاتك المحلية، محتواك وإشارات الثقة الخاصة بك.",
      },
      {
        title: "Notre méthodologie SEO en 4 étapes",
        titleAr: "منهجيتنا في السيو على 4 خطوات",
        content: "1) Audit SEO complet. 2) Recherche de mots-clés et analyse de la concurrence. 3) Optimisation technique et on-page. 4) Contenu, maillage et suivi des résultats.",
        contentAr: "1) تدقيق SEO شامل. 2) بحث عن الكلمات المفتاحية وتحليل المنافسين. 3) تحسين تقني وOn-Page. 4) محتوى، روابط داخلية ومتابعة النتائج.",
      },
      {
        title: "Reporting transparent et mesurable",
        titleAr: "تقارير شفافة وقابلة للقياس",
        content: "Vous suivez l'évolution des positions, du trafic organique, des conversions et des actions réalisées grâce à des rapports clairs et exploitables.",
        contentAr: "تتابع تطور الترتيب، الزيارات العضوية، التحويلات والإجراءات المنجزة عبر تقارير واضحة وقابلة للاستغلال.",
      },
    ],
    faqs: [
      { q: "Comment obtenir un devis SEO ?", qAr: "كيف أحصل على عرض سعر لخدمة السيو؟", a: "Le devis dépend de l'état actuel du site, de la concurrence et de vos objectifs. Un audit rapide permet de définir la bonne priorité d'action.", aAr: "يعتمد عرض السعر على حالة الموقع الحالية، المنافسة وأهدافك. تدقيق سريع يسمح بتحديد الأولوية المناسبة." },
      { q: "Combien de temps faut-il pour voir des résultats en SEO ?", qAr: "كم من الوقت يستغرق ظهور نتائج السيو؟", a: "Les premiers signaux apparaissent souvent entre 1 et 3 mois, puis les résultats se renforcent avec la régularité du travail technique et éditorial.", aAr: "تظهر الإشارات الأولى غالبًا بين شهر و3 أشهر، ثم تتعزز النتائج مع استمرارية العمل التقني والتحريري." },
      { q: "Quelle est la différence entre SEO technique et contenu SEO ?", qAr: "ما الفرق بين السيو التقني وسيو المحتوى؟", a: "Le SEO technique améliore la vitesse, la structure HTML, l'indexation et les Core Web Vitals. Le contenu SEO répond aux recherches de vos clients avec des pages utiles et bien structurées.", aAr: "يحسّن السيو التقني السرعة، بنية HTML، الفهرسة وCore Web Vitals. أما سيو المحتوى فيجيب عن بحث عملائك بصفحات مفيدة وجيدة التنظيم." },
      { q: "Proposez-vous un audit SEO gratuit ?", qAr: "هل تقدمون تدقيق SEO مجاني؟", a: "Oui. Je peux analyser rapidement votre site et vous indiquer les priorités les plus importantes.", aAr: "نعم. يمكنني تحليل موقعك بسرعة وتحديد أهم الأولويات." },
    ],
    results: [
      { metric: "Augmentation trafic moyen", metricAr: "متوسط زيادة الزيارات", value: "+450%" },
      { metric: "Mots-clés en 1ère page", metricAr: "كلمات مفتاحية في الصفحة الأولى", value: "85%" },
      { metric: "ROI moyen", metricAr: "متوسط العائد على الاستثمار", value: "x10" },
      { metric: "Clients satisfaits", metricAr: "عملاء راضون", value: "40+" },
    ],
  },
  "montage-video": {
    sections: [
      {
        title: "Le pouvoir du montage vidéo professionnel",
        titleAr: "قوة المونتاج الاحترافي للفيديو",
        content: "Une vidéo bien montée capte l'attention dès les premières secondes, donne du rythme à votre message et rend votre marque plus mémorable.",
        contentAr: "الفيديو الجيد المونتاج يجذب الانتباه من الثواني الأولى، يمنح رسالتك إيقاعًا ويجعل علامتك أكثر تميزًا في الذاكرة.",
      },
      {
        title: "Vidéos promotionnelles claires et rythmées",
        titleAr: "فيديوهات ترويجية واضحة وبإيقاع جذاب",
        content: "Nous créons des vidéos professionnelles pour présenter votre produit, votre service ou votre histoire avec un rendu propre. Chaque vidéo est livrée dans les formats adaptés : vertical, horizontal ou carré.",
        contentAr: "ننجز فيديوهات احترافية لعرض منتجك، خدمتك أو قصتك بمظهر نظيف. يُسلَّم كل فيديو بالصيغ المناسبة: عمودي، أفقي أو مربع.",
      },
      {
        title: "Motion graphics et animation",
        titleAr: "موشن غرافيك وتحريك رسوم",
        content: "Les animations et motion graphics donnent vie à votre marque avec un rendu professionnel. Ils sont utiles pour expliquer un produit, présenter des chiffres ou renforcer votre identité visuelle.",
        contentAr: "التحريك والموشن غرافيك يمنحان علامتك حياة بمظهر احترافي. مفيدان لشرح منتج، عرض أرقام أو تعزيز هويتك البصرية.",
      },
    ],
    faqs: [
      { q: "Comment obtenir un devis pour un montage vidéo ?", qAr: "كيف أحصل على عرض سعر لمونتاج فيديو؟", a: "Envoyez-moi vos rushs, la durée souhaitée, le format final et quelques références visuelles. Je vous réponds avec une proposition adaptée.", aAr: "أرسل لي اللقطات الخام، المدة المطلوبة، الصيغة النهائية وبعض المراجع البصرية. سأرد عليك بعرض مناسب." },
      { q: "Fournissez-vous le tournage vidéo ?", qAr: "هل توفرون خدمة التصوير؟", a: "Je me spécialise dans le montage et la post-production. Pour le tournage, je peux travailler avec vos rushs ou vous orienter vers des vidéastes partenaires.", aAr: "أنا متخصص في المونتاج وما بعد الإنتاج. بالنسبة للتصوير، يمكنني العمل على لقطاتك الخام أو توجيهك نحو مصورين شركاء." },
      { q: "Quels formats vidéo produisez-vous ?", qAr: "ما هي صيغ الفيديو التي تنتجونها؟", a: "Formats verticaux, YouTube, carré, corporate, motion graphics, animations de logo et sous-titrage.", aAr: "صيغ عمودية، YouTube، مربعة، مؤسساتية، موشن غرافيك، تحريك الشعار والترجمة النصية." },
    ],
    results: [
      { metric: "Engagement vidéo", metricAr: "التفاعل مع الفيديو", value: "+1000%" },
      { metric: "Vues moyennes/vidéo", metricAr: "متوسط المشاهدات لكل فيديو", value: "50K+" },
      { metric: "Vidéos produites", metricAr: "فيديوهات منجزة", value: "200+" },
      { metric: "Délai de livraison", metricAr: "مدة التسليم", value: "48h" },
    ],
  },
  "refonte-site-web": {
    sections: [
      {
        title: "Pourquoi refondre votre site web au Maroc ?",
        titleAr: "لماذا تعيد تصميم موقعك في المغرب؟",
        content: "Un site lent, daté ou difficile à utiliser peut faire perdre des opportunités. Une refonte améliore la crédibilité, la vitesse, l'expérience mobile et la clarté du parcours utilisateur.",
        contentAr: "الموقع البطيء أو القديم أو الصعب الاستخدام قد يفقدك فرصًا حقيقية. إعادة التصميم تحسّن المصداقية، السرعة، تجربة الجوال ووضوح مسار المستخدم.",
      },
      {
        title: "De WordPress à la performance moderne",
        titleAr: "من WordPress إلى الأداء الحديث",
        content: "Si votre site actuel dépend de nombreux plugins ou se charge lentement, une architecture moderne peut améliorer la performance, la sécurité et la maintenabilité.",
        contentAr: "إذا كان موقعك الحالي يعتمد على إضافات كثيرة أو يُحمَّل ببطء، فإن بنية حديثة يمكن أن تحسّن الأداء، الأمان وسهولة الصيانة.",
      },
      {
        title: "Migration SEO sans perte de trafic",
        titleAr: "ترحيل بدون خسارة السيو والزيارات",
        content: "La refonte comporte un risque SEO si elle est mal gérée. Nous préparons les redirections, conservons les contenus importants et vérifions l'indexation après migration.",
        contentAr: "تحمل إعادة التصميم مخاطر على السيو إذا لم تُدار بعناية. نجهّز إعادة التوجيهات، نحافظ على المحتوى المهم ونتحقق من الفهرسة بعد الترحيل.",
      },
      {
        title: "Optimisation UX pour maximiser les conversions",
        titleAr: "تحسين تجربة المستخدم لزيادة التحويلات",
        content: "Nous analysons le comportement des visiteurs, clarifions les CTA, simplifions les formulaires et construisons un parcours plus convaincant.",
        contentAr: "نحلل سلوك الزوار، نوضّح أزرار الدعوة للعمل، نبسّط النماذج ونبني مسارًا أكثر إقناعًا.",
      },
    ],
    faqs: [
      { q: "Comment obtenir un devis pour une refonte ?", qAr: "كيف أحصل على عرض سعر لإعادة تصميم موقعي؟", a: "Le devis dépend de l'état du site actuel, du volume de pages, des fonctionnalités et des objectifs. Un audit rapide permet de cadrer le travail.", aAr: "يعتمد عرض السعر على حالة الموقع الحالي، عدد الصفحات، الميزات والأهداف. تدقيق سريع يسمح بتأطير العمل." },
      { q: "Vais-je perdre mon référencement Google pendant la refonte ?", qAr: "هل سأفقد ترتيبي في Google أثناء إعادة التصميم؟", a: "Non si la migration est préparée correctement. Nous prévoyons les redirections, les contenus à conserver et les vérifications post-mise en ligne.", aAr: "لا، إذا تم تجهيز الترحيل بشكل صحيح. نخطط لإعادة التوجيهات، المحتوى الواجب الحفاظ عليه والتحقق بعد الإطلاق." },
      { q: "Combien de temps prend une refonte de site web ?", qAr: "كم من الوقت تستغرق إعادة تصميم الموقع؟", a: "La durée dépend du périmètre, mais le projet est découpé en étapes claires avec validation régulière.", aAr: "تعتمد المدة على النطاق، لكن المشروع يُقسَّم إلى مراحل واضحة مع تحقق منتظم." },
      { q: "Mon contenu actuel sera-t-il conservé ?", qAr: "هل سيتم الحفاظ على محتواي الحالي؟", a: "Oui, le contenu pertinent est migré et optimisé. Nous pouvons aussi améliorer les textes existants.", aAr: "نعم، يُرحَّل المحتوى المفيد ويُحسَّن. يمكننا أيضًا تطوير النصوص الحالية." },
    ],
    results: [
      { metric: "Score PageSpeed moyen", metricAr: "متوسط نتيجة PageSpeed", value: "90+" },
      { metric: "Amélioration conversion", metricAr: "تحسّن التحويل", value: "+200%" },
      { metric: "Temps de chargement", metricAr: "زمن التحميل", value: "<2s" },
      { metric: "Sites refondus", metricAr: "مواقع أُعيد تصميمها", value: "30+" },
    ],
  },
  "developpement-wordpress": {
    sections: [
      {
        title: "Pourquoi choisir WordPress pour votre site au Maroc ?",
        titleAr: "لماذا تختار WordPress لموقعك في المغرب؟",
        content: "WordPress reste le CMS le plus utilisé au monde grâce à sa flexibilité et son écosystème de plugins. Bien configuré et bien codé, il permet des sites rapides et faciles à faire évoluer vous-même — le problème vient rarement de WordPress lui-même, mais d'une installation mal optimisée ou d'un thème surchargé.",
        contentAr: "يبقى WordPress نظام إدارة المحتوى الأكثر استخدامًا في العالم بفضل مرونته ومنظومة إضافاته. عند إعداده وبرمجته بشكل جيد، يتيح مواقع سريعة وسهلة التطوير بنفسك — والمشكلة نادرًا ما تكون في WordPress نفسه، بل في تثبيت غير محسّن أو قالب مثقل.",
      },
      {
        title: "Thème sur mesure ou personnalisation d'un thème premium",
        titleAr: "قالب مخصص أو تخصيص عميق لقالب مميز",
        content: "Un thème premium générique ressemble souvent à des milliers d'autres sites. Je construis un thème sur mesure ou personnalise en profondeur un thème premium pour qu'il corresponde exactement à votre marque, sans plugins inutiles qui ralentissent le site.",
        contentAr: "القالب المميز العام غالبًا ما يشبه آلاف المواقع الأخرى. أبني قالبًا مخصصًا أو أخصّص بعمق قالبًا مميزًا ليتوافق تمامًا مع علامتك، بدون إضافات غير ضرورية تبطئ الموقع.",
      },
      {
        title: "WooCommerce pour vendre en ligne",
        titleAr: "WooCommerce للبيع عبر الإنترنت",
        content: "WooCommerce transforme WordPress en boutique e-commerce complète : catalogue produits, paiement en ligne, gestion des stocks et des commandes, adapté aux moyens de paiement et de livraison utilisés au Maroc.",
        contentAr: "يحوّل WooCommerce موقع WordPress إلى متجر إلكتروني متكامل: كتالوج منتجات، دفع إلكتروني، إدارة المخزون والطلبات، متوافق مع وسائل الدفع والتوصيل المستخدمة في المغرب.",
      },
      {
        title: "Sécurité, vitesse et maintenance",
        titleAr: "الأمان، السرعة والصيانة",
        content: "La majorité des sites WordPress lents ou piratés souffrent d'un manque de maintenance de base. Mise à jour du cœur et des plugins, sauvegardes régulières, mise en cache et durcissement de la sécurité font partie de chaque projet.",
        contentAr: "معظم مواقع WordPress البطيئة أو المخترقة تعاني من نقص في الصيانة الأساسية. تحديث النواة والإضافات، نسخ احتياطي منتظم، تخزين مؤقت وتقوية الأمان جزء من كل مشروع.",
      },
    ],
    faqs: [
      { q: "Pourquoi mon site WordPress actuel est-il lent ?", qAr: "لماذا موقعي WordPress الحالي بطيء؟", a: "Le plus souvent : trop de plugins, un thème mal optimisé, ou un hébergement inadapté. Un audit rapide identifie la cause exacte avant toute intervention.", aAr: "غالبًا: إضافات كثيرة، قالب غير محسّن، أو استضافة غير مناسبة. تدقيق سريع يحدد السبب بالضبط قبل أي تدخل." },
      { q: "Puis-je gérer mon site WordPress moi-même après la livraison ?", qAr: "هل يمكنني إدارة موقعي WordPress بنفسي بعد التسليم؟", a: "Oui, c'est l'un des grands avantages de WordPress. Je livre avec une prise en main simple, et une formation si vous le souhaitez.", aAr: "نعم، هذا أحد أهم مزايا WordPress. أسلّم الموقع مع دليل استخدام بسيط، وتدريب إذا رغبت." },
      { q: "Faites-vous de la migration vers WordPress ?", qAr: "هل تقومون بالترحيل إلى WordPress؟", a: "Oui, depuis un autre CMS, un site codé sur mesure ou un ancien WordPress mal maintenu, sans perte de contenu ni de référencement.", aAr: "نعم، من نظام إدارة محتوى آخر، موقع مبرمج يدويًا أو WordPress قديم غير مُصان، بدون فقدان المحتوى أو الترتيب في محركات البحث." },
      { q: "Proposez-vous WooCommerce pour vendre en ligne ?", qAr: "هل تقدمون WooCommerce للبيع عبر الإنترنت؟", a: "Oui, boutique complète avec catalogue, paiement en ligne et gestion des commandes adaptée au marché marocain.", aAr: "نعم، متجر متكامل مع كتالوج، دفع إلكتروني وإدارة طلبات متوافقة مع السوق المغربي." },
      { q: "Le site sera-t-il sécurisé ?", qAr: "هل سيكون الموقع آمنًا؟", a: "Oui : mises à jour, sauvegardes régulières, et durcissement de la sécurité font partie de chaque projet WordPress que je livre.", aAr: "نعم: التحديثات، النسخ الاحتياطي المنتظم وتقوية الأمان جزء من كل مشروع WordPress أسلّمه." },
    ],
    results: [
      { metric: "Score PageSpeed moyen", metricAr: "متوسط نتيجة PageSpeed", value: "85+" },
      { metric: "Temps de chargement", metricAr: "زمن التحميل", value: "<2.5s" },
      { metric: "Plugins essentiels seulement", metricAr: "إضافات أساسية فقط", value: "<10" },
      { metric: "Mises à jour de sécurité", metricAr: "تحديثات أمنية", value: "Incluses", valueAr: "متضمنة" },
    ],
  },
};
