import { useSidebar } from "@/Components/ui/sidebar";
import { Button } from "@/Components/ui/button";
import { List } from "@phosphor-icons/react";

export function AppSidebarTrigger() {
  const {toggleSidebar} = useSidebar();

  return (
    <Button size="icon" variant="ghost" onClick={toggleSidebar}>
      <List/>
    </Button>
  );
}
