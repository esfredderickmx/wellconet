import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavigationItem } from "@/types";
import { Link } from "@inertiajs/react";

export function SimpleNavigationItem({item}: { item: NavigationItem }) {
  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton tooltip={item.title} asChild isActive={item.isActive}>
        <Link href={item.url}>
          {item.icon && <item.icon/>}
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
