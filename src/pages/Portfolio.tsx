import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, ExternalLink, TrendingUp } from "lucide-react";
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

const serviceLabels: Record<string, { fr: string; ar: string }> = {
  web:                 { fr: "Création site web", ar: "تطوير موقع ويب" },
  "creation-site-web": { fr: "Création site web", ar: "تطوير موقع ويب" },
  seo:                 { fr: "SEO",               ar: "تحسين محركات البحث" },
  "referencement-seo": { fr: "SEO",               ar: "تحسين محركات البحث" },
  video:               { fr: "Montage vidéo",     ar: "مونتاج فيديو" },
  "montage-video":     { fr: "Montage vidéo",     ar: "مونتاج فيديو" },
  "refonte-site-web":  { fr: "Refonte site web",  ar: "إعادة تصميم موقع" },
};

const Portfolio = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const { items: projects, loading } = usePublicProjects({ featured: true, limit: 9 });
  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      <SEOHead
        title={isAr
          ? "أعمالنا | مشاريع تطوير مواقع وSEO في المغرب"
          : "Portfolio creation site web Maroc | WordPress developer Morocco"}
        description={isAr
          ? "مشاريع منجزة لشركات مغربية في تطوير المواقع، تحسين محركات البحث ومونتاج الفيديو بنتائج قابلة للقياس."
          : "Realisations signees freelance web developer Morocco pour creation site web Maroc, WordPress developer Morocco et SEO freelancer Maroc avec resultats mesurables."}
        path="/realisations"
        jsonLd={buildBreadcrumbSchema([
          { name: isAr ? "الرئيسية" : "Accueil", path: "/" },
          { name: isAr ? "أعمالنا" : "Realisations", path: "/realisations" },
        ])}
      />
      <Breadcrumb items={[{ label: t("nav.portfolio") }]} />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            {isAr
              ? "أعمالنا — مشاريع حقيقية بنتائج قابلة للقياس"
              : "Portfolio creation site web Maroc et WordPress developer Morocco"}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/75">
            {isAr
              ? "مشاريع سُلِّمت لشركات مغربية أرادت مزيداً من المصداقية، عدداً أكبر من الاستفسارات ومسار تحويل أوضح."
              : "Projets livres pour des entreprises marocaines qui voulaient plus de credibilite, plus de leads et un parcours de conversion plus net."}
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr
                ? "نتائج ملموسة لمطور ويب مستقل في المغرب"
                : "Resultats concrets pour developpeur web freelance Maroc et SEO freelancer Maroc"}
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              {isAr
                ? "كل مشروع مُصمَّم ليحمل بسرعة، يطمئن الزائر فوراً ويحوّل الزيارات إلى محادثات تجارية."
                : "Chaque projet est pense pour charger vite, rassurer vite et transformer plus de visites en conversations commerciales."}
            </p>
          </div>

          {loading ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-80 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : projects.length === 0 ? (
            <div className="rounded-2xl border border-border/50 bg-muted/40 py-16 text-center text-muted-foreground">
              {isAr ? "لا توجد مشاريع معروضة حالياً." : "Aucun projet disponible pour le moment."}
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => {
                const svcKey = project.service_type ?? "";
                const svcLabel = serviceLabels[svcKey]
                  ? (isAr ? serviceLabels[svcKey].ar : serviceLabels[svcKey].fr)
                  : "";

                return (
                  <Card
                    key={project.id}
                    className="group overflow-hidden border-border/50 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-gold"
                  >
                    {/* Thumbnail */}
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
                            <p className="text-xs uppercase tracking-widest text-white/50">
                              {isAr ? "دراسة حالة" : "Case Study"}
                            </p>
                            <p className="mt-3 text-4xl font-black text-white/90">
                              {project.title.slice(0, 1)}
                            </p>
                          </div>
                        </div>
                      )}
                      {project.featured && (
                        <Badge className="absolute left-4 top-4 bg-accent text-accent-foreground">
                          {isAr ? "مشروع مميز" : "Projet prioritaire"}
                        </Badge>
                      )}
                    </div>

                    <CardContent className="space-y-4 p-6">
                      {/* Tags */}
                      <div className={`flex flex-wrap gap-2 ${isAr ? "flex-row-reverse" : ""}`}>
                        {svcLabel && (
                          <Badge variant="secondary" className="bg-accent/10 text-accent">
                            {svcLabel}
                          </Badge>
                        )}
                        {project.client_name && (
                          <Badge variant="outline">{project.client_name}</Badge>
                        )}
                      </div>

                      {/* Title + description */}
                      <div className={isAr ? "text-right" : ""}>
                        <h3 className={`text-xl font-bold ${isAr ? "font-arabic" : ""}`}>
                          {project.title}
                        </h3>
                        {project.description && (
                          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                            {project.description}
                          </p>
                        )}
                      </div>

                      {/* Result */}
                      {project.results && (
                        <div className="rounded-xl bg-muted/50 p-4">
                          <div className={`flex items-center gap-2 text-sm font-semibold text-accent ${isAr ? "flex-row-reverse" : ""}`}>
                            <TrendingUp className="h-4 w-4" />
                            {isAr ? "النتيجة الرئيسية" : "Resultat cle"}
                          </div>
                          <p className={`mt-2 text-sm text-foreground ${isAr ? "text-right" : ""}`}>
                            {project.results}
                          </p>
                        </div>
                      )}

                      {/* CTA */}
                      {project.live_url && (
                        <div className={`flex ${isAr ? "justify-end" : ""}`}>
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
                          >
                            {isAr ? "مشاهدة المشروع" : "Voir le projet"}
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="mt-12 text-center">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">
                {isAr ? "ناقشني حول مشروعك" : "Discuter de votre projet"}
                <Arrow className="ml-2 h-5 w-5" />
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
