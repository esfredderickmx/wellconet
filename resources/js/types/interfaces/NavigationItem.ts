import { Icon } from "@phosphor-icons/react";
import { LucideIcon } from "lucide-react";

export interface NavigationItem {
	title: string;
	url: string;
	icon?: Icon | LucideIcon,
	isActive?: boolean;
	items?: NavigationItem[]
}