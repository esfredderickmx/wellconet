import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { List } from "@phosphor-icons/react";

export function AppSidebarTrigger() {
  const {toggleSidebar} = useSidebar();

  return (
    <Button size="icon" variant="ghost" onClick={toggleSidebar}>
      <List/>
    </Button>
  );
}
