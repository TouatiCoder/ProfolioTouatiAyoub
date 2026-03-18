import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, MapPin } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { cities, services, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";

const CityPage = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  const { t, locale } = useI18n();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) return <Layout><div className="container py-20 text-center"><h1 className="text-2xl font-bold">Page non trouvée</h1></div></Layout>;

  const isAr = locale === "ar";

  return (
    <Layout>
      <Breadcrumb items={[
        { label: isAr ? "المدن" : "Villes", href: "/agence-digitale-maroc" },
        { label: city.name },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-accent" />
            <span className="text-accent font-semibold">{city.name}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl">
            {isAr ? `وكالة رقمية في ${city.nameAr}` : `Agence Digitale à ${city.name}`}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/70">
            {isAr ? city.descriptionAr : city.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
              <Link to="/contact">
                {t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
              <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" /> {t("hero.cta.whatsapp")}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Services in this city */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-4 md:text-3xl">
            {isAr ? `خدماتنا في ${city.nameAr}` : `Nos services à ${city.name}`}
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            {isAr
              ? `نقدم مجموعة كاملة من الخدمات الرقمية للشركات في ${city.nameAr} والمنطقة المحيطة.`
              : `Nous offrons une gamme complète de services digitaux pour les entreprises à ${city.name} et sa région.`}
          </p>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card key={service.slug} className="group border-border/50 hover:shadow-gold hover:border-accent/30 transition-all">
                <CardContent className="p-6">
                  <h3 className="mb-2 text-lg font-bold">{isAr ? service.nameAr : service.name}</h3>
                  <p className="mb-4 text-sm text-muted-foreground">{isAr ? service.shortDescAr : service.shortDesc}</p>
                  <ul className="space-y-2 mb-4">
                    {(isAr ? service.featuresAr : service.features).slice(0, 4).map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 shrink-0 text-accent" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={`/${service.slug}-${city.slug}`}
                    className="inline-flex items-center text-sm font-semibold text-accent hover:text-accent/80"
                  >
                    {t("services.cta")} <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why this city */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-6 md:text-3xl">
              {isAr ? `لماذا تختارنا في ${city.nameAr}؟` : `Pourquoi nous choisir à ${city.name} ?`}
            </h2>
            <div className="prose prose-lg text-muted-foreground space-y-4">
              <p>
                {isAr
                  ? `بصفتنا خبراء رقميين مقرهم في مكناس، نتمتع بمعرفة عميقة بالسوق المغربي بما في ذلك ${city.nameAr}. نفهم التحديات المحلية ونقدم حلولًا مخصصة تحقق نتائج حقيقية.`
                  : `En tant qu'experts digitaux basés à Meknès, nous avons une connaissance approfondie du marché marocain, y compris ${city.name}. Nous comprenons les défis locaux et proposons des solutions personnalisées qui produisent des résultats concrets.`}
              </p>
              <p>
                {isAr
                  ? `مع أكثر من 50 مشروعًا ناجحًا في جميع أنحاء المغرب، نساعد الشركات في ${city.nameAr} على التميز عبر الإنترنت من خلال مواقع عالية الأداء واستراتيجيات SEO فعالة وحملات تسويقية تحقق عائد استثمار.`
                  : `Avec plus de 50 projets réussis à travers le Maroc, nous aidons les entreprises à ${city.name} à se démarquer en ligne grâce à des sites web performants, des stratégies SEO efficaces et des campagnes marketing à ROI positif.`}
              </p>
            </div>
            <div className="mt-8">
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link to="/contact">
                  {t("hero.cta.quote")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">
            {isAr ? `خدماتنا المتخصصة في ${city.nameAr}` : `Nos services spécialisés à ${city.name}`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}-${city.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${s.nameAr} ${city.nameAr}` : `${s.name} ${city.name}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other cities */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">
            {isAr ? "مدن أخرى" : "Autres villes du Maroc"}
          </h2>
          <div className="flex flex-wrap gap-2">
            {cities.filter(c => c.slug !== city.slug).slice(0, 10).map((c) => (
              <Link
                key={c.slug}
                to={`/agence-digitale-${c.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `وكالة رقمية ${c.nameAr}` : `Agence digitale ${c.name}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />

      {/* City LocalBusiness Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `${CONTACT.name} — ${city.name}`,
            url: `https://ayoubtouati.com/agence-digitale-${city.slug}`,
            telephone: CONTACT.phone,
            email: CONTACT.email,
            address: {
              "@type": "PostalAddress",
              addressLocality: city.name,
              addressRegion: city.region,
              addressCountry: "MA",
            },
            areaServed: city.name,
            serviceType: services.map(s => s.name),
          }),
        }}
      />
    </Layout>
  );
};

export default CityPage;
