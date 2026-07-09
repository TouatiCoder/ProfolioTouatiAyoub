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

export const fallbackTestimonials: PublicTestimonial[] = [
  {
    client_name: "Ahmed B.",
    company: "Restaurant Le Palais, Meknes",
    company_ar: "مطعم القصر، مكناس",
    quote: "Grâce à la refonte et au SEO local, nous recevons des demandes chaque semaine depuis Google et WhatsApp.",
    quote_ar: "بفضل إعادة التصميم والسيو المحلي أصبحنا نستقبل طلبات كل أسبوع من Google وواتساب.",
    rating: 5,
    featured: true,
    published: true,
    sort_order: 1,
  },
  {
    client_name: "Fatima Z.",
    company: "Boutique Zellige, Fes",
    company_ar: "بوتيك الزليج، فاس",
    quote: "Le nouveau site charge vite, inspire confiance et transforme bien mieux les visites en conversations commerciales.",
    quote_ar: "الموقع الجديد سريع ويعطي ثقة ويحوّل الزيارات إلى محادثات تجارية بشكل أفضل بكثير.",
    rating: 5,
    featured: true,
    published: true,
    sort_order: 2,
  },
  {
    client_name: "Youssef M.",
    company: "Cabinet Juridique, Rabat",
    company_ar: "مكتب قانوني، الرباط",
    quote: "Nous avons enfin une page de contact qui convertit et un parcours plus clair pour les prospects.",
    quote_ar: "أصبح لدينا أخيراً مسار تواصل يحقق تحويلات ومسار أوضح للعملاء المحتملين.",
    rating: 5,
    featured: true,
    published: true,
    sort_order: 3,
  },
];

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
