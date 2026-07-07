import { useState } from "react";
import { MessageCircle, Send, ShieldCheck, TimerReset, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { CONTACT } from "@/lib/seo-data";
import { usePublicServices } from "@/hooks/usePublicServices";

const leadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1),
  message: z.string().trim().max(1000).optional(),
});

export function ContactCTA() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const { toast } = useToast();
  const { items: services } = usePublicServices({ featured: true, limit: 8 });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      service: formData.get("service") as string,
      message: (formData.get("message") as string) || undefined,
    };

    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      toast({
        title: isAr ? "تحقق من المعلومات" : "Verifiez les informations",
        description: isAr ? "بعض الحقول تحتاج إلى تصحيح قبل الإرسال." : "Quelques champs doivent etre corriges avant envoi.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/leads", {
        ...parsed.data,
        source: "homepage-cta",
      });

      form.reset();
      setSubmitted(true);
      toast({
        title: isAr ? "تم استلام طلبك" : "Votre demande est recue",
        description: isAr ? "سنعود إليك بسرعة. يمكنك أيضاً تسريع الرد عبر واتساب." : "Nous revenons vers vous rapidement. Vous pouvez aussi accelerer la reponse via WhatsApp.",
      });
    } catch {
      toast({
        title: isAr ? "تعذر الإرسال" : "Envoi impossible",
        description: isAr ? "حاول مرة أخرى أو مرّ مباشرة عبر واتساب." : "Reessayez ou passez directement par WhatsApp.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[0_30px_100px_-50px_rgba(15,23,42,0.45)]">
          <div className="grid md:grid-cols-[1.1fr_0.9fr]">
            <div className="relative overflow-hidden bg-primary p-8 md:p-12">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute -left-16 top-10 h-40 w-40 rounded-full bg-accent blur-3xl" />
                <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
              </div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/90">
                  {isAr ? "جدول الإنتاج محدود كل أسبوع" : "Planning de production limite chaque semaine"}
                </span>

                <h2 className="mt-6 text-2xl font-bold leading-tight text-primary-foreground md:text-4xl">
                  {isAr
                    ? "انطلق الآن بمسار واضح لجلب العملاء من الموقع وواتساب"
                    : "creation site internet Maroc sur mesure avec devis 24h et CTA qui convertit"}
                </h2>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
                  {isAr
                    ? "نضبط الرسالة، العرض، والأولوية البصرية حتى يفهم العميل بسرعة لماذا يجب أن يراسلك الآن."
                    : "On structure votre offre, la preuve sociale et le contact pour reduire l'hesitation et faire passer plus de visiteurs a l'action."}
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {[
                    {
                      icon: TimerReset,
                      label: isAr ? "رد خلال 24 ساعة" : "Reponse sous 24h",
                    },
                    {
                      icon: Zap,
                      label: isAr ? "WhatsApp optimise" : "WhatsApp optimise",
                    },
                    {
                      icon: ShieldCheck,
                      label: isAr ? "Devis sans engagement" : "Devis sans engagement",
                    },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <item.icon className="mb-3 h-5 w-5 text-accent" />
                      <p className="text-sm font-medium text-primary-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>

                <a
                  href={CONTACT.whatsappMessage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex items-center text-sm font-semibold text-accent"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {isAr ? "ابدأ المحادثة على واتساب" : "Passer directement sur WhatsApp"}
                </a>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="bg-card p-8 md:p-12"
            >
              {submitted ? (
                <div className="flex h-full flex-col justify-center space-y-5">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">
                      {isAr ? "تم استلام طلبك بنجاح" : "Votre demande est bien recue"}
                    </h3>
                    <p className="mt-3 text-muted-foreground">
                      {isAr
                        ? "لرفع سرعة الرد، أرسل لنا الآن كلمة \"مشروعي\" عبر واتساب وسنعيد ترتيب الأولويات مباشرة."
                        : "Pour accelerer le retour, envoyez maintenant \"mon projet\" sur WhatsApp et nous prioriserons votre demande."}
                    </p>
                  </div>
                  <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {isAr ? "إرسال رسالة واتساب" : "Envoyer un WhatsApp"}
                    </a>
                  </Button>
                  <Button variant="outline" onClick={() => setSubmitted(false)}>
                    {isAr ? "إرسال طلب آخر" : "Envoyer une autre demande"}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold">
                      {isAr ? "أخبرنا بما تحتاجه" : "Parlons de votre objectif"}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {isAr
                        ? "كلما كانت الرسالة أوضح، كان الرد أدق وأسرع."
                        : "Plus le besoin est clair, plus le devis et la recommandation seront precis."}
                    </p>
                  </div>

                  <Input placeholder={isAr ? "الاسم الكامل" : "Nom complet"} required maxLength={100} name="name" />
                  <Input placeholder={isAr ? "Email professionnel" : "Email professionnel"} type="email" required maxLength={255} name="email" />
                  <Input placeholder={isAr ? "Telephone / WhatsApp" : "Telephone / WhatsApp"} type="tel" name="phone" />

                  <select
                    name="service"
                    className="flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                    defaultValue=""
                  >
                    <option value="" disabled>
                      {isAr ? "اختر الخدمة" : "Choisir un service"}
                    </option>
                    {services.map((service) => (
                      <option key={service.slug} value={service.slug}>
                        {isAr ? service.name_ar || service.name : service.name}
                      </option>
                    ))}
                  </select>

                  <Textarea
                    placeholder={isAr ? "ما الذي تريد تحقيقه خلال 30 يوماً؟" : "Que devez-vous obtenir dans les 30 prochains jours ?"}
                    rows={4}
                    maxLength={1000}
                    name="message"
                  />

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    {loading ? (isAr ? "جارٍ الإرسال..." : "Envoi en cours...") : (isAr ? "احصل على عرض السعر" : "Recevoir mon devis")}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    {isAr
                      ? "أولوية هذا النموذج: المشاريع الجاهزة للانطلاق خلال هذا الشهر."
                      : "Priorite donnee aux projets qui souhaitent lancer rapidement ce mois-ci."}
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
