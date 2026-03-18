import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-helpers";
import { z } from "zod";

const SERVICE_OPTIONS = [
  { value: "web", label: "Création de site web" },
  { value: "seo", label: "Référencement SEO" },
  { value: "marketing", label: "Marketing digital" },
  { value: "video", label: "Montage vidéo" },
  { value: "email", label: "Email marketing" },
];

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  results: z.string().optional(),
  service_type: z.string().optional(),
  client_name: z.string().optional(),
  live_url: z.string().url().optional().or(z.literal("")),
  featured: z.boolean(),
});

interface Project {
  id: string;
  title: string;
  description: string | null;
  results: string | null;
  image_url: string | null;
  service_type: string | null;
  client_name: string | null;
  live_url: string | null;
  featured: boolean;
}

interface GalleryImage {
  id: string;
  image_url: string;
  sort_order: number;
}

const emptyProject = { title: "", description: "", results: "", service_type: "", client_name: "", live_url: "", featured: false };

function getPublicUrl(path: string) {
  return `${SUPABASE_URL}/storage/v1/object/public/project-images/${path}`;
}

async function uploadFile(file: File, folder: string): Promise<string | null> {
  const ext = file.name.split(".").pop();
  const fileName = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from("project-images").upload(fileName, file);
  if (error) {
    toast.error("Erreur upload: " + error.message);
    return null;
  }
  return getPublicUrl(fileName);
}

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [existingGallery, setExistingGallery] = useState<GalleryImage[]>([]);
  const [saving, setSaving] = useState(false);
  const thumbInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects((data as Project[]) ?? []);
  };

  useEffect(() => { fetchProjects(); }, []);

  const fetchGallery = async (projectId: string) => {
    const { data } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true });
    setExistingGallery((data as GalleryImage[]) ?? []);
  };

  const resetForm = () => {
    setForm(emptyProject);
    setEditingId(null);
    setThumbnailFile(null);
    setThumbnailPreview(null);
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
    await supabase.from("project_images").delete().eq("id", img.id);
    setExistingGallery(prev => prev.filter(i => i.id !== img.id));
  };

  const handleSave = async () => {
    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);

    // Upload thumbnail if new file selected
    let thumbnailUrl = thumbnailPreview && !thumbnailFile ? thumbnailPreview : null;
    if (thumbnailFile) {
      thumbnailUrl = await uploadFile(thumbnailFile, "thumbnails");
      if (!thumbnailUrl) { setSaving(false); return; }
    }

    const d = parsed.data;
    const payload = {
      title: d.title,
      description: d.description || null,
      results: d.results || null,
      image_url: thumbnailUrl || (editingId ? projects.find(p => p.id === editingId)?.image_url ?? null : null),
      service_type: d.service_type || null,
      client_name: d.client_name || null,
      live_url: d.live_url || null,
      featured: d.featured,
    };

    let projectId = editingId;

    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
      await logActivity("update_project", "project", editingId);
    } else {
      const { data } = await supabase.from("projects").insert([payload]).select("id").single();
      projectId = data?.id ?? null;
      await logActivity("create_project", "project", projectId ?? undefined);
    }

    // Upload gallery images
    if (projectId && galleryFiles.length > 0) {
      const maxOrder = existingGallery.length > 0 ? Math.max(...existingGallery.map(i => i.sort_order)) + 1 : 0;
      for (let i = 0; i < galleryFiles.length; i++) {
        const url = await uploadFile(galleryFiles[i], `gallery/${projectId}`);
        if (url) {
          await supabase.from("project_images").insert({
            project_id: projectId,
            image_url: url,
            sort_order: maxOrder + i,
          });
        }
      }
    }

    setSaving(false);
    toast.success(editingId ? "Projet mis à jour" : "Projet créé");
    setOpen(false);
    resetForm();
    fetchProjects();
  };

  const handleEdit = async (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description ?? "",
      results: project.results ?? "",
      service_type: project.service_type ?? "",
      client_name: project.client_name ?? "",
      live_url: project.live_url ?? "",
      featured: project.featured,
    });
    setThumbnailPreview(project.image_url);
    setThumbnailFile(null);
    setGalleryFiles([]);
    setGalleryPreviews([]);
    await fetchGallery(project.id);
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    await logActivity("delete_project", "project", id);
    toast.success("Projet supprimé");
    fetchProjects();
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Titre</Label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Client</Label>
                  <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Résultats</Label>
                <Textarea value={form.results} onChange={(e) => setForm({ ...form, results: e.target.value })} rows={2} placeholder="Ex: Trafic +300%, Ventes ×5" />
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-2">
                <Label>Image miniature</Label>
                <input ref={thumbInputRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailSelect} />
                {thumbnailPreview ? (
                  <div className="relative w-40 h-28 rounded-lg overflow-hidden border border-border">
                    <img src={thumbnailPreview} alt="Miniature" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => { setThumbnailFile(null); setThumbnailPreview(null); }}
                      className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <Button type="button" variant="outline" onClick={() => thumbInputRef.current?.click()}>
                    <Upload className="h-4 w-4 mr-2" /> Choisir une image
                  </Button>
                )}
              </div>

              {/* Gallery Upload */}
              <div className="space-y-2">
                <Label>Images du projet (galerie)</Label>
                <input ref={galleryInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGallerySelect} />
                <div className="flex flex-wrap gap-2">
                  {existingGallery.map((img) => (
                    <div key={img.id} className="relative w-24 h-24 rounded-lg overflow-hidden border border-border">
                      <img src={img.image_url} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(img)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {galleryPreviews.map((src, i) => (
                    <div key={`new-${i}`} className="relative w-24 h-24 rounded-lg overflow-hidden border border-primary/30">
                      <img src={src} alt="" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeGalleryFile(i)}
                        className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-0.5"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" className="w-24 h-24 flex flex-col gap-1" onClick={() => galleryInputRef.current?.click()}>
                    <ImageIcon className="h-5 w-5" />
                    <span className="text-xs">Ajouter</span>
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL Live</Label>
                  <Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Type de service</Label>
                  <Select value={form.service_type} onValueChange={(v) => setForm({ ...form, service_type: v })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner un service" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICE_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label>Projet vedette</Label>
              </div>
              <Button onClick={handleSave} className="w-full" disabled={saving}>
                {saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer"}
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
                <TableHead>Image</TableHead>
                <TableHead>Titre</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Vedette</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    {project.image_url ? (
                      <img src={project.image_url} alt="" className="w-12 h-12 rounded object-cover" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center">
                        <ImageIcon className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.client_name || "—"}</TableCell>
                  <TableCell>{SERVICE_OPTIONS.find(s => s.value === project.service_type)?.label || project.service_type || "—"}</TableCell>
                  <TableCell>{project.featured && <Star className="h-4 w-4 text-accent fill-accent" />}</TableCell>
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
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
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
