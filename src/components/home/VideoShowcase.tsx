import { useState } from "react";
import { Play, X, ExternalLink, Video } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "@/lib/i18n";
import { usePublicProjects, PublicProject } from "@/hooks/usePublicProjects";
import { api } from "@/lib/api";

// ─── YouTube helpers ───────────────────────────────────────────────────────────
function getYouTubeId(url: string): string | null {
  const patterns = [
    /youtu\.be\/([^?&]+)/,
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtube\.com\/embed\/([^?&]+)/,
    /youtube\.com\/shorts\/([^?&]+)/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

function getYouTubeThumbnail(url: string): string | null {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : null;
}

function getEmbedUrl(url: string): string | null {
  const id = getYouTubeId(url);
  if (id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
  if (url.includes("vimeo.com")) {
    const m = url.match(/vimeo\.com\/(\d+)/);
    if (m) return `https://player.vimeo.com/video/${m[1]}?autoplay=1`;
  }
  return null;
}

function isLocalVideo(url: string | null): boolean {
  if (!url) return false;
  return url.startsWith("/uploads/") || url.startsWith("http") && !url.includes("youtube") && !url.includes("youtu.be") && !url.includes("vimeo");
}

// ─── Fallback ─────────────────────────────────────────────────────────────────
const FALLBACK_VIDEOS: PublicProject[] = [
  {
    id: -1, title: "Clip Promotionnel — Restaurant",
    description: "Montage court format pour réseaux sociaux",
    results: "500k+ vues", image_url: null, video_url: null,
    service_type: "montage-video", client_name: "Casablanca",
    live_url: null, featured: true,
  },
  {
    id: -2, title: "Vidéo Produit — Boutique Mode",
    description: "Vidéo produit avec motion design et sous-titres",
    results: "ROAS x4 Meta Ads", image_url: null, video_url: null,
    service_type: "montage-video", client_name: "Marrakech",
    live_url: null, featured: true,
  },
  {
    id: -3, title: "Témoignage Client — Coaching",
    description: "Interview montée avec sous-titres bilingues",
    results: "+80 inscrits/2 sem.", image_url: null, video_url: null,
    service_type: "montage-video", client_name: "Rabat",
    live_url: null, featured: true,
  },
];

// ─── Video Modal ───────────────────────────────────────────────────────────────
function VideoModal({ video, onClose }: { video: PublicProject; onClose: () => void }) {
  const videoUrl = video.video_url ? api.asset(video.video_url) : null;
  const embedUrl = video.live_url ? getEmbedUrl(video.live_url) : null;
  const hasLocal = videoUrl && isLocalVideo(video.video_url!);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ type: "spring", damping: 22 }}
          className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-card shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur hover:bg-black/80"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Video player */}
          <div className="aspect-video w-full bg-black">
            {hasLocal ? (
              // ── Local uploaded video ────────────────────────────────────────
              <video
                src={videoUrl!}
                controls
                autoPlay
                className="h-full w-full object-contain"
                playsInline
              >
                Votre navigateur ne supporte pas la lecture vidéo.
              </video>
            ) : embedUrl ? (
              // ── YouTube / Vimeo embed ───────────────────────────────────────
              <iframe
                src={embedUrl}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={video.title}
              />
            ) : (
              // ── No video available ──────────────────────────────────────────
              <div className="flex h-full items-center justify-center">
                <p className="text-white/50">Vidéo non disponible.</p>
              </div>
            )}
          </div>

          {/* Info bar */}
          <div className="flex items-start justify-between gap-4 p-5">
            <div>
              <h3 className="font-bold text-foreground">{video.title}</h3>
              {video.client_name && (
                <p className="mt-0.5 text-sm text-muted-foreground">{video.client_name}</p>
              )}
              {video.results && (
                <span className="mt-2 inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                  {video.results}
                </span>
              )}
            </div>
            {video.live_url && !hasLocal && (
              <a
                href={video.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-1.5 text-sm font-semibold text-accent"
              >
                <ExternalLink className="h-4 w-4" />
                Ouvrir
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Video Card ────────────────────────────────────────────────────────────────
function VideoCard({ video, onClick }: { video: PublicProject; onClick: () => void }) {
  const ytThumb     = video.live_url ? getYouTubeThumbnail(video.live_url) : null;
  const localThumb  = video.image_url ? api.asset(video.image_url) : null;
  const thumb       = localThumb || ytThumb;
  const hasVideo    = !!video.video_url || !!video.live_url;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
    >
      <button
        onClick={hasVideo ? onClick : undefined}
        className={`group w-full overflow-hidden rounded-2xl border border-border/50 bg-card text-left transition-all ${
          hasVideo ? "hover:-translate-y-1 hover:border-teal/30 hover:shadow-teal cursor-pointer" : "cursor-default"
        }`}
      >
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden bg-navy">
          {thumb ? (
            <img
              src={thumb}
              alt={video.title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary to-primary/60">
              <Video className="h-14 w-14 text-white/20" />
            </div>
          )}

          {/* Play overlay — only if video exists */}
          {hasVideo && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/35 opacity-0 transition-opacity group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/95 shadow-lg">
                <Play className="ml-1 h-7 w-7 fill-primary text-primary" />
              </div>
            </div>
          )}

          {/* Result badge */}
          {video.results && (
            <span className="absolute bottom-3 right-3 rounded-full bg-black/70 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              {video.results}
            </span>
          )}

          {/* Video type badge */}
          {video.video_url && (
            <span className="absolute left-3 top-3 rounded-full bg-teal/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              Vidéo
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-semibold text-foreground">{video.title}</p>
          {video.description && (
            <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{video.description}</p>
          )}
          {video.client_name && (
            <p className="mt-1 text-xs text-muted-foreground/70">{video.client_name}</p>
          )}
        </div>
      </button>
    </motion.div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
export function VideoShowcase() {
  const { locale } = useI18n();
  const isAr = locale === "ar";
  const [activeVideo, setActiveVideo] = useState<PublicProject | null>(null);

  const { items: dbVideos, loading } = usePublicProjects({
    service: "montage-video",
    featured: true,
    limit: 6,
  });

  const videos = dbVideos.some((v) => v.service_type === "montage-video")
    ? dbVideos
    : FALLBACK_VIDEOS;

  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mb-12 text-center">
          <span className="badge-teal mb-3 inline-block">
            {isAr ? "أعمال المونتاج" : "Montage vidéo"}
          </span>
          <h2 className="text-3xl font-bold md:text-4xl">
            {isAr ? "أمثلة من أعمالي في المونتاج" : "Exemples de montages réalisés"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            {isAr
              ? "ريلز، فيديوهات ترويجية وكليبات احترافية لتعزيز حضورك على الإنترنت."
              : "Reels, vidéos promotionnelles et clips professionnels — cliquez pour visionner."}
          </p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-video animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((v) => (
              <VideoCard key={v.id} video={v} onClick={() => setActiveVideo(v)} />
            ))}
          </div>
        )}
      </div>

      {activeVideo && (
        <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
}
