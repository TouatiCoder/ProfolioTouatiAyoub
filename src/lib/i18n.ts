import { createContext, useContext } from "react";

export type Locale = "fr" | "ar";

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

export const translations: Record<Locale, Record<string, string>> = {
  fr: {
    // Nav
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.portfolio": "Réalisations",
    "nav.blog": "Blog",
    "nav.about": "À propos",
    "nav.contact": "Contact",
    "nav.quote": "Devis gratuit",
    "nav.logoAlt": "Ayoub Touati",
    "nav.menu": "Menu",
    "nav.close": "Fermer",
    "nav.language": "Changer de langue",

    // Hero
    "hero.title": "Votre Expert Digital",
    "hero.titleAccent": "au Maroc",
    "hero.subtitle": "Création de sites web, référencement SEO et refonte. Je transforme votre vision en résultats concrets — de Meknès à tout le Maroc.",
    "hero.cta.quote": "Demander un devis gratuit",
    "hero.cta.whatsapp": "Contactez-nous sur WhatsApp",
    "hero.trust": "Sites livrés pour des entreprises partout au Maroc",

    // Services
    "services.title": "Nos Services",
    "services.subtitle": "Développement web, SEO technique, refonte et vidéo pour propulser votre entreprise au Maroc",
    "services.web.title": "Création de Sites Web",
    "services.web.desc": "Sites vitrines, e-commerce et applications web sur mesure, optimisés pour la performance et la conversion.",
    "services.seo.title": "Référencement SEO",
    "services.seo.desc": "Stratégie SEO complète pour dominer Google : audit, optimisation on-page, netlinking et contenu.",
    "services.cta": "En savoir plus",

    // Stats
    "stats.projects": "Projets Livrés",
    "stats.clients": "Clients Satisfaits",
    "stats.cities": "Villes Couvertes",
    "stats.experience": "Années d'Expérience",

    // Process
    "process.title": "Mon Processus",
    "process.subtitle": "Une méthodologie éprouvée pour des résultats garantis",
    "process.step1.title": "Consultation",
    "process.step1.desc": "Analyse approfondie de vos besoins et objectifs",
    "process.step2.title": "Stratégie",
    "process.step2.desc": "Plan d'action personnalisé et roadmap détaillée",
    "process.step3.title": "Développement",
    "process.step3.desc": "Réalisation avec suivi transparent et itérations",
    "process.step4.title": "Résultats",
    "process.step4.desc": "Lancement, optimisation continue et reporting",

    // Testimonials
    "testimonials.title": "Ce que disent nos clients",
    "testimonials.subtitle": "La satisfaction de nos clients est notre meilleure preuve",

    // FAQ
    "faq.title": "Questions Fréquentes",
    "faq.subtitle": "Tout ce que vous devez savoir avant de démarrer votre projet digital",
    "faq.q1": "Comment obtenir un devis pour mon projet web au Maroc ?",
    "faq.a1": "Prix sur demande — Contactez-moi pour un devis personnalisé. Chaque projet est étudié selon vos objectifs, vos contenus, vos fonctionnalités et votre délai.",
    "faq.q2": "Combien de temps faut-il pour créer un site web ?",
    "faq.a2": "Un site vitrine est livré en 1 à 2 semaines. Un e-commerce entre 2 et 4 semaines. Les projets plus complexes prennent 4 à 8 semaines avec des points réguliers.",
    "faq.q3": "Proposez-vous le SEO local pour les villes du Maroc ?",
    "faq.a3": "Oui ! Je suis spécialisé en SEO local pour toutes les grandes villes : Casablanca, Rabat, Marrakech, Fès, Tanger, Meknès, Agadir, Oujda et plus encore.",
    "faq.q4": "Pouvez-vous développer un site sur mesure pour mon activité ?",
    "faq.a4": "Oui. Je développe des sites vitrines, e-commerce et applications web avec React, Laravel, Shopify ou WordPress selon vos besoins, puis j'optimise la vitesse, le SEO et la conversion.",
    "faq.q5": "Travaillez-vous à distance ou uniquement à Meknès ?",
    "faq.a5": "Je travaille avec des clients dans tout le Maroc et à l'international. Basé à Meknès, je me déplace aussi à Fès, Rabat et Casablanca pour les réunions importantes.",

    // CTA
    "cta.title": "Prêt à transformer votre présence digitale ?",
    "cta.subtitle": "Demandez votre devis gratuit et recevez une proposition personnalisée sous 24h.",
    "cta.name": "Nom complet",
    "cta.email": "Email",
    "cta.phone": "Téléphone",
    "cta.service": "Service souhaité",
    "cta.message": "Décrivez votre projet",
    "cta.submit": "Envoyer ma demande",
    "cta.sending": "Envoi en cours...",

    // Footer
    "footer.description": "Expert digital basé à Meknès — Ayoub Touati. Création de sites web, SEO et refonte de sites au Maroc.",
    "footer.services": "Services",
    "footer.company": "Entreprise",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.address": "Meknès, Maroc",
    "footer.cities": "Villes desservies",

    // About
    "about.subtitle": "Un freelancer passionné par la croissance de votre entreprise",
    "about.mission.title": "Ma Mission",
    "about.mission.text": "Je suis Ayoub Touati, expert digital basé à Meknès. J'aide les entreprises marocaines à prospérer dans le monde digital. De Casablanca à Oujda, je combine expertise technique et connaissance approfondie du marché marocain pour offrir des solutions qui génèrent des résultats concrets et mesurables.",

    // General
    "general.learnMore": "En savoir plus",
    "general.viewAll": "Voir tout",
    "general.freeAudit": "Audit gratuit",
    "general.freeAuditDesc": "Recevez un audit SEO gratuit de votre site web",
  },
  ar: {
    // Nav
    "nav.home": "الرئيسية",
    "nav.services": "خدماتنا",
    "nav.portfolio": "أعمالنا",
    "nav.blog": "المدونة",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "nav.quote": "طلب عرض أسعار",
    "nav.logoAlt": "أيوب التواتي",
    "nav.menu": "القائمة",
    "nav.close": "إغلاق",
    "nav.language": "تغيير اللغة",

    // Hero
    "hero.title": "خبيرك الرقمي",
    "hero.titleAccent": "في المغرب",
    "hero.subtitle": "تصميم مواقع الويب، تحسين محركات البحث وإعادة تصميم المواقع. نحوّل رؤيتك إلى نتائج ملموسة — من مكناس إلى جميع أنحاء المغرب.",
    "hero.cta.quote": "اطلب عرض أسعار مجاني",
    "hero.cta.whatsapp": "تواصل معنا عبر واتساب",
    "hero.trust": "مواقع منجزة لشركات في مختلف مدن المغرب",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "تطوير ويب، SEO تقني، إعادة تصميم المواقع وتطوير ووردبريس لدفع أعمالك نحو النجاح في المغرب",
    "services.web.title": "تصميم المواقع",
    "services.web.desc": "مواقع تعريفية، متاجر إلكترونية وتطبيقات ويب مخصصة، محسّنة للأداء والتحويل.",
    "services.seo.title": "تحسين محركات البحث",
    "services.seo.desc": "استراتيجية SEO شاملة للسيطرة على Google: تدقيق، تحسين الصفحات، بناء الروابط والمحتوى.",
    "services.cta": "اعرف المزيد",

    // Stats
    "stats.projects": "مشروع منجز",
    "stats.clients": "عميل راضٍ",
    "stats.cities": "مدن مغطاة",
    "stats.experience": "سنوات خبرة",

    // Process
    "process.title": "منهجيتي",
    "process.subtitle": "منهجية مجربة لنتائج مضمونة",
    "process.step1.title": "الاستشارة",
    "process.step1.desc": "تحليل معمق لاحتياجاتك وأهدافك",
    "process.step2.title": "الاستراتيجية",
    "process.step2.desc": "خطة عمل مخصصة وخارطة طريق مفصلة",
    "process.step3.title": "التطوير",
    "process.step3.desc": "التنفيذ مع متابعة شفافة وتكرارات",
    "process.step4.title": "النتائج",
    "process.step4.desc": "الإطلاق، التحسين المستمر والتقارير",

    // Testimonials
    "testimonials.title": "ماذا يقول عملاؤنا",
    "testimonials.subtitle": "رضا عملائنا هو أفضل إعلان لنا",

    // FAQ
    "faq.title": "الأسئلة الشائعة",
    "faq.subtitle": "كل ما تحتاج معرفته قبل بدء مشروعك الرقمي",
    "faq.q1": "كيف أحصل على عرض سعر لمشروعي؟",
    "faq.a1": "الأسعار عند الطلب — اتصل بي للحصول على عرض سعر مخصص. نحدد العرض حسب الأهداف والمحتوى والوظائف والمدة المطلوبة.",
    "faq.q2": "كم من الوقت يستغرق إنشاء موقع ويب؟",
    "faq.a2": "موقع تعريفي يُسلّم في أسبوع إلى أسبوعين. متجر إلكتروني بين أسبوعين و4 أسابيع. المشاريع الأكبر تأخذ 4 إلى 8 أسابيع.",
    "faq.q3": "هل تقدم SEO محلي لمدن المغرب؟",
    "faq.a3": "نعم! أنا متخصص في SEO المحلي لجميع المدن الكبرى: الدار البيضاء، الرباط، مراكش، فاس، طنجة، مكناس، أكادير، وجدة والمزيد.",
    "faq.q4": "هل يمكنك تطوير موقع مخصص لنشاطي؟",
    "faq.a4": "نعم. أطور مواقع تعريفية، متاجر إلكترونية وتطبيقات ويب باستعمال React أو Laravel أو Shopify أو WordPress حسب احتياجاتك، ثم أحسّن السرعة وSEO والتحويل.",
    "faq.q5": "هل تعمل عن بُعد أم فقط في مكناس؟",
    "faq.a5": "أعمل مع عملاء في جميع أنحاء المغرب ودوليًا. مقري في مكناس وأتنقل أيضًا إلى فاس والرباط والدار البيضاء.",

    // CTA
    "cta.title": "مستعد لتحويل حضورك الرقمي؟",
    "cta.subtitle": "اطلب عرض أسعار مجاني واحصل على اقتراح مخصص خلال 24 ساعة.",
    "cta.name": "الاسم الكامل",
    "cta.email": "البريد الإلكتروني",
    "cta.phone": "الهاتف",
    "cta.service": "الخدمة المطلوبة",
    "cta.message": "صف مشروعك",
    "cta.submit": "إرسال طلبي",
    "cta.sending": "جاري الإرسال...",

    // Footer
    "footer.description": "خبير رقمي مقره مكناس — أيوب التواتي. تصميم المواقع، تحسين محركات البحث، وإعادة تصميم المواقع في المغرب.",
    "footer.services": "الخدمات",
    "footer.company": "الشركة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.address": "مكناس، المغرب",
    "footer.cities": "المدن التي نخدمها",

    // About
    "about.subtitle": "فريلانسر شغوف بنمو أعمالك",
    "about.mission.title": "مهمتي",
    "about.mission.text": "أنا أيوب التواتي، خبير رقمي مقره مكناس. أساعد الشركات المغربية على الازدهار في العالم الرقمي. من الدار البيضاء إلى وجدة، أجمع بين الخبرة التقنية والمعرفة العميقة بالسوق المغربي لتقديم حلول تحقق نتائج ملموسة وقابلة للقياس.",

    // General
    "general.learnMore": "اعرف المزيد",
    "general.viewAll": "عرض الكل",
    "general.freeAudit": "تدقيق مجاني",
    "general.freeAuditDesc": "احصل على تدقيق SEO مجاني لموقعك",
  },
};

export const I18nContext = createContext<I18nContextType>({
  locale: "fr",
  setLocale: () => {},
  t: (key: string) => key,
  dir: "ltr",
});

export const useI18n = () => useContext(I18nContext);
