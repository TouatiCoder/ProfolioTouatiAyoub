import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useI18n } from "@/lib/i18n";

interface Project {
  id: number;
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
  id: number;
  image_url: string;
  sort_order: number;
}

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

  useEffect(() => {
    setLoading(true);
    api.get<Project[]>(`/api/projects?service=${serviceSlug}`)
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, [serviceSlug]);

  const openProject = async (project: Project) => {
    setSelectedProject(project);
    setCurrentIndex(0);

    api.get<GalleryImage[]>(`/api/projects/${project.id}/images`)
      .then(setGallery)
      .catch(() => setGallery([]));
  };

  const allImages = selectedProject
    ? [
        ...(selectedProject.image_url
          ? [{ id: 0, image_url: selectedProject.image_url, sort_order: -1 }]
          : []),
        ...gallery,
      ]
    : [];

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-64 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold md:text-3xl">
            {isAr ? "أمثلة من المشاريع المنجزة" : "Mes réalisations"}
          </h2>
          <p className="mt-3 text-muted-foreground">
            {isAr
              ? "نماذج مختصرة من صفحات وخدمات تم تنفيذها مع تركيز واضح على التحويل والسرعة."
              : "Quelques projets livres avec un focus clair sur la conversion, la vitesse et la credibilite."}
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
                    src={api.asset(project.image_url, 640) ?? undefined}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
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
                    {isAr ? "نتيجة:" : "Résultat :"} {project.results}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/realisations">
              {isAr ? "جميع المشاريع" : "Toutes mes réalisations"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>

      <Dialog open={!!selectedProject} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0">
          {selectedProject && (
            <div>
              {allImages.length > 0 && (
                <div className="relative bg-black/5">
                  <img
                    src={api.asset(allImages[currentIndex]?.image_url, 1600) ?? undefined}
                    alt={selectedProject.title}
                    className="max-h-[60vh] w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />

                  {allImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentIndex((index) => (index - 1 + allImages.length) % allImages.length)}
                        className="absolute left-2 top-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background"
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => setCurrentIndex((index) => (index + 1) % allImages.length)}
                        className="absolute right-2 top-1/2 rounded-full bg-background/80 p-2 backdrop-blur hover:bg-background"
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                        {allImages.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 w-2 rounded-full transition-colors ${index === currentIndex ? "bg-primary" : "bg-primary/30"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              )}

              <div className="space-y-3 p-6">
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
                  <p className="text-sm font-semibold text-accent">
                    {isAr ? "نتيجة:" : "Résultat :"} {selectedProject.results}
                  </p>
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
