import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { useI18n } from "@/lib/i18n";

const posts = [
  {
    slug: "combien-coute-site-web-maroc",
    title: "Combien coûte un site web au Maroc en 2025 ?",
    excerpt: "Guide complet des prix de création de sites web au Maroc : site vitrine, e-commerce, application web.",
    category: "Web",
    date: "2025-01-15",
  },
  {
    slug: "seo-local-meknes-guide",
    title: "SEO Local à Meknès : Le Guide Complet",
    excerpt: "Comment référencer votre entreprise en tête de Google à Meknès. Stratégies locales éprouvées.",
    category: "SEO",
    date: "2025-01-10",
  },
  {
    slug: "marketing-digital-pme-maroc",
    title: "Marketing Digital pour les PME au Maroc",
    excerpt: "Les stratégies de marketing digital les plus efficaces pour les petites et moyennes entreprises marocaines.",
    category: "Marketing",
    date: "2025-01-05",
  },
];

const Blog = () => {
  const { t } = useI18n();

  return (
    <Layout>
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {t("nav.blog")}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            Conseils, guides et actualités du marketing digital au Maroc
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
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      {post.category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {new Date(post.date).toLocaleDateString("fr-FR")}
                    </span>
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
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
