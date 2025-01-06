import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { NavigationItem } from "@/types";
import { SimpleNavigationItem } from "@/Components/SimpleNavigationItem";

export function CultureNavigation({items}: { items: NavigationItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Cultura</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SimpleNavigationItem key={item.title} item={item}/>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
