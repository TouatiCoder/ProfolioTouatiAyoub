import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { TechStack } from "@/components/home/TechStack";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import { StatsBar } from "@/components/home/StatsBar";
import { WhyFreelance } from "@/components/home/WhyFreelance";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { LocalPresence } from "@/components/home/LocalPresence";
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
    <TechStack />
    <ServicesGrid />
    <WebsiteShowcase />
    <StatsBar />
    <WhyFreelance />
    <Process />
    <Testimonials />
    <LocalPresence />
    <FAQ />
    <ContactCTA />
  </Layout>
);

export default Index;
