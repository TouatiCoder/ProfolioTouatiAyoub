import { Target, Users, Award, Zap, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { CONTACT, services } from "@/lib/seo-data";
import { usePublicTechnologies } from "@/hooks/usePublicTechnologies";
import { ContactCTA } from "@/components/home/ContactCTA";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";

const values = [
  { icon: Target, titleFr: "Résultats mesurables", titleAr: "نتائج قابلة للقياس", descFr: "Chaque projet est orienté vers des résultats concrets et un ROI mesurable. Pas de promesses vides.", descAr: "كل مشروع موجه نحو نتائج ملموسة وعائد استثمار قابل للقياس." },
  { icon: Users, titleFr: "Proximité & disponibilité", titleAr: "القرب والتوفر", descFr: "Un freelancer basé à Meknès, accessible partout au Maroc. Communication directe sans intermédiaire.", descAr: "فريلانسر مقره مكناس، متاح في جميع أنحاء المغرب. تواصل مباشر بدون وسيط." },
  { icon: Award, titleFr: "Excellence technique", titleAr: "التميز التقني", descFr: "React, Laravel, Flutter et déploiement cloud (AWS, Azure) — du code jusqu'à la production.", descAr: "React وLaravel وFlutter والنشر السحابي (AWS, Azure) — من الكود إلى الإنتاج." },
  { icon: Zap, titleFr: "Réactivité & rapidité", titleAr: "سرعة الاستجابة", descFr: "Délais de livraison rapides et un support disponible en continu. Devis gratuit sous 24h.", descAr: "مواعيد تسليم سريعة ودعم متواصل. عرض أسعار مجاني خلال 24 ساعة." },
];

const About = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const { items: technologies } = usePublicTechnologies();

  return (
    <Layout>
      <SEOHead
        title={isAr ? "من نحن — أيوب التواتي | مطوّر Full-Stack و Cloud بالمغرب" : "À propos — Ayoub Touati | Développeur Full-Stack & Cloud au Maroc"}
        description={isAr
          ? "تعرف على أيوب التواتي، مطوّر Full-Stack و Cloud مقره مكناس. React، Laravel، Flutter، AWS/Azure. عملاء في المغرب وخارجه."
          : "Découvrez Ayoub Touati, développeur Full-Stack & Cloud basé à Meknès. React, Laravel, Flutter, AWS/Azure. Clients au Maroc et à l'international."}
        path="/a-propos"
      />
      <Breadcrumb items={[{ label: t("nav.about") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "أيوب التواتي — مطوّر Full-Stack و Cloud" : "Ayoub Touati — Développeur Full-Stack & Cloud"}
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
                ? "أعمل مع عملاء في المغرب — من مكناس إلى الدار البيضاء والرباط — وأيضًا مع عملاء خارج المغرب عن بُعد. سواء كان المشروع موقعًا تعريفيًا، تطبيق موبايل أو بنية سحابية كاملة، أتولى الموضوع من الكود إلى النشر."
                : "Je travaille avec des clients au Maroc — de Meknès à Casablanca et Rabat — ainsi qu'avec des clients à l'étranger, à distance. Que le projet soit un site vitrine, une application mobile ou une infrastructure cloud complète, je m'en occupe du code jusqu'au déploiement."}
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <h2 className="mb-6 text-center text-xl font-bold">Technology Stack</h2>
            <div className="flex flex-wrap justify-center gap-2">
              {technologies.map((tech) => (
                <span key={tech.slug} className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground">
                  {tech.name}
                </span>
              ))}
            </div>
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
            <h2 className="text-xl font-bold mb-6">{isAr ? "اكتشف خدماتي" : "Découvrez mes services"}</h2>
            <div className="flex flex-wrap justify-center gap-3">
              {services.map((service) => (
                <Button key={service.slug} asChild variant="outline">
                  <Link to={`/services/${service.slug}`}>{isAr ? service.nameAr : service.name}</Link>
                </Button>
              ))}
              <Button asChild variant="outline">
                <Link to="/realisations">
                  {isAr ? "أعمالي" : "Mes réalisations"} <ArrowRight className="ml-1 h-4 w-4" />
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
