import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";

const projects = [
  {
    title: "Restaurant Le Palais",
    client: "Restaurant Le Palais, Meknès",
    type: "Site vitrine + SEO Local",
    desc: "Site web moderne avec système de réservation en ligne et stratégie SEO locale ciblant les recherches \"restaurant meknès\".",
    tags: ["Web", "SEO"],
    results: [
      { label: "Réservations en ligne", value: "×3" },
      { label: "Trafic Google", value: "+400%" },
      { label: "Position Google", value: "Top 3" },
    ],
  },
  {
    title: "Boutique Zellige",
    client: "Boutique Zellige, Fès",
    type: "E-commerce + Marketing",
    desc: "Boutique en ligne complète avec paiement intégré, gestion des stocks et campagnes Facebook Ads ciblées.",
    tags: ["E-commerce", "Marketing"],
    results: [
      { label: "CA en ligne", value: "60%" },
      { label: "ROAS", value: "×5.2" },
      { label: "Commandes/mois", value: "200+" },
    ],
  },
  {
    title: "Cabinet Juridique",
    client: "Cabinet Juridique, Meknès",
    type: "Site vitrine + SEO + Google Ads",
    desc: "Présence digitale professionnelle avec optimisation SEO local et campagne Google Ads pour acquisition de clients.",
    tags: ["Web", "SEO", "Google Ads"],
    results: [
      { label: "Visibilité Google", value: "×10" },
      { label: "Leads/mois", value: "30+" },
      { label: "Coût par lead", value: "-55%" },
    ],
  },
  {
    title: "Clinique Dentaire Sourire",
    client: "Clinique Dentaire, Casablanca",
    type: "Site web + SEO + Réseaux sociaux",
    desc: "Site vitrine responsive avec prise de rendez-vous en ligne, SEO local ciblant Casablanca et gestion des réseaux sociaux.",
    tags: ["Web", "SEO", "Social Media"],
    results: [
      { label: "Rendez-vous en ligne", value: "+250%" },
      { label: "Followers Instagram", value: "5K+" },
      { label: "Avis Google", value: "4.9★" },
    ],
  },
  {
    title: "Agence Immobilière Atlas",
    client: "Atlas Immobilier, Rabat",
    type: "Application web + SEO",
    desc: "Plateforme immobilière avec recherche avancée, filtres, carte interactive et stratégie SEO multi-villes.",
    tags: ["Application Web", "SEO"],
    results: [
      { label: "Annonces actives", value: "500+" },
      { label: "Visiteurs/mois", value: "15K+" },
      { label: "Contacts qualifiés", value: "×4" },
    ],
  },
  {
    title: "École de Langues Global",
    client: "Global Languages, Tanger",
    type: "Site web + Email Marketing + Vidéo",
    desc: "Site de présentation des cours avec inscription en ligne, séquences email automatisées et vidéos promotionnelles.",
    tags: ["Web", "Email", "Vidéo"],
    results: [
      { label: "Inscriptions en ligne", value: "+180%" },
      { label: "Taux d'ouverture email", value: "38%" },
      { label: "Vues vidéo", value: "50K+" },
    ],
  },
];

const Portfolio = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <SEOHead
        title="Nos Réalisations — +50 Projets Digitaux au Maroc | Ayoub Touati"
        description="Découvrez nos réalisations : sites web, SEO, marketing digital au Maroc. +50 projets réussis avec des résultats mesurables. Portfolio complet."
        path="/realisations"
      />
      <Breadcrumb items={[{ label: t("nav.portfolio") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            Nos Réalisations
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            +50 projets livrés avec des résultats mesurables. Découvrez comment nous aidons les entreprises marocaines à croître.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
            {projects.map((project) => (
              <Card key={project.title} className="group overflow-hidden border-border/50 transition-all hover:shadow-gold">
                <div className="aspect-video bg-gradient-hero flex items-center justify-center">
                  <span className="text-5xl font-black text-primary-foreground/20">{project.title.charAt(0)}</span>
                </div>
                <CardContent className="p-6">
                  <div className="mb-3 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-accent/10 text-accent text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <h3 className="mb-1 text-lg font-bold">{project.title}</h3>
                  <p className="mb-1 text-xs text-muted-foreground">{project.client} — {project.type}</p>
                  <p className="mb-4 text-sm text-muted-foreground">{project.desc}</p>
                  
                  {/* Results */}
                  <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted/50 p-3">
                    {project.results.map((r) => (
                      <div key={r.label} className="text-center">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="h-3 w-3 text-accent" />
                          <span className="text-sm font-bold text-accent">{r.value}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground">{r.label}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">
                Discuter de votre projet <ArrowRight className="ml-2 h-5 w-5" />
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
