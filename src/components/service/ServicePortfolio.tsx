import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

interface Project {
  id: string;
  title: string;
  description: string | null;
  client_name: string | null;
  image_url: string | null;
  live_url: string | null;
  results: string | null;
  service_type: string | null;
  featured: boolean | null;
}

interface GalleryImage {
  id: string;
  image_url: string;
  sort_order: number;
}

const SERVICE_TYPE_MAP: Record<string, string> = {
  "creation-site-web": "web",
  "referencement-seo": "seo",
  "marketing-digital": "marketing",
  "montage-video": "video",
  "email-marketing": "email",
};

interface ServicePortfolioProps {
  serviceSlug: string;
}

export function ServicePortfolio({ serviceSlug }: ServicePortfolioProps) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const serviceType = SERVICE_TYPE_MAP[serviceSlug] || serviceSlug;

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("service_type", serviceType)
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .limit(6);
      setProjects((data as Project[]) ?? []);
      setLoading(false);
    };
    fetchProjects();
  }, [serviceType]);

  const openProject = async (project: Project) => {
    setSelectedProject(project);
    setCurrentIndex(0);
    const { data } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", project.id)
      .order("sort_order", { ascending: true });
    setGallery((data as GalleryImage[]) ?? []);
  };

  const allImages = selectedProject
    ? [
        ...(selectedProject.image_url ? [{ id: "thumb", image_url: selectedProject.image_url, sort_order: -1 }] : []),
        ...gallery,
      ]
    : [];

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            {isAr ? "مشاريعنا المنجزة" : "Nos réalisations"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isAr
              ? "اكتشف بعض المشاريع التي أنجزناها لعملائنا"
              : "Découvrez quelques projets réalisés pour nos clients"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="group cursor-pointer overflow-hidden border-border/50 transition-all hover:border-accent/50 hover:shadow-lg"
              onClick={() => openProject(project)}
            >
              {project.image_url && (
                <div className="relative aspect-video overflow-hidden bg-muted">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  {project.featured && (
                    <Badge className="absolute left-3 top-3 bg-accent text-accent-foreground">
                      {isAr ? "مميز" : "Vedette"}
                    </Badge>
                  )}
                </div>
              )}
              <CardContent className="p-5">
                <h3 className="text-lg font-bold">{project.title}</h3>
                {project.client_name && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {isAr ? "العميل:" : "Client :"} {project.client_name}
                  </p>
                )}
                {project.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                    {project.description}
                  </p>
                )}
                {project.results && (
                  <p className="mt-2 text-sm font-semibold text-accent">
                    📈 {project.results}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/realisations">
              {isAr ? "جميع المشاريع" : "Toutes nos réalisations"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Gallery Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(v) => { if (!v) setSelectedProject(null); }}>
        <DialogContent className="max-w-4xl p-0 gap-0 overflow-hidden">
          {selectedProject && (
            <div>
              {/* Image viewer */}
              {allImages.length > 0 ? (
                <div className="relative bg-black/5">
                  <img
                    src={allImages[currentIndex]?.image_url}
                    alt={selectedProject.title}
                    className="w-full max-h-[60vh] object-contain"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentIndex(i => (i - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentIndex(i => (i + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur rounded-full p-2 hover:bg-background"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                        {allImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`w-2 h-2 rounded-full transition-colors ${i === currentIndex ? "bg-primary" : "bg-primary/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : null}

              {/* Project info */}
              <div className="p-6 space-y-3">
                <h3 className="text-xl font-bold">{selectedProject.title}</h3>
                {selectedProject.client_name && (
                  <p className="text-sm text-muted-foreground">
                    {isAr ? "العميل:" : "Client :"} {selectedProject.client_name}
                  </p>
                )}
                {selectedProject.description && (
                  <p className="text-sm text-muted-foreground">{selectedProject.description}</p>
                )}
                {selectedProject.results && (
                  <p className="text-sm font-semibold text-accent">📈 {selectedProject.results}</p>
                )}
                {selectedProject.live_url && (
                  <a
                    href={selectedProject.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    {isAr ? "زيارة المشروع" : "Voir le projet"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
