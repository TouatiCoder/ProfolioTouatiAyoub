import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1),
  message: z.string().trim().max(1000).optional(),
});

export function ContactCTA() {
  const { t } = useI18n();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      service: formData.get("service") as string,
      message: (formData.get("message") as string) || undefined,
    };

    const parsed = leadSchema.safeParse(data);
    if (!parsed.success) {
      toast({ title: "Erreur", description: "Veuillez vérifier les informations.", variant: "destructive" });
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      service: parsed.data.service,
      message: parsed.data.message || null,
      source: "cta-form",
    });

    if (error) {
      toast({ title: "Erreur", description: "Réessayez plus tard.", variant: "destructive" });
    } else {
      toast({ title: "Message envoyé !", description: "Nous vous répondrons sous 24h." });
      form.reset();
    }
    setLoading(false);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-primary shadow-navy">
          <div className="grid md:grid-cols-2">
            <div className="flex flex-col justify-center p-8 md:p-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 text-primary-foreground/70">
                  {t("cta.subtitle")}
                </p>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-card p-8 md:p-12"
            >
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input placeholder={t("cta.name")} required maxLength={100} name="name" />
                <Input placeholder={t("cta.email")} type="email" required maxLength={255} name="email" />
                <Input placeholder={t("cta.phone")} type="tel" name="phone" />
                <select
                  name="service"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                >
                  <option value="">{t("cta.service")}</option>
                  <option value="creation-site-web">{t("services.web.title")}</option>
                  <option value="referencement-seo">{t("services.seo.title")}</option>
                  <option value="marketing-digital">{t("services.marketing.title")}</option>
                  <option value="montage-video">{t("services.video.title")}</option>
                  <option value="email-marketing">{t("services.email.title")}</option>
                  <option value="refonte-site-web">Refonte de Site Web</option>
                  <option value="publicite-reseaux-sociaux">Publicité Réseaux Sociaux</option>
                  <option value="google-ads">Google Ads</option>
                </select>
                <Textarea placeholder={t("cta.message")} rows={3} maxLength={1000} name="message" />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  {loading ? t("cta.sending") : t("cta.submit")}
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
