import "./globals.css";

import { type Metadata } from "next";
import ProgressBar from "nextjs-toploader";

import { Toaster } from "@/components/shadcn/sonner";
import Header from "@/components/header";
import AppSidebar from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/shadcn/tooltip";
import { SidebarInset, SidebarProvider } from "@/components/shadcn/sidebar";

export const metadata: Metadata = {
  title: "Code Better",
  description:
    "An AI-powered code review platform to improve your coding skills.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // `next-themes` injects an extra classname to the body element to avoid
      // visual flicker before hydration. Hence the `suppressHydrationWarning`
      // prop is necessary to avoid the React hydration mismatch warning.
      // https://github.com/pacocoursey/next-themes?tab=readme-ov-file#with-app
      suppressHydrationWarning
    >
      <body className="antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SidebarProvider>
              <AppSidebar />
              <SidebarInset>
                <Header />
                {children}
              </SidebarInset>
              <Toaster richColors />
            </SidebarProvider>
          </TooltipProvider>
        </ThemeProvider>
        <ProgressBar showSpinner={false} />
      </body>
    </html>
  );
}
