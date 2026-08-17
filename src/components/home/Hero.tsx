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
    <section className="relative overflow-hidden bg-gradient-hero-animated py-20 md:py-32">
      {/* Gold orb — growth side */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />
      {/* Teal orb — tech side */}
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-teal/15 blur-3xl" />
      {/* Subtle grid lines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
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
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/10 px-4 py-1.5 text-sm font-semibold text-teal-foreground"
            style={{ color: "hsl(var(--teal))" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
            {isAr ? "مطور مستقل · مونتاج فيديو · المغرب" : "Freelance Full-Stack — qualité d’agence, tarif freelance"}
          </motion.div>

          <h1 className="mt-0 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            {isAr ? (
              "مطور مواقع مستقل في المغرب: أسرع وأرخص من وكالة رقمية"
            ) : (
              <>
                Développeur freelance au Maroc :{" "}
                <span className="text-gradient-gold">Plus rapide et moins cher qu’une agence</span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-white/80 md:text-xl"
          >
            {isAr
              ? "خدماتك من مطور مستقل واحد بخبرة Full-Stack: بلا وسطاء، بلا مصاريف وكالة، وتواصل مباشر معي عبر واتساب. تصميم مواقع، SEO ومونتاج فيديو بجودة الوكالات، وبسعر مستقل."
              : "Développeur freelance à Meknès, pas une agence : contact direct avec moi, sans commercial ni chef de projet entre nous. Même qualité qu’une agence — site web, SEO technique et montage vidéo — pour un tarif freelance."}
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
                {isAr ? "اطلب عرض السعر" : "Recevoir mon devis"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/30 bg-transparent text-base text-primary-foreground hover:bg-white/10 hover:text-primary-foreground"
            >
              <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {isAr ? "واتساب مباشر" : "WhatsApp direct"}
              </a>
            </Button>
          </motion.div>

          <div className="mt-8 grid gap-3 text-sm text-white/70 sm:grid-cols-3">
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
