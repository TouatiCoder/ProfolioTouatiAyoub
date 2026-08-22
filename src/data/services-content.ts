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
        title: "React, Next.js et Node.js : la stack technique derrière vos performances",
        titleAr: "React وNext.js وNode.js: التقنية وراء أداء موقعك",
        content: "Chaque site est construit avec React et TypeScript, sur Next.js quand le projet en profite réellement — pages qui doivent être indexées vite, temps de chargement minimal, rendu serveur pour le SEO. Quand le site a besoin d'un backend sur mesure (API, authentification, base de données), j'utilise Node.js ou Laravel selon le contexte du projet. Tailwind CSS pour un design cohérent, MySQL quand une base de données relationnelle est nécessaire.",
        contentAr: "كل موقع مبني بـ React وTypeScript، وعلى Next.js عندما يستفيد المشروع منه فعليًا — صفحات يجب فهرستها بسرعة، زمن تحميل أدنى، عرض من جهة الخادم لتحسين السيو. عندما يحتاج الموقع واجهة خلفية مخصصة (API، مصادقة، قاعدة بيانات)، أستخدم Node.js أو Laravel حسب سياق المشروع. Tailwind CSS لتصميم متسق، وMySQL عند الحاجة إلى قاعدة بيانات علائقية.",
      },
      {
        title: "Pourquoi Next.js plutôt que du React classique ?",
        titleAr: "لماذا Next.js بدلاً من React التقليدي؟",
        content: "React seul rend le contenu dans le navigateur, ce qui peut ralentir le premier affichage et compliquer le référencement. Next.js ajoute le rendu côté serveur (SSR) et la génération statique (SSG), donc Google reçoit une page déjà construite et vos visiteurs voient le contenu plus vite. Pour un site vitrine ou e-commerce qui dépend du trafic organique, cette différence se traduit directement en positions Google et en taux de conversion.",
        contentAr: "React وحده يعرض المحتوى داخل المتصفح، ما قد يبطئ العرض الأول ويعقّد تحسين محركات البحث. يضيف Next.js العرض من جهة الخادم (SSR) والتوليد الثابت (SSG)، فيستلم Google صفحة جاهزة مسبقًا ويرى زوارك المحتوى أسرع. بالنسبة لموقع تعريفي أو متجر إلكتروني يعتمد على الزيارات العضوية، يترجم هذا الفرق مباشرة إلى ترتيب أفضل في Google ومعدل تحويل أعلى.",
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
      { q: "Quelle est la différence entre React et Next.js ?", qAr: "ما الفرق بين React وNext.js؟", a: "React est une bibliothèque pour construire des interfaces. Next.js est un framework construit sur React qui ajoute le rendu serveur, le routing et l'optimisation SEO automatique. Pour un site d'entreprise qui doit être trouvé sur Google, Next.js est généralement le meilleur choix.", aAr: "React مكتبة لبناء الواجهات. Next.js إطار عمل مبني على React يضيف العرض من جهة الخادم، التوجيه وتحسين السيو التلقائي. بالنسبة لموقع شركة يجب أن يُعثر عليه على Google، يكون Next.js عادة الخيار الأفضل." },
      { q: "Qu'est-ce que Node.js et pourquoi l'utiliser pour un backend ?", qAr: "ما هو Node.js ولماذا نستخدمه للواجهة الخلفية؟", a: "Node.js exécute du JavaScript côté serveur, ce qui permet d'utiliser le même langage pour le front-end et le back-end. C'est un bon choix quand l'application a besoin de temps réel (notifications, chat) ou quand l'équipe est déjà en JavaScript/TypeScript sur le front-end.", aAr: "يشغّل Node.js جافاسكريبت من جهة الخادم، ما يتيح استخدام نفس اللغة للواجهة الأمامية والخلفية. خيار جيد عندما يحتاج التطبيق إلى الوقت الفعلي (إشعارات، دردشة) أو عندما يعمل الفريق بالفعل بـ JavaScript/TypeScript على الواجهة الأمامية." },
      { q: "Combien coûte un site Next.js pour une entreprise au Maroc ?", qAr: "كم تكلفة موقع Next.js لشركة في المغرب؟", a: "Le tarif dépend des fonctionnalités, pas du framework en lui-même — un site Next.js s'inscrit dans les mêmes fourchettes qu'un site React classique (voir la grille tarifaire), avec l'avantage d'un meilleur temps de chargement et d'une meilleure indexation Google inclus par défaut.", aAr: "يعتمد السعر على الميزات، وليس على إطار العمل بحد ذاته — يندرج موقع Next.js ضمن نفس النطاقات السعرية لموقع React تقليدي (انظر جدول الأسعار)، مع ميزة زمن تحميل أفضل وفهرسة أفضل في Google متضمنة افتراضيًا." },
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
  "developpement-laravel": {
    sections: [
      {
        title: "Pourquoi Laravel pour une application métier au Maroc ?",
        titleAr: "لماذا Laravel لتطبيق مهني في المغرب؟",
        content: "Un site vitrine ou un CMS couvre la présentation de votre activité — pas la gestion de stocks multi-dépôts, un espace client avec facturation, ou la synchronisation avec un logiciel de gestion existant. Laravel est un framework PHP mature, avec un écosystème riche (authentification, files d'attente, tâches planifiées) qui permet de construire ce type d'application métier sans réinventer les fondations à chaque projet.",
        contentAr: "الموقع التعريفي أو نظام إدارة المحتوى يغطي عرض نشاطك — وليس إدارة مخزون متعدد المستودعات، فضاء عميل مع فوترة، أو المزامنة مع برنامج إدارة موجود. Laravel إطار عمل PHP ناضج، بمنظومة غنية (مصادقة، طوابير مهام، مهام مجدولة) يتيح بناء هذا النوع من التطبيقات المهنية دون إعادة بناء الأساسيات في كل مشروع.",
      },
      {
        title: "Une API REST propre, prête pour React ou une app mobile",
        titleAr: "واجهة برمجية REST نظيفة، جاهزة لـ React أو تطبيق جوال",
        content: "Chaque application Laravel que je livre expose une API REST documentée et versionnée. Concrètement, cela veut dire que le même backend peut alimenter un site React, un tableau de bord d'administration et une application mobile Flutter — sans dupliquer la logique métier trois fois.",
        contentAr: "كل تطبيق Laravel أسلّمه يوفر واجهة برمجية REST موثقة ومرقّمة بالإصدارات. عمليًا، هذا يعني أن نفس الواجهة الخلفية يمكن أن تغذي موقع React، لوحة تحكم إدارية وتطبيق جوال بـ Flutter — دون تكرار منطق العمل ثلاث مرات.",
      },
      {
        title: "MySQL, authentification et sécurité par défaut",
        titleAr: "MySQL، مصادقة وأمان افتراضيًا",
        content: "La base de données est conçue avec Laravel et MySQL dès le départ : migrations versionnées, relations claires entre les tables, requêtes optimisées. L'authentification (Sanctum ou Passport selon le besoin), la validation des données et la protection contre les failles courantes (injection SQL, CSRF) font partie du socle de chaque projet, pas d'une option payante en plus.",
        contentAr: "قاعدة البيانات مصممة مع Laravel وMySQL منذ البداية: ترحيلات مرقّمة، علاقات واضحة بين الجداول، استعلامات محسّنة. المصادقة (Sanctum أو Passport حسب الحاجة)، التحقق من صحة البيانات والحماية من الثغرات الشائعة (حقن SQL، CSRF) جزء من أساس كل مشروع، وليست خيارًا إضافيًا مدفوعًا.",
      },
      {
        title: "Node.js ou Laravel : comment je choisis pour votre projet",
        titleAr: "Node.js أو Laravel: كيف أختار لمشروعك",
        content: "Laravel et Node.js peuvent tous les deux servir de backend à une application React ou Next.js. Je recommande Laravel quand le projet a beaucoup de logique métier structurée (facturation, rôles, workflows) où son écosystème fait gagner du temps. Je recommande Node.js quand l'application a besoin de temps réel (notifications live, chat) ou partage déjà du code TypeScript avec le front-end.",
        contentAr: "يمكن لـ Laravel وNode.js أن يكونا الواجهة الخلفية لتطبيق React أو Next.js. أنصح بـ Laravel عندما يحتوي المشروع على منطق عمل منظم كثيرًا (فوترة، أدوار، مسارات عمل) حيث توفر منظومته الوقت. أنصح بـ Node.js عندما يحتاج التطبيق إلى الوقت الفعلي (إشعارات مباشرة، دردشة) أو يشارك كود TypeScript مع الواجهة الأمامية.",
      },
    ],
    faqs: [
      { q: "Quelle est la différence entre un site vitrine et une application Laravel ?", qAr: "ما الفرق بين موقع تعريفي وتطبيق Laravel؟", a: "Un site vitrine présente votre activité. Une application Laravel gère une logique métier réelle : comptes utilisateurs, rôles et permissions, facturation, workflows internes — avec une base de données conçue pour votre activité, pas un CMS générique.", aAr: "الموقع التعريفي يعرض نشاطك. تطبيق Laravel يدير منطق عمل حقيقي: حسابات مستخدمين، أدوار وصلاحيات، فوترة، مسارات عمل داخلية — بقاعدة بيانات مصممة لنشاطك، وليست نظام إدارة محتوى عام." },
      { q: "Laravel fonctionne-t-il avec React ou Next.js ?", qAr: "هل يعمل Laravel مع React أو Next.js؟", a: "Oui, c'est une combinaison courante : Laravel expose une API REST, React ou Next.js consomme cette API pour l'interface. C'est l'architecture que je recommande pour la plupart des applications sur mesure.", aAr: "نعم، هذا مزيج شائع: Laravel يوفر واجهة برمجية REST، وReact أو Next.js يستهلك هذه الواجهة للواجهة الأمامية. هذه هي البنية التي أنصح بها لمعظم التطبيقات المخصصة." },
      { q: "Combien coûte le développement d'une application Laravel ?", qAr: "كم تكلفة تطوير تطبيق Laravel؟", a: "Une API ou un backend simple démarre autour de 8 000 MAD. Une application métier complète avec back-office se situe généralement entre 18 000 et 35 000 MAD selon la complexité. Chaque projet reçoit un devis exact après analyse de vos besoins.", aAr: "تبدأ الواجهة البرمجية أو الواجهة الخلفية البسيطة من حوالي 8000 درهم. التطبيق المهني الكامل مع لوحة تحكم يتراوح عادة بين 18000 و35000 درهم حسب التعقيد. يحصل كل مشروع على عرض سعر دقيق بعد دراسة احتياجاتك." },
      { q: "Pouvez-vous reprendre une application Laravel existante ?", qAr: "هل يمكنكم تولي تطبيق Laravel قائم؟", a: "Oui. J'audite d'abord le code existant (version de Laravel, dette technique, sécurité) avant de proposer une reprise, une mise à jour ou une refonte progressive selon l'état du projet.", aAr: "نعم. أدقق أولاً في الكود الحالي (إصدار Laravel، الدين التقني، الأمان) قبل اقتراح تولي المشروع، تحديثه أو إعادة تصميمه تدريجيًا حسب حالته." },
    ],
    results: [
      { metric: "Applications livrées", metricAr: "تطبيقات مُسلَّمة", value: "12+" },
      { metric: "Score PageSpeed moyen", metricAr: "متوسط نتيجة PageSpeed", value: "90+" },
      { metric: "API documentée", metricAr: "واجهة برمجية موثقة", value: "100%" },
      { metric: "Délai API simple", metricAr: "مدة تسليم واجهة بسيطة", value: "2-3 sem." },
    ],
  },
  "application-mobile": {
    sections: [
      {
        title: "Une seule base de code pour iOS et Android",
        titleAr: "قاعدة كود واحدة لـ iOS وAndroid",
        content: "Avec Flutter, je développe une seule application qui tourne nativement sur iOS et Android, plutôt que deux applications séparées à maintenir. Concrètement, cela réduit le coût de développement et de maintenance, sans sacrifier les performances ni l'apparence native de l'application.",
        contentAr: "باستخدام Flutter، أطور تطبيقًا واحدًا يعمل بشكل أصلي على iOS وAndroid، بدلاً من تطبيقين منفصلين يجب صيانتهما. عمليًا، هذا يقلل تكلفة التطوير والصيانة، دون التضحية بالأداء أو المظهر الأصلي للتطبيق.",
      },
      {
        title: "Une application connectée à un vrai backend",
        titleAr: "تطبيق متصل بواجهة خلفية حقيقية",
        content: "Une application mobile utile a besoin de données à jour : comptes utilisateurs, notifications, contenu synchronisé. Je connecte l'application à une API REST (Laravel ou Node.js selon le projet) avec authentification sécurisée, plutôt qu'une app qui affiche du contenu statique.",
        contentAr: "التطبيق الجوال المفيد يحتاج بيانات محدّثة: حسابات مستخدمين، إشعارات، محتوى متزامن. أربط التطبيق بواجهة برمجية REST (Laravel أو Node.js حسب المشروع) مع مصادقة آمنة، بدلاً من تطبيق يعرض محتوى ثابتًا.",
      },
      {
        title: "De l'idée à la publication sur l'App Store et Google Play",
        titleAr: "من الفكرة إلى النشر على App Store وGoogle Play",
        content: "La publication sur les stores a ses propres règles (comptes développeur, révisions Apple, politique de confidentialité). Je gère ce processus de A à Z, y compris les allers-retours de validation, pour que l'application soit réellement disponible au téléchargement, pas juste prête techniquement.",
        contentAr: "للنشر على المتاجر قواعده الخاصة (حسابات المطورين، مراجعات Apple، سياسة الخصوصية). أتولى هذه العملية من الألف إلى الياء، بما في ذلك جولات المراجعة، حتى يكون التطبيق متاحًا فعلاً للتحميل، وليس جاهزًا تقنيًا فقط.",
      },
      {
        title: "Après le lancement : maintenance et évolutions",
        titleAr: "بعد الإطلاق: الصيانة والتطوير",
        content: "iOS et Android publient des mises à jour régulières qui peuvent casser une application non maintenue. Je propose un forfait de maintenance mensuel qui couvre la compatibilité, les corrections de bugs et l'ajout progressif de nouvelles fonctionnalités selon les retours de vos utilisateurs.",
        contentAr: "يصدر iOS وAndroid تحديثات منتظمة قد تعطّل تطبيقًا غير مُصان. أقدّم باقة صيانة شهرية تغطي التوافق، إصلاح الأخطاء وإضافة ميزات جديدة تدريجيًا حسب ملاحظات مستخدميك.",
      },
    ],
    faqs: [
      { q: "Faut-il une application native ou Flutter suffit-il ?", qAr: "هل أحتاج تطبيقًا أصليًا أم يكفي Flutter؟", a: "Pour la grande majorité des applications d'entreprise (e-commerce, réservation, fidélité, contenu), Flutter offre des performances quasi natives à un coût bien inférieur à deux développements séparés. Le natif pur se justifie surtout pour des usages très spécifiques (traitement graphique intensif, accès matériel avancé).", aAr: "بالنسبة لمعظم تطبيقات الشركات (تجارة إلكترونية، حجز، ولاء، محتوى)، يوفر Flutter أداءً شبه أصلي بتكلفة أقل بكثير من تطويرين منفصلين. التطبيق الأصلي الصرف يُبرَّر خاصة للاستخدامات المحددة جدًا (معالجة رسومية مكثفة، وصول متقدم للعتاد)." },
      { q: "Combien coûte une application mobile au Maroc ?", qAr: "كم تكلفة تطبيق جوال في المغرب؟", a: "Une version MVP avec les écrans essentiels démarre autour de 15 000 MAD. Une application complète avec backend, authentification et publication sur les stores se situe généralement autour de 30 000 MAD. Un devis précis dépend des fonctionnalités demandées.", aAr: "تبدأ نسخة MVP بالشاشات الأساسية من حوالي 15000 درهم. التطبيق الكامل مع واجهة خلفية، مصادقة ونشر على المتاجر يتراوح عادة حول 30000 درهم. العرض الدقيق يعتمد على الميزات المطلوبة." },
      { q: "Combien de temps prend le développement d'une application ?", qAr: "كم من الوقت يستغرق تطوير تطبيق؟", a: "Un MVP prend généralement 4 à 6 semaines. Une application complète avec backend sur mesure prend 8 à 12 semaines, publication sur les stores incluse.", aAr: "يستغرق MVP عادة 4 إلى 6 أسابيع. التطبيق الكامل بواجهة خلفية مخصصة يستغرق 8 إلى 12 أسبوعًا، بما في ذلك النشر على المتاجر." },
      { q: "Gérez-vous la publication sur l'App Store et Google Play ?", qAr: "هل تتولون النشر على App Store وGoogle Play؟", a: "Oui, création des comptes développeur si nécessaire, préparation des fiches store, et gestion du processus de révision jusqu'à la mise en ligne effective.", aAr: "نعم، إنشاء حسابات المطورين عند الحاجة، تجهيز صفحات المتجر، وإدارة عملية المراجعة حتى النشر الفعلي." },
    ],
    results: [
      { metric: "Une base de code, 2 plateformes", metricAr: "قاعدة كود واحدة، منصتان", value: "100%" },
      { metric: "Délai MVP", metricAr: "مدة تسليم MVP", value: "4-6 sem." },
      { metric: "Applications publiées", metricAr: "تطبيقات منشورة", value: "5+" },
      { metric: "Maintenance continue", metricAr: "صيانة مستمرة", value: "Disponible", valueAr: "متوفرة" },
    ],
  },
  "e-commerce": {
    sections: [
      {
        title: "Shopify ou WooCommerce : quelle plateforme choisir ?",
        titleAr: "Shopify أو WooCommerce: أي منصة تختار؟",
        content: "Shopify convient aux boutiques qui veulent démarrer vite avec une infrastructure gérée et peu de maintenance technique. WooCommerce (sur WordPress) convient mieux quand vous voulez un contrôle total sur le code, des intégrations très spécifiques, ou que vous avez déjà un site WordPress. Je recommande l'une ou l'autre selon votre budget, votre volume de produits et vos besoins d'intégration — pas par habitude.",
        contentAr: "Shopify مناسب للمتاجر التي تريد الانطلاق بسرعة ببنية تحتية مُدارة وصيانة تقنية قليلة. WooCommerce (على WordPress) أنسب عندما تريد تحكمًا كاملاً في الكود، تكاملات محددة جدًا، أو لديك موقع WordPress بالفعل. أنصح بأحدهما حسب ميزانيتك، حجم منتجاتك واحتياجات التكامل — وليس بناءً على العادة.",
      },
      {
        title: "Paiement et livraison adaptés au marché marocain",
        titleAr: "دفع وتوصيل ملائمان للسوق المغربي",
        content: "Une boutique qui n'accepte pas les moyens de paiement utilisés au Maroc, ou qui ne calcule pas correctement les frais de livraison locaux, perd des ventes dès la page de paiement. J'intègre les solutions de paiement pertinentes pour votre marché et je configure les zones de livraison et leurs tarifs correctement dès le lancement.",
        contentAr: "المتجر الذي لا يقبل وسائل الدفع المستخدمة في المغرب، أو لا يحسب رسوم التوصيل المحلية بشكل صحيح، يفقد المبيعات منذ صفحة الدفع. أدمج حلول الدفع المناسبة لسوقك وأعدّ مناطق التوصيل وأسعارها بشكل صحيح منذ الإطلاق.",
      },
      {
        title: "Un tunnel de conversion pensé pour vendre, pas juste pour exister",
        titleAr: "مسار تحويل مصمم للبيع، وليس فقط للوجود",
        content: "Le nombre de clics entre la fiche produit et la confirmation de commande a un impact direct sur le taux d'abandon de panier. Je structure le tunnel d'achat (fiche produit, panier, paiement) pour minimiser la friction, avec des éléments de réassurance (avis, garanties, livraison claire) au bon endroit.",
        contentAr: "عدد النقرات بين صفحة المنتج وتأكيد الطلب له تأثير مباشر على معدل التخلي عن السلة. أنظّم مسار الشراء (صفحة المنتج، السلة، الدفع) لتقليل الاحتكاك، مع عناصر طمأنة (تقييمات، ضمانات، توصيل واضح) في المكان الصحيح.",
      },
      {
        title: "SEO e-commerce : être trouvé avant d'être acheté",
        titleAr: "SEO للتجارة الإلكترونية: أن تُوجد قبل أن تُشترى",
        content: "Un catalogue de centaines de produits mal structuré crée du contenu dupliqué et dilue votre référencement. Je structure les catégories, les fiches produits (titres, descriptions uniques, données structurées Product) et la navigation pour que Google comprenne et indexe correctement votre boutique.",
        contentAr: "كتالوج بمئات المنتجات غير منظم جيدًا يخلق محتوى مكررًا ويضعف ترتيبك في محركات البحث. أنظّم الفئات، صفحات المنتجات (عناوين، أوصاف فريدة، بيانات منظمة Product) والتصفح حتى يفهم Google متجرك ويفهرسه بشكل صحيح.",
      },
    ],
    faqs: [
      { q: "Shopify ou WooCommerce, lequel est le meilleur ?", qAr: "أيهما أفضل، Shopify أم WooCommerce؟", a: "Aucun n'est meilleur dans l'absolu — cela dépend de votre situation. Shopify est plus simple à démarrer et à maintenir. WooCommerce offre plus de flexibilité technique si vous avez déjà WordPress ou des besoins spécifiques. Je vous recommande l'option adaptée après avoir compris votre activité.", aAr: "لا يوجد أفضل بشكل مطلق — الأمر يعتمد على وضعك. Shopify أبسط للانطلاق والصيانة. WooCommerce يوفر مرونة تقنية أكبر إذا كان لديك WordPress بالفعل أو احتياجات محددة. أنصحك بالخيار الملائم بعد فهم نشاطك." },
      { q: "Combien coûte une boutique en ligne au Maroc ?", qAr: "كم تكلفة متجر إلكتروني في المغرب؟", a: "Le prix dépend du type de boutique (essentielle ou avancée), du volume de votre catalogue et des intégrations nécessaires (paiement, livraison, comptabilité). Décrivez-moi votre projet et vous recevrez un devis personnalisé et gratuit sous 24h.", aAr: "يعتمد السعر على نوع المتجر (أساسي أو متقدم)، حجم كتالوج منتجاتك والتكاملات المطلوبة (دفع، توصيل، محاسبة). صف لي مشروعك وستحصل على عرض سعر مخصص ومجاني خلال أقل من 24 ساعة." },
      { q: "Pouvez-vous migrer ma boutique existante vers une autre plateforme ?", qAr: "هل يمكنكم ترحيل متجري الحالي إلى منصة أخرى؟", a: "Oui, avec un plan de migration qui préserve le catalogue produits, les commandes historiques et le référencement déjà acquis.", aAr: "نعم، بخطة ترحيل تحافظ على كتالوج المنتجات، الطلبات السابقة والترتيب المكتسب في محركات البحث." },
      { q: "La boutique sera-t-elle optimisée pour le SEO ?", qAr: "هل سيكون المتجر محسّنًا لمحركات البحث؟", a: "Oui. Structure des catégories, fiches produits uniques, données structurées Product et vitesse de chargement font partie de chaque boutique livrée.", aAr: "نعم. بنية الفئات، صفحات منتجات فريدة، بيانات منظمة Product وسرعة التحميل جزء من كل متجر أسلّمه." },
    ],
    results: [
      { metric: "Boutiques lancées", metricAr: "متاجر تم إطلاقها", value: "8+" },
      { metric: "Moyens de paiement locaux", metricAr: "وسائل دفع محلية", value: "Intégrés", valueAr: "مدمجة" },
      { metric: "Score PageSpeed moyen", metricAr: "متوسط نتيجة PageSpeed", value: "88+" },
      { metric: "Réduction abandon panier", metricAr: "تقليل التخلي عن السلة", value: "-30%" },
    ],
  },
};
