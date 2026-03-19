import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const packages = [
  {
    name: "Site Vitrine",
    nameAr: "موقع تعريفي",
    price: "à partir de 1 500 DH",
    popular: false,
    features: [
      "Design responsive moderne",
      "5-7 pages optimisées",
      "Formulaire de contact",
      "Optimisation SEO de base",
      "Certificat SSL gratuit",
      "Livraison 1-2 semaines",
    ],
    featuresAr: [
      "تصميم عصري متجاوب",
      "5-7 صفحات محسّنة",
      "نموذج اتصال",
      "تحسين SEO أساسي",
      "شهادة SSL مجانية",
      "تسليم خلال 1-2 أسبوع",
    ],
    href: "/services/creation-site-web",
  },
  {
    name: "E-Commerce",
    nameAr: "متجر إلكتروني",
    price: "à partir de 2 000 DH",
    popular: true,
    features: [
      "Catalogue produits illimité",
      "Paiement en ligne sécurisé",
      "Gestion des stocks",
      "Tableau de bord admin",
      "SEO avancé",
      "Livraison 2-4 semaines",
    ],
    featuresAr: [
      "كتالوج منتجات غير محدود",
      "دفع إلكتروني آمن",
      "إدارة المخزون",
      "لوحة تحكم إدارية",
      "SEO متقدم",
      "تسليم خلال 2-4 أسابيع",
    ],
    href: "/services/creation-site-web",
  },
  {
    name: "Application Web",
    nameAr: "تطبيق ويب",
    price: "à partir de 5 000 DH",
    popular: false,
    features: [
      "Fonctionnalités sur mesure",
      "Base de données avancée",
      "API personnalisées",
      "Authentification utilisateurs",
      "Support premium 6 mois",
      "Livraison 4-8 semaines",
    ],
    featuresAr: [
      "وظائف مخصصة",
      "قاعدة بيانات متقدمة",
      "API مخصصة",
      "مصادقة المستخدمين",
      "دعم متميز 6 أشهر",
      "تسليم خلال 4-8 أسابيع",
    ],
    href: "/services/creation-site-web",
  },
];

const seoPackages = [
  { name: "SEO Essentiel", nameAr: "SEO أساسي", price: "2 000 DH/mois", features: ["10 mots-clés ciblés", "Optimisation on-page", "Google My Business", "Reporting mensuel"], featuresAr: ["10 كلمات مفتاحية", "تحسين الصفحات", "Google My Business", "تقرير شهري"] },
  { name: "SEO Croissance", nameAr: "SEO نمو", price: "4 000 DH/mois", features: ["30 mots-clés ciblés", "Création de contenu", "Netlinking", "Reporting bi-mensuel"], featuresAr: ["30 كلمة مفتاحية", "إنشاء المحتوى", "بناء الروابط", "تقرير نصف شهري"], popular: true },
  { name: "SEO Domination", nameAr: "SEO سيطرة", price: "8 000 DH/mois", features: ["50+ mots-clés", "Stratégie contenu complète", "Netlinking premium", "Account manager dédié"], featuresAr: ["50+ كلمة مفتاحية", "استراتيجية محتوى كاملة", "بناء روابط متميز", "مدير حساب مخصص"] },
];

const faqs = [
  { q: "Quels modes de paiement acceptez-vous ?", a: "Nous acceptons les virements bancaires, chèques et espèces. Un acompte de 50% est demandé au début du projet, le solde à la livraison." },
  { q: "Y a-t-il des frais cachés ?", a: "Non. Nos prix sont transparents et tout est détaillé dans le devis. Il n'y a aucun frais caché." },
  { q: "Proposez-vous des facilités de paiement ?", a: "Oui, nous proposons des paiements en 2 ou 3 fois pour les projets supérieurs à 5 000 DH." },
  { q: "Le prix inclut-il l'hébergement ?", a: "L'hébergement de la première année est offert pour les sites vitrines et e-commerce. Le renouvellement annuel est à partir de 500 DH/an." },
  { q: "Puis-je avoir un devis personnalisé ?", a: "Absolument ! Chaque projet est unique. Contactez-nous pour un devis gratuit adapté à vos besoins spécifiques." },
];

const Tarifs = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <Layout>
      <SEOHead
        title={isAr ? "أسعار خدماتنا الرقمية في المغرب | أيوب التواتي" : "Tarifs & Prix — Création Site Web, SEO, Marketing Digital au Maroc"}
        description={isAr
          ? "اكتشف أسعارنا الشفافة لتصميم المواقع، SEO والتسويق الرقمي في المغرب. عروض أسعار مجانية."
          : "Découvrez nos tarifs transparents pour la création de sites web, SEO et marketing digital au Maroc. Site vitrine dès 1 500 DH. Devis gratuit."}
        path="/tarifs"
      />

      <Breadcrumb items={[{ label: isAr ? "الأسعار" : "Tarifs" }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "أسعار شفافة ومنافسة" : "Tarifs Transparents & Compétitifs"}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            {isAr
              ? "أسعار واضحة بدون مفاجآت. كل مشروع يحصل على عرض أسعار مجاني مخصص خلال 24 ساعة."
              : "Des prix clairs, sans surprises. Chaque projet reçoit un devis gratuit personnalisé sous 24h."}
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-accent">
            {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="h-4 w-4 fill-current" />)}
            <span className="ml-2 text-sm text-primary-foreground/60">+50 {isAr ? "عميل راضٍ" : "clients satisfaits"}</span>
          </div>
        </div>
      </section>

      {/* Web packages */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-4 md:text-3xl">
            {isAr ? "أسعار تصميم المواقع" : "Tarifs Création de Sites Web"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            {isAr ? "أسعار تنافسية لمواقع احترافية عالية الأداء" : "Des prix compétitifs pour des sites professionnels et performants"}
          </p>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {packages.map((pkg, i) => (
              <Card key={pkg.name} className={`border-border/50 ${pkg.popular ? "border-accent shadow-gold relative" : ""}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                    {isAr ? "الأكثر طلبًا" : "Le plus demandé"}
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">{isAr ? pkg.nameAr : pkg.name}</h3>
                  <div className="mt-2 text-3xl font-extrabold text-accent">{pkg.price}</div>
                  <ul className="mt-6 space-y-3">
                    {(isAr ? pkg.featuresAr : pkg.features).map((f) => (
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

      {/* SEO packages */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-4 md:text-3xl">
            {isAr ? "أسعار تحسين محركات البحث (SEO)" : "Tarifs Référencement SEO"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            {isAr ? "استثمار شهري لنتائج دائمة على Google" : "Un investissement mensuel pour des résultats durables sur Google"}
          </p>
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {seoPackages.map((pkg) => (
              <Card key={pkg.name} className={`border-border/50 ${(pkg as any).popular ? "border-accent shadow-gold relative" : ""}`}>
                {(pkg as any).popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold text-accent-foreground">
                    {isAr ? "الأكثر طلبًا" : "Populaire"}
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold">{isAr ? pkg.nameAr : pkg.name}</h3>
                  <div className="mt-2 text-3xl font-extrabold text-accent">{pkg.price}</div>
                  <ul className="mt-6 space-y-3">
                    {(isAr ? pkg.featuresAr : pkg.features).map((f) => (
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

      {/* Other services pricing */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "أسعار الخدمات الأخرى" : "Tarifs des autres services"}
          </h2>
          <div className="mx-auto max-w-3xl space-y-4">
            {[
              { name: "Marketing Digital", nameAr: "التسويق الرقمي", price: "2 500 DH/mois", href: "/services/marketing-digital" },
              { name: "Publicité Réseaux Sociaux", nameAr: "إعلانات التواصل الاجتماعي", price: "2 000 DH/mois", href: "/services/publicite-reseaux-sociaux" },
              { name: "Google Ads", nameAr: "إعلانات Google", price: "2 500 DH/mois", href: "/services/google-ads" },
              { name: "Montage Vidéo", nameAr: "مونتاج الفيديو", price: "500 DH", href: "/services/montage-video" },
              { name: "Email Marketing", nameAr: "التسويق عبر البريد الإلكتروني", price: "1 500 DH/mois", href: "/services/email-marketing" },
              { name: "Refonte de Site Web", nameAr: "إعادة تصميم المواقع", price: "5 000 DH", href: "/services/refonte-site-web" },
            ].map((s) => (
              <div key={s.name} className="flex items-center justify-between rounded-lg border border-border/50 bg-card p-4">
                <div>
                  <h3 className="font-bold">{isAr ? s.nameAr : s.name}</h3>
                  <Link to={s.href} className="text-xs text-accent hover:text-accent/80">
                    {isAr ? "التفاصيل" : "Voir les détails"} →
                  </Link>
                </div>
                <div className="text-right">
                  <span className="text-lg font-extrabold text-accent">{isAr ? `من ${s.price}` : `À partir de ${s.price}`}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10 md:text-3xl">
            {isAr ? "أسئلة حول الأسعار" : "Questions sur nos tarifs"}
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="rounded-lg border border-border/50 bg-card px-6">
                  <AccordionTrigger className="text-left font-semibold hover:text-accent">{faq.q}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{faq.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            {isAr ? "جاهز للبدء؟" : "Prêt à démarrer ?"}
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            {isAr
              ? "احصل على عرض أسعار مجاني مخصص خلال 24 ساعة. بدون التزام."
              : "Recevez un devis gratuit personnalisé sous 24h. Sans engagement."}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">{t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <Link to="/services" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Tous nos services</Link>
            <Link to="/realisations" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Nos réalisations</Link>
            <Link to="/audit-seo-gratuit" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">Audit SEO gratuit →</Link>
          </div>
        </div>
      </section>

      <ContactCTA />

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />
    </Layout>
  );
};

export default Tarifs;
