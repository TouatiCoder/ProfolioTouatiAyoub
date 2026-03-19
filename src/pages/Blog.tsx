import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
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
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const getCategory = (post: BlogPost): string => {
    const title = post.title.toLowerCase();
    if (title.includes("seo") || title.includes("référencement")) return "SEO";
    if (title.includes("marketing") || title.includes("publicité") || title.includes("ads")) return "Marketing";
    if (title.includes("email")) return "Email";
    return "Web";
  };

  const getReadTime = (content: string | null): string => {
    if (!content) return "5 min";
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min`;
  };

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
                  <Link to={`/blog/${post.slug}`}>
                    <h2 className="mb-2 text-xl font-bold group-hover:text-accent transition-colors">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="mb-4 text-muted-foreground">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-semibold text-accent">
                    {t("general.learnMore")}
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
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
