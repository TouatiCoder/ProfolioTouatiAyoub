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

    // Hero
    "hero.title": "Votre Agence Digitale",
    "hero.titleAccent": "à Meknès",
    "hero.subtitle": "Création de sites web, référencement SEO et marketing digital. Nous transformons votre vision en résultats concrets.",
    "hero.cta.quote": "Demander un devis gratuit",
    "hero.cta.whatsapp": "Contactez-nous sur WhatsApp",
    "hero.trust": "Plus de 50 projets livrés avec succès",

    // Services
    "services.title": "Nos Services",
    "services.subtitle": "Des solutions digitales complètes pour propulser votre entreprise",
    "services.web.title": "Création de Sites Web",
    "services.web.desc": "Sites vitrines, e-commerce et applications web sur mesure, optimisés pour la performance et la conversion.",
    "services.seo.title": "Référencement SEO",
    "services.seo.desc": "Stratégie SEO complète pour dominer Google : audit, optimisation on-page, netlinking et contenu.",
    "services.marketing.title": "Marketing Digital",
    "services.marketing.desc": "Campagnes publicitaires, gestion réseaux sociaux et stratégie de contenu pour maximiser votre ROI.",
    "services.cta": "En savoir plus",

    // Stats
    "stats.projects": "Projets Livrés",
    "stats.clients": "Clients Satisfaits",
    "stats.cities": "Villes Couvertes",
    "stats.experience": "Années d'Expérience",

    // Process
    "process.title": "Notre Processus",
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
    "testimonials.subtitle": "La satisfaction de nos clients est notre meilleure publicité",

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
    "footer.description": "Agence digitale basée à Meknès, spécialisée en création de sites web, SEO et marketing digital au Maroc.",
    "footer.services": "Services",
    "footer.company": "Entreprise",
    "footer.contact": "Contact",
    "footer.rights": "Tous droits réservés.",
    "footer.address": "Meknès, Maroc",

    // General
    "general.learnMore": "En savoir plus",
    "general.viewAll": "Voir tout",
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

    // Hero
    "hero.title": "وكالتك الرقمية",
    "hero.titleAccent": "في مكناس",
    "hero.subtitle": "إنشاء مواقع الويب، تحسين محركات البحث والتسويق الرقمي. نحوّل رؤيتك إلى نتائج ملموسة.",
    "hero.cta.quote": "اطلب عرض أسعار مجاني",
    "hero.cta.whatsapp": "تواصل معنا عبر واتساب",
    "hero.trust": "أكثر من 50 مشروع تم تسليمه بنجاح",

    // Services
    "services.title": "خدماتنا",
    "services.subtitle": "حلول رقمية شاملة لدفع أعمالك نحو النجاح",
    "services.web.title": "تصميم المواقع",
    "services.web.desc": "مواقع تعريفية، متاجر إلكترونية وتطبيقات ويب مخصصة، محسّنة للأداء والتحويل.",
    "services.seo.title": "تحسين محركات البحث",
    "services.seo.desc": "استراتيجية SEO شاملة للسيطرة على Google: تدقيق، تحسين الصفحات، بناء الروابط والمحتوى.",
    "services.marketing.title": "التسويق الرقمي",
    "services.marketing.desc": "حملات إعلانية، إدارة وسائل التواصل الاجتماعي واستراتيجية المحتوى لتعظيم عائد الاستثمار.",
    "services.cta": "اعرف المزيد",

    // Stats
    "stats.projects": "مشروع منجز",
    "stats.clients": "عميل راضٍ",
    "stats.cities": "مدن مغطاة",
    "stats.experience": "سنوات خبرة",

    // Process
    "process.title": "منهجيتنا",
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
    "footer.description": "وكالة رقمية مقرها مكناس، متخصصة في إنشاء المواقع، تحسين محركات البحث والتسويق الرقمي في المغرب.",
    "footer.services": "الخدمات",
    "footer.company": "الشركة",
    "footer.contact": "اتصل بنا",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.address": "مكناس، المغرب",

    // General
    "general.learnMore": "اعرف المزيد",
    "general.viewAll": "عرض الكل",
  },
};

export const I18nContext = createContext<I18nContextType>({
  locale: "fr",
  setLocale: () => {},
  t: (key: string) => key,
  dir: "ltr",
});

export const useI18n = () => useContext(I18nContext);
