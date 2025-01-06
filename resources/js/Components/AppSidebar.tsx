import { Sidebar, SidebarContent, SidebarHeader } from "@/components/ui/sidebar";
import { Article, Broadcast, House, Megaphone, NewspaperClipping, Ranking, SealWarning, Storefront, Video } from "@phosphor-icons/react";
import { UserNavigation } from "@/Components/UserNavigation";
import { MainNavigation } from "@/Components/MainNavigation";
import { CultureNavigation } from "@/Components/CultureNavigation";
import { NavigationItem } from "@/types";

export function AppSidebar() {
  const platform_items: NavigationItem[] = [
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
        <MainNavigation items={platform_items}/>
        <CultureNavigation items={culture_items}/>
      </SidebarContent>
    </Sidebar>
  );
}
