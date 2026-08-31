import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { technologies as staticTechnologies, type Technology } from "@/lib/seo-data";

export interface PublicTechnology {
  id?: number;
  name: string;
  slug: string;
  category: Technology["category"];
  icon?: string | null;
  description?: string | null;
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
}

// Static array (src/lib/seo-data.ts) is the fallback — used until the admin
// adds real rows via /admin/technologies (table starts empty; nothing in the
// UI regresses in the meantime) and whenever the API is unreachable.
const fallbackTechnologies: PublicTechnology[] = staticTechnologies;

export function usePublicTechnologies() {
  const [items, setItems] = useState<PublicTechnology[]>(fallbackTechnologies);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    api.get<PublicTechnology[]>("/api/technologies")
      .then((data) => {
        if (!cancelled && data.length) {
          setItems(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(fallbackTechnologies);
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
  }, []);

  return { items, loading };
}
