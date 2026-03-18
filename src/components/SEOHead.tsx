import { useEffect } from "react";
import { useI18n } from "@/lib/i18n";

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
}

const BASE_URL = "https://ayoubtouati.com";

/**
 * SEO Head component — sets document title, meta description,
 * canonical URL, and hreflang tags dynamically.
 */
export function SEOHead({ title, description, path, noindex }: SEOHeadProps) {
  const { locale } = useI18n();

  useEffect(() => {
    // Title
    document.title = title;

    // Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${path}`);

    // OG tags
    setMeta("og:title", title);
    setMeta("og:description", description);
    setMeta("og:url", `${BASE_URL}${path}`);
    setMeta("og:locale", locale === "ar" ? "ar_MA" : "fr_MA");

    // Hreflang
    setHreflang("fr", `${BASE_URL}${path}`);
    setHreflang("ar", `${BASE_URL}${path}`);
    setHreflang("x-default", `${BASE_URL}${path}`);

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      removeMeta("robots");
    }

    return () => {
      // Cleanup hreflang on unmount
      document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());
    };
  }, [title, description, path, locale, noindex]);

  return null;
}

function setMeta(property: string, content: string) {
  const isOg = property.startsWith("og:");
  const selector = isOg ? `meta[property="${property}"]` : `meta[name="${property}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(isOg ? "property" : "name", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function removeMeta(name: string) {
  document.querySelector(`meta[name="${name}"]`)?.remove();
}

function setHreflang(lang: string, href: string) {
  let el = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", lang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
