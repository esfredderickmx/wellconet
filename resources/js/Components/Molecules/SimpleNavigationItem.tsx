import { SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { Link } from "@inertiajs/react";
import { NavigationItem } from "@/types/interfaces/NavigationItem";

export function SimpleNavigationItem({item}: { item: NavigationItem }) {
	const {isMobile, setOpenMobile} = useSidebar();

	const closeOnMobile = () => {
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	return (
		<SidebarMenuItem key={item.title}>
			<SidebarMenuButton tooltip={item.title} asChild isActive={item.isActive} onClick={closeOnMobile}>
				<Link href={item.url}>
					{item.icon && <item.icon/>}
					<span>{item.title}</span>
				</Link>
			</SidebarMenuButton>
		</SidebarMenuItem>
	);
}
