import { PropsWithChildren } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastShower } from "@/Components/ToastShower";

export default function Simple({children}: PropsWithChildren) {
  return (
    <ThemeProvider>
      <div className="min-h-screen min-w-full flex items-center justify-center p-4">
        <main>{children}</main>
      </div>
      <ToastShower/>
    </ThemeProvider>
  );
}
