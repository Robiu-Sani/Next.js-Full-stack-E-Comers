import { AppSidebar } from "@/components/app-sidebar";
import DashboardHeader from "@/components/dashboard-header";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="w-full fixed h-screen z-[501]">
      <AppSidebar />
      <SidebarInset>
        <DashboardHeader />
        <div className="flex mt-12  flex-1 flex-col gap-4 p-4 pt-0 overflow-y-auto h-screen">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
