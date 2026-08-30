import { useEffect, useState, useRef } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star, Upload, X, Image as ImageIcon, Video, Play } from "lucide-react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-helpers";
import { z } from "zod";

const SERVICE_OPTIONS = [
  { value: "creation-site-web", label: "🌐 Création de site web" },
  { value: "referencement-seo", label: "🔎 Référencement SEO" },
  { value: "refonte-site-web",  label: "♻️ Refonte site web"     },
];

const MAX_VIDEO_SIZE = 500 * 1024 * 1024;
const VIDEO_MIME_TYPES = new Set(["video/mp4", "video/webm", "video/ogg", "video/quicktime", "video/x-msvideo"]);
const VIDEO_EXTENSIONS = [".mp4", ".webm", ".ogg", ".ogv", ".mov", ".avi"];

const projectSchema = z.object({
  title:        z.string().min(1).max(200),
  description:  z.string().optional(),
  results:      z.string().optional(),
  service_type: z.string().optional(),
  client_name:  z.string().optional(),
  live_url:     z.string().url().optional().or(z.literal("")),
  featured:     z.boolean(),
});

interface Project {
  id:           number;
  title:        string;
  description:  string | null;
  results:      string | null;
  image_url:    string | null;
  video_url:    string | null;
  service_type: string | null;
  client_name:  string | null;
  live_url:     string | null;
  featured:     boolean;
}

interface GalleryImage {
  id:         number;
  image_url:  string;
  sort_order: number;
}

const emptyProject = { title: "", description: "", results: "", service_type: "", client_name: "", live_url: "", featured: false };

export default function AdminPortfolio() {
  const [projects,         setProjects]         = useState<Project[]>([]);
  const [open,             setOpen]             = useState(false);
  const [editingId,        setEditingId]        = useState<number | null>(null);
  const [form,             setForm]             = useState(emptyProject);
  const [thumbnailFile,    setThumbnailFile]    = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [videoFile,        setVideoFile]        = useState<File | null>(null);
  const [videoPreview,     setVideoPreview]     = useState<string | null>(null);
  const [existingVideoUrl, setExistingVideoUrl] = useState<string | null>(null);
  const [galleryFiles,     setGalleryFiles]     = useState<File[]>([]);
  const [galleryPreviews,  setGalleryPreviews]  = useState<string[]>([]);
  const [existingGallery,  setExistingGallery]  = useState<GalleryImage[]>([]);
  const [saving,           setSaving]           = useState(false);
  const thumbInputRef   = useRef<HTMLInputElement>(null);
  const videoInputRef   = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    try {
      const data = await api.get<Project[]>('/api/admin/projects');
      setProjects(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchProjects(); }, []);

  const fetchGallery = async (projectId: number) => {
    try {
      const data = await api.get<GalleryImage[]>(`/api/projects/${projectId}/images`);
      setExistingGallery(data);
    } catch {
      setExistingGallery([]);
    }
  };

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
    setVideoFile(null);
    setVideoPreview(null);
    setExistingVideoUrl(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    setExistingGallery([]);
  };

  const handleThumbnailSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnailFile(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileName = file.name.toLowerCase();
    const hasValidExtension = VIDEO_EXTENSIONS.some((ext) => fileName.endsWith(ext));
    if (!VIDEO_MIME_TYPES.has(file.type) && !hasValidExtension) {
      toast.error("Format vidéo non supporté. Utilisez MP4, WebM, OGG ou MOV.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_VIDEO_SIZE) {
      toast.error("La vidéo ne doit pas dépasser 500 MB.");
      e.target.value = "";
      return;
    }

    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
  };

  const handleGallerySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setGalleryFiles(prev => [...prev, ...files]);
    setGalleryPreviews(prev => [...prev, ...files.map(f => URL.createObjectURL(f))]);
  };

  const removeGalleryFile = (index: number) => {
    setGalleryFiles(prev => prev.filter((_, i) => i !== index));
    setGalleryPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = async (img: GalleryImage) => {
    try {
      await api.delete(`/api/admin/projects/images/${img.id}`);
      setExistingGallery(prev => prev.filter(i => i.id !== img.id));
    } catch {
      toast.error("Erreur lors de la suppression de l'image");
    }
  };

  const handleSave = async () => {
    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);

    const fd = new FormData();
    fd.append("title",        parsed.data.title);
    fd.append("description",  parsed.data.description ?? "");
    fd.append("results",      parsed.data.results ?? "");
    fd.append("service_type", parsed.data.service_type ?? "");
    fd.append("client_name",  parsed.data.client_name ?? "");
    fd.append("live_url",     parsed.data.live_url ?? "");
    fd.append("featured",     String(parsed.data.featured));
    if (thumbnailFile) fd.append("thumbnail", thumbnailFile);
    if (videoFile)     fd.append("video", videoFile);

    try {
      let projectId = editingId;

      if (editingId) {
        await api.uploadPut<{ image_url?: string }>(`/api/admin/projects/${editingId}`, fd);
        await logActivity("update_project", "project", String(editingId));
        toast.success("Projet mis à jour");
      } else {
        const res = await api.upload<{ id: number }>('/api/admin/projects', fd);
        projectId = res.id;
        await logActivity("create_project", "project", String(projectId));
        toast.success("Projet créé");
      }

      // Upload gallery images
      if (projectId && galleryFiles.length > 0) {
        const gfd = new FormData();
        galleryFiles.forEach(f => gfd.append("images", f));
        await api.upload(`/api/admin/projects/${projectId}/images`, gfd);
      }

      setOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    }
    setSaving(false);
  };

  const handleEdit = async (project: Project) => {
    setEditingId(project.id);
    setForm({
      title:        project.title,
      description:  project.description ?? "",
      results:      project.results ?? "",
      service_type: project.service_type ?? "",
      client_name:  project.client_name ?? "",
      live_url:     project.live_url ?? "",
      featured:     project.featured,
    });
    if (project.image_url) setThumbnailPreview(api.asset(project.image_url));
    if (project.video_url) setExistingVideoUrl(api.asset(project.video_url));
    await fetchGallery(project.id);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/admin/projects/${id}`);
      await logActivity("delete_project", "project", String(id));
      toast.success("Projet supprimé");
      fetchProjects();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Nouveau projet</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier le projet" : "Nouveau projet"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="space-y-2">
                <Label>Titre *</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Type de service</Label>
                  <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                    <SelectTrigger><SelectValue placeholder="Choisir..." /></SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map(o => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>
                  {form.service_type === "montage-video" ? "Résultat / stat clé" : "Résultat obtenu"}
                </Label>
                <Input
                  value={form.results}
                  onChange={(e) => setForm({ ...form, results: e.target.value })}
                  placeholder={form.service_type === "montage-video"
                    ? "500k vues · ROAS x4 · +80 abonnés..."
                    : "+300% de trafic en 3 mois"}
                />
              </div>
              <div className="space-y-2">
                <Label>
                  {form.service_type === "montage-video"
                    ? "URL YouTube / Vimeo"
                    : "URL du site web"}
                </Label>
                <Input
                  value={form.live_url}
                  onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                  placeholder={form.service_type === "montage-video"
                    ? "https://www.youtube.com/watch?v=..."
                    : "https://..."}
                  type="url"
                />
                {form.service_type === "montage-video" && (
                  <p className="text-xs text-muted-foreground">
                    La miniature YouTube sera extraite automatiquement.
                  </p>
                )}
              </div>

              {/* Thumbnail */}
              <div className="space-y-2">
                <Label>
                  Image miniature{" "}
                  {form.service_type === "montage-video"
                    ? "(aperçu de la vidéo)"
                    : form.live_url
                      ? "(optionnel — repli si l'aperçu direct échoue)"
                      : "(optionnel)"}
                </Label>
                {form.service_type !== "montage-video" && form.live_url && (
                  <p className="text-xs text-muted-foreground">
                    Une URL est renseignée : la carte affichera un aperçu en direct du site (iframe) au lieu de cette image. Ajoutez une miniature seulement si le site refuse l'intégration.
                  </p>
                )}
                <div
                  onClick={() => thumbInputRef.current?.click()}
                  className="border-2 border-dashed border-border rounded-lg p-4 cursor-pointer hover:border-accent/50 transition-colors"
                >
                  {thumbnailPreview ? (
                    <img src={thumbnailPreview} alt="preview" className="max-h-40 mx-auto rounded object-cover" />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground py-4">
                      <Upload className="h-8 w-8" />
                      <span className="text-sm">Cliquez pour sélectionner une image</span>
                    </div>
                  )}
                </div>
                <input ref={thumbInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailSelect} />
              </div>

              {/* Video Upload — visible seulement pour montage-video */}
              {form.service_type === "montage-video" && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-teal-600" />
                    Fichier vidéo (MP4, MOV, WebM, OGG - max 500 MB)
                  </Label>

                  {/* Existing video */}
                  {existingVideoUrl && !videoFile && (
                    <div className="rounded-lg border border-teal/30 bg-teal/5 p-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2 text-sm text-foreground">
                          <Play className="h-4 w-4 text-teal-600" />
                          Vidéo actuelle
                        </div>
                        <a
                          href={existingVideoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-teal-600 hover:underline"
                        >
                          Prévisualiser
                        </a>
                      </div>
                      <video
                        src={existingVideoUrl}
                        className="mt-2 w-full max-h-32 rounded object-contain bg-black"
                        controls
                        preload="metadata"
                      />
                    </div>
                  )}

                  {/* New video preview */}
                  {videoPreview && (
                    <div className="relative rounded-lg border border-teal/30 bg-black overflow-hidden">
                      <video
                        src={videoPreview}
                        className="w-full max-h-48 object-contain"
                        controls
                        preload="metadata"
                      />
                      <button
                        type="button"
                        onClick={() => { setVideoFile(null); setVideoPreview(null); }}
                        className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-white hover:bg-black/90"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  )}

                  {/* Upload button */}
                  {!videoPreview && (
                    <div
                      onClick={() => videoInputRef.current?.click()}
                      className="border-2 border-dashed border-teal/40 rounded-lg p-5 cursor-pointer hover:border-teal/70 hover:bg-teal/5 transition-colors"
                    >
                      <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Video className="h-9 w-9 text-teal-500/60" />
                        <span className="text-sm font-medium">Cliquez pour choisir une vidéo</span>
                        <span className="text-xs text-muted-foreground/60">MP4, MOV, WebM, OGG - 500 MB max</span>
                      </div>
                    </div>
                  )}

                  <input
                    ref={videoInputRef}
                    type="file"
                    accept="video/mp4,video/webm,video/ogg,video/quicktime,video/x-msvideo,.mp4,.webm,.ogg,.ogv,.mov,.avi"
                    className="hidden"
                    onChange={handleVideoSelect}
                  />
                </div>
              )}

              {/* Gallery */}
              <div className="space-y-2">
                <Label>Galerie (images supplémentaires)</Label>
                {existingGallery.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {existingGallery.map(img => (
                      <div key={img.id} className="relative group">
                        <img src={api.asset(img.image_url) ?? undefined} alt="" className="w-20 h-20 object-cover rounded border" />
                        <button
                          onClick={() => removeExistingImage(img)}
                          className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {galleryPreviews.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {galleryPreviews.map((src, i) => (
                      <div key={i} className="relative group">
                        <img src={src} alt="" className="w-20 h-20 object-cover rounded border border-accent/30" />
                        <button
                          onClick={() => removeGalleryFile(i)}
                          className="absolute -top-1 -right-1 bg-destructive text-white rounded-full w-5 h-5 text-xs flex items-center justify-center opacity-0 group-hover:opacity-100"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <Button variant="outline" size="sm" onClick={() => galleryInputRef.current?.click()}>
                  <ImageIcon className="h-4 w-4 mr-2" /> Ajouter des images
                </Button>
                <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
              </div>

              <div className="flex items-center gap-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label className="flex items-center gap-1"><Star className="h-4 w-4" /> Mis en avant</Label>
              </div>

              {saving && videoFile && (
                <p className="text-center text-xs text-muted-foreground">
                  Téléversement de la vidéo en cours. Gardez cette fenêtre ouverte.
                </p>
              )}
              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving && videoFile ? "Téléversement de la vidéo..." : saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Projet</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Vedette</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {project.image_url ? (
                        <img src={api.asset(project.image_url) ?? undefined} alt="" className="w-12 h-8 object-cover rounded" />
                      ) : project.video_url ? (
                        <div className="w-12 h-8 rounded bg-teal/10 flex items-center justify-center">
                          <Video className="h-4 w-4 text-teal-600" />
                        </div>
                      ) : null}
                      <span>
                        {project.title}
                        {project.video_url && (
                          <span className="ml-2 text-xs rounded-full bg-teal/10 text-teal-700 px-2 py-0.5">vidéo</span>
                        )}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">{project.client_name || "—"}</TableCell>
                  <TableCell className="text-sm">{project.service_type || "—"}</TableCell>
                  <TableCell>
                    {project.featured && <Star className="h-4 w-4 text-accent fill-accent" />}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(project)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(project.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {projects.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Aucun projet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
