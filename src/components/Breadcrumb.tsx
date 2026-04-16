import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { BASE_URL } from "@/components/SEOHead";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = [
    { name: "Accueil", url: `${BASE_URL}/` },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `${BASE_URL}${item.href}` : undefined,
    })),
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="container py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="flex items-center gap-1 transition-colors hover:text-accent">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Accueil</span>
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" />
              {item.href && index < items.length - 1 ? (
                <Link to={item.href} className="transition-colors hover:text-accent">
                  {item.label}
                </Link>
              ) : (
                <span className="font-medium text-foreground">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: schemaItems.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: item.name,
              ...(item.url ? { item: item.url } : {}),
            })),
          }),
        }}
      />
    </>
  );
}
