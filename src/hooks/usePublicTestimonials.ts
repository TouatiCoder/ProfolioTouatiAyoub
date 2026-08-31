import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export interface PublicTestimonial {
  id?: number;
  client_name: string;
  company?: string | null;
  company_ar?: string | null;
  quote: string;
  quote_ar?: string | null;
  rating: number;
  featured?: boolean;
  published?: boolean;
  sort_order?: number;
}

// Deliberately empty — was previously seeded with three invented client
// identities (names, companies, quotes) that rendered as real testimonials
// whenever the API was unreachable. No fabricated reviews, ever (see the
// project's explicit "no fake authority" rule): the UI must show an honest
// empty state instead — see Testimonials.tsx's `items.length === 0` branch.
export const fallbackTestimonials: PublicTestimonial[] = [];

export function usePublicTestimonials(limit = 3) {
  const [items, setItems] = useState<PublicTestimonial[]>(fallbackTestimonials);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    api.get<PublicTestimonial[]>(`/api/testimonials?featured=true&limit=${limit}`)
      .then((data) => {
        if (!cancelled && data.length) {
          setItems(data);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setItems(fallbackTestimonials.slice(0, limit));
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
  }, [limit]);

  return { items, loading };
}
