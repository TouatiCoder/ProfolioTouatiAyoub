import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StatsBar } from "@/components/home/StatsBar";
import { Process } from "@/components/home/Process";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";
import { CONTACT } from "@/lib/seo-data";

const Index = () => (
  <Layout>
    <SEOHead
      title="Ayoub Touati — Expert Digital au Maroc | Création Site Web, SEO & Marketing"
      description="Expert digital au Maroc : création de sites web, référencement SEO, marketing digital et montage vidéo. +50 projets réussis. Devis gratuit sous 24h."
      path="/"
    />
    <Hero />
    <ServicesGrid />
    <StatsBar />
    <Process />
    <Testimonials />
    <FAQ />
    <ContactCTA />

    {/* Homepage JSON-LD */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: CONTACT.name,
          url: "https://ayoubtouati.com",
          telephone: CONTACT.phone,
          email: CONTACT.email,
          description: "Expert digital au Maroc : création de sites web, référencement SEO, marketing digital, montage vidéo et email marketing.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Meknès",
            addressCountry: "MA",
          },
          areaServed: { "@type": "Country", name: "Morocco" },
          priceRange: "$$",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "40",
          },
          sameAs: [CONTACT.whatsapp],
        }),
      }}
    />
  </Layout>
);

export default Index;
