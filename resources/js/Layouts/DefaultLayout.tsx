import { PropsWithChildren, ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/Components/Templates/AppSidebar";
import { AppSidebarTrigger } from "@/Components/Atoms/AppSidebarTrigger";
import { Separator } from "@/components/ui/separator";
import { ThemeSelector } from "@/Components/Atoms/ThemeSelector";
import { ToastShower } from "@/Components/Atoms/ToastShower";
import { CompleteProfileModal } from "@/Components/Templates/CompleteProfileModal";
import { SonnerShower } from "@/Components/Atoms/SonnerShower";

export default function Default({header, children}: PropsWithChildren<{ header?: ReactNode }>) {
  const defaultOpen = getCookie("sidebar:state") === "true";

  function getCookie(name: string): string | undefined {
    const match = document.cookie
      .split("; ")
      .find((cookie) => cookie.startsWith(`${name}=`));
    return match ? decodeURIComponent(match.split("=")[1]) : undefined;
  }

  return (
    <ThemeProvider>
      <SidebarProvider defaultOpen={defaultOpen}>
        <AppSidebar/>
        <SidebarInset>
          <header className="sticky top-0 flex h-14 shrink-0 items-center justify-between gap-4 bg-background border-b z-50 px-3">
            <div className="flex flex-1 items-center gap-2">
              <AppSidebarTrigger/>
              <Separator orientation="vertical" className="mr-2 h-4"/>
              <div className="grid">
                <h1 className="truncate font-bold">{header}</h1>
              </div>
            </div>
            <ThemeSelector/>
          </header>
          <main className="flex flex-1 gap-4 p-4">
            <div className="w-full">{children}</div>
          </main>
          <CompleteProfileModal/>
        </SidebarInset>
      </SidebarProvider>
      <ToastShower/>
      <SonnerShower/>
    </ThemeProvider>
  );
}
