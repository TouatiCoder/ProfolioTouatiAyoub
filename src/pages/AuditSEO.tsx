import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Search, TrendingUp, Zap, Shield, Send } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { useI18n } from "@/lib/i18n";
import { useToast } from "@/hooks/use-toast";
import { CONTACT } from "@/lib/seo-data";
import { SEOHead } from "@/components/SEOHead";
import { api } from "@/lib/api";
import { z } from "zod";

const auditSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional(),
  website: z.string().trim().url().max(500),
});

const AuditSEO = () => {
  const { t, locale } = useI18n();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const isAr = locale === "ar";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: (formData.get("phone") as string) || undefined,
      website: formData.get("website") as string,
    };

    const parsed = auditSchema.safeParse(data);
    if (!parsed.success) {
      toast({
        title: isAr ? "خطأ" : "Erreur",
        description: isAr ? "يرجى التحقق من المعلومات المدخلة." : "Veuillez vérifier les informations saisies.",
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    try {
      await api.post('/api/leads', {
        name:    parsed.data.name,
        email:   parsed.data.email,
        phone:   parsed.data.phone || null,
        service: "audit-seo-gratuit",
        message: `Demande d'audit SEO gratuit pour: ${parsed.data.website}`,
        source:  "audit-seo-page",
      });
      toast({ title: isAr ? "تم إرسال طلبك!" : "Demande envoyée !", description: isAr ? "سنرسل لك تدقيق SEO خلال 48 ساعة." : "Vous recevrez votre audit SEO sous 48h." });
      form.reset();
    } catch {
      toast({
        title: isAr ? "خطأ" : "Erreur",
        description: isAr ? "حدث خطأ. يرجى المحاولة مرة أخرى." : "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <Layout>
      <SEOHead
        title={isAr ? "تدقيق SEO مجاني لموقعك | أيوب التواتي" : "Audit SEO Gratuit pour votre Site Web au Maroc — Analyse Complète | Ayoub Touati"}
        description={isAr
          ? "احصل على تدقيق SEO مجاني لموقعك. تحليل تقني، كلمات مفتاحية، سرعة وأداء. نتائج خلال 48 ساعة."
          : "Obtenez un audit SEO gratuit de votre site web. Analyse technique, mots-clés, vitesse et performance. Résultats sous 48h. Sans engagement."}
        path="/audit-seo-gratuit"
      />

      <Breadcrumb items={[{ label: isAr ? "تدقيق SEO مجاني" : "Audit SEO Gratuit" }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 px-4 py-1.5 text-sm font-semibold text-accent mb-6">
                <Search className="h-4 w-4" /> {isAr ? "مجاني 100%" : "100% Gratuit"}
              </div>
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {isAr ? "تدقيق SEO مجاني لموقعك" : "Audit SEO gratuit pour votre site web au Maroc"}
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                {isAr
                  ? "اكتشف لماذا موقعك لا يظهر على Google. أحلل أكثر من 50 عامل SEO وأقدم لك توصيات عملية لتحسين ترتيبك. مجاني تمامًا وبدون التزام."
                  : "Découvrez pourquoi votre site n'apparaît pas sur Google. J'analyse plus de 50 facteurs SEO et je vous fournis des recommandations concrètes pour améliorer votre classement. 100% gratuit et sans engagement."}
              </p>
              <div className="mt-6 space-y-3 text-sm text-primary-foreground/70">
                {[
                  isAr ? "تحليل تقني كامل (سرعة، جوال، أمان)" : "Analyse technique complète (vitesse, mobile, sécurité)",
                  isAr ? "تدقيق الكلمات المفتاحية والمنافسين" : "Audit des mots-clés et de la concurrence",
                  isAr ? "توصيات مخصصة ذات أولوية" : "Recommandations personnalisées et prioritaires",
                  isAr ? "نتائج خلال 48 ساعة" : "Résultats livrés sous 48h",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-accent" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <Card className="border-border/50 shadow-gold">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-bold mb-6">
                  {isAr ? "اطلب تدقيقك المجاني" : "Demandez votre audit gratuit"}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input placeholder={isAr ? "الاسم الكامل" : "Nom complet"} required maxLength={100} name="name" />
                  <Input placeholder={isAr ? "البريد الإلكتروني" : "Email professionnel"} type="email" required maxLength={255} name="email" />
                  <Input placeholder={isAr ? "الهاتف (اختياري)" : "Téléphone (optionnel)"} type="tel" name="phone" />
                  <Input placeholder={isAr ? "رابط موقعك (https://...)" : "URL de votre site (https://...)"} type="url" required maxLength={500} name="website" />
                  <Button type="submit" disabled={loading} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    {loading
                      ? (isAr ? "جاري الإرسال..." : "Envoi en cours...")
                      : (isAr ? "احصل على تدقيقي المجاني" : "Obtenir mon audit gratuit")}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                  <p className="text-xs text-muted-foreground text-center">
                    {isAr ? "بدون التزام. نتائج خلال 48 ساعة." : "Sans engagement. Résultats sous 48h."}
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What's included */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "ما يتضمنه تدقيقك المجاني" : "Ce que contient votre audit gratuit"}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Zap, title: isAr ? "تحليل السرعة" : "Analyse vitesse", desc: isAr ? "أختبر سرعة تحميل موقعك على الجوال والكمبيوتر" : "Je teste la vitesse de chargement sur mobile et desktop" },
              { icon: Search, title: isAr ? "تدقيق SEO تقني" : "SEO technique", desc: isAr ? "أفحص البنية التقنية وعوامل الترتيب الأساسية" : "Je vérifie la structure technique et les facteurs de ranking" },
              { icon: TrendingUp, title: isAr ? "تحليل الكلمات المفتاحية" : "Mots-clés", desc: isAr ? "أحدد الكلمات المفتاحية الأهم لنشاطك" : "J'identifie les mots-clés les plus importants pour votre activité" },
              { icon: Shield, title: isAr ? "تحليل المنافسين" : "Concurrence", desc: isAr ? "أحلل منافسيك وأحدد فرص التفوق عليهم" : "J'analyse vos concurrents et j'identifie les opportunités" },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-border/50 bg-card p-6 text-center">
                <item.icon className="mx-auto mb-4 h-8 w-8 text-accent" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? "لماذا تحتاج تدقيق SEO لموقعك؟" : "Pourquoi avez-vous besoin d'un audit SEO ?"}
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {isAr
                  ? "في المغرب، أكثر من 70% من المستهلكين يبحثون عبر الإنترنت قبل الشراء. إذا لم يظهر موقعك في الصفحة الأولى من Google، فأنت تفقد عملاء محتملين كل يوم. تدقيق SEO المجاني يكشف بالضبط لماذا موقعك لا يحقق أداءً جيدًا ويقدم خارطة طريق واضحة للتحسين."
                  : "Au Maroc, plus de 70% des consommateurs effectuent une recherche en ligne avant d'acheter. Si votre site n'apparaît pas en première page de Google, vous perdez des clients potentiels chaque jour. Un audit SEO gratuit révèle exactement pourquoi votre site ne performe pas et fournit une feuille de route claire pour l'amélioration."}
              </p>
              <p>
                {isAr
                  ? "أحلل أكثر من 50 عامل يؤثر على ترتيبك في Google: السرعة، التوافق مع الجوال، البنية التقنية، المحتوى، الروابط الداخلية والخارجية. كل توصية تأتي مع مستوى أولوية واضح حتى تعرف بالضبط من أين تبدأ."
                  : "J'analyse plus de 50 facteurs impactant votre classement Google : vitesse, compatibilité mobile, structure technique, contenu, liens internes et externes. Chaque recommandation est accompagnée d'un niveau de priorité clair pour que vous sachiez exactement par où commencer."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10">
        <div className="container">
          <div className="flex flex-wrap gap-2">
            <Link to="/services/referencement-seo" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">{isAr ? "خدمات SEO" : "Mes services SEO"}</Link>
            <Link to="/contact" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">{isAr ? "طلب عرض سعر" : "Demander un devis"}</Link>
            <Link to="/blog" className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors">{isAr ? "مدونة SEO المغرب" : "Blog SEO Maroc"}</Link>
            <Link to="/contact" className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent">{isAr ? "اتصل بنا ←" : "Contact →"}</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AuditSEO;

