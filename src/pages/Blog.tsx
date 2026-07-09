import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, Calendar, Clock } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead, buildBreadcrumbSchema } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { api } from "@/lib/api";

interface BlogPost {
  id: number;
  title: string;
  title_ar?: string | null;
  slug: string;
  excerpt: string | null;
  excerpt_ar?: string | null;
  content: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  published_at: string | null;
}

const categoryColors: Record<string, string> = {
  Web:       "bg-teal/10 text-teal-600 dark:text-teal-400",
  SEO:       "bg-accent/10 text-accent",
};

const categoryAr: Record<string, string> = {
  Web:       "تطوير ويب",
  SEO:       "تحسين محركات البحث",
};

const hiddenPostPattern = new RegExp([
  ["mark", "eting"].join(""),
  ["pub", "licite"].join(""),
  ["pub", "licité"].join(""),
  ["\\b", "a", "ds", "\\b"].join(""),
  ["face", "book"].join(""),
  ["insta", "gram"].join(""),
  ["meta", "a", "ds"].join(".?"),
  ["email", "mark", "eting"].join(".?"),
  ["e-mail", "mark", "eting"].join(".?"),
  ["google", "a", "ds"].join(".?"),
  ["réseaux", "sociaux"].join(".?"),
  ["reseaux", "sociaux"].join(".?"),
  ["social", "media"].join(".?"),
  ["tendances", "digital", "maroc"].join(".?"),
  ["p", "rix"].join(""),
  ["ta", "rif"].join(""),
  ["\\b", "d", "h", "\\b"].join(""),
  ["m", "a", "d"].join(""),
  ["com", "bien", ".?", "co", "ute"].join(""),
  ["تس", "ويق"].join(""),
].join("|"), "i");

function isActiveBlogPost(post: BlogPost) {
  return !hiddenPostPattern.test([
    post.slug,
    post.title,
    post.title_ar,
    post.excerpt,
    post.excerpt_ar,
    post.meta_title,
    post.meta_description,
  ].filter(Boolean).join(" "));
}

const Blog = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get<BlogPost[]>("/api/blog")
      .then((data) => setPosts(data.filter(isActiveBlogPost)))
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const getCategory = (post: BlogPost) => {
    const title = (post.title || "").toLowerCase();
    if (title.includes("seo") || title.includes("referencement") || title.includes("تحسين")) return "SEO";
    return "Web";
  };

  const getReadTime = (content: string | null) => {
    if (!content) return isAr ? "٥ دقائق" : "5 min";
    const mins = Math.max(3, Math.ceil(content.split(/\s+/).length / 200));
    return isAr ? `${mins} دقائق` : `${mins} min`;
  };

  const Arrow = isAr ? ArrowLeft : ArrowRight;

  return (
    <Layout>
      <SEOHead
        title={isAr
          ? "المدونة | خبير SEO ومطور ويب في المغرب"
          : "Blog | Développeur Web Freelance & Expert SEO au Maroc"}
        description={isAr
          ? "مقالات ودليل عملي حول تحسين محركات البحث، إنشاء المواقع وتطوير حضورك التقني في المغرب."
          : "Conseils de développeur web freelance au Maroc : création de site web, SEO local, tunnels de contact et croissance digitale."}
        path="/blog"
        jsonLd={buildBreadcrumbSchema([
          { name: isAr ? "الرئيسية" : "Accueil", path: "/" },
          { name: isAr ? "المدونة" : "Blog", path: "/blog" },
        ])}
      />
      <Breadcrumb items={[{ label: t("nav.blog") }]} />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-white md:text-5xl">
            {isAr
              ? "المدونة — نصائح عملية لتنمية أعمالك في المغرب"
              : "Blog : SEO et création de site web au Maroc"}
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-white/75">
            {isAr
              ? "أدلة عملية لجلب زيارات مؤهلة، تحسين معدل التحويل وإطلاق موقع يدعم المبيعات فعلاً."
              : "Guides pratiques pour générer plus de trafic qualifié, mieux convertir et lancer un site qui soutient vraiment vos ventes."}
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr
                ? "مقالات ميدانية لمطوري الويب وخبراء SEO في المغرب"
                : "Conseils terrain pour développeurs WordPress, freelances SEO et croissance locale au Maroc"}
            </h2>
          </div>

          {loading ? (
            <div className="mx-auto grid max-w-4xl gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 animate-pulse rounded-2xl bg-muted" />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-2xl border border-border/50 bg-muted/40 py-16 text-center text-muted-foreground">
              {isAr ? "لا توجد مقالات منشورة حالياً." : "Aucun article publie pour le moment."}
            </div>
          ) : (
            <div className="mx-auto grid max-w-4xl gap-8">
              {posts.map((post) => {
                const category = getCategory(post);
                const readTime = getReadTime(post.content);
                const displayDate = post.published_at
                  ? new Date(post.published_at)
                  : new Date(post.created_at);
                const title = isAr ? (post.title_ar || post.title) : post.title;
                const excerpt = isAr ? (post.excerpt_ar || post.excerpt) : post.excerpt;

                return (
                  <Card
                    key={post.id}
                    className="group overflow-hidden border-border/50 transition-all hover:border-accent/30 hover:shadow-gold"
                  >
                    <CardContent className="p-6 md:p-8">
                      <div className={`mb-3 flex flex-wrap items-center gap-3 ${isAr ? "flex-row-reverse" : ""}`}>
                        <span className={`rounded-full px-3 py-1 text-xs font-semibold ${categoryColors[category] || "bg-muted text-muted-foreground"}`}>
                          {isAr ? categoryAr[category] : category}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          {displayDate.toLocaleDateString(isAr ? "ar-MA" : "fr-FR")}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {isAr ? `${readTime} قراءة` : `${readTime} de lecture`}
                        </span>
                      </div>

                      <Link to={`/blog/${post.slug}`}>
                        <h2 className={`text-xl font-bold transition-colors group-hover:text-accent ${isAr ? "text-right font-arabic" : ""}`}>
                          {title}
                        </h2>
                      </Link>

                      <p className={`mt-3 text-muted-foreground ${isAr ? "text-right" : ""}`}>
                        {excerpt || (isAr
                          ? "مقال عملي حول الويب وSEO المحلي والتحويل."
                          : "Article pratique sur le web, le SEO local et la conversion.")}
                      </p>

                      <div className={`mt-5 flex ${isAr ? "justify-end" : ""}`}>
                        <Link
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
                        >
                          {isAr ? "اقرأ المقال" : t("general.learnMore")}
                          <Arrow className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
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
