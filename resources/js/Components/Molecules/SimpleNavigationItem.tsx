import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { NavigationItem } from "@/types/interfaces/NavigationItem";

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
