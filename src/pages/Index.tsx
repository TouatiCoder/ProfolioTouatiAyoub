import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { TechStack } from "@/components/home/TechStack";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WhyFreelance } from "@/components/home/WhyFreelance";
import { Expertise } from "@/components/home/Expertise";
import { Process } from "@/components/home/Process";
import { LocalPresence } from "@/components/home/LocalPresence";
import { Testimonials } from "@/components/home/Testimonials";
import { LatestArticles } from "@/components/home/LatestArticles";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead, buildServiceSchema } from "@/components/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Développeur Full-Stack & Cloud Freelance au Maroc | Ayoub Touati"
      description="Développeur Full-Stack & Cloud basé à Meknès, Maroc : React, Laravel, Flutter, AWS/Azure. Pour clients au Maroc et à l'international. Contact direct, devis en 24h."
      path="/"
      jsonLd={[
        buildServiceSchema({
          name: "Développement Full-Stack & Cloud au Maroc",
          description:
            "Développeur freelance au Maroc pour la création d'applications web et mobiles et le déploiement cloud, en contact direct sans intermédiaire d'agence.",
          path: "/",
          areaServed: ["Morocco", "Casablanca", "Rabat", "Marrakech", "Meknes"],
          offers: [
            { name: "Site vitrine" },
            { name: "Site e-commerce" },
            { name: "Application mobile" },
          ],
        }),
      ]}
    />
    <Hero />
    <StatsBar />
    <TechStack />
    <WebsiteShowcase />
    <ServicesGrid />
    <WhyFreelance />
    <Expertise />
    <Process />
    <LocalPresence />
    <Testimonials />
    <LatestArticles />
    <FAQ />
    <ContactCTA />
  </Layout>
);

export default Index;
