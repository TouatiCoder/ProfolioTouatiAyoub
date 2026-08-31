import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { articles } from "@/data/blog-articles";

// Static articles only (src/data/blog-articles.ts) — DB-backed posts aren't
// fetched here to keep the homepage free of an extra network round trip;
// /blog itself already merges both sources. Newest first, 3 shown.
const latestArticles = Object.values(articles)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 3);

export function LatestArticles() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  if (latestArticles.length === 0) {
    return null;
  }

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="badge-gold mb-3 inline-block">{isAr ? "المدونة" : "Blog"}</span>
            <h2 className="text-3xl font-bold md:text-4xl">
              {isAr ? "أحدث المقالات التقنية" : "Derniers articles techniques"}
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            {isAr ? "كل المقالات" : "Voir tous les articles"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {latestArticles.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Link
                to={`/blog/${article.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-md"
              >
                <span className="mb-3 inline-flex w-fit items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-accent">
                  {article.category}
                </span>
                <h3 className="font-bold leading-snug text-foreground transition-colors group-hover:text-accent">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted-foreground">
                  {article.metaDesc}
                </p>
                <div className="mt-4 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(article.date).toLocaleDateString(isAr ? "ar-MA" : "fr-FR", { year: "numeric", month: "long", day: "numeric" })}
                  <span className="mx-1">·</span>
                  {article.readTime}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
