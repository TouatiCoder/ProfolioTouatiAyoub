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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { logActivity } from "@/lib/admin-helpers";
import { format } from "date-fns";
import { z } from "zod";

const postSchema = z.object({
  title:            z.string().min(1).max(200),
  slug:             z.string().min(1).max(200),
  content:          z.string().optional(),
  excerpt:          z.string().max(500).optional(),
  meta_title:       z.string().max(70).optional(),
  meta_description: z.string().max(160).optional(),
  published:        z.boolean(),
});

interface BlogPost {
  id:               number;
  title:            string;
  slug:             string;
  content:          string | null;
  excerpt:          string | null;
  meta_title:       string | null;
  meta_description: string | null;
  published:        boolean;
  created_at:       string;
}

const emptyPost = { title: "", slug: "", content: "", excerpt: "", meta_title: "", meta_description: "", published: false };

export default function AdminBlog() {
  const [posts,     setPosts]     = useState<BlogPost[]>([]);
  const [open,      setOpen]      = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form,      setForm]      = useState(emptyPost);

  const fetchPosts = async () => {
    try {
      const data = await api.get<BlogPost[]>('/api/admin/blog');
      setPosts(data);
    } catch {
      toast.error("Erreur lors du chargement");
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const generateSlug = (title: string) =>
    title.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const handleSave = async () => {
    const parsed = postSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.errors[0].message);
      return;
    }

    const d = parsed.data;
    const payload = {
      title:            d.title,
      slug:             d.slug,
      content:          d.content || null,
      excerpt:          d.excerpt || null,
      meta_title:       d.meta_title || null,
      meta_description: d.meta_description || null,
      published:        d.published,
    };

    try {
      if (editingId) {
        await api.put(`/api/admin/blog/${editingId}`, payload);
        await logActivity("update_blog_post", "blog_post", String(editingId));
        toast.success("Article mis à jour");
      } else {
        await api.post('/api/admin/blog', payload);
        await logActivity("create_blog_post", "blog_post");
        toast.success("Article créé");
      }
      setOpen(false);
      setEditingId(null);
      setForm(emptyPost);
      fetchPosts();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Erreur serveur");
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setForm({
      title:            post.title,
      slug:             post.slug,
      content:          post.content ?? "",
      excerpt:          post.excerpt ?? "",
      meta_title:       post.meta_title ?? "",
      meta_description: post.meta_description ?? "",
      published:        post.published,
    });
    setOpen(true);
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/api/admin/blog/${id}`);
      await logActivity("delete_blog_post", "blog_post", String(id));
      toast.success("Article supprimé");
      fetchPosts();
    } catch {
      toast.error("Erreur lors de la suppression");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Blog CMS</h1>
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) { setEditingId(null); setForm(emptyPost); } }}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" /> Nouvel article</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Modifier l'article" : "Nouvel article"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Titre</Label>
                <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value, slug: generateSlug(e.target.value) })} />
              </div>
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Extrait</Label>
                <Textarea value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} rows={2} />
              </div>
              <div className="space-y-2">
                <Label>Contenu</Label>
                <Textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={10} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meta Title <span className="text-xs text-muted-foreground">({form.meta_title.length}/70)</span></Label>
                  <Input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} maxLength={70} />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description <span className="text-xs text-muted-foreground">({form.meta_description.length}/160)</span></Label>
                  <Input value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} maxLength={160} />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} />
                <Label>Publié</Label>
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
                <TableHead>Slug</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">/{post.slug}</TableCell>
                  <TableCell>
                    <Badge variant={post.published ? "default" : "secondary"}>
                      {post.published ? "Publié" : "Brouillon"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {format(new Date(post.created_at), "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(post)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {posts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                    Aucun article
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
