import { ExternalLink } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/lib/i18n";

const projects = [
  {
    title: "Restaurant Le Palais",
    client: "Restaurant Le Palais",
    type: "Site vitrine + SEO",
    desc: "Site web moderne avec système de réservation en ligne et stratégie SEO locale.",
    tags: ["Web", "SEO"],
  },
  {
    title: "Boutique Zellige",
    client: "Boutique Zellige",
    type: "E-commerce",
    desc: "Boutique en ligne complète avec paiement intégré et gestion des stocks.",
    tags: ["E-commerce", "Marketing"],
  },
  {
    title: "Cabinet Juridique Meknès",
    client: "Cabinet Juridique",
    type: "Site vitrine + SEO Local",
    desc: "Présence digitale professionnelle avec optimisation pour les recherches locales.",
    tags: ["Web", "SEO Local"],
  },
];

const Portfolio = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {t("nav.portfolio")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Découvrez nos projets récents et les résultats obtenus
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <Card key={project.title} className="group overflow-hidden border-border/50 transition-all hover:shadow-gold">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <span className="text-4xl font-bold text-muted-foreground/20">{project.title.charAt(0)}</span>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mb-1 font-bold">{project.title}</h3>
                  <p className="mb-2 text-xs text-muted-foreground">{project.type}</p>
                  <p className="text-sm text-muted-foreground">{project.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Portfolio;
