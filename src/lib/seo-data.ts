// ========================================
// PROGRAMMATIC SEO ENGINE " SERVICE × CITY
// ========================================

export interface City {
  slug: string;
  name: string;
  nameAr: string;
  region: string;
  description: string;
  descriptionAr: string;
  population: string;
  /** Unique economic descriptors for content variation */
  economy: string;
  economyAr: string;
  /** Key industries for semantic content */
  industries: string[];
  industriesAr: string[];
}

export interface ServiceDef {
  slug: string;
  name: string;
  nameAr: string;
  shortDesc: string;
  shortDescAr: string;
  features: string[];
  featuresAr: string[];
  icon: string;
  /** SEO-optimized verb phrases for content variation */
  actionVerbs: string[];
  actionVerbsAr: string[];
  /** Problems this service solves */
  painPoints: string[];
  painPointsAr: string[];
  /** Results / benefits */
  benefits: string[];
  benefitsAr: string[];
}

export const cities: City[] = [
  {
    slug: "casablanca",
    name: "Casablanca",
    nameAr: "الدار البيضاء",
    region: "Casablanca-Settat",
    description: "Capitale économique du Maroc avec plus de 4 millions d'habitants, Casablanca est le centre d'affaires le plus dynamique du pays. Les entreprises casablancaises font face à une concurrence féroce en ligne, rendant une présence digitale professionnelle indispensable pour se démarquer.",
    descriptionAr: "العاصمة الاقتصادية للمغرب بأكثر من 4 ملايين نسمة، الدار البيضاء هي أكثر مراكز الأعمال نشاطًا في البلاد. الشركات في الدار البيضاء تواجه منافسة شرسة عبر الإنترنت.",
    population: "4M+",
    economy: "La ville concentre 48% du PIB national et accueille la Bourse de Casablanca, le plus grand port d'Afrique et des milliers de PME en croissance rapide.",
    economyAr: "المدينة تركز 48% من الناتج المحلي الإجمالي وتستضيف بورصة الدار البيضاء وأكبر ميناء في أفريقيا.",
    industries: ["Finance & Banque", "Commerce international", "Industrie automobile", "Immobilier", "Technologies"],
    industriesAr: ["المالية والبنوك", "التجارة الدولية", "صناعة السيارات", "العقارات", "التكنولوجيا"],
  },
  {
    slug: "rabat",
    name: "Rabat",
    nameAr: "الرباط",
    region: "Rabat-Salé-Kénitra",
    description: "Capitale administrative du Maroc, Rabat abrite les institutions gouvernementales et un écosystème digital en pleine croissance. La ville attire de plus en plus de startups tech et d'entreprises innovantes.",
    descriptionAr: "العاصمة الإدارية للمغرب، الرباط تحتضن المؤسسات الحكومية ونظامًا بيئيًا رقميًا في نمو مستمر.",
    population: "1.9M+",
    economy: "Hub administratif et technologique, Rabat héberge Technopark et de nombreuses agences gouvernementales digitalisant leurs services.",
    economyAr: "مركز إداري وتكنولوجي، الرباط تحتضن Technopark والعديد من الوكالات الحكومية.",
    industries: ["Administration publique", "Technologies", "Éducation", "Santé", "ONG"],
    industriesAr: ["الإدارة العامة", "التكنولوجيا", "التعليم", "الصحة", "المنظمات غير الحكومية"],
  },
  {
    slug: "marrakech",
    name: "Marrakech",
    nameAr: "مراكش",
    region: "Marrakech-Safi",
    description: "Capitale touristique du Maroc, Marrakech attire des millions de visiteurs et dispose d'un marché digital en plein essor pour le tourisme et l'hôtellerie. Les riads, hôtels et restaurants ont besoin d'une visibilité en ligne exceptionnelle.",
    descriptionAr: "العاصمة السياحية للمغرب، مراكش تجذب ملايين الزوار ولديها سوق رقمي مزدهر في مجال السياحة والفندقة.",
    population: "1.3M+",
    economy: "Le tourisme génère plus de 30% de l'économie locale. Les entreprises de Marrakech misent sur le digital pour attirer les touristes internationaux.",
    economyAr: "السياحة تولد أكثر من 30% من الاقتصاد المحلي. الشركات في مراكش تعتمد على الرقمنة لجذب السياح الدوليين.",
    industries: ["Tourisme & Hôtellerie", "Artisanat", "Restauration", "Immobilier de luxe", "Événementiel"],
    industriesAr: ["السياحة والفندقة", "الحرف اليدوية", "المطاعم", "العقارات الفاخرة", "تنظيم الفعاليات"],
  },
  {
    slug: "fes",
    name: "Fès",
    nameAr: "فاس",
    region: "Fès-Meknès",
    description: "Ville impériale et capitale culturelle, Fès possède un tissu économique riche avec des artisans, commerçants et entreprises en pleine digitalisation. La médina de Fès, classée UNESCO, attire un tourisme culturel important.",
    descriptionAr: "مدينة إمبراطورية وعاصمة ثقافية، فاس تمتلك نسيجًا اقتصاديًا غنيًا مع حرفيين وتجار ومؤسسات في طور الرقمنة.",
    population: "1.2M+",
    economy: "Fès combine tradition et modernité avec un artisanat d'excellence, un pôle universitaire majeur et un secteur industriel en croissance.",
    economyAr: "فاس تجمع بين التقليد والحداثة مع حرف يدوية متميزة وقطب جامعي رئيسي وقطاع صناعي في نمو.",
    industries: ["Artisanat & Cuir", "Tourisme culturel", "Éducation", "Agroalimentaire", "Textile"],
    industriesAr: ["الحرف اليدوية والجلد", "السياحة الثقافية", "التعليم", "الصناعة الغذائية", "النسيج"],
  },
  {
    slug: "tanger",
    name: "Tanger",
    nameAr: "طنجة",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Porte de l'Afrique vers l'Europe, Tanger est un hub industriel et commercial en pleine expansion avec le port Tanger Med. La ville connaît un boom économique attirant des investisseurs internationaux.",
    descriptionAr: "بوابة أفريقيا نحو أوروبا، طنجة هي مركز صناعي وتجاري في توسع مستمر مع ميناء طنجة المتوسط.",
    population: "1.1M+",
    economy: "Tanger Med est le premier port d'Afrique. La ville attire massivement les investissements industriels (Renault, Stellantis) et les zones franches.",
    economyAr: "ميناء طنجة المتوسط هو أول ميناء في أفريقيا. المدينة تجذب استثمارات صناعية ضخمة.",
    industries: ["Logistique & Transport", "Industrie automobile", "Zones franches", "Tourisme", "Commerce international"],
    industriesAr: ["اللوجستيك والنقل", "صناعة السيارات", "المناطق الحرة", "السياحة", "التجارة الدولية"],
  },
  {
    slug: "meknes",
    name: "Meknès",
    nameAr: "مكناس",
    region: "Fès-Meknès",
    description: "Ville impériale au cœur du Maroc, Meknès est un centre agricole et commercial stratégique avec un potentiel digital croissant. Les PME de Meknès investissent de plus en plus dans le digital pour moderniser leur activité.",
    descriptionAr: "مدينة إمبراطورية في قلب المغرب، مكناس مركز زراعي وتجاري استراتيجي بإمكانيات رقمية متنامية.",
    population: "650K+",
    economy: "Premier bassin oléicole du Maroc, Meknès est aussi un centre universitaire et commercial stratégique entre Fès et Rabat.",
    economyAr: "أول حوض زيتون في المغرب، مكناس أيضًا مركز جامعي وتجاري استراتيجي بين فاس والرباط.",
    industries: ["Agriculture & Oléiculture", "Commerce", "Éducation", "Tourisme patrimonial", "Artisanat"],
    industriesAr: ["الزراعة وزيت الزيتون", "التجارة", "التعليم", "السياحة التراثية", "الحرف اليدوية"],
  },
  {
    slug: "agadir",
    name: "Agadir",
    nameAr: "أكادير",
    region: "Souss-Massa",
    description: "Station balnéaire et centre économique du Sud, Agadir est réputée pour son tourisme, son agriculture et sa pêche. Les entreprises touristiques d'Agadir misent sur le digital pour attirer les visiteurs européens.",
    descriptionAr: "منتجع ساحلي ومركز اقتصادي للجنوب، أكادير مشهورة بالسياحة والزراعة والصيد البحري.",
    population: "600K+",
    economy: "Agadir est le premier port sardinier au monde et une destination balnéaire majeure avec des plages de renommée internationale.",
    economyAr: "أكادير أول ميناء للسردين في العالم ووجهة ساحلية رئيسية بشواطئ ذات شهرة عالمية.",
    industries: ["Tourisme balnéaire", "Pêche & Fruits de mer", "Agriculture d'export", "Hôtellerie", "Commerce"],
    industriesAr: ["السياحة الساحلية", "الصيد والمأكولات البحرية", "الزراعة التصديرية", "الفندقة", "التجارة"],
  },
  {
    slug: "oujda",
    name: "Oujda",
    nameAr: "وجدة",
    region: "Oriental",
    description: "Capitale de l'Oriental, Oujda est une ville frontalière dynamique avec un marché digital en émergence. Sa proximité avec l'Algérie en fait un carrefour commercial stratégique.",
    descriptionAr: "عاصمة الشرق، وجدة مدينة حدودية نشطة بسوق رقمي ناشئ.",
    population: "500K+",
    economy: "Oujda développe ses infrastructures avec le Technopole de l'Oriental et vise à devenir un hub numérique pour la région Est.",
    economyAr: "وجدة تطور بنيتها التحتية مع تكنوبول الشرق وتهدف لتصبح مركزًا رقميًا للمنطقة الشرقية.",
    industries: ["Commerce transfrontalier", "Énergie renouvelable", "Éducation", "Santé", "Agriculture"],
    industriesAr: ["التجارة العابرة للحدود", "الطاقة المتجددة", "التعليم", "الصحة", "الزراعة"],
  },
  {
    slug: "kenitra",
    name: "Kénitra",
    nameAr: "القنيطرة",
    region: "Rabat-Salé-Kénitra",
    description: "Ville industrielle en croissance rapide entre Rabat et Meknès, Kénitra attire de plus en plus d'entreprises grâce à sa zone franche Atlantic Free Zone.",
    descriptionAr: "مدينة صناعية سريعة النمو بين الرباط ومكناس، القنيطرة تجذب المزيد من الشركات.",
    population: "450K+",
    economy: "Atlantic Free Zone attire des multinationales (PSA, Sumitomo). Kénitra est en passe de devenir un pôle industriel majeur.",
    economyAr: "المنطقة الحرة Atlantic تجذب شركات متعددة الجنسيات. القنيطرة في طريقها لتصبح قطبًا صناعيًا رئيسيًا.",
    industries: ["Industrie automobile", "Zones franches", "Agroalimentaire", "Logistique", "Commerce"],
    industriesAr: ["صناعة السيارات", "المناطق الحرة", "الصناعة الغذائية", "اللوجستيك", "التجارة"],
  },
  {
    slug: "tetouan",
    name: "Tétouan",
    nameAr: "تطوان",
    region: "Tanger-Tétouan-Al Hoceïma",
    description: "Perle du Nord, Tétouan est une ville méditerranéenne avec un patrimoine culturel riche et un tissu économique diversifié.",
    descriptionAr: "لؤلؤة الشمال، تطوان مدينة متوسطية ذات تراث ثقافي غني ونسيج اقتصادي متنوع.",
    population: "400K+",
    economy: "Tétouan combine tourisme culturel, artisanat et une économie croissante liée au corridor Tanger-Tétouan.",
    economyAr: "تطوان تجمع بين السياحة الثقافية والحرف اليدوية واقتصاد متنامي مرتبط بممر طنجة-تطوان.",
    industries: ["Tourisme", "Artisanat", "Éducation", "Commerce", "Immobilier"],
    industriesAr: ["السياحة", "الحرف اليدوية", "التعليم", "التجارة", "العقارات"],
  },
  {
    slug: "safi",
    name: "Safi",
    nameAr: "آسفي",
    region: "Marrakech-Safi",
    description: "Ville côtière et centre industriel, Safi est reconnue pour sa céramique et son industrie chimique.",
    descriptionAr: "مدينة ساحلية ومركز صناعي، آسفي معروفة بالخزف والصناعة الكيميائية.",
    population: "350K+",
    economy: "Safi est le premier producteur de céramique au Maroc et abrite un important complexe chimique (OCP).",
    economyAr: "آسفي أول منتج للخزف في المغرب وتحتضن مجمعًا كيميائيًا مهمًا (OCP).",
    industries: ["Céramique", "Industrie chimique", "Pêche", "Agriculture", "Tourisme"],
    industriesAr: ["الخزف", "الصناعة الكيميائية", "الصيد", "الزراعة", "السياحة"],
  },
  {
    slug: "el-jadida",
    name: "El Jadida",
    nameAr: "الجديدة",
    region: "Casablanca-Settat",
    description: "Ville balnéaire et agricole, El Jadida combine tourisme et industrie avec un marché local en croissance.",
    descriptionAr: "مدينة ساحلية وزراعية، الجديدة تجمع بين السياحة والصناعة بسوق محلي متنامٍ.",
    population: "350K+",
    economy: "El Jadida bénéficie de sa proximité avec Casablanca et son patrimoine UNESCO (cité portugaise) pour développer le tourisme.",
    economyAr: "الجديدة تستفيد من قربها من الدار البيضاء وتراثها الأونيسكو لتطوير السياحة.",
    industries: ["Tourisme", "Agriculture", "Chimie (Jorf Lasfar)", "Pêche", "Commerce"],
    industriesAr: ["السياحة", "الزراعة", "الكيمياء (الجرف الأصفر)", "الصيد", "التجارة"],
  },
  {
    slug: "nador",
    name: "Nador",
    nameAr: "الناظور",
    region: "Oriental",
    description: "Ville du Rif oriental, Nador est un centre commercial important avec une communauté d'affaires active.",
    descriptionAr: "مدينة الريف الشرقي، الناظور مركز تجاري مهم بمجتمع أعمال نشط.",
    population: "300K+",
    economy: "Nador développe ses infrastructures avec le nouveau port Nador West Med et attire des investissements croissants.",
    economyAr: "الناظور تطور بنيتها التحتية مع ميناء الناظور غرب المتوسط الجديد وتجذب استثمارات متزايدة.",
    industries: ["Commerce", "Pêche", "BTP", "Services", "Agriculture"],
    industriesAr: ["التجارة", "الصيد", "البناء والأشغال العمومية", "الخدمات", "الزراعة"],
  },
  {
    slug: "beni-mellal",
    name: "Béni Mellal",
    nameAr: "بني ملال",
    region: "Béni Mellal-Khénifra",
    description: "Capitale de la région Béni Mellal-Khénifra, centre agricole majeur avec un besoin croissant de digitalisation.",
    descriptionAr: "عاصمة جهة بني ملال-خنيفرة، مركز زراعي كبير مع حاجة متزايدة للرقمنة.",
    population: "300K+",
    economy: "Béni Mellal est le grenier agricole du Maroc avec une production abondante d'olives, d'agrumes et de céréales.",
    economyAr: "بني ملال هي مخزن المغرب الزراعي بإنتاج وفير من الزيتون والحمضيات والحبوب.",
    industries: ["Agriculture", "Agroalimentaire", "Commerce", "Éducation", "Services"],
    industriesAr: ["الزراعة", "الصناعة الغذائية", "التجارة", "التعليم", "الخدمات"],
  },
  {
    slug: "mohammedia",
    name: "Mohammedia",
    nameAr: "المحمدية",
    region: "Casablanca-Settat",
    description: "Ville industrielle entre Casablanca et Rabat, Mohammedia abrite de nombreuses entreprises et industries.",
    descriptionAr: "مدينة صناعية بين الدار البيضاء والرباط، المحمدية تحتضن العديد من الشركات والصناعات.",
    population: "250K+",
    economy: "Mohammedia est un hub pétrochimique et industriel majeur situé stratégiquement sur l'axe Casablanca-Rabat.",
    economyAr: "المحمدية مركز بتروكيماوي وصناعي رئيسي يقع بشكل استراتيجي على محور الدار البيضاء-الرباط.",
    industries: ["Pétrochimie", "Industrie", "Logistique", "Commerce", "Tourisme balnéaire"],
    industriesAr: ["البتروكيماويات", "الصناعة", "اللوجستيك", "التجارة", "السياحة الساحلية"],
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
    icon: "Globe",
    actionVerbs: ["concevoir", "développer", "créer", "réaliser", "construire"],
    actionVerbsAr: ["تصميم", "تطوير", "إنشاء", "بناء", "تنفيذ"],
    painPoints: [
      "Vous n'avez pas de site web et perdez des clients au profit de concurrents visibles en ligne",
      "Votre site actuel est lent, non responsive et ne génère aucun lead",
      "Vous payez cher pour un site WordPress qui ne se charge pas correctement sur mobile",
    ],
    painPointsAr: [
      "ليس لديك موقع ويب وتفقد العملاء لصالح منافسين مرئيين عبر الإنترنت",
      "موقعك الحالي بطيء وغير متجاوب ولا يولد أي عملاء محتملين",
      "تدفع الكثير مقابل موقع WordPress لا يتحمل بشكل صحيح على الجوال",
    ],
    benefits: [
      "Un site qui se charge en moins de 2 secondes et convertit les visiteurs en clients",
      "Design professionnel qui inspire confiance et crédibilité",
      "Optimisé pour Google dès le premier jour avec un score PageSpeed de 90+",
    ],
    benefitsAr: [
      "موقع يتحمل في أقل من ثانيتين ويحول الزوار إلى عملاء",
      "تصميم احترافي يلهم الثقة والمصداقية",
      "محسّن لـ Google من اليوم الأول بنتيجة PageSpeed أكثر من 90",
    ],
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
    icon: "Search",
    actionVerbs: ["référencer", "positionner", "optimiser", "booster", "propulser"],
    actionVerbsAr: ["تحسين ترتيب", "تصدّر", "تحسين", "تعزيز", "دفع"],
    painPoints: [
      "Votre site n'apparaît pas sur Google quand vos clients potentiels vous cherchent",
      "Vos concurrents sont en première page et captent tout le trafic",
      "Votre site manque d'optimisation technique et le trafic organique reste à zéro",
    ],
    painPointsAr: [
      "موقعك لا يظهر على Google عندما يبحث عنك العملاء المحتملون",
      "منافسوك في الصفحة الأولى ويستحوذون على كل الزيارات",
      "موقعك يفتقر إلى التحسين التقني والزيارات العضوية تبقى صفرًا",
    ],
    benefits: [
      "Apparaître en première page de Google pour les mots-clés de votre secteur",
      "Générer du trafic qualifié 24h/24 sans achat de trafic",
      "Augmenter vos leads de 300% en moyenne en 6 mois",
    ],
    benefitsAr: [
      "الظهور في الصفحة الأولى من Google للكلمات المفتاحية في مجالك",
      "توليد زيارات مؤهلة على مدار الساعة بدون دفع إعلانات",
      "زيادة العملاء المحتملين بنسبة 300% في المتوسط خلال 6 أشهر",
    ],
  },
  {
    slug: "montage-video",
    name: "Montage Vidéo",
    nameAr: "مونتاج الفيديو",
    shortDesc: "Montage professionnel pour vidéos courtes, YouTube et contenus de marque",
    shortDescAr: "مونتاج احترافي للفيديوهات القصيرة ويوتيوب ومحتوى العلامة التجارية",
    features: [
      "Montage vidéo professionnel",
      "Vidéos promotionnelles",
      "Formats courts",
      "Motion graphics",
      "Sous-titrage",
      "Vidéos corporate",
      "Thumbnails YouTube",
      "Animation de logo",
    ],
    featuresAr: [
      "مونتاج فيديو احترافي",
      "فيديوهات ترويجية",
      "فيديوهات قصيرة",
      "رسوم متحركة",
      "ترجمة مرئية",
      "فيديوهات مؤسسية",
      "صور مصغرة يوتيوب",
      "تحريك الشعار",
    ],
    icon: "Video",
    actionVerbs: ["produire", "monter", "créer", "réaliser", "animer"],
    actionVerbsAr: ["إنتاج", "مونتاج", "إنشاء", "تحقيق", "تحريك"],
    painPoints: [
      "Vos vidéos ont un aspect amateur et ne captent pas l'attention",
      "Vous n'avez pas le temps ni les compétences pour le montage vidéo",
      "Les vidéos de vos concurrents génèrent beaucoup plus d'engagement",
    ],
    painPointsAr: [
      "فيديوهاتك تبدو هاوية ولا تجذب الانتباه",
      "ليس لديك الوقت ولا المهارات للمونتاج",
      "فيديوهات منافسيك تحقق تفاعلاً أكبر بكثير",
    ],
    benefits: [
      "Vidéos professionnelles qui captent l'attention dans les 3 premières secondes",
      "10x plus d'engagement par rapport aux images statiques",
      "Livraison rapide en 48h pour les formats courts",
    ],
    benefitsAr: [
      "فيديوهات احترافية تجذب الانتباه في الثواني الثلاث الأولى",
      "10 أضعاف التفاعل مقارنة بالصور الثابتة",
      "تسليم سريع خلال 48 ساعة للفيديوهات القصيرة",
    ],
  },
  {
    slug: "refonte-site-web",
    name: "Refonte de Site Web",
    nameAr: "إعادة تصميم المواقع",
    shortDesc: "Modernisez votre site web existant pour plus de performance et de conversions",
    shortDescAr: "حدّث موقعك الحالي لمزيد من الأداء والتحويلات",
    features: [
      "Audit UX/UI complet",
      "Redesign moderne",
      "Migration de contenu",
      "Optimisation vitesse",
      "Responsive mobile-first",
      "SEO technique",
      "Tests A/B conversion",
      "Formation administration",
    ],
    featuresAr: [
      "تدقيق UX/UI شامل",
      "إعادة تصميم عصري",
      "نقل المحتوى",
      "تحسين السرعة",
      "متجاوب للجوال أولاً",
      "SEO تقني",
      "اختبارات A/B للتحويل",
      "تدريب على الإدارة",
    ],
    icon: "RefreshCw",
    actionVerbs: ["moderniser", "transformer", "refondre", "repenser", "améliorer"],
    actionVerbsAr: ["تحديث", "تحويل", "إعادة تصميم", "إعادة تفكير", "تحسين"],
    painPoints: [
      "Votre site date de plus de 3 ans et donne une image dépassée de votre entreprise",
      "Les visiteurs quittent votre site en moins de 10 secondes à cause d'un design obsolète",
      "Votre site n'est pas adapté au mobile et vous perdez 60% du trafic potentiel",
    ],
    painPointsAr: [
      "موقعك عمره أكثر من 3 سنوات ويعطي صورة قديمة عن شركتك",
      "الزوار يغادرون موقعك في أقل من 10 ثوانٍ بسبب تصميم قديم",
      "موقعك غير متكيف مع الجوال وتفقد 60% من الزيارات المحتملة",
    ],
    benefits: [
      "Un site modernisé qui double votre taux de conversion",
      "Score PageSpeed amélioré de 30 à 90+ en moyenne",
      "Expérience mobile parfaite pour capter les 70% de trafic mobile",
    ],
    benefitsAr: [
      "موقع محدث يضاعف معدل التحويل",
      "نتيجة PageSpeed محسّنة من 30 إلى أكثر من 90 في المتوسط",
      "تجربة جوال مثالية لجذب 70% من زيارات الجوال",
    ],
  },
];

// Generate all programmatic page combinations
export interface ProgrammaticPage {
  slug: string;
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
  const [
    freelanceWebKeyword,
    creationSiteKeyword,
    wordpressKeyword,
    seoKeyword,
    freelanceFrKeyword,
    affordableKeyword,
  ] = SEO_KEYWORDS;

  for (const service of services) {
    for (const city of cities) {
      pages.push({
        slug: `${service.slug}-${city.slug}`,
        serviceSlug: service.slug,
        citySlug: city.slug,
        metaTitle: `${service.name} a ${city.name} | ${creationSiteKeyword}`,
        metaTitleAr: `${service.nameAr} في ${city.nameAr} " مطور ويب مستقل المغرب | أيوب التواتي`,
        metaDescription: `${service.name} a ${city.name}, Maroc. ${freelanceWebKeyword}, ${wordpressKeyword}, ${seoKeyword} et ${affordableKeyword}. Devis personnalise sur demande.`,
        metaDescriptionAr: `${service.nameAr} في ${city.nameAr} بالمغرب. مطور ويب مستقل متخصص، عرض سعر مخصص عند الطلب. +50 مشروع منجز.`,
        h1: `${service.name} a ${city.name} | ${freelanceFrKeyword}`,
        h1Ar: `${service.nameAr} في ${city.nameAr}`,
      });
    }
  }

  return pages;
}

// City-only pages
export function generateCityPages() {
  const [
    freelanceWebKeyword,
    creationSiteKeyword,
    wordpressKeyword,
    seoKeyword,
    freelanceFrKeyword,
    affordableKeyword,
  ] = SEO_KEYWORDS;

  return cities.map((city) => ({
    slug: `agence-digitale-${city.slug}`,
    citySlug: city.slug,
    metaTitle: `${freelanceWebKeyword} a ${city.name} | ${creationSiteKeyword}`,
    metaTitleAr: `وكالة رقمية ${city.nameAr} " تصميم مواقع و SEO بالمغرب | أيوب التواتي`,
    metaDescription: `${freelanceFrKeyword} a ${city.name}, Maroc. ${creationSiteKeyword}, ${wordpressKeyword}, ${seoKeyword} et ${affordableKeyword}. Devis rapide et accompagnement local.`,
    metaDescriptionAr: `مطور ويب مستقل وخبير SEO في ${city.nameAr}، المغرب. تصميم مواقع احترافية، SEO ومونتاج فيديو. عرض أسعار مجاني خلال 24 ساعة.`,
    h1: `${freelanceFrKeyword} a ${city.name}`,
    h1Ar: `وكالة رقمية في ${city.nameAr} " مطور ويب مستقل المغرب`,
  }));
}

export const CONTACT = {
  name: "Ayoub Touati",
  phone: "+212 710755666",
  phoneClean: "212710755666",
  email: "touatiayoub2001@gmail.com",
  whatsapp: "https://wa.me/212710755666",
  whatsappMessage: "https://wa.me/212710755666?text=Bonjour%2C%20je%20souhaite%20discuter%20d%27un%20projet%20digital.",
  location: "Meknès, Maroc",
};

// ========================================
// HIGH-CONVERTING SEO KEYWORDS " MOROCCO (FR + AR + DARIJA)
// ========================================
export const SEO_KEYWORDS = [
  // French / English
  "freelance web developer Morocco",
  "création site web Maroc",
  "WordPress developer Morocco",
  "SEO freelancer Maroc",
  "développeur web freelance Maroc",
  "création site internet Maroc sur mesure",
  // Arabic Standard
  "خبير SEO المغرب",
  "أفضل خبير SEO في المغرب",
  "مبرمج Full-Stack مغربي",
  "تطوير مواقع الويب المغرب",
  // Darija (Moroccan dialect)
  "مطور ويب فالمغرب",
  "تصميم موقع إلكتروني فكازا",
  "خدمات تطوير مواقع فالمغرب",
  "مونتاج فيديو للمقاولات المغربية",
] as const;

// ========================================
// CONTENT VARIATION ENGINE
// ========================================

/**
 * Generates unique content sections for each service × city combination.
 * Uses city economy data + service pain points/benefits for variation.
 */
export function generateServiceCityContent(service: ServiceDef, city: City, isAr: boolean) {
  const cityIdx = cities.indexOf(city);
  const serviceIdx = services.indexOf(service);
  // Rotate content patterns based on indices for variation
  const patternIdx = (cityIdx + serviceIdx) % 3;

  const problemSection = isAr
    ? {
        title: `لماذا تحتاج ${service.nameAr} في ${city.nameAr}؟`,
        content: `${service.painPointsAr[patternIdx]} في ${city.nameAr}، المنافسة الرقمية تشتد يومًا بعد يوم. ${city.economyAr} الشركات التي لا تستثمر في ${service.nameAr} تفقد فرصًا ثمينة أمام منافسين أكثر حضورًا على الإنترنت. مع ${city.population} نسمة و${city.industriesAr.slice(0, 3).join("، ")} كقطاعات رئيسية، يوجد سوق ضخم ينتظر من يستغله رقميًا.`,
      }
    : {
        title: `Pourquoi avez-vous besoin de ${service.name.toLowerCase()} à ${city.name} ?`,
        content: `${service.painPoints[patternIdx]} À ${city.name}, la compétition digitale s'intensifie chaque jour. ${city.economy} Les entreprises qui n'investissent pas dans ${service.name.toLowerCase().startsWith("e") || service.name.toLowerCase().startsWith("a") ? "l'" : "la "}${service.name.toLowerCase()} perdent des opportunités précieuses face à des concurrents plus visibles en ligne. Avec ${city.population} habitants et des secteurs clés comme ${city.industries.slice(0, 3).join(", ")}, il existe un marché immense à conquérir digitalement.`,
      };

  const solutionSection = isAr
    ? {
        title: `حلولنا في ${service.nameAr} لشركات ${city.nameAr}`,
        content: `نقدم خدمات ${service.nameAr} مصممة خصيصًا لتلبية احتياجات الشركات في ${city.nameAr}. ${service.benefitsAr[0]}. ${service.benefitsAr[1]}. نعتمد على منهجية عمل مثبتة تبدأ بتحليل معمق لوضعك الحالي، تليها استراتيجية مخصصة، ثم تنفيذ دقيق مع متابعة شفافة. كل مشروع يخضع لمعايير جودة صارمة لضمان أقصى عائد على استثمارك.`,
      }
    : {
        title: `Nos solutions de ${service.name.toLowerCase()} pour les entreprises à ${city.name}`,
        content: `Nous proposons des services de ${service.name.toLowerCase()} conçus spécifiquement pour répondre aux besoins des entreprises à ${city.name}. ${service.benefits[0]}. ${service.benefits[1]}. Notre méthodologie éprouvée commence par une analyse approfondie de votre situation actuelle, suivie d'une stratégie personnalisée, puis d'une exécution rigoureuse avec un suivi transparent. Chaque projet est soumis à des standards de qualité stricts pour garantir un retour maximal sur votre investissement.`,
      };

  const localExpertiseSection = isAr
    ? {
        title: `خبرة محلية في ${city.nameAr}`,
        content: `بصفتنا خبراء رقميين نعمل في جميع أنحاء المغرب، نمتلك فهمًا عميقًا لسوق ${city.nameAr}. نعرف التحديات الفريدة التي تواجهها الشركات في قطاعات ${city.industriesAr.join(" و")}. ${city.descriptionAr} مع أكثر من 50 مشروعًا ناجحًا في المغرب، نضمن لك خدمة تفهم خصوصيات السوق المحلي وتحقق نتائج ملموسة.`,
      }
    : {
        title: `Expertise locale à ${city.name}`,
        content: `En tant qu'experts digitaux opérant dans tout le Maroc, nous avons une compréhension profonde du marché de ${city.name}. Nous connaissons les défis uniques auxquels font face les entreprises dans les secteurs de ${city.industries.join(", ")}. ${city.description} Avec plus de 50 projets réussis au Maroc, nous vous garantissons un service qui comprend les spécificités du marché local et produit des résultats concrets.`,
      };

  const processSection = isAr
    ? {
        title: `كيف نعمل معك في ${city.nameAr}`,
        content: `منهجيتنا في 4 خطوات: 1) استشارة مجانية لفهم أهدافك وتحديات عملك في ${city.nameAr}. 2) استراتيجية مخصصة مع خطة عمل واضحة ونطاق تنفيذ شفاف. 3) تنفيذ احترافي مع تحديثات منتظمة ونقاط متابعة. 4) قياس النتائج والتحسين المستمر. نقدم عرض سعر مخصصًا بعد فهم احتياجاتك الرقمية.`,
      }
    : {
        title: `Comment nous travaillons avec vous à ${city.name}`,
        content: `Notre méthodologie en 4 étapes : 1) Consultation gratuite pour comprendre vos objectifs et les défis de votre activité à ${city.name}. 2) Stratégie personnalisée avec un plan d'action clair et un périmètre transparent. 3) Exécution professionnelle avec des mises à jour régulières et des points de suivi. 4) Mesure des résultats et optimisation continue. Le devis est personnalisé après analyse de votre présence digitale.`,
      };

  return [problemSection, solutionSection, localExpertiseSection, processSection];
}

/**
 * Generates unique FAQs for each service × city combination.
 */
export function generateServiceCityFAQs(service: ServiceDef, city: City, isAr: boolean) {
  if (isAr) {
    return [
      { q: `كيف أحصل على عرض سعر لخدمة ${service.nameAr} في ${city.nameAr}؟`, a: `الأسعار عند الطلب. كل مشروع يحصل على عرض سعر مخصص بناءً على الأهداف، نطاق العمل والاحتياجات المحددة.` },
      { q: `هل تعملون مع شركات في ${city.nameAr}؟`, a: `نعم! نخدم شركات في جميع أنحاء المغرب بما في ذلك ${city.nameAr}. مقرنا في مكناس ونعمل عن بُعد أو نتنقل للاجتماعات المهمة.` },
      { q: `ما المدة المطلوبة لرؤية نتائج ${service.nameAr}؟`, a: `النتائج تختلف حسب الخدمة. عادة ما نحقق نتائج أولية خلال 1-3 أشهر مع تحسن مستمر.` },
      { q: `لماذا أختاركم بدلاً من وكالة في ${city.nameAr}؟`, a: `نحن نقدم خدمة شخصية بجودة عالية وتواصل مباشر. مع أكثر من 50 مشروعًا ناجحًا، لدينا سجل مثبت من النتائج في جميع أنحاء المغرب.` },
    ];
  }

  return [
    { q: `Comment obtenir un devis pour ${service.name.toLowerCase().startsWith("e") || service.name.toLowerCase().startsWith("a") ? "l'" : "la "}${service.name.toLowerCase()} à ${city.name} ?`, a: `Prix sur demande. Chaque projet reçoit un devis personnalisé selon vos objectifs, le périmètre et vos besoins spécifiques à ${city.name}.` },
    { q: `Travaillez-vous avec des entreprises à ${city.name} ?`, a: `Absolument ! Nous servons des entreprises dans tout le Maroc, y compris à ${city.name}. Basés à Meknès, nous travaillons à distance ou nous déplaçons pour les réunions importantes.` },
    { q: `Combien de temps faut-il pour voir les résultats de ${service.name.toLowerCase()} ?`, a: `Les résultats varient selon le service. En général, nous obtenons des premiers résultats en 1 à 3 mois avec une amélioration continue.` },
    { q: `Pourquoi vous choisir plutôt qu'une agence à ${city.name} ?`, a: `Nous offrons un service personnalisé de haute qualité avec une communication directe. Avec +50 projets réussis, nous avons un track record prouvé de résultats dans tout le Maroc. Notre expertise technique (React, TypeScript) est supérieure à la plupart des agences locales.` },
  ];
}

// Total programmatic pages count
export const TOTAL_PAGES = services.length * cities.length + cities.length;
// 4 services × 15 cities = 60 + 15 city pages = 75 programmatic pages

