import { Target, Users, Award, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

const values = [
  { icon: Target, titleFr: "Résultats mesurables", titleAr: "نتائج قابلة للقياس", descFr: "Chaque projet est orienté vers des résultats concrets et un ROI mesurable. Pas de promesses vides.", descAr: "كل مشروع موجه نحو نتائج ملموسة وعائد استثمار قابل للقياس." },
  { icon: Users, titleFr: "Proximité & disponibilité", titleAr: "القرب والتوفر", descFr: "Un freelancer basé à Meknès, accessible partout au Maroc. Communication directe sans intermédiaire.", descAr: "فريلانسر مقره مكناس، متاح في جميع أنحاء المغرب. تواصل مباشر بدون وسيط." },
  { icon: Award, titleFr: "Excellence technique", titleAr: "التميز التقني", descFr: "Les dernières technologies (React, TypeScript) et les meilleures pratiques SEO du marché.", descAr: "أحدث التقنيات (React, TypeScript) وأفضل ممارسات SEO في السوق." },
  { icon: Zap, titleFr: "Réactivité & rapidité", titleAr: "سرعة الاستجابة", descFr: "Délais de livraison rapides et un support disponible en continu. Devis gratuit sous 24h.", descAr: "مواعيد تسليم سريعة ودعم متواصل. عرض أسعار مجاني خلال 24 ساعة." },
];

const About = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <Layout>
      <Breadcrumb items={[{ label: t("nav.about") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "من نحن — أيوب التواتي" : "À propos — Ayoub Touati"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            {t("about.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">{t("about.mission.title")}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t("about.mission.text")}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {isAr
                ? "أعمل مع شركات من جميع الأحجام — من المطاعم المحلية في مكناس إلى المؤسسات في الدار البيضاء. هدفي هو تحويل حضورك الرقمي إلى آلة لجلب العملاء."
                : "Je travaille avec des entreprises de toutes tailles — du restaurant local à Meknès aux entreprises à Casablanca. Mon objectif : transformer votre présence digitale en machine à clients."}
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.titleFr} className="flex gap-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold">{isAr ? v.titleAr : v.titleFr}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{isAr ? v.descAr : v.descFr}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Internal links */}
          <div className="mx-auto mt-16 max-w-3xl text-center">
            <h2 className="text-xl font-bold mb-6">{isAr ? "اكتشف خدماتنا" : "Découvrez nos services"}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild variant="outline">
                <Link to="/services/creation-site-web">Création Site Web</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services/referencement-seo">SEO</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/services/marketing-digital">Marketing Digital</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/realisations">
                  Nos réalisations <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default About;
