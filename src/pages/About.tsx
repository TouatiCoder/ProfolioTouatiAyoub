import { Target, Users, Award, Zap } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";
import { ContactCTA } from "@/components/home/ContactCTA";

const values = [
  { icon: Target, title: "Résultats", desc: "Chaque projet est orienté vers des résultats mesurables et un ROI concret." },
  { icon: Users, title: "Proximité", desc: "Un freelancer basé à Meknès, accessible partout au Maroc." },
  { icon: Award, title: "Excellence", desc: "Les dernières technologies et les meilleures pratiques du marché." },
  { icon: Zap, title: "Réactivité", desc: "Des délais de livraison rapides et un support disponible en continu." },
];

const About = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {t("nav.about")}
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
          </div>

          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="flex gap-4 rounded-xl border border-border/50 bg-card p-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-accent/10">
                  <v.icon className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-bold">{v.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default About;
