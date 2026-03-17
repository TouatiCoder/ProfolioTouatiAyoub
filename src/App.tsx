import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/components/I18nProvider";
import Index from "./pages/Index";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Portfolio from "./pages/Portfolio";
import NationalPage from "./pages/NationalPage";
import CityPage from "./pages/CityPage";
import ServiceCityPage from "./pages/ServiceCityPage";
import NotFound from "./pages/NotFound";
import { cities, services } from "@/lib/seo-data";

const queryClient = new QueryClient();

// Generate dynamic route patterns
const serviceCitySlugs = services.flatMap((s) =>
  cities.map((c) => `${s.slug}-${c.slug}`)
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/realisations" element={<Portfolio />} />
            <Route path="/agence-digitale-maroc" element={<NationalPage />} />
            <Route path="/agence-digitale-:citySlug" element={<CityPage />} />
            <Route path="/:slug" element={<ServiceCityPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
