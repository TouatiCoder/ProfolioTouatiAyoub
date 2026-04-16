import { useEffect } from "react";
import { CONTACT, SEO_KEYWORDS } from "@/lib/seo-data";

export interface JsonLdBlock {
  "@context"?: string;
  [key: string]: unknown;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BreadcrumbSchemaItem {
  name: string;
  path?: string;
}

interface OfferInput {
  name: string;
  price: string;
  priceCurrency?: string;
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  path: string;
  areaServed?: string | string[];
  serviceType?: string;
  offers?: OfferInput[];
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  jsonLd?: JsonLdBlock | JsonLdBlock[];
  ogImage?: string;
  ogType?: "website" | "article";
  keywords?: readonly string[];
}

export const BASE_URL = "https://touatiayoub.com";
export const SITE_NAME = "Ayoub Touati | freelance web developer Morocco";
export const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

export function absoluteUrl(path: string) {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildFaqSchema(items: FAQItem[]): JsonLdBlock | null {
  if (!items.length) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function buildBreadcrumbSchema(items: BreadcrumbSchemaItem[]): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      ...(item.path ? { item: absoluteUrl(item.path) } : {}),
    })),
  };
}

export function buildServiceSchema({
  name,
  description,
  path,
  areaServed = "Morocco",
  serviceType,
  offers = [],
}: ServiceSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    url: absoluteUrl(path),
    serviceType: serviceType || name,
    provider: {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: CONTACT.name,
      telephone: CONTACT.phone,
      email: CONTACT.email,
      url: BASE_URL,
    },
    areaServed: Array.isArray(areaServed)
      ? areaServed.map((city) => ({ "@type": "Place", name: city }))
      : { "@type": "Place", name: areaServed },
    ...(offers.length
      ? {
          offers: offers.map((offer) => ({
            "@type": "Offer",
            name: offer.name,
            price: offer.price,
            priceCurrency: offer.priceCurrency || "MAD",
          })),
        }
      : {}),
  };
}

export function buildArticleSchema({
  title,
  description,
  path,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaInput): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image: image || DEFAULT_OG_IMAGE,
    datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: absoluteUrl(path),
    author: {
      "@type": "Person",
      name: CONTACT.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: CONTACT.name,
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
  };
}

function buildLocalBusinessSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${BASE_URL}/#localbusiness`,
    name: CONTACT.name,
    alternateName: SITE_NAME,
    url: BASE_URL,
    telephone: CONTACT.phone,
    email: CONTACT.email,
    image: DEFAULT_OG_IMAGE,
    priceRange: "1000 MAD - 10000 MAD",
    description: SEO_KEYWORDS.join(", "),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Meknes",
      addressCountry: "MA",
    },
    areaServed: [
      "Morocco",
      "Casablanca",
      "Rabat",
      "Marrakech",
      "Fes",
      "Tangier",
      "Meknes",
      "Agadir",
    ],
    serviceType: [...SEO_KEYWORDS],
    sameAs: [CONTACT.whatsapp],
  };
}

function buildWebsiteSchema(): JsonLdBlock {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: SITE_NAME,
    inLanguage: ["fr-MA", "ar-MA"],
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE_URL}/blog?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function SEOHead({
  title,
  description,
  path,
  noindex,
  jsonLd,
  ogImage,
  ogType = "website",
  keywords = SEO_KEYWORDS,
}: SEOHeadProps) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = title;

    setMetaByName("description", description);
    setMetaByName("keywords", keywords.join(", "));
    setMetaByName("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    setMetaByName("twitter:card", "summary_large_image");
    setMetaByName("twitter:title", title);
    setMetaByName("twitter:description", description);
    setMetaByName("twitter:image", image);
    setMetaByName("theme-color", "#0c1222");

    setMetaByProperty("og:title", title);
    setMetaByProperty("og:description", description);
    setMetaByProperty("og:url", canonicalUrl);
    setMetaByProperty("og:type", ogType);
    setMetaByProperty("og:site_name", SITE_NAME);
    setMetaByProperty("og:image", image);
    setMetaByProperty("og:image:alt", title);
    setMetaByProperty("og:locale", "fr_MA");
    setMetaByProperty("og:locale:alternate", "ar_MA");

    setLink("canonical", canonicalUrl);
    setHreflang("fr-MA", canonicalUrl);
    setHreflang("ar-MA", canonicalUrl);
    setHreflang("x-default", canonicalUrl);

    document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((element) => element.remove());

    const schemas = [
      buildLocalBusinessSchema(),
      buildWebsiteSchema(),
      ...(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []),
    ].filter(Boolean) as JsonLdBlock[];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.seoJsonld = "true";
      script.textContent = JSON.stringify(
        schema["@context"] ? schema : { "@context": "https://schema.org", ...schema },
      );
      document.head.appendChild(script);
    });

    return () => {
      document.querySelectorAll('link[data-seo-hreflang="true"]').forEach((element) => element.remove());
      document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((element) => element.remove());
    };
  }, [title, description, path, noindex, jsonLd, ogImage, ogType, keywords]);

  return null;
}

function setMetaByName(name: string, content: string) {
  let element = document.querySelector(`meta[name="${name}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("name", name);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setMetaByProperty(property: string, content: string) {
  let element = document.querySelector(`meta[property="${property}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute("property", property);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let element = document.querySelector(`link[rel="${rel}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", rel);
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}

function setHreflang(language: string, href: string) {
  let element = document.querySelector(`link[rel="alternate"][hreflang="${language}"]`);

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "alternate");
    element.setAttribute("hreflang", language);
    element.setAttribute("data-seo-hreflang", "true");
    document.head.appendChild(element);
  }

  element.setAttribute("href", href);
}
