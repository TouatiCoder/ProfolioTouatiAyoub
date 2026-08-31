import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import type { Technology } from "@/lib/seo-data";
import { usePublicTechnologies, type PublicTechnology } from "@/hooks/usePublicTechnologies";

// Logo lookup only. The technology list itself is admin-editable
// (/admin/technologies) via usePublicTechnologies, which falls back to the
// static src/lib/seo-data.ts array (still the single source of truth for
// Person.knowsAbout in SEOHead.tsx) until real rows exist or if the API is
// unreachable. Falls back to a colored dot below if a slug has no match on
// simpleicons.org, so a missing icon never breaks the layout.
const ICON_COLOR: Record<string, string> = {
  react: "#61DAFB", nextjs: "#000000", typescript: "#3178C6", javascript: "#F7DF1E",
  laravel: "#FF2D20", php: "#777BB4", nodejs: "#339933", python: "#3776AB",
  flutter: "#02569B", kotlin: "#7F52FF", android: "#3DDC84",
  mysql: "#4479A1", prisma: "#2D3748",
  amazonaws: "#FF9900", microsoftazure: "#0078D4", linux: "#FCC624", docker: "#2496ED",
  wordpress: "#21759B", woocommerce: "#96588A", shopify: "#7AB55C",
  seo: "#111111", ia: "#8B5CF6",
};

const CATEGORY_LABELS: Record<Technology["category"], { fr: string; ar: string }> = {
  frontend:       { fr: "Frontend",              ar: "الواجهة الأمامية" },
  backend:        { fr: "Backend",               ar: "الخادم" },
  mobile:         { fr: "Mobile",                ar: "الموبايل" },
  database:       { fr: "Base de données",       ar: "قواعد البيانات" },
  cloud:          { fr: "Cloud",                 ar: "الحوسبة السحابية" },
  infrastructure: { fr: "Infrastructure",        ar: "البنية التحتية" },
  cms:            { fr: "CMS & E-commerce",      ar: "أنظمة المحتوى والتجارة" },
  discipline:     { fr: "Disciplines",           ar: "مجالات" },
};

// Fixed order so the section reads Frontend → Backend → Mobile → Database →
// Cloud → Infrastructure → CMS → Disciplines every time, independent of
// however the underlying array happens to be ordered.
const CATEGORY_ORDER: Technology["category"][] = [
  "frontend", "backend", "mobile", "database", "cloud", "infrastructure", "cms", "discipline",
];

function TechChip({ tech }: { tech: PublicTechnology }) {
  const color = ICON_COLOR[tech.slug] ?? "#71717a";
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-card px-3.5 py-2 text-sm font-medium text-foreground">
      <img
        src={`https://cdn.simpleicons.org/${tech.slug}`}
        alt=""
        width={16}
        height={16}
        loading="lazy"
        onError={(e) => {
          const t = e.currentTarget;
          t.style.display = "none";
          const dot = document.createElement("span");
          dot.style.cssText = `width:8px;height:8px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0`;
          t.parentElement?.insertBefore(dot, t);
        }}
      />
      {tech.name}
    </span>
  );
}

export function TechStack() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { items: technologies } = usePublicTechnologies();

  const byCategory = CATEGORY_ORDER
    .map((category) => ({ category, items: technologies.filter((t) => t.category === category) }))
    .filter((group) => group.items.length > 0);

  return (
    <section id="stack" className="border-y border-border/50 bg-muted/30 py-16 md:py-20 scroll-mt-20">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="badge-teal mb-3 inline-block">{isAr ? "الأدوات التقنية" : "Technology Stack"}</span>
          <h2 className="text-2xl font-bold md:text-3xl">
            {isAr ? "التقنيات التي أعمل بها فعلياً" : "Les technologies avec lesquelles je travaille réellement"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {isAr
              ? "من الواجهة الأمامية إلى الخادم والحوسبة السحابية — أختار الأداة المناسبة لكل مشروع."
              : "Du frontend au backend jusqu'au cloud — la bonne technologie choisie selon le besoin réel du projet, pas une liste de mots-clés."}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {byCategory.map((group, i) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {isAr ? CATEGORY_LABELS[group.category].ar : CATEGORY_LABELS[group.category].fr}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <TechChip key={tech.slug} tech={tech} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
