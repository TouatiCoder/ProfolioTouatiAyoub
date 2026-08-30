import { Zap, Wallet, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const points = [
  {
    icon: Zap,
    title: "Réactivité immédiate",
    titleAr: "استجابة فورية",
    text: "Pas de commercial, pas de chef de projet, pas de ticket qui attend 3 jours. Vous m'écrivez sur WhatsApp, je réponds le jour même — souvent dans l'heure.",
    textAr: "بدون وسيط تجاري، بدون مدير مشروع، بدون طلب دعم ينتظر 3 أيام. تكتب لي على واتساب وأردّ في نفس اليوم — غالبًا خلال ساعة.",
  },
  {
    icon: Wallet,
    title: "Coût réel, sans marge d'agence",
    titleAr: "تكلفة حقيقية بلا هامش وكالة",
    text: "Une agence facture un développeur, un designer, un commercial et des frais de structure. Avec moi vous payez uniquement le travail — même qualité, sans la marge.",
    textAr: "تفوتر الوكالة أجرة مطور ومصمم ومندوب مبيعات ومصاريف تسيير. معي، تدفع ثمن العمل فقط — نفس الجودة، بلا هامش إضافي.",
  },
  {
    icon: MessageCircle,
    title: "Contact direct, zéro intermédiaire",
    titleAr: "تواصل مباشر بلا وسطاء",
    text: "Vous parlez directement à la personne qui écrit le code, pas à un intermédiaire qui traduit vos demandes. Moins de malentendus, plus de rapidité.",
    textAr: "تتحدث مباشرة مع الشخص الذي يكتب الكود، لا مع وسيط ينقل طلباتك. تفاهم أوضح وسرعة أكبر.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité agence, engagement freelance",
    titleAr: "جودة وكالة، التزام مستقل",
    text: "React, Next.js, Laravel, SEO technique : la même expertise qu'une agence digitale, portée par une seule personne qui a tout à prouver sur chaque projet.",
    textAr: "React وNext.js وLaravel وتحسين محركات البحث التقني: نفس خبرة الوكالة الرقمية، يحملها شخص واحد لديه كل شيء ليثبته في كل مشروع.",
  },
];

export function WhyFreelance() {
  const { locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="container">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr ? "لماذا يتفوق العمل الحر على الوكالة الرقمية؟" : "Pourquoi un freelance surpasse une agence digitale ?"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isAr
              ? "الوكالة تبيع لك ساعات تسويق وتنسيق. أما أنا فأقدّم لك أكوادًا وتحسين محركات بحث ونتائج ملموسة — مباشرة."
              : "Une agence vous vend des heures de commerciaux et de coordination. Moi je vous vends du code, du SEO et des résultats — directement."}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {points.map((point, i) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-xl border border-border/50 bg-card p-6"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                <point.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{isAr ? point.titleAr : point.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {isAr ? point.textAr : point.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
