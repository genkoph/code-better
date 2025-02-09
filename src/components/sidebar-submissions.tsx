"use client";

import useSWR from "swr";
import Link from "next/link";
import { useEffect } from "react";
import { Submission } from "@prisma/client";
import { usePathname } from "next/navigation";

import { fetcher } from "@/lib/utils";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar";
import { Skeleton } from "@/components/shadcn/skeleton";

function SidebarSubmissions() {
  const pathname = usePathname();
  const {
    data: submissions,
    isLoading,
    mutate,
  } = useSWR<Pick<Submission, "id" | "code">[]>("/api/history", fetcher);

  useEffect(() => {
    mutate();
  }, [pathname, mutate]);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Submissions</SidebarGroupLabel>

      <SidebarGroupContent>
        {isLoading && (
          <div className="px-2 space-y-4 py-3">
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
            <Skeleton className="w-2/3 h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-1/4 h-4" />
          </div>
        )}

        {!isLoading && !submissions?.length && (
          <span className="text-zinc-500 text-sm px-2 mt-2 inline-block">
            No submissions yet
          </span>
        )}

        {submissions && (
          <SidebarMenu>
            {submissions.map((submission) => (
              <SidebarMenuItem key={submission.id}>
                <SidebarMenuButton asChild>
                  <Link href={`/review/${submission.id}`}>
                    <span>{submission.code}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export default SidebarSubmissions;
