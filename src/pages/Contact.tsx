import { useState } from "react";
import { MapPin, Phone, Mail, Send, MessageCircle, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { CONTACT } from "@/lib/seo-data";

const Contact = () => {
  const { t, locale } = useI18n();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isAr = locale === "ar";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    toast({ title: "Message envoyé !", description: "Nous vous répondrons sous 24h." });
    setLoading(false);
    (e.target as HTMLFormElement).reset();
  };

  return (
    <Layout>
      <Breadcrumb items={[{ label: t("nav.contact") }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "اتصل بنا — عرض أسعار مجاني" : "Contactez-nous — Devis Gratuit"}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-primary-foreground/70">
            {t("cta.subtitle")}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-5">
            {/* Contact Info */}
            <div className="space-y-6 md:col-span-2">
              <Card className="border-border/50">
                <CardContent className="space-y-6 p-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "العنوان" : "Adresse"}</p>
                      <p className="text-sm text-muted-foreground">{t("footer.address")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Phone className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "الهاتف" : "Téléphone"}</p>
                      <a href={`tel:${CONTACT.phone}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <Mail className="mt-1 h-5 w-5 shrink-0 text-accent" />
                    <div>
                      <p className="font-semibold">{isAr ? "البريد الإلكتروني" : "Email"}</p>
                      <a href={`mailto:${CONTACT.email}`} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                        {CONTACT.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button asChild variant="outline" className="w-full gap-2">
                <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  {t("hero.cta.whatsapp")}
                </a>
              </Button>

              {/* Trust signals */}
              <div className="space-y-3 rounded-lg border border-border/50 bg-card p-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {isAr ? "عرض أسعار مجاني خلال 24 ساعة" : "Devis gratuit sous 24h"}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {isAr ? "+50 مشروع ناجح في المغرب" : "+50 projets réussis au Maroc"}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {isAr ? "دعم متواصل بعد التسليم" : "Support continu après livraison"}
                </div>
              </div>
            </div>

            {/* Form */}
            <Card className="border-border/50 md:col-span-3">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input placeholder={t("cta.name")} required maxLength={100} name="name" />
                    <Input placeholder={t("cta.email")} type="email" required maxLength={255} name="email" />
                  </div>
                  <Input placeholder={t("cta.phone")} type="tel" name="phone" />
                  <select
                    name="service"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  >
                    <option value="">{t("cta.service")}</option>
                    <option value="web">{t("services.web.title")}</option>
                    <option value="seo">{t("services.seo.title")}</option>
                    <option value="marketing">{t("services.marketing.title")}</option>
                    <option value="video">{t("services.video.title")}</option>
                    <option value="email">{t("services.email.title")}</option>
                  </select>
                  <Textarea placeholder={t("cta.message")} rows={5} maxLength={1000} name="message" />
                  <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {loading ? t("cta.sending") : t("cta.submit")}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Internal links */}
          <div className="mx-auto max-w-5xl mt-16">
            <h2 className="text-lg font-bold mb-4">{isAr ? "اكتشف خدماتنا" : "Découvrez nos services"}</h2>
            <div className="flex flex-wrap gap-2">
              <Link to="/services/creation-site-web" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Création de Sites Web</Link>
              <Link to="/services/referencement-seo" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Référencement SEO</Link>
              <Link to="/services/marketing-digital" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Marketing Digital</Link>
              <Link to="/services/montage-video" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Montage Vidéo</Link>
              <Link to="/services/email-marketing" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">Email Marketing</Link>
              <Link to="/realisations" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">Nos réalisations →</Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
