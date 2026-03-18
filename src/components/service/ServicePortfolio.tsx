import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
              className="group overflow-hidden border-border/50 transition-all hover:border-accent/50 hover:shadow-lg"
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
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                  >
                    {isAr ? "زيارة المشروع" : "Voir le projet"}
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
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
    </section>
  );
}
