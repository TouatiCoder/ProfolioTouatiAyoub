import { Suspense, lazy } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider } from "@/components/I18nProvider";
import { AuthProvider } from "@/hooks/useAuth";
import { cities } from "@/lib/seo-data";
import ProtectedRoute from "./components/ProtectedRoute";

const Index = lazy(() => import("./pages/Index"));
const Services = lazy(() => import("./pages/Services"));
const Tarifs = lazy(() => import("./pages/Tarifs"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const NationalPage = lazy(() => import("./pages/NationalPage"));
const CityPage = lazy(() => import("./pages/CityPage"));
const ServiceCityPage = lazy(() => import("./pages/ServiceCityPage"));
const AuditSEO = lazy(() => import("./pages/AuditSEO"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const AdminLayout = lazy(() => import("./components/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminLeads = lazy(() => import("./pages/admin/AdminLeads"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog"));
const AdminPortfolio = lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminActivity = lazy(() => import("./pages/admin/AdminActivity"));
const AdminSettings = lazy(() => import("./pages/admin/AdminSettings"));
const AdminServices = lazy(() => import("./pages/admin/AdminServices"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));

const queryClient = new QueryClient();

function RouteLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="space-y-4 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-b-2 border-primary" />
        <p className="text-sm text-muted-foreground">Chargement de la page...</p>
      </div>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <I18nProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<RouteLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:serviceSlug" element={<ServiceDetail />} />
                <Route path="/tarifs" element={<Tarifs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/a-propos" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:postSlug" element={<BlogPost />} />
                <Route path="/realisations" element={<Portfolio />} />
                <Route path="/audit-seo-gratuit" element={<AuditSEO />} />
                <Route path="/agence-digitale-maroc" element={<NationalPage />} />
                {cities.map((city) => (
                  <Route key={city.slug} path={`/agence-digitale-${city.slug}`} element={<CityPage citySlug={city.slug} />} />
                ))}

                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="portfolio" element={<AdminPortfolio />} />
                    <Route path="services" element={<AdminServices />} />
                    <Route path="testimonials" element={<AdminTestimonials />} />
                    <Route path="activity" element={<AdminActivity />} />
                    <Route path="settings" element={<AdminSettings />} />
                  </Route>
                </Route>

                <Route path="/:slug" element={<ServiceCityPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
