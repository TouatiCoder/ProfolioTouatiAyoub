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
  badge:                z.string().max(80).optional().or(z.literal("")),
  icon:                 z.string().max(80).optional().or(z.literal("")),
  cta_label:            z.string().max(80).optional().or(z.literal("")),
  featured:             z.boolean(),
  published:            z.boolean(),
  sort_order:           z.number().int().min(0).max(999),
  imageUrl:             z.string().max(500).optional().or(z.literal("")),
});

interface Service {
  id:                   number;
  slug:                 string;
  name:                 string;
  name_ar:              string | null;
  short_description:    string;
  short_description_ar: string | null;
  badge:                string | null;
  icon:                 string | null;
  cta_label:            string | null;
  featured:             boolean;
  published:            boolean;
  sort_order:           number;
  image:                string | null;
  imageUrl:             string | null;
}

const empty: z.infer<typeof serviceSchema> = {
  slug: "",
  name: "",
  name_ar: "",
  short_description: "",
  short_description_ar: "",
  badge: "",
  icon: "",
  cta_label: "",
  featured: true,
  published: true,
  sort_order: 0,
  imageUrl: "",
};

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const data = await api.get<Service[]>("/api/admin/services");
      setServices(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchServices(); }, []);

  const resetForm = () => {
    setForm(empty);
    setEditingId(null);
    setImageFile(null);
    setPreviewUrl(null);
  };

  const handleSave = async () => {
    const parsed = serviceSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    const formData = new FormData();
    Object.entries(parsed.data).forEach(([key, value]) => {
      formData.append(key, String(value ?? ""));
    });
    if (imageFile) {
      formData.append("image", imageFile);
    }

    setSaving(true);
    try {
      if (editingId) {
        await api.uploadPut(`/api/admin/services/${editingId}`, formData);
        toast.success("Service mis à jour");
      } else {
        await api.upload("/api/admin/services", formData);
        toast.success("Service créé");
      }
      setOpen(false);
      resetForm();
      fetchServices();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setForm({
      slug: service.slug,
      name: service.name,
      name_ar: service.name_ar ?? "",
      short_description: service.short_description,
      short_description_ar: service.short_description_ar ?? "",
      badge: service.badge ?? "",
      icon: service.icon ?? "",
      cta_label: service.cta_label ?? "",
      featured: service.featured,
      published: service.published,
      sort_order: service.sort_order,
      imageUrl: service.imageUrl ?? service.image ?? "",
    });
    setImageFile(null);
    setPreviewUrl(api.asset(service.imageUrl ?? service.image));
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

  const togglePublished = async (service: Service) => {
    try {
      await api.patch(`/api/admin/services/${service.id}`, { published: !service.published });
      fetchServices();
    } catch {
      toast.error("Erreur");
    }
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Veuillez sélectionner une image JPG, PNG ou WebP");
      event.target.value = "";
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      toast.error("L'image ne doit pas dépasser 20 MB");
      event.target.value = "";
      return;
    }

    setImageFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    toast.success("Image prête à être enregistrée");
    event.target.value = "";
  };

  const clearImage = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setForm({ ...form, imageUrl: "" });
  };

  const f = (key: keyof typeof form) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: event.target.value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Services</h1>
        <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nouveau service</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
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
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(event) => setForm({ ...form, sort_order: Number(event.target.value) })}
                  />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Badge</Label>
                  <Input value={form.badge} onChange={f("badge")} placeholder="Best seller" />
                </div>
                <div className="space-y-2">
                  <Label>Icone (Lucide)</Label>
                  <Input value={form.icon} onChange={f("icon")} placeholder="Globe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Libelle CTA</Label>
                <Input value={form.cta_label} onChange={f("cta_label")} placeholder="Demander un devis" />
              </div>

              <div className="space-y-2">
                <Label>Image du service</Label>
                {previewUrl ? (
                  <div className="group relative">
                    <img src={previewUrl} alt="Apercu du service" className="h-48 w-full rounded-lg border object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={clearImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="rounded-lg border-2 border-dashed p-8 text-center transition-colors hover:border-accent/50">
                    <ImageIcon className="mx-auto mb-2 h-12 w-12 text-muted-foreground" />
                    <p className="mb-4 text-sm text-muted-foreground">JPG, PNG ou WebP. Taille maximale 20 MB.</p>
                    <Input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      id="service-image-upload"
                      onChange={handleImageSelect}
                    />
                    <Label htmlFor="service-image-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Choisir une image
                        </span>
                      </Button>
                    </Label>
                  </div>
                )}
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={form.featured} onCheckedChange={(value) => setForm({ ...form, featured: value })} />
                  <Label className="flex items-center gap-1"><Star className="h-4 w-4" /> Mis en avant</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.published} onCheckedChange={(value) => setForm({ ...form, published: value })} />
                  <Label>Publie</Label>
                </div>
              </div>

              <Button onClick={handleSave} disabled={saving} className="w-full">
                {saving && imageFile ? "Enregistrement avec image..." : saving ? "Enregistrement..." : editingId ? "Mettre à jour" : "Créer"}
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
                <TableHead>Image</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => {
                const serviceImage = service.imageUrl ?? service.image;

                return (
                  <TableRow key={service.id}>
                    <TableCell className="w-12 text-sm text-muted-foreground">{service.sort_order}</TableCell>
                    <TableCell className="w-20">
                      {serviceImage ? (
                        <img
                          src={api.asset(serviceImage) ?? undefined}
                          alt=""
                          className="h-10 w-16 rounded border object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex h-10 w-16 items-center justify-center rounded border bg-muted text-muted-foreground">
                          <ImageIcon className="h-4 w-4" />
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">{service.name}</div>
                      {service.badge && <Badge variant="secondary" className="mt-1 text-xs">{service.badge}</Badge>}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">{service.slug}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        {service.featured && <Badge className="bg-accent text-accent-foreground text-xs">Vedette</Badge>}
                        <Badge variant={service.published ? "default" : "secondary"} className="text-xs">
                          {service.published ? "Publie" : "Masque"}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" title={service.published ? "Masquer" : "Publier"} onClick={() => togglePublished(service)}>
                          {service.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(service)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(service.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
              {services.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">Aucun service</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
