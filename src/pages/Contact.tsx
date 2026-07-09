import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle, Mail, MapPin, MessageCircle, Phone, Send, TimerReset } from "lucide-react";
import { z } from "zod";
import { Layout } from "@/components/layout/Layout";
import { Breadcrumb } from "@/components/Breadcrumb";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/lib/api";
import { CONTACT, SEO_KEYWORDS } from "@/lib/seo-data";
import { usePublicServices } from "@/hooks/usePublicServices";

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  service: z.string().min(1),
  message: z.string().trim().max(1000).optional(),
});

export default function Contact() {
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

    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      toast({
        title: isAr ? "تحقق من الحقول" : "Verifiez les champs",
        description: isAr ? "بعض المعلومات غير مكتملة." : "Certaines informations sont incompletes.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/leads", {
        ...parsed.data,
        source: "contact-page",
      });

      form.reset();
      setSubmitted(true);
      toast({
        title: isAr ? "تم إرسال الطلب" : "Demande envoyée",
        description: isAr ? "يمكنك الآن تسريع الرد عبر واتساب." : "Vous pouvez maintenant accélérer la réponse via WhatsApp.",
      });
    } catch {
      toast({
        title: isAr ? "تعذر الإرسال" : "Envoi impossible",
        description: isAr ? "أعد المحاولة أو تواصل معي مباشرة عبر واتساب." : "Réessayez ou contactez-moi directement sur WhatsApp.",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <Layout>
      <SEOHead
        title={isAr
          ? "تواصل مع مطور ويب مستقل في المغرب لعرض سعر سريع"
          : "Contact | Développeur Web Freelance au Maroc — Ayoub Touati"}
        description={isAr
          ? "أرسل مشروعك الآن للحصول على عرض سعر سريع، واتساب مباشر، وخطة واضحة لإنشاء موقع أو تحسين السيو في المغرب."
          : "Contactez un développeur web freelance au Maroc pour la création de site web, WordPress ou le SEO, avec un retour rapide sur WhatsApp."}
        path="/contact"
        keywords={SEO_KEYWORDS}
      />

      <Breadcrumb items={[{ label: isAr ? "اتصل بنا" : "Contact" }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-primary-foreground/90">
              {isAr ? "أولوية للمشاريع الجاهزة للانطلاق هذا الشهر" : "Priorité aux projets prêts à démarrer ce mois-ci"}
            </span>
            <h1 className="mt-6 text-3xl font-extrabold text-primary-foreground md:text-5xl">
              {isAr ? "اتصل بي لبدء مشروعك بسرعة" : "Développeur web freelance au Maroc : devis rapide et échanges directs"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/75">
              {isAr
                ? "إذا كنت تبحث عن موقع سريع، سيو محلي، أو مسار تواصل يرفع عدد العملاء المحتملين، أرسل التفاصيل الآن وسأعود إليك بسرعة."
                : "Si vous cherchez une création de site internet sur mesure au Maroc, un tunnel de contact plus efficace ou une présence SEO plus forte, envoyez les détails maintenant."}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.95fr_1.05fr]">
            <div className="space-y-6">
              <Card className="border-border/50">
                <CardContent className="space-y-5 p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "الموقع" : "Base"}</p>
                      <p className="text-sm text-muted-foreground">{CONTACT.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "الهاتف" : "Telephone"}</p>
                      <a href={`tel:${CONTACT.phone}`} className="text-sm text-muted-foreground transition-colors hover:text-accent">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                      <a href={`mailto:${CONTACT.email}`} className="text-sm text-muted-foreground transition-colors hover:text-accent">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/20 bg-accent/5">
                <CardContent className="space-y-4 p-6">
                  <div className="flex items-center gap-2 font-semibold text-accent">
                    <TimerReset className="h-4 w-4" />
                    {isAr ? "توقع رداً عملياً وسريعاً" : "Attendez un retour concret et rapide"}
                  </div>
                  {[
                    isAr ? "فرز سريع للطلبات الجاهزة للتنفيذ" : "Tri rapide des demandes pretes a demarrer",
                    isAr ? "اقتراح خدمة أو عرض أنسب حسب الهدف" : "Recommandation du meilleur service selon l'objectif",
                    isAr ? "تحويل مباشر إلى واتساب عند الحاجة" : "Basculer directement vers WhatsApp si necessaire",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <CheckCircle className="h-4 w-4 text-accent" />
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Button asChild className="w-full bg-[#25D366] text-white hover:bg-[#1fb25a]">
                <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {isAr ? "ابدأ المحادثة على واتساب" : "Commencer sur WhatsApp"}
                </a>
              </Button>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6 md:p-8">
                {submitted ? (
                  <div className="space-y-5">
                    <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">
                        {isAr ? "وصلني طلبك" : "Votre demande est bien reçue"}
                      </h2>
                      <p className="mt-3 text-muted-foreground">
                        {isAr
                          ? "إذا أردت تسريع الرد أكثر، أرسل رسالة قصيرة على واتساب الآن وسأربطها بطلبك."
                          : "Si vous voulez accélérer encore la réponse, envoyez un court message sur WhatsApp maintenant et je le rattacherai à votre demande."}
                      </p>
                    </div>
                    <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        {isAr ? "متابعة عبر واتساب" : "Continuer sur WhatsApp"}
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => setSubmitted(false)}>
                      {isAr ? "إرسال طلب جديد" : "Envoyer une nouvelle demande"}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h2 className="text-2xl font-bold">
                        {isAr ? "أرسل طلبك الآن" : "Création de site web sur mesure ou SEO : envoyez votre besoin"}
                      </h2>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {isAr
                          ? "صف لي ما تحتاجه والنتيجة التي تريد الوصول إليها."
                          : "Décrivez le besoin, l'urgence et le résultat attendu pour recevoir une réponse plus précise."}
                      </p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <Input placeholder={isAr ? "الاسم الكامل" : "Nom complet"} required maxLength={100} name="name" />
                      <Input placeholder={isAr ? "Email professionnel" : "Email professionnel"} type="email" required maxLength={255} name="email" />
                    </div>

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
                      placeholder={isAr ? "ما المطلوب؟ ما الموعد المتوقع؟ وما أهم عائق حالياً؟" : "Que faut-il lancer ? Quel est le delai ? Quel est le principal blocage aujourd'hui ?"}
                      rows={6}
                      maxLength={1000}
                      name="message"
                    />

                    <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                      {loading ? (isAr ? "جارٍ الإرسال..." : "Envoi en cours...") : (isAr ? "استلام عرض السعر" : "Recevoir mon devis")}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mx-auto mt-16 max-w-6xl">
            <h2 className="mb-4 text-lg font-bold">
              {isAr ? "روابط مفيدة قبل اتخاذ القرار" : "Pages utiles avant de décider"}
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link to="/services/creation-site-web" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent">
                Création de site web
              </Link>
              <Link to="/services/refonte-site-web" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent">
                Refonte de site web
              </Link>
              <Link to="/services/referencement-seo" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:border-accent hover:text-accent">
                Référencement SEO
              </Link>
              <Link to="/contact" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">
                {isAr ? "عرض سعر مخصص" : "Devis personnalisé"}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

