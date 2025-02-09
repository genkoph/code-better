import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/shadcn/sidebar";
import SidebarSubmissions from "@/components/sidebar-submissions";

async function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Link
          href="/"
          className="text-lg self-start w-auto font-medium mx-4 my-3.5 mb-0"
        >
          Code Better
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarSubmissions />
      </SidebarContent>
    </Sidebar>
  );
}

export default AppSidebar;
