import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import type { Technology } from "@/lib/seo-data";
import { usePublicTechnologies, type PublicTechnology } from "@/hooks/usePublicTechnologies";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "@/components/ui/carousel";

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

function TechCard({ tech, isAr }: { tech: PublicTechnology; isAr: boolean }) {
  const color = ICON_COLOR[tech.slug] ?? "#71717a";
  return (
    <div className="flex h-full flex-col items-center gap-3 rounded-xl border border-border bg-card px-4 py-6 text-center shadow-sm transition-shadow hover:shadow-md">
      <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-muted">
        <img
          src={`https://cdn.simpleicons.org/${tech.slug}`}
          alt=""
          width={24}
          height={24}
          loading="lazy"
          onError={(e) => {
            const t = e.currentTarget;
            t.style.display = "none";
            const dot = document.createElement("span");
            dot.style.cssText = `width:12px;height:12px;border-radius:50%;background:${color};display:inline-block;flex-shrink:0`;
            t.parentElement?.insertBefore(dot, t);
          }}
        />
      </span>
      <div>
        <p className="text-sm font-semibold text-foreground">{tech.name}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {isAr ? CATEGORY_LABELS[tech.category].ar : CATEGORY_LABELS[tech.category].fr}
        </p>
      </div>
    </div>
  );
}

export function TechStack() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { items: technologies } = usePublicTechnologies();

  const [api, setApi] = useState<CarouselApi>();
  const [selected, setSelected] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setSelected(api.selectedScrollSnap());
    const onSelect = () => setSelected(api.selectedScrollSnap());
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="stack" className="border-y border-border bg-background py-16 md:py-20 scroll-mt-20">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="badge-teal mb-3 inline-block">{isAr ? "الأدوات التقنية" : "Technology Stack"}</span>
          <h2 className="text-2xl font-bold md:text-3xl">
            {isAr ? "التقنيات التي أستخدمها" : "Technologies que j'utilise"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {isAr
              ? "من الواجهة الأمامية إلى الخادم والحوسبة السحابية — أختار الأداة المناسبة لكل مشروع."
              : "Du frontend au backend jusqu'au cloud — la bonne technologie choisie selon le besoin réel du projet, pas une liste de mots-clés."}
          </p>
        </div>

        <Carousel
          setApi={setApi}
          opts={{ align: "start", loop: false }}
          aria-label={isAr ? "التقنيات التي أستخدمها" : "Technologies que j'utilise"}
          className="mx-auto max-w-6xl"
        >
          <CarouselContent>
            {technologies.map((tech) => (
              <CarouselItem
                key={tech.slug}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6 xl:basis-[12.5%]"
              >
                <TechCard tech={tech} isAr={isAr} />
              </CarouselItem>
            ))}
          </CarouselContent>
          {/* Inset (not the shadcn default's -left-12/-right-12 offset) so the
              buttons always sit inside the carousel's own bounds — outside
              offsets like that can't overflow a fixed-width parent, but they
              can push past the *viewport* on narrower breakpoints where this
              container spans nearly the full width. Hidden below sm — on
              mobile, swipe (native Embla touch support) plus the pagination
              dots below are the primary interaction. */}
          <CarouselPrevious
            aria-label={isAr ? "التقنية السابقة" : "Technologie précédente"}
            className="hidden left-1 border-border bg-background/90 backdrop-blur sm:inline-flex"
          />
          <CarouselNext
            aria-label={isAr ? "التقنية التالية" : "Technologie suivante"}
            className="hidden right-1 border-border bg-background/90 backdrop-blur sm:inline-flex"
          />
        </Carousel>

        {count > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => api?.scrollTo(i)}
                aria-label={isAr ? `الانتقال إلى الشريحة ${i + 1}` : `Aller à la diapositive ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${i === selected ? "w-5 bg-accent" : "w-1.5 bg-border"}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
