import { ArrowDown, ArrowRight, Layout, Server, Database, Share2, Cloud, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const STEPS = [
  { icon: Layout,   labelFr: "Frontend",   descFr: "React, TypeScript",         labelAr: "الواجهة الأمامية", descAr: "React، TypeScript" },
  { icon: Server,    labelFr: "Backend",    descFr: "Laravel, Node.js",          labelAr: "الخادم",           descAr: "Laravel، Node.js" },
  { icon: Database,  labelFr: "Base de données", descFr: "MySQL, Prisma",       labelAr: "قاعدة البيانات",    descAr: "MySQL، Prisma" },
  { icon: Share2,    labelFr: "API",        descFr: "REST, intégrations",       labelAr: "API",              descAr: "REST، تكاملات" },
  { icon: Cloud,     labelFr: "Cloud",      descFr: "AWS, Azure",                labelAr: "الحوسبة السحابية", descAr: "AWS، Azure" },
  { icon: Rocket,    labelFr: "Déploiement", descFr: "Linux, Docker, CI/CD",     labelAr: "النشر",            descAr: "Linux، Docker، CI/CD" },
];

export function Expertise() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const Arrow = isAr ? ArrowRight : ArrowRight;

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="badge-teal mb-3 inline-block">{isAr ? "الخبرة التقنية" : "Expertise"}</span>
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr ? "كيف تتكامل تقنياتي معًا" : "Comment mes technologies s'articulent entre elles"}
          </h2>
          <p className="mx-auto mt-3 text-muted-foreground">
            {isAr
              ? "لست مجرد قائمة تقنيات — أبني المسار الكامل من الواجهة إلى الإنتاج."
              : "Pas une simple liste de technologies je construis le parcours complet, de l'interface jusqu'à la production."}
          </p>
        </div>

        {/* Desktop: horizontal flow */}
        <div className="mx-auto hidden max-w-5xl items-stretch justify-center gap-2 lg:flex">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.labelFr}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center"
            >
              <div className="flex w-32 flex-col items-center gap-2 rounded-xl border border-border bg-card px-3 py-5 text-center shadow-sm">
                <step.icon className="h-6 w-6 text-accent" />
                <p className="text-sm font-semibold text-foreground">{isAr ? step.labelAr : step.labelFr}</p>
                <p className="text-xs text-muted-foreground">{isAr ? step.descAr : step.descFr}</p>
              </div>
              {i < STEPS.length - 1 && (
                <Arrow className="mx-2 h-4 w-4 shrink-0 text-muted-foreground/50" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Mobile/tablet: vertical flow */}
        <div className="mx-auto flex max-w-xs flex-col items-center gap-1 lg:hidden">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.labelFr}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex w-full flex-col items-center"
            >
              <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 shadow-sm">
                <step.icon className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{isAr ? step.labelAr : step.labelFr}</p>
                  <p className="text-xs text-muted-foreground">{isAr ? step.descAr : step.descFr}</p>
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <ArrowDown className="my-1 h-4 w-4 text-muted-foreground/50" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
