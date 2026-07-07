import { useI18n } from "@/lib/i18n";

const TECHS = [
  { name: "React.js",     slug: "react",        color: "#61DAFB" },
  { name: "Laravel",      slug: "laravel",      color: "#FF2D20" },
  { name: "WordPress",    slug: "wordpress",    color: "#21759B" },
  { name: "Python",       slug: "python",       color: "#3776AB" },
  { name: "Flutter",      slug: "flutter",      color: "#02569B" },
  { name: "Shopify",      slug: "shopify",      color: "#7AB55C" },
  { name: "MySQL",        slug: "mysql",        color: "#4479A1" },
  { name: "Tailwind CSS", slug: "tailwindcss",  color: "#06B6D4" },
  { name: "Bootstrap",    slug: "bootstrap",    color: "#7952B3" },
  { name: "TypeScript",   slug: "typescript",   color: "#3178C6" },
  { name: "Node.js",      slug: "nodedotjs",    color: "#339933" },
  { name: "Figma",        slug: "figma",        color: "#F24E1E" },
];

// duplicate for seamless loop
const TRACK = [...TECHS, ...TECHS];

function TechBadge({ tech }: { tech: typeof TECHS[0] }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-xl border border-border/50 bg-card px-5 py-3 shadow-sm transition-shadow hover:shadow-card">
      <img
        src={`https://cdn.simpleicons.org/${tech.slug}`}
        alt={tech.name}
        width={22}
        height={22}
        style={{ filter: "none" }}
        onError={(e) => {
          const t = e.currentTarget;
          t.style.display = "none";
          const dot = document.createElement("span");
          dot.style.cssText = `width:14px;height:14px;border-radius:50%;background:${tech.color};display:inline-block;flex-shrink:0`;
          t.parentElement?.insertBefore(dot, t);
        }}
      />
      <span className="whitespace-nowrap text-sm font-semibold text-foreground">{tech.name}</span>
    </div>
  );
}

export function TechStack() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="border-y border-border/50 bg-muted/30 py-14 overflow-hidden">
      <div className="container mb-10 text-center">
        <span className="badge-teal mb-3 inline-block">Stack technique</span>
        <h2 className="text-2xl font-bold md:text-3xl">
          {isAr
            ? "التقنيات التي أستخدمها لبناء مشاريعك"
            : "Technologies maîtrisées pour votre projet"}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {isAr
            ? "من WordPress وLaravel إلى React وFlutter — أختار الأداة المناسبة لكل مشروع."
            : "De WordPress à React et Flutter — chaque technologie choisie selon votre besoin et vos objectifs."}
        </p>
      </div>

      {/* Marquee track */}
      <div className="relative">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-muted/30 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-muted/30 to-transparent" />

        <div
          className="flex w-max animate-marquee gap-4 px-4"
          style={{ willChange: "transform" }}
        >
          {TRACK.map((tech, i) => (
            <TechBadge key={`${tech.slug}-${i}`} tech={tech} />
          ))}
        </div>
      </div>
    </section>
  );
}
