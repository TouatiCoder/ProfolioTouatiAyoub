import { Link } from "react-router-dom";
import { ArrowRight, ExternalLink, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead, buildBreadcrumbSchema } from "@/components/SEOHead";
import { ContactCTA } from "@/components/home/ContactCTA";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";
import { usePublicProjects } from "@/hooks/usePublicProjects";

const serviceLabels: Record<string, string> = {
  web: "Creation site web",
  seo: "SEO",
  marketing: "Marketing",
  video: "Video",
  email: "Email",
};

const Portfolio = () => {
  const { t } = useI18n();
  const { items: projects, loading } = usePublicProjects({ featured: true, limit: 9 });

  return (
    <Layout>
      <SEOHead
        title="Portfolio creation site web Maroc | WordPress developer Morocco"
        description="Realisations signees freelance web developer Morocco pour creation site web Maroc, WordPress developer Morocco et SEO freelancer Maroc avec resultats mesurables."
        path="/realisations"
        jsonLd={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Realisations", path: "/realisations" },
        ])}
      />
      <Breadcrumb items={[{ label: t("nav.portfolio") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            Portfolio creation site web Maroc et WordPress developer Morocco
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-foreground/75">
            Projets livres pour des entreprises marocaines qui voulaient plus de credibilite, plus de leads et un parcours de conversion plus net.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Resultats concrets pour developpeur web freelance Maroc et SEO freelancer Maroc
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Chaque projet est pense pour charger vite, rassurer vite et transformer plus de visites en conversations commerciales.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((item) => (
                <div key={item} className="h-80 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <Card key={project.id} className="group overflow-hidden border-border/50 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-gold">
                  <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-primary/70">
                    {project.image_url ? (
                      <img
                        src={api.asset(project.image_url) ?? undefined}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-center">
                        <div>
                          <p className="text-sm uppercase tracking-[0.25em] text-primary-foreground/50">
                            Case Study
                          </p>
                          <p className="mt-3 text-3xl font-black text-primary-foreground/90">
                            {project.title.slice(0, 1)}
                          </p>
                        </div>
                      </div>
                    )}
                    {project.featured && (
                      <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                        Projet prioritaire
                      </Badge>
                    )}
                  </div>

                  <CardContent className="space-y-4 p-6">
                    <div className="flex flex-wrap gap-2">
                      {project.service_type && (
                        <Badge variant="secondary" className="bg-accent/10 text-accent">
                          {serviceLabels[project.service_type] || project.service_type}
                        </Badge>
                      )}
                      {project.client_name && (
                        <Badge variant="outline">
                          {project.client_name}
                        </Badge>
                      )}
                    </div>

                    <div>
                      <h3 className="text-xl font-bold">{project.title}</h3>
                      {project.description && (
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {project.description}
                        </p>
                      )}
                    </div>

                    {project.results && (
                      <div className="rounded-xl bg-muted/50 p-4">
                        <div className="flex items-center gap-2 text-sm font-semibold text-accent">
                          <TrendingUp className="h-4 w-4" />
                          Resultat cle
                        </div>
                        <p className="mt-2 text-sm text-foreground">{project.results}</p>
                      </div>
                    )}

                    {project.live_url ? (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-semibold text-accent"
                      >
                        Voir le projet
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">
                Discuter de votre projet
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default Portfolio;
