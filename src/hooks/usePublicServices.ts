import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { services as seoServices } from "@/lib/seo-data";

export interface PublicService {
  id?: number;
  slug: string;
  name: string;
  name_ar?: string | null;
  short_description: string;
  short_description_ar?: string | null;
  badge?: string | null;
  icon?: string | null;
  cta_label?: string | null;
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
  image?: string | null;
  imageUrl?: string | null;
}

const ACTIVE_SLUGS = ["creation-site-web", "referencement-seo", "montage-video", "refonte-site-web"];

export const fallbackPublicServices: PublicService[] = seoServices
  .filter((s) => ACTIVE_SLUGS.includes(s.slug))
  .map((service, index) => ({
    slug: service.slug,
    name: service.name,
    name_ar: service.nameAr,
    short_description: service.shortDesc,
    short_description_ar: service.shortDescAr,
    icon: service.icon,
    cta_label: "Demander un devis",
    featured: true,
    published: true,
    sort_order: index + 1,
  }));

interface UsePublicServicesOptions {
  featured?: boolean;
  limit?: number;
}

export function usePublicServices(options?: UsePublicServicesOptions) {
  const [items, setItems] = useState<PublicService[]>(fallbackPublicServices);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const params = new URLSearchParams();

    if (options?.featured) params.set("featured", "true");
    if (options?.limit) params.set("limit", String(options.limit));

    api.get<PublicService[]>(`/api/services${params.size ? `?${params.toString()}` : ""}`)
      .then((data) => {
        const activeData = data.filter((service) => ACTIVE_SLUGS.includes(service.slug));
        if (!cancelled && activeData.length) {
          setItems(activeData);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(fallbackPublicServices);
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
  }, [options?.featured, options?.limit]);

  return { items, loading };
}
