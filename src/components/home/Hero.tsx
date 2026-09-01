import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";

export function Hero() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-32">
      {/* Faint technical grid — dark lines on light ground, restrained (not a decorative blob). */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />

      <div className="container relative">
        {/* Plain div, not motion.div: this wraps the H1, which is the LCP
            element on the homepage. Fading it in from opacity:0 delays the
            moment Chrome considers it "painted", pushing back the LCP
            timing Lighthouse measures. The badge/paragraph/CTAs below keep
            their own entrance animations since they aren't LCP candidates. */}
        <div className="mx-auto max-w-4xl text-center">
          {/* Specialty badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="badge-teal mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {isAr ? "Full-Stack · Cloud · DevOps — المغرب" : "Full-Stack · Cloud · DevOps — Maroc"}
          </motion.div>

          <h1 className="mt-0 text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-6xl">
            {isAr ? (
              <>
                مطوّر <span style={{ color: "hsl(var(--accent))" }}>Full-Stack و Cloud</span> مستقل بالمغرب
              </>
            ) : (
              <>
                Développeur <span style={{ color: "hsl(var(--accent))" }}>Full-Stack &amp; Cloud</span> freelance au Maroc
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl"
          >
            {isAr
              ? "أصمم وأنشر تطبيقات ويب وموبايل متكاملة — من الكود إلى الاستضافة السحابية — لعملاء في المغرب وحول العالم. تواصل مباشر معي، بلا وسطاء وبلا مصاريف وكالة."
              : "Je conçois, développe et déploie des applications web et mobiles complètes du code au cloud pour des clients au Maroc et à l'international. Contact direct avec moi, sans commercial ni intermédiaire."}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.32 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="bg-accent px-8 text-base text-accent-foreground shadow-gold hover:bg-accent/90"
            >
              <Link to="/contact">
                {isAr ? "لنتحدث عن مشروعك" : "Parler de mon projet"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border bg-transparent text-base text-foreground hover:bg-muted"
            >
              <Link to="/realisations">
                {isAr ? "شاهد مشاريعي" : "Voir mes projets"}
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.42 }}
            className="mt-5 flex items-center justify-center gap-5 text-sm text-muted-foreground"
          >
            <Link to="/a-propos" className="underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground/40">
              {isAr ? "خبراتي" : "Découvrir mes technologies"}
            </Link>
            <a
              href={CONTACT.whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 underline decoration-border underline-offset-4 hover:text-foreground hover:decoration-foreground/40"
            >
              <MessageCircle className="h-4 w-4" />
              {isAr ? "واتساب مباشر" : "WhatsApp direct"}
            </a>
          </motion.div>

          <div className="mt-8 grid gap-3 text-sm text-muted-foreground sm:grid-cols-3">
            {[
              isAr ? "عرض سعر خلال 24 ساعة" : "Devis en moins de 24h",
              isAr ? "تصميم موجّه للتحويل" : "Design pensé pour convertir",
              isAr ? "تواصل واضح وسريع" : "Échanges simples et rapides",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4" style={{ color: "hsl(var(--teal))" }} />
                {item}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
