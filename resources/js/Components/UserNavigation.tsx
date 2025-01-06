import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BuildingOffice, CoinVertical, DotsThreeOutlineVertical, Gear, MapPin, SignOut, TextAlignLeft, User } from "@phosphor-icons/react";
import { Link, usePage } from "@inertiajs/react";
import { NavigationItem } from "@/types";
import { useEffect, useState } from "react";

export function UserNavigation() {
  const [active, setActive] = useState(false);
  const user = usePage().props.auth.user;
  const navigation_items: NavigationItem[] = [
    {
      title: "Mis publicaciones",
      url: route("user.publications"),
      icon: TextAlignLeft,
      isActive: route().current("user.publications"),
    },
    {
      title: "Mis estadísticas",
      url: route("user.statistics"),
      icon: CoinVertical,
      isActive: route().current("user.statistics"),
    },
    {
      title: "Configuraciones",
      url: route("user.configuration"),
      icon: Gear,
      isActive: route().current("user.configuration"),
    },
  ];

  const {isMobile} = useSidebar();

  const getInitials = (name: string): string => {
    const words = name.trim().split(/\s+/); // Divide el nombre en palabras
    // Combina las iniciales
    return words.slice(0, 2) // Toma las primeras dos palabras
      .map(word => word.charAt(0).toUpperCase()) // Obtiene la inicial de cada palabra
      .join("");
  };

  useEffect(() => {
    navigation_items.forEach((item) => {
      if (item.isActive) {
        setActive(true);
      }
    });
  }, [navigation_items]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton isActive={active} size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="w-8 h-8 rounded-lg">
                <AvatarImage src={user.picture} alt={user.name}/>
                <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <p className="truncate font-semibold">{user.name}</p>
                <p className="truncate text-xs text-muted-foreground">{user.email}</p>
              </div>
              <DotsThreeOutlineVertical className="ml-auto"/>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" side={isMobile ? "bottom" : "right"} sideOffset={4} className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg">
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left">
                <Avatar className="w-8 h-8 rounded-lg">
                  <AvatarImage src={user.picture} alt={user.name}/>
                  <AvatarFallback className="rounded-lg">{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 leading-tight">
                  <span className="truncate font-semibold text-sm">{user.name}</span>
                  <span className="truncate text-xs text-muted-foreground">{user.email}</span>
                </div>
              </div>
              <div className="grid flex-1 leading-tight p-1">
                <span className="inline-flex items-center gap-1 truncate text-sm"><User/>{user.job_position}</span>
                <span className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground"><BuildingOffice/>{user.department_name}</span>
                <span className="inline-flex items-center gap-1 truncate text-xs text-muted-foreground"><MapPin/>{user.office_name}</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuGroup className="space-y-0.5">
              {navigation_items.map((item) => (
                <DropdownMenuItem key={item.title} className={item.isActive ? "!text-accent-foreground !bg-accent" : undefined} asChild>
                  <Link href={item.url}>
                    {item.icon && <item.icon/>}
                    {item.title}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator/>
            <DropdownMenuItem asChild>
              <a href={route("sign-out")}>
                <SignOut/>
                Cerrar sesión
              </a>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
