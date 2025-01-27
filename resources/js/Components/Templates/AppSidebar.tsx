import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { UserNavigation } from "@/Components/Organisms/UserNavigation";
import { MainNavigation } from "@/Components/Organisms/MainNavigation";
import { CultureNavigation } from "@/Components/Organisms/CultureNavigation";
import { Article, Broadcast, House, Megaphone, NewspaperClipping, Ranking, SealWarning, Storefront, Video } from "@phosphor-icons/react";
import { NavigationItem } from "@/types/interfaces/NavigationItem";

export function AppSidebar() {
	const main_items: NavigationItem[] = [
		{
			title: "Inicio",
			url: route("home"),
			icon: House,
			isActive: route().current("home"),
		},
		{
			title: "Anuncios",
			url: route("announcements"),
			icon: SealWarning,
			isActive: route().current("announcements"),
		},
		{
			title: "Noticias",
			url: route("news"),
			icon: NewspaperClipping,
			isActive: route().current("news"),
		},
		{
			title: "Comunicaciones",
			url: route("communications"),
			icon: Megaphone,
			isActive: route().current("communications"),
		},
		{
			title: "Publicaciones",
			url: "#",
			icon: Article,
			items: [
				{
					title: "Calidad",
					url: "#",
				},
				{
					title: "Clasificación",
					url: "#",
				},
				{
					title: "Cobranza",
					url: "#",
				},
				{
					title: "Compras",
					url: "#",
				},
				{
					title: "Contabilidad",
					url: "#",
				},
				{
					title: "C.R.E.A.",
					url: "#",
				},
				{
					title: "Desarrollo humano",
					url: "#",
				},
				{
					title: "Facturación",
					url: "#",
				},
				{
					title: "Finanzas",
					url: "#",
				},
				{
					title: "Legal",
					url: "#",
				},
				{
					title: "Nóminas",
					url: "#",
				},
				{
					title: "Operación aduanera",
					url: "#",
				},
				{
					title: "Servicio al cliente",
					url: "#",
				},
				{
					title: "Servicios administrativos",
					url: "#",
				},
				{
					title: "T.I.",
					url: "#",
				},
				{
					title: "Transformación digital",
					url: "#",
				},
				{
					title: "Ventas",
					url: "#",
				},
			],
		},
		{
			title: "Cursos",
			url: route("courses"),
			icon: Video,
			isActive: route().current("courses"),
		},
	];

	const culture_items: NavigationItem[] = [
		{
			title: "Campañas",
			url: route("campaigns"),
			icon: Broadcast,
			isActive: route().current("campaigns"),
		},
		{
			title: "Canje de puntos",
			url: route("store"),
			icon: Storefront,
			isActive: route().current("store"),
		},
		{
			title: "Clasificatoria",
			url: route("ranking"),
			icon: Ranking,
			isActive: route().current("ranking"),
		},
	];
	
	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<UserNavigation/>
			</SidebarHeader>
			<SidebarContent>
				<MainNavigation items={main_items}/>
				<CultureNavigation items={culture_items}/>
			</SidebarContent>
		</Sidebar>
	);
}
