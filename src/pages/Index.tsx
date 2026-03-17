import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsBar } from "@/components/home/StatsBar";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";

const Index = () => (
  <Layout>
    <Hero />
    <ServicesGrid />
    <StatsBar />
    <Process />
    <Testimonials />
    <FAQ />
    <ContactCTA />
  </Layout>
);

export default Index;
