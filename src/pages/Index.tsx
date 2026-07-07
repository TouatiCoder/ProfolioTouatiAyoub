import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { TechStack } from "@/components/home/TechStack";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { WebsiteShowcase } from "@/components/home/WebsiteShowcase";
import { VideoShowcase } from "@/components/home/VideoShowcase";
import { StatsBar } from "@/components/home/StatsBar";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead, buildServiceSchema } from "@/components/SEOHead";

const Index = () => (
  <Layout>
    <SEOHead
      title="freelance web developer Morocco | création site web Maroc"
      description="WordPress developer Morocco et SEO freelancer Maroc pour les entreprises qui veulent un site plus rapide, plus credible et plus rentable au Maroc."
      path="/"
      jsonLd={[
        buildServiceSchema({
          name: "Création site web Maroc",
          description:
            "Freelance web developer Morocco pour la création de sites web, tunnels de conversion et montage vidéo au Maroc.",
          path: "/",
          areaServed: ["Morocco", "Casablanca", "Rabat", "Marrakech", "Meknes"],
          offers: [
            { name: "Site vitrine" },
            { name: "Site e-commerce" },
            { name: "Montage vidéo" },
          ],
        }),
      ]}
    />
    <Hero />
    <ServicesGrid />
    <TechStack />
    <WebsiteShowcase />
    <VideoShowcase />
    <StatsBar />
    <Process />
    <Testimonials />
    <FAQ />
    <ContactCTA />
  </Layout>
);

export default Index;
