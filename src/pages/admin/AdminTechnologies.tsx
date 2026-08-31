import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const CATEGORY_OPTIONS = [
  { value: "frontend",       label: "Frontend" },
  { value: "backend",        label: "Backend" },
  { value: "mobile",         label: "Mobile" },
  { value: "database",       label: "Base de données" },
  { value: "cloud",          label: "Cloud" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "cms",            label: "CMS & E-commerce" },
  { value: "discipline",     label: "Discipline" },
];

const technologySchema = z.object({
  name:        z.string().min(1).max(80),
  slug:        z.string().min(1).max(80).regex(/^[a-z0-9-]+$/, "lettres minuscules, chiffres, tirets uniquement"),
  category:    z.enum(["frontend", "backend", "mobile", "database", "cloud", "infrastructure", "cms", "discipline"]),
  icon:        z.string().max(80).optional().or(z.literal("")),
  description: z.string().max(400).optional().or(z.literal("")),
  featured:    z.boolean(),
  published:   z.boolean(),
  sort_order:  z.number().int().min(0).max(999),
});

interface Technology {
  id:          number;
  name:        string;
  slug:        string;
  category:    string;
  icon:        string | null;
  description: string | null;
  featured:    boolean;
  published:   boolean;
  sort_order:  number;
}

const empty: z.infer<typeof technologySchema> = {
  name: "", slug: "", category: "frontend", icon: "", description: "",
  featured: false, published: true, sort_order: 0,
};

export default function AdminTechnologies() {
  const [items,      setItems]      = useState<Technology[]>([]);
  const [open,       setOpen]       = useState(false);
  const [editingId,  setEditingId]  = useState<number | null>(null);
  const [form,       setForm]       = useState(empty);
  const [saving,     setSaving]     = useState(false);

  const fetchItems = async () => {
    try {
      const data = await api.get<Technology[]>("/api/admin/technologies");
      setItems(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const resetForm = () => { setForm(empty); setEditingId(null); };

  const handleSave = async () => {
    const parsed = technologySchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/admin/technologies/${editingId}`, parsed.data);
        toast.success("Technologie mise à jour");
      } else {
        await api.post("/api/admin/technologies", parsed.data);
        toast.success("Technologie créée");
      }
      setOpen(false);
      resetForm();
      fetchItems();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    }
    setSaving(false);
  };

  const handleEdit = (t: Technology) => {
    setEditingId(t.id);
    setForm({
      name: t.name, slug: t.slug, category: t.category as typeof empty.category,
      icon: t.icon ?? "", description: t.description ?? "",
      featured: t.featured, published: t.published, sort_order: t.sort_order,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cette technologie ?")) return;
    try {
      await api.delete(`/api/admin/technologies/${id}`);
      toast.success("Technologie supprimée");
      fetchItems();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const togglePublished = async (t: Technology) => {
    try {
      await api.patch(`/api/admin/technologies/${t.id}`, { published: !t.published });
      fetchItems();
    } catch {
      toast.error("Erreur");
    }
  };

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Technologies</h1>
          <p className="text-sm text-muted-foreground">
            Alimente la section "Technology Stack" du site (page d'accueil et À propos).
          </p>
        </div>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Nouvelle technologie</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier la technologie" : "Nouvelle technologie"}</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom *</Label>
                  <Input value={form.name} onChange={f("name")} placeholder="AWS" />
                </div>
                <div className="space-y-2">
                  <Label>Slug * (icône simpleicons.org)</Label>
                  <Input value={form.slug} onChange={f("slug")} placeholder="amazonaws" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Catégorie *</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v as typeof empty.category })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ordre</Label>
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Description (optionnel)</Label>
                <Textarea value={form.description} onChange={f("description")} rows={2} />
              </div>

              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                  <Label className="flex items-center gap-1"><Star className="h-4 w-4" /> Mise en avant</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                  <Label>Publiée</Label>
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
                <TableHead>Catégorie</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((t) => (
                <TableRow key={t.id}>
                  <TableCell className="w-12 text-sm text-muted-foreground">{t.sort_order}</TableCell>
                  <TableCell className="font-medium">{t.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {CATEGORY_OPTIONS.find((o) => o.value === t.category)?.label ?? t.category}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {t.featured && <Badge className="bg-accent text-accent-foreground text-xs">Vedette</Badge>}
                      <Badge variant={t.published ? "default" : "secondary"} className="text-xs">
                        {t.published ? "Publiée" : "Masquée"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" title={t.published ? "Masquer" : "Publier"} onClick={() => togglePublished(t)}>
                        {t.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-muted-foreground" />}
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(t)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(t.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {items.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-muted-foreground">
                    Aucune technologie enregistrée — le site affiche la liste par défaut du code tant que cette table est vide.
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
