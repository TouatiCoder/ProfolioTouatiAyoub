import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const schemaItems = [
    { name: "Accueil", url: "https://ayoubtouati.com/" },
    ...items.map((item) => ({
      name: item.label,
      url: item.href ? `https://ayoubtouati.com${item.href}` : undefined,
    })),
  ];

  return (
    <>
      <nav aria-label="Breadcrumb" className="container py-3">
        <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
          <li>
            <Link to="/" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Home className="h-3.5 w-3.5" />
              <span className="sr-only">Accueil</span>
            </Link>
          </li>
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1">
              <ChevronRight className="h-3.5 w-3.5" />
              {item.href && i < items.length - 1 ? (
                <Link to={item.href} className="hover:text-accent transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-foreground font-medium">{item.label}</span>
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
            itemListElement: schemaItems.map((item, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: item.name,
              ...(item.url ? { item: item.url } : {}),
            })),
          }),
        }}
      />
    </>
  );
}
