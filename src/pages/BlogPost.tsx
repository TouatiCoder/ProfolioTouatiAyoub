import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead, buildFaqSchema, buildArticleSchema, absoluteUrl, type JsonLdBlock } from "@/components/SEOHead";
import { useI18n } from "@/lib/i18n";
import { CONTACT } from "@/lib/seo-data";
import { api } from "@/lib/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface DbPost {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  excerpt: string | null;
  meta_title: string | null;
  meta_description: string | null;
  published: boolean;
  created_at: string;
  published_at: string | null;
}

import { articles, BlogArticle } from "@/data/blog-articles";

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
].join("|"), "i");

const DbBlogPost = ({ post }: { post: DbPost }) => {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const displayDate = post.published_at ? new Date(post.published_at) : new Date(post.created_at);
  return (
    <Layout>
      <SEOHead
        title={post.meta_title || post.title}
        description={post.meta_description || post.excerpt || ""}
        path={`/blog/${post.slug}`}
      />
      <Breadcrumb items={[{ label: isAr ? "المدونة" : "Blog", href: "/blog" }, { label: post.title }]} />
      <article>
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-4 text-lg text-primary-foreground/70 max-w-2xl mx-auto">{post.excerpt}</p>
              )}
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {displayDate.toLocaleDateString(isAr ? "ar-MA" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div
              className="mx-auto max-w-3xl prose prose-slate dark:prose-invert prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-muted-foreground prose-p:leading-relaxed"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </section>

        <section className="py-12 bg-muted/50">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-accent/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-3">{isAr ? "تحتاج مساعدة في مشروعك الرقمي؟" : "Besoin d'aide pour votre projet digital ?"}</h3>
                <p className="text-muted-foreground mb-6">{isAr ? "احصل على عرض سعر مجاني ومخصص خلال 24 ساعة. بدون التزام." : "Obtenez un devis gratuit personnalisé sous 24h. Sans engagement."}</p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">{isAr ? "اطلب عرض سعر مجاني" : "Demander un devis gratuit"} <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="py-10 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" /> {isAr ? "جميع المقالات" : "Tous les articles"}
              </Link>
              <Link to="/services" className="inline-flex items-center text-sm font-semibold text-accent">
                {isAr ? "خدماتي" : "Mes services"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

const BlogPost = () => {
  const { postSlug } = useParams<{ postSlug: string }>();
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const [dbPost, setDbPost] = useState<DbPost | null>(null);
  const [dbLoading, setDbLoading] = useState(false);

  const article = postSlug ? articles[postSlug] : null;

  useEffect(() => {
    if (!article && postSlug && !hiddenPostPattern.test(postSlug)) {
      setDbLoading(true);
      setDbPost(null);
      api.get<DbPost>(`/api/blog/${postSlug}`)
        .then((data) => setDbPost(data))
        .catch(() => setDbPost(null))
        .finally(() => setDbLoading(false));
    } else {
      setDbLoading(false);
      setDbPost(null);
    }
  }, [postSlug, article]);

  if (!article && dbLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
        </div>
      </Layout>
    );
  }

  if (!article && dbPost) {
    return <DbBlogPost post={dbPost} />;
  }

  if (!article) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">{isAr ? "المقال غير موجود" : "Article non trouvé"}</h1>
          <Link to="/blog" className="text-accent mt-4 inline-block">{isAr ? "→ العودة إلى المدونة" : "← Retour au blog"}</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <SEOHead
        title={article.metaTitle}
        description={article.metaDesc}
        path={`/blog/${article.slug}`}
        mainEntityId={`${absoluteUrl(`/blog/${article.slug}`)}#article`}
        jsonLd={[
          buildArticleSchema({
            title: article.title,
            description: article.metaDesc,
            path: `/blog/${article.slug}`,
            datePublished: article.date,
          }),
          ...(article.faqs?.length
            ? [buildFaqSchema(article.faqs.map((f) => ({ question: f.q, answer: f.a })))]
            : []),
        ].filter(Boolean) as JsonLdBlock[]}
      />

      <Breadcrumb items={[
        { label: isAr ? "المدونة" : "Blog", href: "/blog" },
        { label: article.title },
      ]} />

      <article>
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-accent/20 px-4 py-1 text-sm font-semibold text-accent mb-4">
                {article.category}
              </span>
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {article.title}
              </h1>
              <div className="mt-6 flex items-center justify-center gap-4 text-sm text-primary-foreground/60">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {new Date(article.date).toLocaleDateString(isAr ? "ar-MA" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {isAr ? `${article.readTime} قراءة` : `${article.readTime} de lecture`}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl space-y-12">
              {article.sections.map((section, i) => (
                <div key={i}>
                  <h2 className="text-xl font-bold mb-4 md:text-2xl">{section.heading}</h2>
                  <p className="text-muted-foreground leading-relaxed text-lg">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        {!!article.faqs?.length && (
          <section className="py-16 md:py-24 bg-muted/30">
            <div className="container">
              <h2 className="text-2xl font-bold text-center mb-10 md:text-3xl">{isAr ? "الأسئلة الشائعة" : "Questions fréquentes"}</h2>
              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="space-y-3">
                  {article.faqs.map((faq, i) => (
                    <AccordionItem
                      key={i}
                      value={`faq-${i}`}
                      className="rounded-lg border border-border/50 bg-card px-6"
                    >
                      <AccordionTrigger className="text-left font-semibold hover:text-accent">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </section>
        )}

        {/* CTA mid-article */}
        <section className="py-12 bg-muted/50">
          <div className="container">
            <Card className="mx-auto max-w-3xl border-accent/30">
              <CardContent className="p-8 text-center">
                <h3 className="text-xl font-bold mb-3">{isAr ? "تحتاج مساعدة في مشروعك الرقمي؟" : "Besoin d'aide pour votre projet digital ?"}</h3>
                <p className="text-muted-foreground mb-6">
                  {isAr ? "احصل على عرض سعر مجاني ومخصص خلال 24 ساعة. بدون التزام." : "Obtenez un devis gratuit personnalisé sous 24h. Sans engagement."}
                </p>
                <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Link to="/contact">
                      {isAr ? "اطلب عرض سعر مجاني" : "Demander un devis gratuit"} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline">
                    <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Related services */}
        <section className="py-10">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h3 className="text-lg font-bold mb-4">{isAr ? "خدمات ذات صلة" : "Services associés"}</h3>
              <div className="flex flex-wrap gap-2">
                {article.relatedServices.map((s) => (
                  <Link
                    key={s.href}
                    to={s.href}
                    className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
                  >
                    {s.label}
                  </Link>
                ))}
                <Link
                  to="/audit-seo-gratuit"
                  className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
                >
                  {isAr ? "تدقيق SEO مجاني ←" : "Audit SEO gratuit →"}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Back to blog */}
        <section className="py-10 bg-muted/30">
          <div className="container">
            <div className="mx-auto max-w-3xl flex items-center justify-between">
              <Link to="/blog" className="inline-flex items-center text-sm font-semibold text-accent">
                <ArrowLeft className="mr-2 h-4 w-4" /> {isAr ? "جميع المقالات" : "Tous les articles"}
              </Link>
              <Link to="/services" className="inline-flex items-center text-sm font-semibold text-accent">
                {isAr ? "خدماتي" : "Mes services"} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
};

export default BlogPost;

