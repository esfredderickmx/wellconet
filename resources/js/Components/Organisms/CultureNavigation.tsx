import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/Components/ui/sidebar";
import { SimpleNavigationItem } from "@/Components/Molecules/SimpleNavigationItem";
import { NavigationItem } from "@/types/interfaces/NavigationItem";

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
