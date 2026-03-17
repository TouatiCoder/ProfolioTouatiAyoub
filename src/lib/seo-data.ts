// ========================================
// PROGRAMMATIC SEO ENGINE — SERVICE × CITY
// ========================================

export interface City {
  slug: string;
  name: string;
  nameAr: string;
  region: string;
  description: string;
  descriptionAr: string;
  population: string;
}

export interface ServiceDef {
  slug: string;
  name: string;
  nameAr: string;
  shortDesc: string;
  shortDescAr: string;
  features: string[];
  featuresAr: string[];
  pricingFrom: string;
  icon: string; // lucide icon name
}

export const cities: City[] = [
  {
    slug: "casablanca",
    name: "Casablanca",
    nameAr: "الدار البيضاء",
    region: "Casablanca-Settat",
    description: "Capitale économique du Maroc avec plus de 4 millions d'habitants, Casablanca est le centre d'affaires le plus dynamique du pays.",
    descriptionAr: "العاصمة الاقتصادية للمغرب بأكثر من 4 ملايين نسمة، الدار البيضاء هي أكثر مراكز الأعمال نشاطًا في البلاد.",
    population: "4M+",
  },
  {
    slug: "rabat",
    name: "Rabat",
    nameAr: "الرباط",
    region: "Rabat-Salé-Kénitra",
    description: "Capitale administrative du Maroc, Rabat abrite les institutions gouvernementales et un écosystème digital en pleine croissance.",
    descriptionAr: "العاصمة الإدارية للمغرب، الرباط تحتضن المؤسسات الحكومية ونظامًا بيئيًا رقميًا في نمو مستمر.",
    population: "1.9M+",
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    nameAr: "مراكش",
    region: "Marrakech-Safi",
    description: "Capitale touristique du Maroc, Marrakech attire des millions de visiteurs et dispose d'un marché digital en plein essor pour le tourisme et l'hôtellerie.",
    descriptionAr: "العاصمة السياحية للمغرب، مراكش تجذب ملايين الزوار ولديها سوق رقمي مزدهر في مجال السياحة والفندقة.",
    population: "1.3M+",
  },
  {
    slug: "fes",
    name: "Fès",
    nameAr: "فاس",
    region: "Fès-Meknès",
    description: "Ville impériale et capitale culturelle, Fès possède un tissu économique riche avec des artisans, commerçants et entreprises en pleine digitalisation.",
    descriptionAr: "مدينة إمبراطورية وعاصمة ثقافية، فاس تمتلك نسيجًا اقتصاديًا غنيًا مع حرفيين وتجار ومؤسسات في طور الرقمنة.",
    population: "1.2M+",
  },
  {
    slug: "tanger",
    name: "Tanger",
    nameAr: "طنجة",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Porte de l'Afrique vers l'Europe, Tanger est un hub industriel et commercial en pleine expansion avec le port Tanger Med.",
    descriptionAr: "بوابة أفريقيا نحو أوروبا، طنجة هي مركز صناعي وتجاري في توسع مستمر مع ميناء طنجة المتوسط.",
    population: "1.1M+",
  },
  {
    slug: "meknes",
    name: "Meknès",
    nameAr: "مكناس",
    region: "Fès-Meknès",
    description: "Ville impériale au cœur du Maroc, Meknès est un centre agricole et commercial stratégique avec un potentiel digital croissant.",
    descriptionAr: "مدينة إمبراطورية في قلب المغرب، مكناس مركز زراعي وتجاري استراتيجي بإمكانيات رقمية متنامية.",
    population: "650K+",
  },
  {
    slug: "agadir",
    name: "Agadir",
    nameAr: "أكادير",
    region: "Souss-Massa",
    description: "Station balnéaire et centre économique du Sud, Agadir est réputée pour son tourisme, son agriculture et sa pêche.",
    descriptionAr: "منتجع ساحلي ومركز اقتصادي للجنوب، أكادير مشهورة بالسياحة والزراعة والصيد البحري.",
    population: "600K+",
  },
  {
    slug: "oujda",
    name: "Oujda",
    nameAr: "وجدة",
    region: "Oriental",
    description: "Capitale de l'Oriental, Oujda est une ville frontalière dynamique avec un marché digital en émergence.",
    descriptionAr: "عاصمة الشرق، وجدة مدينة حدودية نشطة بسوق رقمي ناشئ.",
    population: "500K+",
  },
  {
    slug: "kenitra",
    name: "Kénitra",
    nameAr: "القنيطرة",
    region: "Rabat-Salé-Kénitra",
    description: "Ville industrielle en croissance rapide entre Rabat et Meknès, Kénitra attire de plus en plus d'entreprises.",
    descriptionAr: "مدينة صناعية سريعة النمو بين الرباط ومكناس، القنيطرة تجذب المزيد من الشركات.",
    population: "450K+",
  },
  {
    slug: "tetouan",
    name: "Tétouan",
    nameAr: "تطوان",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Perle du Nord, Tétouan est une ville méditerranéenne avec un patrimoine culturel riche et un tissu économique diversifié.",
    descriptionAr: "لؤلؤة الشمال، تطوان مدينة متوسطية ذات تراث ثقافي غني ونسيج اقتصادي متنوع.",
    population: "400K+",
  },
  {
    slug: "safi",
    name: "Safi",
    nameAr: "آسفي",
    region: "Marrakech-Safi",
    description: "Ville côtière et centre industriel, Safi est reconnue pour sa céramique et son industrie chimique.",
    descriptionAr: "مدينة ساحلية ومركز صناعي، آسفي معروفة بالخزف والصناعة الكيميائية.",
    population: "350K+",
  },
  {
    slug: "el-jadida",
    name: "El Jadida",
    nameAr: "الجديدة",
    region: "Casablanca-Settat",
    description: "Ville balnéaire et agricole, El Jadida combine tourisme et industrie avec un marché local en croissance.",
    descriptionAr: "مدينة ساحلية وزراعية، الجديدة تجمع بين السياحة والصناعة بسوق محلي متنامٍ.",
    population: "350K+",
  },
  {
    slug: "nador",
    name: "Nador",
    nameAr: "الناظور",
    region: "Oriental",
    description: "Ville du Rif oriental, Nador est un centre commercial important avec une communauté d'affaires active.",
    descriptionAr: "مدينة الريف الشرقي، الناظور مركز تجاري مهم بمجتمع أعمال نشط.",
    population: "300K+",
  },
  {
    slug: "beni-mellal",
    name: "Béni Mellal",
    nameAr: "بني ملال",
    region: "Béni Mellal-Khénifra",
    description: "Capitale de la région Béni Mellal-Khénifra, centre agricole majeur avec un besoin croissant de digitalisation.",
    descriptionAr: "عاصمة جهة بني ملال-خنيفرة، مركز زراعي كبير مع حاجة متزايدة للرقمنة.",
    population: "300K+",
  },
  {
    slug: "mohammedia",
    name: "Mohammedia",
    nameAr: "المحمدية",
    region: "Casablanca-Settat",
    description: "Ville industrielle entre Casablanca et Rabat, Mohammedia abrite de nombreuses entreprises et industries.",
    descriptionAr: "مدينة صناعية بين الدار البيضاء والرباط، المحمدية تحتضن العديد من الشركات والصناعات.",
    population: "250K+",
  },
];

export const services: ServiceDef[] = [
  {
    slug: "creation-site-web",
    name: "Création de Sites Web",
    nameAr: "تصميم المواقع الإلكترونية",
    shortDesc: "Sites vitrines, e-commerce et applications web sur mesure",
    shortDescAr: "مواقع تعريفية، متاجر إلكترونية وتطبيقات ويب مخصصة",
    features: [
      "Site vitrine professionnel",
      "Boutique e-commerce",
      "Application web sur mesure",
      "Landing pages optimisées",
      "Design responsive mobile-first",
      "Maintenance et support",
      "Hébergement performant",
      "Certificat SSL gratuit",
    ],
    featuresAr: [
      "موقع تعريفي احترافي",
      "متجر إلكتروني",
      "تطبيق ويب مخصص",
      "صفحات هبوط محسّنة",
      "تصميم متجاوب للجوال",
      "صيانة ودعم",
      "استضافة عالية الأداء",
      "شهادة SSL مجانية",
    ],
    pricingFrom: "3 000 DH",
    icon: "Globe",
  },
  {
    slug: "referencement-seo",
    name: "Référencement SEO",
    nameAr: "تحسين محركات البحث",
    shortDesc: "Dominez Google avec une stratégie SEO complète",
    shortDescAr: "تصدّر نتائج Google باستراتيجية SEO شاملة",
    features: [
      "Audit SEO complet",
      "Optimisation on-page",
      "Stratégie de contenu SEO",
      "Netlinking qualifié",
      "SEO local & Google My Business",
      "Reporting mensuel",
      "Recherche de mots-clés",
      "Analyse concurrentielle",
    ],
    featuresAr: [
      "تدقيق SEO شامل",
      "تحسين الصفحات",
      "استراتيجية محتوى SEO",
      "بناء روابط مؤهلة",
      "SEO محلي و Google My Business",
      "تقارير شهرية",
      "بحث الكلمات المفتاحية",
      "تحليل المنافسين",
    ],
    pricingFrom: "2 000 DH/mois",
    icon: "Search",
  },
  {
    slug: "marketing-digital",
    name: "Marketing Digital",
    nameAr: "التسويق الرقمي",
    shortDesc: "Campagnes publicitaires et gestion des réseaux sociaux",
    shortDescAr: "حملات إعلانية وإدارة وسائل التواصل الاجتماعي",
    features: [
      "Publicité Facebook & Instagram",
      "Publicité Google Ads",
      "Gestion réseaux sociaux",
      "Stratégie de contenu",
      "Branding & identité visuelle",
      "Analytics & reporting",
      "Community management",
      "Campagnes influence",
    ],
    featuresAr: [
      "إعلانات Facebook و Instagram",
      "إعلانات Google Ads",
      "إدارة وسائل التواصل الاجتماعي",
      "استراتيجية المحتوى",
      "العلامة التجارية والهوية البصرية",
      "التحليلات والتقارير",
      "إدارة المجتمع",
      "حملات المؤثرين",
    ],
    pricingFrom: "2 500 DH/mois",
    icon: "Megaphone",
  },
  {
    slug: "montage-video",
    name: "Montage Vidéo",
    nameAr: "مونتاج الفيديو",
    shortDesc: "Vidéos professionnelles pour réseaux sociaux et publicités",
    shortDescAr: "فيديوهات احترافية لوسائل التواصل الاجتماعي والإعلانات",
    features: [
      "Montage vidéo professionnel",
      "Vidéos publicitaires",
      "Reels & Stories",
      "Motion graphics",
      "Sous-titrage",
      "Vidéos corporate",
      "Thumbnails YouTube",
      "Animation de logo",
    ],
    featuresAr: [
      "مونتاج فيديو احترافي",
      "فيديوهات إعلانية",
      "Reels و Stories",
      "رسوم متحركة",
      "ترجمة مرئية",
      "فيديوهات مؤسسية",
      "صور مصغرة يوتيوب",
      "تحريك الشعار",
    ],
    pricingFrom: "500 DH",
    icon: "Video",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing",
    nameAr: "التسويق عبر البريد الإلكتروني",
    shortDesc: "Campagnes email et automatisation marketing",
    shortDescAr: "حملات بريد إلكتروني وأتمتة التسويق",
    features: [
      "Campagnes email ciblées",
      "Automatisation marketing",
      "Newsletters professionnelles",
      "Séquences de bienvenue",
      "Segmentation audience",
      "A/B testing",
      "Templates sur mesure",
      "Reporting détaillé",
    ],
    featuresAr: [
      "حملات بريد إلكتروني مستهدفة",
      "أتمتة التسويق",
      "نشرات إخبارية احترافية",
      "تسلسلات ترحيب",
      "تقسيم الجمهور",
      "اختبار A/B",
      "قوالب مخصصة",
      "تقارير مفصلة",
    ],
    pricingFrom: "1 500 DH/mois",
    icon: "Mail",
  },
];

// Generate all programmatic page combinations
export interface ProgrammaticPage {
  slug: string; // e.g. "creation-site-web-casablanca"
  serviceSlug: string;
  citySlug: string;
  metaTitle: string;
  metaTitleAr: string;
  metaDescription: string;
  metaDescriptionAr: string;
  h1: string;
  h1Ar: string;
}

export function generateProgrammaticPages(): ProgrammaticPage[] {
  const pages: ProgrammaticPage[] = [];

  for (const service of services) {
    for (const city of cities) {
      pages.push({
        slug: `${service.slug}-${city.slug}`,
        serviceSlug: service.slug,
        citySlug: city.slug,
        metaTitle: `${service.name} à ${city.name} | Ayoub Touati`,
        metaTitleAr: `${service.nameAr} في ${city.nameAr} | أيوب التواتي`,
        metaDescription: `${service.shortDesc} à ${city.name}, Maroc. Devis gratuit sous 24h. Expert digital local avec +50 projets réalisés.`,
        metaDescriptionAr: `${service.shortDescAr} في ${city.nameAr}، المغرب. عرض أسعار مجاني خلال 24 ساعة. خبير رقمي محلي بأكثر من 50 مشروع.`,
        h1: `${service.name} à ${city.name}`,
        h1Ar: `${service.nameAr} في ${city.nameAr}`,
      });
    }
  }

  return pages;
}

// City-only pages
export function generateCityPages() {
  return cities.map((city) => ({
    slug: `agence-digitale-${city.slug}`,
    citySlug: city.slug,
    metaTitle: `Agence Digitale à ${city.name} | Création Site Web, SEO & Marketing`,
    metaTitleAr: `وكالة رقمية في ${city.nameAr} | تصميم مواقع، SEO والتسويق`,
    metaDescription: `Votre expert digital à ${city.name}. Création de sites web, SEO, montage vidéo et marketing digital. +50 projets livrés au Maroc.`,
    metaDescriptionAr: `خبيرك الرقمي في ${city.nameAr}. تصميم مواقع، SEO، مونتاج فيديو والتسويق الرقمي. +50 مشروع منجز في المغرب.`,
    h1: `Agence Digitale à ${city.name}`,
    h1Ar: `وكالة رقمية في ${city.nameAr}`,
  }));
}

export const CONTACT = {
  name: "Ayoub Touati",
  phone: "+212 710755666",
  phoneClean: "212710755666",
  email: "touatiayoub@gmail.com",
  whatsapp: "https://wa.me/212710755666",
  whatsappMessage: "https://wa.me/212710755666?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20digital.",
  location: "Meknès, Maroc",
};

// Total programmatic pages count
export const TOTAL_PAGES = services.length * cities.length + cities.length;
// 5 services × 15 cities = 75 + 15 city pages = 90 programmatic pages
