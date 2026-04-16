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
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-accent blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65 }}
          className="mx-auto max-w-4xl text-center"
        >
          <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-primary-foreground/90">
            {isAr ? "مطور ويب مستقل مع تركيز قوي على التحويل" : "Freelance orienté SEO, conversion et acquisition"}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-primary-foreground md:text-6xl">
            {isAr ? (
              "مطور ويب مستقل في المغرب لبناء موقع أسرع وأكثر إقناعاً"
            ) : (
              <>
                freelance web developer Morocco pour la{" "}
                <span className="text-accent">création site web Maroc</span>
              </>
            )}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.16 }}
            className="mx-auto mt-6 max-w-3xl text-lg text-primary-foreground/80 md:text-xl"
          >
            {isAr
              ? "أنجز صفحات هبوط ومواقع WordPress وReact مع سيو محلي وCTA واضحة لتحويل الزيارات إلى محادثات واتساب وعملاء محتملين."
              : "WordPress developer Morocco, SEO freelancer Maroc et developpeur web freelance Maroc pour des sites qui chargent vite, rassurent et transforment mieux."}
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

          <div className="mt-8 grid gap-3 text-sm text-primary-foreground/68 sm:grid-cols-3">
            {[
              isAr ? "عرض سعر خلال 24 ساعة" : "Devis en moins de 24h",
              isAr ? "تصميم موجه للتحويل" : "Design pense pour convertir",
              isAr ? "تواصل واضح وسريع" : "Echanges simples et rapides",
            ].map((item) => (
              <div key={item} className="flex items-center justify-center gap-2">
                <CheckCircle className="h-4 w-4 text-accent" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
