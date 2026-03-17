import { useParams, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, MapPin, Phone, Mail, Star } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cities, services, CONTACT } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";

const ServiceCityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  // Parse slug: "creation-site-web-casablanca" → service + city
  let foundService = null;
  let foundCity = null;

  for (const service of services) {
    for (const city of cities) {
      if (`${service.slug}-${city.slug}` === slug) {
        foundService = service;
        foundCity = city;
        break;
      }
    }
    if (foundService) break;
  }

  if (!foundService || !foundCity) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">Page non trouvée</h1>
          <Link to="/" className="text-accent mt-4 inline-block">Retour à l'accueil</Link>
        </div>
      </Layout>
    );
  }

  const service = foundService;
  const city = foundCity;
  const features = isAr ? service.featuresAr : service.features;
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const otherServices = services.filter((s) => s.slug !== service.slug);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-accent text-sm font-semibold">{city.name}, Maroc</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {isAr ? `${service.nameAr} في ${city.nameAr}` : `${service.name} à ${city.name}`}
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                {isAr
                  ? `هل تبحث عن خبير في ${service.nameAr} في ${city.nameAr}؟ أنا أيوب التواتي، متخصص في ${service.shortDescAr}. أساعد الشركات في ${city.nameAr} على التميز عبر الإنترنت وتحقيق نتائج ملموسة.`
                  : `Vous cherchez un expert en ${service.name.toLowerCase()} à ${city.name} ? Je suis Ayoub Touati, spécialisé en ${service.shortDesc.toLowerCase()}. J'aide les entreprises à ${city.name} à se démarquer en ligne et à obtenir des résultats concrets.`}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                  <Link to="/contact">
                    {t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-primary-foreground/60">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {isAr ? "عرض أسعار مجاني" : "Devis gratuit"}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" />
                  {isAr ? "+50 مشروع" : "+50 projets"}
                </div>
              </div>
            </div>

            {/* Quick contact card */}
            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">{isAr ? "تواصل معنا الآن" : "Contactez-nous maintenant"}</h3>
                <div className="space-y-3 text-sm">
                  <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4 text-accent" /> {CONTACT.phone}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-4 w-4 text-accent" /> {CONTACT.email}
                  </a>
                  <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
                  </a>
                </div>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">{t("hero.cta.quote")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            {isAr
              ? `ماذا نقدم في ${service.nameAr} في ${city.nameAr}`
              : `Ce que nous proposons en ${service.name.toLowerCase()} à ${city.name}`}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {isAr
              ? `نقدم خدمات ${service.nameAr} الشاملة للشركات في ${city.nameAr}. كل خدمة مصممة لتحقيق أقصى عائد على الاستثمار.`
              : `Nous proposons des services de ${service.name.toLowerCase()} complets pour les entreprises à ${city.name}. Chaque prestation est conçue pour maximiser votre retour sur investissement.`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-muted-foreground mb-4">
              {isAr ? `الأسعار تبدأ من ${service.pricingFrom}` : `À partir de ${service.pricingFrom}`}
            </p>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link to="/contact">{t("hero.cta.quote")} <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About city */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-6">
            <h2 className="text-2xl font-bold md:text-3xl">
              {isAr ? `${service.nameAr} للشركات في ${city.nameAr}` : `${service.name} pour les entreprises à ${city.name}`}
            </h2>
            <div className="text-muted-foreground space-y-4 leading-relaxed">
              <p>
                {isAr ? city.descriptionAr : city.description}
              </p>
              <p>
                {isAr
                  ? `في عصر الرقمنة، أصبح ${service.nameAr} ضرورة لكل شركة في ${city.nameAr} ترغب في النمو والتوسع. سواء كنت شركة ناشئة أو مؤسسة قائمة، نقدم حلولًا مخصصة تناسب ميزانيتك وأهدافك.`
                  : `À l'ère du numérique, ${service.name.toLowerCase().startsWith("e") ? "l'" : "la "}${service.name.toLowerCase()} est devenu(e) essentiel(le) pour toute entreprise à ${city.name} qui souhaite croître. Que vous soyez une startup ou une entreprise établie, nous proposons des solutions sur mesure adaptées à votre budget et vos objectifs.`}
              </p>
              <p>
                {isAr
                  ? `مع أكثر من 50 مشروعًا ناجحًا في المغرب، ومعرفة معمقة بسوق ${city.nameAr} (${city.population} نسمة)، نضمن لك خدمة تحقق نتائج قابلة للقياس.`
                  : `Avec plus de 50 projets réussis au Maroc et une connaissance approfondie du marché de ${city.name} (${city.population} habitants), nous vous garantissons un service qui produit des résultats mesurables.`}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Same service, other cities */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-xl font-bold mb-6">
            {isAr ? `${service.nameAr} في مدن أخرى` : `${service.name} dans d'autres villes`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/${service.slug}-${c.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${service.nameAr} ${c.nameAr}` : `${service.name} ${c.name}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <h2 className="text-xl font-bold mb-6">
            {isAr ? `خدمات أخرى في ${city.nameAr}` : `Autres services à ${city.name}`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}-${city.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${s.nameAr} ${city.nameAr}` : `${s.name} ${city.name}`}
              </Link>
            ))}
            <Link
              to={`/agence-digitale-${city.slug}`}
              className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              {isAr ? `وكالة رقمية ${city.nameAr}` : `Agence digitale ${city.name}`}
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceCityPage;
