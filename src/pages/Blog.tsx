import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";

const posts = [
  {
    slug: "combien-coute-site-web-maroc",
    title: "Combien coûte un site web au Maroc en 2026 ?",
    excerpt: "Guide complet des prix de création de sites web au Maroc : site vitrine dès 3 000 DH, e-commerce dès 8 000 DH. Tous les facteurs qui influencent le prix.",
    category: "Web",
    date: "2026-03-15",
    readTime: "8 min",
  },
  {
    slug: "seo-maroc-guide-complet",
    title: "SEO au Maroc : Le Guide Complet 2026",
    excerpt: "Comment référencer votre site en première page de Google au Maroc. Stratégies SEO on-page, off-page et technique pour dominer les résultats de recherche.",
    category: "SEO",
    date: "2026-03-12",
    readTime: "12 min",
  },
  {
    slug: "marketing-digital-pme-maroc",
    title: "Marketing Digital pour les PME au Maroc : Stratégies Efficaces",
    excerpt: "Les stratégies de marketing digital les plus rentables pour les petites et moyennes entreprises marocaines. Facebook Ads, SEO, email marketing et plus.",
    category: "Marketing",
    date: "2026-03-10",
    readTime: "10 min",
  },
  {
    slug: "creer-site-rentable-maroc",
    title: "Comment créer un site web rentable au Maroc",
    excerpt: "Guide étape par étape pour créer un site web qui génère des clients et des ventes au Maroc. De la conception à l'optimisation conversion.",
    category: "Web",
    date: "2026-03-08",
    readTime: "9 min",
  },
  {
    slug: "facebook-ads-maroc-guide",
    title: "Facebook Ads au Maroc : Guide Complet pour Débutants",
    excerpt: "Comment lancer des campagnes publicitaires rentables sur Facebook et Instagram au Maroc. Ciblage, budget, formats et optimisation.",
    category: "Marketing",
    date: "2026-03-05",
    readTime: "11 min",
  },
  {
    slug: "email-marketing-guide-maroc",
    title: "Email Marketing au Maroc : Guide Pratique",
    excerpt: "Comment construire une liste email et créer des campagnes qui convertissent. Automatisation, newsletters et séquences pour le marché marocain.",
    category: "Email",
    date: "2026-03-03",
    readTime: "8 min",
  },
  {
    slug: "meilleur-freelance-web-maroc",
    title: "Comment choisir le meilleur freelance web au Maroc",
    excerpt: "Les critères essentiels pour sélectionner un développeur web freelance au Maroc. Portfolio, technologies, prix et garanties à vérifier.",
    category: "Web",
    date: "2026-02-28",
    readTime: "7 min",
  },
  {
    slug: "seo-local-maroc",
    title: "SEO Local au Maroc : Dominez Google Maps dans votre ville",
    excerpt: "Guide complet du SEO local pour les entreprises marocaines. Google My Business, citations locales, avis clients et contenu localisé.",
    category: "SEO",
    date: "2026-02-25",
    readTime: "9 min",
  },
  {
    slug: "optimisation-site-web-maroc",
    title: "Optimisation de la vitesse d'un site web au Maroc",
    excerpt: "Comment accélérer votre site web pour un meilleur SEO et une meilleure expérience utilisateur. Core Web Vitals, compression, CDN et bonnes pratiques.",
    category: "Web",
    date: "2026-02-22",
    readTime: "8 min",
  },
  {
    slug: "strategie-digitale-maroc",
    title: "Stratégie digitale pour entreprises marocaines en 2026",
    excerpt: "Comment construire une stratégie digitale complète au Maroc : site web, SEO, réseaux sociaux, publicité payante et email marketing intégrés.",
    category: "Marketing",
    date: "2026-02-20",
    readTime: "13 min",
  },
];

const categoryColors: Record<string, string> = {
  Web: "bg-accent/10 text-accent",
  SEO: "bg-primary/10 text-primary",
  Marketing: "bg-destructive/10 text-destructive",
  Email: "bg-gold-light text-gold-foreground",
};

const Blog = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <SEOHead
        title="Blog Marketing Digital Maroc — Conseils SEO, Web & Growth | Ayoub Touati"
        description="Conseils, guides et stratégies pour dominer le digital au Maroc. SEO, marketing, développement web, Facebook Ads et email marketing."
        path="/blog"
      />
      <Breadcrumb items={[{ label: t("nav.blog") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            Blog Marketing Digital Maroc
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Conseils, guides et stratégies pour dominer le digital au Maroc. SEO, marketing, développement web et plus.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-4xl gap-8">
            {posts.map((post) => (
              <Card key={post.slug} className="group overflow-hidden border-border/50 transition-all hover:shadow-gold hover:border-accent/30">
                <CardContent className="p-6 md:p-8">
                  <div className="mb-3 flex items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[post.category] || "bg-muted text-muted-foreground"}`}>
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("fr-FR")}
                    </span>
                    <span className="text-xs text-muted-foreground">· {post.readTime}</span>
                  </div>
                  <h2 className="mb-2 text-xl font-bold group-hover:text-accent transition-colors">
                    {post.title}
                  </h2>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <span className="inline-flex items-center text-sm font-semibold text-accent">
                    {t("general.learnMore")}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Internal links to services */}
          <div className="mx-auto max-w-4xl mt-16">
            <h2 className="text-lg font-bold mb-4">Nos services</h2>
            <div className="flex flex-wrap gap-2">
              <Link to="/services/creation-site-web" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Création de Sites Web</Link>
              <Link to="/services/referencement-seo" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Référencement SEO</Link>
              <Link to="/services/marketing-digital" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Marketing Digital</Link>
              <Link to="/services/montage-video" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Montage Vidéo</Link>
              <Link to="/services/email-marketing" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Email Marketing</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
