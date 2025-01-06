import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { NavigationItem } from "@/types";
import { CollapsibleNavigationItem } from "@/Components/CollapsibleNavigationItem";
import { SimpleNavigationItem } from "@/Components/SimpleNavigationItem";

export function MainNavigation({items}: { items: NavigationItem[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Plataforma</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => item.items ? (
            <CollapsibleNavigationItem key={item.title} item={item}/>
          ) : (
            <SimpleNavigationItem key={item.title} item={item}/>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
