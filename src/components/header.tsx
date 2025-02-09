import Link from "next/link";
import { SquarePen } from "lucide-react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/shadcn/tooltip";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/shadcn/button";
import { SidebarTrigger } from "@/components/shadcn/sidebar";

function Header() {
  return (
    <header className="sticky top-0 bg-white dark:bg-zinc-950 z-20 flex gap-3 items-center h-[var(--header-height)]">
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger />
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle Sidebar</p>
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="ghost" asChild>
            <Link href="/">
              <SquarePen className="!size-5" />
            </Link>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>New Review</p>
        </TooltipContent>
      </Tooltip>

      <div className="ml-auto">
        <ThemeToggle />
      </div>
    </header>
  );
}

export default Header;
