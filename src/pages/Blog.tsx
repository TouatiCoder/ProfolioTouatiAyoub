import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead, buildBreadcrumbSchema } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  published_at: string | null;
}

const categoryColors: Record<string, string> = {
  Web: "bg-accent/10 text-accent",
  SEO: "bg-primary/10 text-primary",
  Marketing: "bg-destructive/10 text-destructive",
  Email: "bg-gold-light text-gold-foreground",
};

const Blog = () => {
  const { t } = useI18n();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<BlogPost[]>("/api/blog")
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const getCategory = (post: BlogPost) => {
    const title = post.title.toLowerCase();

    if (title.includes("seo") || title.includes("referencement")) return "SEO";
    if (title.includes("marketing") || title.includes("publicite") || title.includes("ads")) return "Marketing";
    if (title.includes("email")) return "Email";
    return "Web";
  };

  const getReadTime = (content: string | null) => {
    if (!content) return "5 min";
    return `${Math.max(3, Math.ceil(content.split(/\s+/).length / 200))} min`;
  };

  return (
    <Layout>
      <SEOHead
        title="Blog SEO freelancer Maroc | WordPress developer Morocco"
        description="Conseils de freelance web developer Morocco sur la création site web Maroc, le SEO freelancer Maroc, les tunnels de contact et la croissance digitale."
        path="/blog"
        jsonLd={buildBreadcrumbSchema([
          { name: "Accueil", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <Breadcrumb items={[{ label: t("nav.blog") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            Blog SEO freelancer Maroc et creation site web Maroc
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-primary-foreground/75">
            Guides pratiques pour generer plus de trafic qualifie, mieux convertir et lancer un site qui soutient vraiment la vente.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              Conseils terrain pour WordPress developer Morocco, SEO freelancer Maroc et croissance locale
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-border/50 bg-muted/40 py-16 text-center text-muted-foreground">
              Aucun article publie pour le moment.
            </div>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-8">
              {posts.map((post) => {
                const category = getCategory(post);
                const readTime = getReadTime(post.content);
                const displayDate = post.published_at ? new Date(post.published_at) : new Date(post.created_at);

                return (
                  <Card key={post.id} className="group overflow-hidden border-border/50 transition-all hover:border-accent/30 hover:shadow-gold">
                    <CardContent className="p-6 md:p-8">
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[category] || "bg-muted text-muted-foreground"}`}>
                          {category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {displayDate.toLocaleDateString("fr-FR")}
                        </span>
                        <span className="text-xs text-muted-foreground">{readTime} de lecture</span>
                      </div>

                      <Link to={`/blog/${post.slug}`}>
                        <h2 className="text-xl font-bold transition-colors group-hover:text-accent">
                          {post.title}
                        </h2>
                      </Link>

                      <p className="mt-3 text-muted-foreground">
                        {post.excerpt || "Article pratique sur le web, le SEO local et la conversion."}
                      </p>

                      <Link to={`/blog/${post.slug}`} className="mt-5 inline-flex items-center text-sm font-semibold text-accent">
                        {t("general.learnMore")}
                        <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
