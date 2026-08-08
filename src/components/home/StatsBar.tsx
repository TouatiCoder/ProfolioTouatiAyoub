import { useI18n } from "@/lib/i18n";
import { motion } from "framer-motion";

const stats = [
  { value: "15+", key: "stats.projects" },
  { value: "15+", key: "stats.clients" },
  { value: "15", key: "stats.cities" },
  { value: "5+", key: "stats.experience" },
];

export function StatsBar() {
  const { t } = useI18n();

  return (
    <section className="border-y border-border bg-muted/50 py-14">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="stat-number text-3xl md:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-muted-foreground">
                {t(stat.key)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
