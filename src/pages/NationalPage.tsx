import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { cities, services, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";

const NationalPage = () => {
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  return (
    <Layout>
      <SEOHead
        title={isAr ? "مبرمج مستقل في المغرب | أيوب التواتي" : "Développeur Freelance au Maroc | Ayoub Touati"}
        description={isAr
          ? "مبرمج مستقل في المغرب، وليس وكالة. تصميم مواقع، SEO في جميع المدن المغربية. تواصل مباشر معي، بلا وسطاء. عرض سعر مجاني خلال 24 ساعة."
          : "Développeur freelance au Maroc, pas une agence : sites web, SEO technique, refonte, dans toutes les villes. Devis gratuit sous 24h."}
        path="/agence-digitale-maroc"
      />
      <Breadcrumb items={[{ label: isAr ? "مبرمج مستقل بالمغرب" : "Développeur Freelance Maroc" }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "مبرمج مستقل في المغرب" : "Développeur Freelance dans tout le Maroc"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            {isAr
              ? "خدماتي تغطي جميع المدن المغربية: تصميم مواقع، SEO، إعادة تصميم — تواصل مباشر معي، بلا وكالة، بلا وسطاء."
              : "Je couvre toutes les villes du Maroc en direct : création de sites web, SEO et refonte de sites — sans agence, sans intermédiaire, juste vous et moi."}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">{t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "خدماتي في جميع أنحاء المغرب" : "Mes services dans tout le Maroc"}
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="group border-border/50 hover:shadow-gold hover:border-accent/30 transition-all">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold">{isAr ? service.nameAr : service.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{isAr ? service.shortDescAr : service.shortDesc}</p>
                  <p className="text-sm font-semibold text-accent mb-4">
                    {isAr
                      ? "الأسعار عند الطلب — اتصل بي للحصول على عرض سعر مخصص"
                      : "Prix sur demande — Contactez-moi pour un devis personnalisé"}
                  </p>
                  <Link to={`/services/${service.slug}`} className="inline-flex items-center text-sm font-semibold text-accent">
                    {t("services.cta")} <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cities grid */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-4 md:text-3xl">
            {isAr ? "أخدم جميع المدن المغربية" : "Je couvre toutes les villes du Maroc"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {isAr
              ? "من الدار البيضاء إلى وجدة، ومن طنجة إلى أكادير، أقدّم خدماتي الرقمية في جميع أنحاء المملكة — مباشرة وبلا وكالة."
              : "De Casablanca à Oujda, de Tanger à Agadir, je délivre mes services digitaux dans tout le Royaume — en direct, sans passer par une agence."}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {cities.map((city) => (
              <Link
                key={city.slug}
                to={`/agence-digitale-${city.slug}`}
                className="group flex items-center gap-3 rounded-lg border border-border/50 bg-card p-4 hover:border-accent/30 hover:shadow-gold transition-all"
              >
                <MapPin className="h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="font-semibold group-hover:text-accent transition-colors">{city.name}</p>
                  <p className="text-xs text-muted-foreground">{city.population} hab.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Deep content for SEO */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-8">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? "لماذا تختار مبرمجًا مستقلاً بدلاً من وكالة؟" : "Pourquoi choisir un freelance plutôt qu'une agence ?"}
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {isAr
                  ? "تضيف الوكالة تكاليف مندوبي المبيعات والتنسيق. أما أنا، أيوب، فأعمل معك مباشرة بلا وسيط. مع أكثر من 15 مشروعًا ناجحًا في أكثر من 15 مدينة مغربية، أملك الخبرة اللازمة لتحقيق أهدافك بتكلفة مستقل."
                  : "Une agence facture des heures de commerciaux et de coordination en plus du travail réel. Moi, Ayoub, vous travaillez directement avec la personne qui code — sans intermédiaire. Avec plus de 15 projets réussis dans 15+ villes marocaines, j'ai l'expertise pour atteindre vos objectifs à un tarif freelance."}
              </p>
              <p>
                {isAr
                  ? "أقدّم ثلاث خدمات رئيسية تغطي احتياجاتك الرقمية: تصميم المواقع، تحسين محركات البحث وإعادة تصميم المواقع — كل ذلك من شخص واحد."
                  : "Je propose trois services clés qui couvrent vos besoins digitaux : création de sites web, référencement SEO et refonte de sites — le tout géré par une seule personne, pas une chaîne de sous-traitants."}
              </p>
              <p>
                {isAr
                  ? "يبدأ كل مشروع بتحليل معمّق لاحتياجاتك ولسوقك المحلي، يليه تنفيذ بتواصل مباشر وتقارير واضحة وقابلة للقياس."
                  : "Chaque projet débute par une analyse approfondie de vos besoins et de votre marché local, suivie d'une exécution en contact direct avec moi, avec des rapports transparents et mesurables."}
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactCTA />
    </Layout>
  );
};

export default NationalPage;

