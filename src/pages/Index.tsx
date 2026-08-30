import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { TechStack } from "@/components/home/TechStack";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import { StatsBar } from "@/components/home/StatsBar";
import { WhyFreelance } from "@/components/home/WhyFreelance";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead, buildServiceSchema } from "@/components/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="Développeur Web Freelance Maroc | Ayoub Touati"
      description="Développeur freelance à Meknès, Maroc : sites web et SEO technique, qualité d’agence sans les coûts. Devis en 24h sur WhatsApp."
      path="/"
      jsonLd={[
        buildServiceSchema({
          name: "Création site web Maroc",
          description:
            "Développeur freelance au Maroc pour la création de sites web et tunnels de conversion, en contact direct sans intermédiaire d'agence.",
          path: "/",
          areaServed: ["Morocco", "Casablanca", "Rabat", "Marrakech", "Meknes"],
          offers: [
            { name: "Site vitrine" },
            { name: "Site e-commerce" },
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
    <FAQ />
    <ContactCTA />
  </Layout>
);

export default Index;
