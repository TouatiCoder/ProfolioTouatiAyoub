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
        title={isAr ? "وكالة رقمية في المغرب | أيوب التواتي" : "freelance web developer Morocco dans tout le Maroc — Création Site Web, SEO & Montage Vidéo | Ayoub Touati"}
        description={isAr
          ? "وكالة رقمية في المغرب. تصميم مواقع، SEO، مونتاج فيديو في جميع المدن المغربية. +10 مشروع. عرض أسعار مجاني."
          : "Agence digitale au Maroc : création de sites web, SEO technique, refonte et montage vidéo dans toutes les villes. +10 projets réussis. Devis gratuit sous 24h."}
        path="/agence-digitale-maroc"
      />
      <Breadcrumb items={[{ label: isAr ? "وكالة رقمية المغرب" : "Agence Digitale Maroc" }]} />

      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? "وكالة رقمية في المغرب" : "freelance web developer Morocco dans tout le Maroc"}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-primary-foreground/80">
            {isAr
              ? "خبير رقمي يخدم جميع المدن المغربية. تصميم مواقع، SEO، refonte، مونتاج فيديو وحلول تقنية عملية."
              : "Expert digital au service de toutes les villes du Maroc. Création de sites web, SEO, refonte de sites et montage vidéo."}
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
            {isAr ? "خدماتنا في جميع أنحاء المغرب" : "Nos services dans tout le Maroc"}
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
            {isAr ? "نخدم جميع المدن المغربية" : "Nous couvrons toutes les villes du Maroc"}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {isAr
              ? "من الدار البيضاء إلى وجدة، ومن طنجة إلى أكادير، نقدم خدماتنا الرقمية في جميع أنحاء المملكة."
              : "De Casablanca à Oujda, de Tanger à Agadir, nous déployons nos services digitaux dans tout le Royaume."}
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
              {isAr ? "لماذا تختار خبيرًا رقميًا في المغرب؟" : "Pourquoi choisir un expert digital au Maroc ?"}
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {isAr
                  ? "في سوق رقمي مغربي يتطور بسرعة، تحتاج الشركات إلى شريك يفهم السوق المحلي. مع أكثر من 50 مشروعًا ناجحًا في 15+ مدينة مغربية، نمتلك المعرفة والخبرة لتحقيق نتائجك."
                  : "Dans un marché digital marocain en pleine expansion, les entreprises ont besoin d'un partenaire qui comprend le marché local. Avec plus de 50 projets réussis dans 15+ villes marocaines, nous avons l'expertise pour atteindre vos objectifs."}
              </p>
              <p>
                {isAr
                  ? "نقدم أربع خدمات رئيسية تغطي احتياجاتك الرقمية: تصميم المواقع، تحسين محركات البحث، إعادة تصميم المواقع ومونتاج الفيديو."
                  : "Nous proposons quatre services clés qui couvrent vos besoins digitaux : création de sites web, référencement SEO, refonte de sites et montage vidéo."}
              </p>
              <p>
                {isAr
                  ? "كل مشروع يبدأ بتحليل معمق لاحتياجاتك وسوقك المحلي، يليه تنفيذ استراتيجي مع تقارير شفافة وقابلة للقياس."
                  : "Chaque projet débute par une analyse approfondie de vos besoins et de votre marché local, suivie d'une exécution stratégique avec des rapports transparents et mesurables."}
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

