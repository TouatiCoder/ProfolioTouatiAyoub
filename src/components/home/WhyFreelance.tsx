import { Zap, Wallet, MessageCircle, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const points = [
  {
    icon: Zap,
    title: "Réactivité immédiate",
    titleAr: "سرعة رد فعل فورية",
    text: "Pas de commercial, pas de chef de projet, pas de ticket qui attend 3 jours. Vous m'écrivez sur WhatsApp, je réponds le jour même — souvent dans l'heure.",
    textAr: "بلا وسيط، بلا مدير مشروع، بلا انتظار 3 أيام. كتكتب ليا فواتساب، كنجاوب نفس اليوم — غالبا فساعة.",
  },
  {
    icon: Wallet,
    title: "Coût réel, sans marge d'agence",
    titleAr: "ثمن حقيقي، بلا هامش وكالة",
    text: "Une agence facture un développeur, un designer, un commercial et des frais de structure. Avec moi vous payez uniquement le travail — même qualité, sans la marge.",
    textAr: "الوكالة كتخلصك مطور، مصمم، كوميرسيال ومصاريف المكتب. معايا كتخلص الخدمة غير هي — نفس الجودة، بلا الهامش.",
  },
  {
    icon: MessageCircle,
    title: "Contact direct, zéro intermédiaire",
    titleAr: "تواصل مباشر، بلا وسطاء",
    text: "Vous parlez directement à la personne qui écrit le code, pas à un intermédiaire qui traduit vos demandes. Moins de malentendus, plus de rapidité.",
    textAr: "كتهضر مباشرة مع الشخص اللي كيكتب الكود، ماشي مع واسطة كتفسر طلباتك. تفاهم أحسن، سرعة أكبر.",
  },
  {
    icon: ShieldCheck,
    title: "Qualité agence, engagement freelance",
    titleAr: "جودة وكالة، التزام فريلانسر",
    text: "React, Next.js, Laravel, SEO technique, montage vidéo : la même expertise qu'une agence digitale, portée par une seule personne qui a tout à prouver sur chaque projet.",
    textAr: "React، Next.js، Laravel، SEO تقني، مونتاج فيديو: نفس خبرة الوكالة الرقمية، غير شخص واحد لي عندو كلشي يبرهن فكل مشروع.",
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
            {isAr ? "علاش فريلانسر أحسن من وكالة رقمية؟" : "Pourquoi un freelance surpasse une agence digitale ?"}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {isAr
              ? "وكالة كتبيع ليك ساعات فوجه، ومن تحت كيخدم عليك فريلانسر واحد. أنا كنقدم ليك نفس الخبرة بلا هاد اللعبة."
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
