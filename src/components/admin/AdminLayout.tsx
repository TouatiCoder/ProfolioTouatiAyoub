import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 flex items-center border-b bg-background px-4 gap-4 sticky top-0 z-20">
            <SidebarTrigger className="ml-0" />
            <h2 className="text-sm font-medium text-muted-foreground truncate">
              Tableau de bord — Ayoub Touati
            </h2>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
