import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/components/I18nProvider";
import { AuthProvider } from "@/hooks/useAuth";
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
import AdminLogin from "./pages/admin/AdminLogin";
import AdminLayout from "./components/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLeads from "./pages/admin/AdminLeads";
import AdminBlog from "./pages/admin/AdminBlog";
import AdminPortfolio from "./pages/admin/AdminPortfolio";
import AdminActivity from "./pages/admin/AdminActivity";
import AdminSettings from "./pages/admin/AdminSettings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/realisations" element={<Portfolio />} />
              <Route path="/agence-digitale-maroc" element={<NationalPage />} />
              <Route path="/agence-digitale-:citySlug" element={<CityPage />} />

              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="leads" element={<AdminLeads />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="portfolio" element={<AdminPortfolio />} />
                <Route path="activity" element={<AdminActivity />} />
                <Route path="settings" element={<AdminSettings />} />
              </Route>

              {/* Programmatic SEO catch-all */}
              <Route path="/:slug" element={<ServiceCityPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
