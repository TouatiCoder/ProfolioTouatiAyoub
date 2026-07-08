import { MessageSquare, Target, Code2, Rocket } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const steps = [
  { icon: MessageSquare, titleKey: "process.step1.title", descKey: "process.step1.desc" },
  { icon: Target, titleKey: "process.step2.title", descKey: "process.step2.desc" },
  { icon: Code2, titleKey: "process.step3.title", descKey: "process.step3.desc" },
  { icon: Rocket, titleKey: "process.step4.title", descKey: "process.step4.desc" },
];

export function Process() {
  const { t } = useI18n();

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="text-3xl font-bold md:text-4xl">{t("process.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{t("process.subtitle")}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="relative text-center"
            >
              {i < steps.length - 1 && (
                <div className="absolute top-10 left-[60%] hidden h-0.5 w-[80%] bg-border md:block" />
              )}

              <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary shadow-navy">
                <step.icon className="h-8 w-8 text-primary-foreground" />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {i + 1}
                </span>
              </div>

              <h3 className="mb-2 text-lg font-bold">{t(step.titleKey)}</h3>
              <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* HowTo Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "Comment nous réalisons votre projet digital",
            step: steps.map((step, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: t(step.titleKey),
              text: t(step.descKey),
            })),
          }),
        }}
      />
    </section>
  );
}
