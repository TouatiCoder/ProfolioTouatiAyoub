import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { exportToCSV, logActivity } from "@/lib/admin-helpers";
import { format } from "date-fns";

type LeadStatus = "new" | "contacted" | "closed";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  service: string | null;
  message: string | null;
  source: string | null;
  status: LeadStatus;
  created_at: string;
}

const statusColors: Record<LeadStatus, string> = {
  new: "bg-green-500/10 text-green-700 border-green-200",
  contacted: "bg-blue-500/10 text-blue-700 border-blue-200",
  closed: "bg-muted text-muted-foreground border-border",
};

export default function AdminLeads() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    setLoading(true);
    let query = supabase.from("leads").select("*").order("created_at", { ascending: false });
    if (statusFilter !== "all") query = query.eq("status", statusFilter as "new" | "contacted" | "closed");
    if (search) query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    const { data } = await query;
    setLeads((data as Lead[]) ?? []);
    setLoading(false);
  };

  useEffect(() => { fetchLeads(); }, [statusFilter, search]);

  const updateStatus = async (id: string, status: LeadStatus) => {
    await supabase.from("leads").update({ status }).eq("id", id);
    await logActivity("update_lead_status", "lead", id, { status });
    toast.success("Statut mis à jour");
    fetchLeads();
  };

  const deleteLead = async (id: string) => {
    await supabase.from("leads").delete().eq("id", id);
    await logActivity("delete_lead", "lead", id);
    toast.success("Lead supprimé");
    fetchLeads();
  };

  const handleExport = () => {
    exportToCSV(leads as any[], `leads-${format(new Date(), "yyyy-MM-dd")}`);
    logActivity("export_leads", "leads");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">Gestion des Leads</h1>
        <Button onClick={handleExport} variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" /> Exporter CSV
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher par nom ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous</SelectItem>
                <SelectItem value="new">Nouveau</SelectItem>
                <SelectItem value="contacted">Contacté</SelectItem>
                <SelectItem value="closed">Fermé</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nom</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Téléphone</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead.id}>
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || "—"}</TableCell>
                    <TableCell>{lead.service || "—"}</TableCell>
                    <TableCell>
                      <Select value={lead.status} onValueChange={(v) => updateStatus(lead.id, v as LeadStatus)}>
                        <SelectTrigger className="h-8 w-[120px]">
                          <Badge variant="outline" className={statusColors[lead.status]}>
                            {lead.status}
                          </Badge>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">Nouveau</SelectItem>
                          <SelectItem value="contacted">Contacté</SelectItem>
                          <SelectItem value="closed">Fermé</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(lead.created_at), "dd/MM/yyyy")}
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteLead(lead.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {!loading && leads.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                      Aucun lead trouvé
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
