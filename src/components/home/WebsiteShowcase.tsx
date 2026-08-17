import { useState } from "react";
import { ExternalLink, Globe, X, Monitor } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePublicProjects, PublicProject } from "@/hooks/usePublicProjects";
import { api } from "@/lib/api";

// ─── Fallback static examples ─────────────────────────────
const FALLBACK_SITES: PublicProject[] = [
  {
    id: -10, title: "Restaurant Le Palais",
    description: "Site vitrine + système de réservation WhatsApp",
    results: "+300% de réservations",
    image_url: null, service_type: "creation-site-web",
    client_name: "Meknès", live_url: "https://touatiayoub.com", featured: true,
  },
  {
    id: -11, title: "Cabinet Médical",
    description: "Site professionnel avec prise de rendez-vous en ligne",
    results: "+45 RDV/semaine",
    image_url: null, service_type: "creation-site-web",
    client_name: "Casablanca", live_url: "https://touatiayoub.com", featured: true,
  },
  {
    id: -12, title: "Boutique E-commerce",
    description: "Boutique Shopify avec intégration paiement Maroc",
    results: "ROAS x5.2",
    image_url: null, service_type: "creation-site-web",
    client_name: "Rabat", live_url: "https://touatiayoub.com", featured: true,
  },
];

// ─── WebView Modal ────────────────────────────────────────
function WebViewModal({ site, onClose }: { site: PublicProject; onClose: () => void }) {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const [iframeError, setIframeError] = useState(false);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 20 }}
          className="relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-card shadow-2xl"
          style={{ height: "85vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Browser chrome bar */}
          <div className="flex items-center gap-3 border-b border-border bg-muted/60 px-4 py-3">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="h-3 w-3 rounded-full bg-destructive hover:brightness-90" />
              <span className="h-3 w-3 rounded-full bg-warning" />
              <span className="h-3 w-3 rounded-full bg-success" />
            </div>
            <div className="flex flex-1 items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5 text-xs text-muted-foreground">
              <Globe className="h-3 w-3 shrink-0" />
              <span className="truncate">{site.live_url || site.title}</span>
            </div>
            {site.live_url && (
              <a
                href={site.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-muted"
                title={isAr ? "فتح في نافذة جديدة" : "Ouvrir dans un nouvel onglet"}
              >
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
              </a>
            )}
          </div>

          {/* iframe / fallback */}
          {site.live_url && !iframeError ? (
            <iframe
              src={site.live_url}
              className="flex-1 w-full border-0"
              title={site.title}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              onError={() => setIframeError(true)}
            />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 bg-muted/30 text-center p-8">
              <Monitor className="h-12 w-12 text-muted-foreground/50" />
              <div>
                <p className="font-semibold text-foreground">{site.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {iframeError
                    ? (isAr ? "هذا الموقع لا يسمح بالمعاينة المضمّنة." : "Ce site bloque l'intégration iframe.")
                    : (isAr ? "المعاينة غير متوفرة." : "Aperçu non disponible.")}
                </p>
              </div>
              {site.live_url && (
                <a
                  href={site.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-accent/90"
                >
                  {isAr ? "زيارة الموقع" : "Visiter le site"} <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Site Card ────────────────────────────────────────────
function SiteCard({ site, onPreview, isAr }: { site: PublicProject; onPreview: () => void; isAr: boolean }) {
  const thumb = site.image_url ? api.asset(site.image_url, 640) : null;
  const [liveError, setLiveError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-gold"
    >
      {/* Live preview / screenshot / fallback */}
      <button
        onClick={onPreview}
        className="relative block w-full overflow-hidden"
        aria-label={isAr ? `معاينة ${site.title}` : `Aperçu ${site.title}`}
      >
        <div className="aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary to-primary/70">
          {site.live_url && !liveError ? (
            <div
              className="pointer-events-none origin-top-left"
              style={{ width: "400%", height: "400%", transform: "scale(0.25)" }}
            >
              <iframe
                src={site.live_url}
                title={site.title}
                loading="lazy"
                tabIndex={-1}
                sandbox="allow-scripts allow-same-origin"
                onError={() => setLiveError(true)}
                className="h-full w-full border-0 transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ) : thumb ? (
            <img
              src={thumb}
              alt={site.title}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Globe className="h-12 w-12 text-white/20" />
            </div>
          )}
        </div>
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-primary/60 opacity-0 transition-opacity group-hover:opacity-100">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-lg">
            {isAr ? "معاينة الموقع" : "Voir le site"}
          </span>
        </div>
      </button>

      {/* Info */}
      <div className="p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className={`font-bold text-foreground ${isAr ? "font-arabic text-right" : ""}`}>
            {site.title}
          </h3>
          {site.client_name && (
            <span className="shrink-0 rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              {site.client_name}
            </span>
          )}
        </div>
        {site.description && (
          <p className={`text-sm text-muted-foreground ${isAr ? "text-right" : ""}`}>
            {site.description}
          </p>
        )}
        {site.results && (
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm font-semibold text-accent">{site.results}</span>
            {site.live_url && (
              <a
                href={site.live_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent"
              >
                <ExternalLink className="h-3 w-3" />
                {isAr ? "زيارة" : "Visiter"}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────
export function WebsiteShowcase() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const [activeSite, setActiveSite] = useState<PublicProject | null>(null);

  const { items: dbSites, loading } = usePublicProjects({
    service: "creation-site-web",
    featured: true,
    limit: 6,
  });

  const sites = dbSites.length > 0 ? dbSites : FALLBACK_SITES;

  return (
    <section className="bg-muted/30 py-20 md:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="badge-gold mb-3 inline-block">
            {isAr ? "مشاريع المواقع" : "Sites réalisés"}
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr ? "مواقع أنجزتها لعملاء في المغرب" : "Sites web livrés au Maroc"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {isAr
              ? "اضغط على أي موقع لمعاينته مباشرة — مواقع حقيقية ونتائج قابلة للقياس."
              : "Cliquez sur un site pour l’apercevoir en direct — projets réels, résultats mesurables."}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[16/10] animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {sites.map((s) => (
              <SiteCard
                key={s.id}
                site={s}
                isAr={isAr}
                onPreview={() => setActiveSite(s)}
              />
            ))}
          </div>
        )}
      </div>

      {activeSite && (
        <WebViewModal site={activeSite} onClose={() => setActiveSite(null)} />
      )}
    </section>
  );
}
