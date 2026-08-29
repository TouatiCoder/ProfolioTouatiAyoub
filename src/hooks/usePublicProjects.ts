import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface PublicProject {
  id: number;
  title: string;
  description: string | null;
  results: string | null;
  image_url: string | null;
  video_url: string | null;
  service_type: string | null;
  client_name: string | null;
  live_url: string | null;
  featured: boolean | null;
}

export const fallbackProjects: PublicProject[] = [
  {
    id: 1,
    title: "Restaurant Le Palais",
    description: "Site vitrine rapide avec reservation et acquisition locale via SEO et WhatsApp.",
    results: "+300% de reservations",
    image_url: null, video_url: null,
    service_type: "creation-site-web",
    client_name: "Restaurant Le Palais, Meknes",
    live_url: null, featured: true,
  },
  {
    id: 2,
    title: "Boutique Zellige",
    description: "E-commerce optimise conversion pour vendre au Maroc et a l'international.",
    results: "ROAS x5.2",
    image_url: null, video_url: null,
    service_type: "creation-site-web",
    client_name: "Boutique Zellige, Fes",
    live_url: null, featured: true,
  },
];

const ACTIVE_SERVICE_TYPES = new Set([
  "creation-site-web",
  "referencement-seo",
  "refonte-site-web",
  "web",
  "seo",
]);

function filterActiveProjects(projects: PublicProject[]) {
  return projects.filter((project) => {
    const serviceType = project.service_type ?? "";
    return ACTIVE_SERVICE_TYPES.has(serviceType);
  });
}

interface UsePublicProjectsOptions {
  featured?: boolean;
  limit?: number;
  service?: string;
}

export function usePublicProjects(options?: UsePublicProjectsOptions) {
  const [items, setItems] = useState<PublicProject[]>(fallbackProjects);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();

    if (options?.featured) params.set("featured", "true");
    if (options?.limit) params.set("limit", String(options.limit));
    if (options?.service) params.set("service", options.service);

    api.get<PublicProject[]>(`/api/projects${params.size ? `?${params.toString()}` : ""}`)
      .then((data) => {
        const activeData = filterActiveProjects(data);
        if (!cancelled && activeData.length) {
          setItems(activeData);
        } else if (!cancelled && options?.service) {
          setItems(fallbackProjects.filter((project) => project.service_type === options.service));
        } else if (!cancelled) {
          setItems(fallbackProjects);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(
            options?.service
              ? fallbackProjects.filter((project) => project.service_type === options.service)
              : fallbackProjects,
          );
        }
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [options?.featured, options?.limit, options?.service]);

  return { items, loading };
}
