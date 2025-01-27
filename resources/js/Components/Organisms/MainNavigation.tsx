import { SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu } from "@/components/ui/sidebar";
import { CollapsibleNavigationItem } from "@/Components/Molecules/CollapsibleNavigationItem";
import { SimpleNavigationItem } from "@/Components/Molecules/SimpleNavigationItem";
import { NavigationItem } from "@/types/interfaces/NavigationItem";

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
