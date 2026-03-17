import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-helpers";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  results: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
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

const emptyProject = { title: "", description: "", results: "", image_url: "", service_type: "", client_name: "", live_url: "", featured: false };

export default function AdminPortfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyProject);

  const fetchProjects = async () => {
    const { data } = await supabase.from("projects").select("*").order("created_at", { ascending: false });
    setProjects((data as Project[]) ?? []);
  };

  useEffect(() => { fetchProjects(); }, []);

  const handleSave = async () => {
    const parsed = projectSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }
    const payload = {
      ...parsed.data,
      image_url: parsed.data.image_url || null,
      live_url: parsed.data.live_url || null,
    };

    if (editingId) {
      await supabase.from("projects").update(payload).eq("id", editingId);
      await logActivity("update_project", "project", editingId);
      toast.success("Projet mis à jour");
    } else {
      await supabase.from("projects").insert([payload]);
      await logActivity("create_project", "project");
      toast.success("Projet créé");
    }
    setOpen(false);
    setEditingId(null);
    setForm(emptyProject);
    fetchProjects();
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id);
    setForm({
      title: project.title,
      description: project.description ?? "",
      results: project.results ?? "",
      image_url: project.image_url ?? "",
      service_type: project.service_type ?? "",
      client_name: project.client_name ?? "",
      live_url: project.live_url ?? "",
      featured: project.featured,
    });
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
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditingId(null); setForm(emptyProject); } }}>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>URL Image</Label>
                  <Input value={form.image_url} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>URL Live</Label>
                  <Input value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Type de service</Label>
                <Input value={form.service_type} onChange={(e) => setForm({ ...form, service_type: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.featured} onCheckedChange={(v) => setForm({ ...form, featured: v })} />
                <Label>Projet vedette</Label>
              </div>
              <Button onClick={handleSave} className="w-full">
                {editingId ? "Mettre à jour" : "Créer"}
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
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell>{project.client_name || "—"}</TableCell>
                  <TableCell>{project.service_type || "—"}</TableCell>
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
