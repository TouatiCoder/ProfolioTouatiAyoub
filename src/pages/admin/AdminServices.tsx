import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star, Upload, X, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const serviceSchema = z.object({
  slug:                 z.string().min(1).max(120),
  name:                 z.string().min(1).max(160),
  name_ar:              z.string().max(160).optional().or(z.literal("")),
  short_description:    z.string().min(1).max(320),
  short_description_ar: z.string().max(320).optional().or(z.literal("")),
  price_from:           z.string().max(80).optional().or(z.literal("")),
  badge:                z.string().max(80).optional().or(z.literal("")),
  icon:                 z.string().max(80).optional().or(z.literal("")),
  cta_label:            z.string().max(80).optional().or(z.literal("")),
  featured:             z.boolean(),
  published:            z.boolean(),
  sort_order:           z.number().int().min(0).max(999),
  image:                z.string().max(500).optional().or(z.literal("")),
});

interface Service {
  id:                   number;
  slug:                 string;
  name:                 string;
  name_ar:              string | null;
  short_description:    string;
  short_description_ar: string | null;
  price_from:           string | null;
  badge:                string | null;
  icon:                 string | null;
  cta_label:            string | null;
  featured:             boolean;
  published:            boolean;
  sort_order:           number;
  image:                string | null;
}

const empty: z.infer<typeof serviceSchema> = {
  slug: "", name: "", name_ar: "", short_description: "", short_description_ar: "",
  price_from: "", badge: "", icon: "", cta_label: "", featured: true, published: true, sort_order: 0, image: "",
};

export default function AdminServices() {
  const [services,   setServices]   = useState<Service[]>([]);
  const [open,       setOpen]       = useState(false);
  const [editingId,  setEditingId]  = useState<number | null>(null);
  const [form,       setForm]       = useState(empty);
  const [saving,     setSaving]     = useState(false);
  const [uploading,  setUploading]  = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const data = await api.get<Service[]>('/api/admin/services');
      setServices(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const resetForm = () => { setForm(empty); setEditingId(null); setPreviewUrl(null); };

  const handleSave = async () => {
    const parsed = serviceSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/admin/services/${editingId}`, parsed.data);
        toast.success("Service mis à jour");
      } else {
        await api.post('/api/admin/services', parsed.data);
        toast.success("Service créé");
      }
      setOpen(false);
      resetForm();
      fetchServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    }
    setSaving(false);
  };

  const handleEdit = (s: Service) => {
    setEditingId(s.id);
    setForm({
      slug: s.slug, name: s.name, name_ar: s.name_ar ?? "",
      short_description: s.short_description, short_description_ar: s.short_description_ar ?? "",
      price_from: s.price_from ?? "", badge: s.badge ?? "", icon: s.icon ?? "",
      cta_label: s.cta_label ?? "", featured: s.featured, published: s.published, sort_order: s.sort_order,
      image: s.image ?? "",
    });
    setPreviewUrl(s.image ?? null);
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce service ?")) return;
    try {
      await api.delete(`/api/admin/services/${id}`);
      toast.success("Service supprimé");
      fetchServices();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const togglePublished = async (s: Service) => {
    try {
      await api.patch(`/api/admin/services/${s.id}`, { ...s, published: !s.published });
      fetchServices();
    } catch {
      toast.error("Erreur");
    }
  };

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Nouveau service</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier le service" : "Nouveau service"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Slug *</Label>
                  <Input value={form.slug} onChange={f("slug")} placeholder="creation-site-web" />
                </div>
                <div className="space-y-2">
                  <Label>Ordre</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom (FR) *</Label>
                  <Input value={form.name} onChange={f("name")} />
                </div>
                <div className="space-y-2">
                  <Label>Nom (AR)</Label>
                  <Input value={form.name_ar} onChange={f("name_ar")} dir="rtl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description courte (FR) *</Label>
                <Textarea value={form.short_description} onChange={f("short_description")} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Description courte (AR)</Label>
                <Textarea value={form.short_description_ar} onChange={f("short_description_ar")} rows={2} dir="rtl" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Prix à partir de</Label>
                  <Input value={form.price_from} onChange={f("price_from")} placeholder="1 000 MAD" />
                </div>
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={form.badge} onChange={f("badge")} placeholder="Best seller" />
                </div>
                <div className="space-y-2">
                  <Label>Icône (Lucide)</Label>
                  <Input value={form.icon} onChange={f("icon")} placeholder="Globe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Libellé CTA</Label>
                <Input value={form.cta_label} onChange={f("cta_label")} placeholder="Demander un devis" />
              </div>

              <div className="space-y-2">
                <Label>Image du service</Label>
                <div className="space-y-2">
                  {previewUrl ? (
                    <div className="relative group">
                      <img 
                        src={previewUrl} 
                        alt="Preview" 
                        className="w-full h-48 object-cover rounded-lg border" 
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          setPreviewUrl(null);
                          setForm({ ...form, image: "" });
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-accent/50 transition-colors">
                      <ImageIcon className="h-12 w-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-4">
                        Glissez une image ici ou cliquez pour sélectionner
                      </p>
                      <Input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="service-image-upload"
                        onChange={async (e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;
                          
                          // Vérifier la taille (max 5MB)
                          if (file.size > 5 * 1024 * 1024) {
                            toast.error("L\'image ne doit pas dépasser 5MB");
                            return;
                          }
                          
                          // Vérifier le type
                          if (!file.type.startsWith("image/")) {
                            toast.error("Veuillez sélectionner une image valide");
                            return;
                          }
                          
                          setUploading(true);
                          try {
                            const formData = new FormData();
                            formData.append("file", file);
                            formData.append("folder", "services");
                            
                            const response = await api.post<{ url: string }>("/api/upload", formData, {
                              headers: {
                                "Content-Type": "multipart/form-data",
                              },
                            });
                            
                            setPreviewUrl(response.url);
                            setForm({ ...form, image: response.url });
                            toast.success("Image téléchargée avec succès");
                          } catch (error) {
                            toast.error("Erreur lors du téléchargement de l\'image");
                          } finally {
                            setUploading(false);
                          }
                        }}
                      />
                      <Label htmlFor="service-image-upload" className="cursor-pointer">
                        <Button type="button" variant="outline" disabled={uploading} asChild>
                          <span>
                            <Upload className="h-4 w-4 mr-2" />
                            {uploading ? "Téléchargement..." : "Choisir une image"}
                          </span>
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                  <Label className="flex items-center gap-1"><Star className="h-4 w-4" /> Mis en avant</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                  <Label>Publié</Label>
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
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
                <TableHead>Ordre</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((s) => (
                <TableRow key={s.id}>
                  <TableCell className="text-muted-foreground text-sm w-12">{s.sort_order}</TableCell>
                  <TableCell>
                    <div className="font-medium">{s.name}</div>
                    {s.badge && <Badge variant="secondary" className="mt-1 text-xs">{s.badge}</Badge>}
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm font-mono">{s.slug}</TableCell>
                  <TableCell className="text-sm text-accent font-medium">{s.price_from || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {s.featured && <Badge className="bg-accent text-accent-foreground text-xs">Vedette</Badge>}
                      <Badge variant={s.published ? "default" : "secondary"} className="text-xs">
                        {s.published ? "Publié" : "Masqué"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title={s.published ? "Masquer" : "Publier"} onClick={() => togglePublished(s)}>
                        {s.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(s)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(s.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Aucun service</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
