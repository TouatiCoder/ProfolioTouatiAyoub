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
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const SERVICE_OPTIONS = [
  { value: "creation-site-web",         label: "Création de site web"       },
  { value: "referencement-seo",         label: "Référencement SEO"          },
  { value: "refonte-site-web",          label: "Refonte site web"           },
];

const testimonialSchema = z.object({
  client_name:  z.string().min(1).max(160),
  company:      z.string().max(160).optional().or(z.literal("")),
  company_ar:   z.string().max(160).optional().or(z.literal("")),
  quote:        z.string().min(1).max(600),
  quote_ar:     z.string().max(600).optional().or(z.literal("")),
  rating:       z.number().int().min(1).max(5),
  service_slug: z.string().max(120).optional().or(z.literal("")),
  city:         z.string().max(120).optional().or(z.literal("")),
  featured:     z.boolean(),
  published:    z.boolean(),
  sort_order:   z.number().int().min(0).max(999),
});

interface Testimonial {
  id:           number;
  client_name:  string;
  company:      string | null;
  company_ar:   string | null;
  quote:        string;
  quote_ar:     string | null;
  rating:       number;
  service_slug: string | null;
  city:         string | null;
  featured:     boolean;
  published:    boolean;
  sort_order:   number;
}

const empty: z.infer<typeof testimonialSchema> = {
  client_name: "", company: "", company_ar: "", quote: "", quote_ar: "",
  rating: 5, service_slug: "", city: "", featured: true, published: true, sort_order: 0,
};

function Stars({ n }: { n: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`h-3.5 w-3.5 ${i <= n ? "text-accent fill-accent" : "text-muted-foreground"}`} />
      ))}
    </span>
  );
}

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [open,         setOpen]         = useState(false);
  const [editingId,    setEditingId]    = useState<number | null>(null);
  const [form,         setForm]         = useState(empty);
  const [saving,       setSaving]       = useState(false);

  const fetchTestimonials = async () => {
    try {
      const data = await api.get<Testimonial[]>('/api/admin/testimonials');
      setTestimonials(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchTestimonials(); }, []);

  const resetForm = () => { setForm(empty); setEditingId(null); };

  const handleSave = async () => {
    const parsed = testimonialSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/api/admin/testimonials/${editingId}`, parsed.data);
        toast.success("Témoignage mis à jour");
      } else {
        await api.post('/api/admin/testimonials', parsed.data);
        toast.success("Témoignage créé");
      }
      setOpen(false);
      resetForm();
      fetchTestimonials();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    }
    setSaving(false);
  };

  const handleEdit = (t: Testimonial) => {
    setEditingId(t.id);
    setForm({
      client_name: t.client_name, company: t.company ?? "", company_ar: t.company_ar ?? "",
      quote: t.quote, quote_ar: t.quote_ar ?? "", rating: t.rating,
      service_slug: t.service_slug ?? "", city: t.city ?? "",
      featured: t.featured, published: t.published, sort_order: t.sort_order,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer ce témoignage ?")) return;
    try {
      await api.delete(`/api/admin/testimonials/${id}`);
      toast.success("Témoignage supprimé");
      fetchTestimonials();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  const f = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [key]: e.target.value });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Témoignages</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) resetForm(); }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Nouveau témoignage</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier le témoignage" : "Nouveau témoignage"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nom du client *</Label>
                  <Input value={form.client_name} onChange={f("client_name")} />
                </div>
                <div className="space-y-2">
                  <Label>Ville</Label>
                  <Input value={form.city} onChange={f("city")} placeholder="Casablanca" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Entreprise (FR)</Label>
                  <Input value={form.company} onChange={f("company")} />
                </div>
                <div className="space-y-2">
                  <Label>Entreprise (AR)</Label>
                  <Input value={form.company_ar} onChange={f("company_ar")} dir="rtl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Avis (FR) *</Label>
                <Textarea value={form.quote} onChange={f("quote")} rows={3} />
              </div>
              <div className="space-y-2">
                <Label>Avis (AR)</Label>
                <Textarea value={form.quote_ar} onChange={f("quote_ar")} rows={3} dir="rtl" />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Note</Label>
                  <Select value={String(form.rating)} onValueChange={(v) => setForm({ ...form, rating: Number(v) })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((n) => (
                        <SelectItem key={n} value={String(n)}>{n} étoile{n > 1 ? "s" : ""}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Service associé</Label>
                  <Select value={form.service_slug || "_none"} onValueChange={(v) => setForm({ ...form, service_slug: v === "_none" ? "" : v })}>
                    <SelectTrigger><SelectValue placeholder="Aucun" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="_none">Aucun</SelectItem>
                      {SERVICE_OPTIONS.map((o) => (
                        <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ordre</Label>
                  <Input type="number" value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
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
                <TableHead>Client</TableHead>
                <TableHead>Avis</TableHead>
                <TableHead>Note</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {testimonials.map((t) => (
                <TableRow key={t.id}>
                  <TableCell>
                    <div className="font-medium">{t.client_name}</div>
                    {t.company && <div className="text-xs text-muted-foreground">{t.company}</div>}
                    {t.city && <div className="text-xs text-muted-foreground">{t.city}</div>}
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <p className="line-clamp-2 text-sm text-muted-foreground">{t.quote}</p>
                  </TableCell>
                  <TableCell><Stars n={t.rating} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{t.service_slug || "—"}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {t.featured && <Badge className="bg-accent text-accent-foreground text-xs">Vedette</Badge>}
                      <Badge variant={t.published ? "default" : "secondary"} className="text-xs">
                        {t.published ? "Publié" : "Masqué"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
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
              {testimonials.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">Aucun témoignage</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
