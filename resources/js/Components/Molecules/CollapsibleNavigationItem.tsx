import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, useSidebar } from "@/components/ui/sidebar";
import { CaretRight } from "@phosphor-icons/react";
import { NavigationItem } from "@/types/interfaces/NavigationItem";
import { useEffect, useState } from "react";

export function CollapsibleNavigationItem({item}: { item: NavigationItem }) {
	const {open: sidebarOpen, setOpen: setSidebarOpen} = useSidebar();
	const [collapsibleOpen, setCollapsibleOpen] = useState(item.isActive);

	// Cerrar el Collapsible junto con la Sidebar
	useEffect(() => {
		if (!sidebarOpen) {
			setCollapsibleOpen(false);
		}
	}, [sidebarOpen]);

	const handleCollapsibleChange = (open: boolean) => {
		setCollapsibleOpen(open);

		if (open) {
			setSidebarOpen(true);
		}
	};

	return (
		<Collapsible key={item.title} asChild open={collapsibleOpen} onOpenChange={handleCollapsibleChange} className="group/collapsible">
			<SidebarMenuItem>
				<CollapsibleTrigger asChild>
					<SidebarMenuButton tooltip={item.title}>
						{item.icon && <item.icon/>}
						<span>{item.title}</span>
						<CaretRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"/>
					</SidebarMenuButton>
				</CollapsibleTrigger>
				<CollapsibleContent>
					<SidebarMenuSub>
						{item.items?.map((subItem) => (
							<SidebarMenuSubItem key={subItem.title}>
								<SidebarMenuSubButton asChild>
									<a href={subItem.url}>
										<span>{subItem.title}</span>
									</a>
								</SidebarMenuSubButton>
							</SidebarMenuSubItem>
						))}
					</SidebarMenuSub>
				</CollapsibleContent>
			</SidebarMenuItem>
		</Collapsible>
	);
}
