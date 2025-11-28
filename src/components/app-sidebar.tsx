"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import { data } from "@/app/data/nav-data";
import useContextData from "@/defaults/custom-component/useContextData";
import { usePathname, useRouter } from "next/navigation";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { UserData } = useContextData();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!UserData) {
      router.push("/");
      return;
    }

    const role = UserData.role;

    if (role === "user") {
      // allow: /profile, /profile/anything
      if (!pathname.startsWith("/profile")) {
        router.push("/profile");
      }
    } else {
      // allow: /dashboard, /dashboard/anything
      if (!pathname.startsWith("/dashboard")) {
        router.push("/dashboard");
      }
    }
  }, [UserData, pathname, router]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
