"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

import { Button } from "@/components/shadcn/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/shadcn/tooltip";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () =>
    setTheme(resolvedTheme === "dark" ? "light" : "dark");

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          <Sun className="!size-5 h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="!size-5 absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Toggle Theme</p>
      </TooltipContent>
    </Tooltip>
  );
}

export default ThemeToggle;
