import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

interface Stats {
  leads:    number;
  newLeads: number;
  posts:    number;
  projects: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ leads: 0, newLeads: 0, posts: 0, projects: 0 });

  useEffect(() => {
    api.get<Stats>('/api/admin/stats')
      .then(setStats)
      .catch(console.error);
  }, []);

  const cards = [
    { title: "Total Leads",      value: stats.leads,    icon: Users,     color: "text-blue-500"   },
    { title: "Nouveaux Leads",   value: stats.newLeads, icon: TrendingUp, color: "text-green-500" },
    { title: "Articles Blog",    value: stats.posts,    icon: FileText,  color: "text-purple-500"  },
    { title: "Projets Portfolio",value: stats.projects, icon: Briefcase, color: "text-accent"     },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-foreground">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {card.title}
                </CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{card.value}</div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
