import DefaultLayout from "@/Layouts/DefaultLayout";
import { Deferred, Head, Link, router } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import { LinkSimple, MagnifyingGlass, NotePencil, PencilSimple, PencilSimpleLine, Sliders, SortAscending, SortDescending, Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import { PostModel } from "@/types/models/PostModel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { useSidebar } from "@/Components/ui/sidebar";
import { PublicationCardSkeleton } from "@/Components/Atoms/PublicationCardSkeleton";
import { EmptyState } from "@/Components/Atoms/EmptyState";
import { PaginatedDataModel } from "@/types/models/PaginatedDataModel";
import { Paginator } from "@/Components/Atoms/Paginator";
import { Input } from "@/Components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/Components/ui/tooltip";
import { useQuery } from "@/hooks/use-query";
import { useSkipFirstRender } from "@/hooks/use-skip-first-render";
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";

interface UserPostsIndexResponse {
	posts: PaginatedDataModel<PostModel>;
}

export default function Index({posts}: UserPostsIndexResponse) {
	const {open: isSidebarOpen} = useSidebar();

	const searchQuery = useQuery<string>("search", "");
	const sketchQuery = useQuery<string>("sketch_filter", "all");
	const dateQuery = useQuery<string>("date_filter", "true");

	const [showFilters, setShowFilters] = useState<boolean>(false);
	const [searchFilter, setSearchFilter] = useState<string>(searchQuery);
	const [sketchFilter, setSketchFilter] = useState<string>(sketchQuery);
	const [dateFilter, setDateFilter] = useState<string>(dateQuery);
	const debouncedSearchFilter = useDebounce(searchFilter);

	const sketchFilterOptions = [
		{label: "Mostrar solo borradores", value: "true"},
		{label: "Mostrar solo publicadas", value: "false"},
		{label: "Mostrar borradores y publicadas", value: "all"},
	];
	const dateFilterOptions = [
		{label: "Más recientes primero", value: "true"},
		{label: "Más antiguas primero", value: "false"},
	];

	const handleFilters = () => {
		const queryParams: Record<string, any> = {};

		if (debouncedSearchFilter) queryParams.search = debouncedSearchFilter;
		if (sketchFilter !== "all") queryParams.sketch_filter = sketchFilter;
		if (dateFilter !== "true") queryParams.date_filter = dateFilter;

		router.get(route("user.publications"), queryParams, {
			preserveState: true,
			replace: true,
			only: ["posts"],
		});
	};

	useSkipFirstRender(handleFilters, [debouncedSearchFilter, sketchFilter, dateFilter]);

	return (
		<>
			<Head title="Mis publicaciones"/>

			<div className={cn("flex flex-col gap-3 items-center justify-between", isSidebarOpen ? "lg:flex-row" : "md:flex-row")}>
				<Link className={cn("w-full", buttonVariants({
					variant: "default",
					size: "lg",
				}), isSidebarOpen ? "lg:w-auto" : "md:w-auto")} href={route("user.publications.new-post")}>
					<PencilSimpleLine/>
					Escribir una publicación
				</Link>

				<div className={cn("flex w-full gap-x-2 justify-end", isSidebarOpen ? "lg:basis-1/2" : "md:basis-1/2")}>
					<Input id="title" type="text" placeholder="Buscar por título..." icon={MagnifyingGlass} autoFocus containerClassName={cn("xl:basis-1/2", isSidebarOpen ? "" : "lg:basis-4/6")} value={searchFilter} onChange={event => setSearchFilter(event.target.value)}/>
					<TooltipProvider>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button className="shrink-0" size="icon" variant={showFilters ? "default" : "outline"} onClick={() => setShowFilters(!showFilters)}>
									<Sliders/>
								</Button>
							</TooltipTrigger>
							<TooltipContent side="left">Mostrar filtros avanzados</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>
			</div>

			<div className={cn("flex justify-end gap-x-2 mt-3", showFilters ? "" : "hidden", isSidebarOpen ? "lg:basis-1/2" : "md:basis-1/2")}>
				<Select value={sketchFilter} onValueChange={value => setSketchFilter(value)}>
					<SelectTrigger id="department" className={cn("w-full", isSidebarOpen ? "lg:w-auto" : "md:w-auto")}>
						<SelectValue placeholder="Filtrar por tipo de publicación..."/>
					</SelectTrigger>
					<SelectContent>
						{sketchFilterOptions && sketchFilterOptions.map((option, index) => (
							<SelectItem key={index} value={option.value}>{option.label}</SelectItem>
						))}
					</SelectContent>
				</Select>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="shrink-0" size="icon" variant={dateFilter === "true" ? "secondary" : "ghost"}>
							{dateFilter === "true" && <SortDescending/>}
							{dateFilter === "false" && <SortAscending/>}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-48" align="end">
						<DropdownMenuRadioGroup value={dateFilter} onValueChange={value => setDateFilter(value)}>
							{dateFilterOptions.map((option, index) => (
								<DropdownMenuRadioItem key={index} value={option.value}>{option.label}</DropdownMenuRadioItem>
							))}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>

			<div className="mt-6">
				{!posts || posts.data.length === 0 ? (
					<EmptyState header="Sin publicaciones" description={searchFilter ? "Sin publicaciones que mostrar. Intenta cambiar los criterios de búsqueda." : "Aún no has compartido nada con la empresa. Comienza escribiendo una publicación nueva."} icon={searchFilter ? MagnifyingGlass : NotePencil} variant="cards"/>
				) : (
					<>
						<div className={cn("grid grid-cols gap-4", isSidebarOpen ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5")}>
							<Deferred data="posts" fallback={<PublicationCardSkeleton count={4}/>}>
								<DisplayPublicationCards posts={posts.data}/>
							</Deferred>
						</div>

						<Paginator links={posts.links} propsToReload={["posts"]}/>
					</>
				)}
			</div>
		</>
	);
}

function DisplayPublicationCards({posts}: { posts: PostModel[] }) {
	return (
		<>
			{posts.map((item, index) => (
				<Card key={index} className="flex flex-col h-full">
					<CardHeader className="p-0">
						<div className="relative h-48 w-full overflow-hidden">
							<img
								src={item.picture_url ?? "/svg/placeholder.svg"}
								alt={item.title}
								className="w-full h-full object-cover rounded-t-lg"
								loading="lazy"
								draggable="false"
							/>
						</div>
					</CardHeader>
					<CardContent className="flex-grow p-4 flex flex-col">
						<div className="flex justify-between items-start gap-4 mb-2">
							<CardTitle className="text-xl font-semibold">{item.title}</CardTitle>
							<Badge variant={item.is_sketch ? "secondary" : "default"}>{item.is_sketch ? "Borrador" : "Publicada"}</Badge>
						</div>
						<CardDescription className="text-sm text-gray-600 mb-4 flex-grow">{item.description}</CardDescription>
						<p className="text-xs text-gray-400 text-right">Última actualización {formatDistanceToNow(item.updated_at, {addSuffix: true, locale: es})}</p>
					</CardContent>
					<CardFooter className="p-4 pt-0 flex items-end justify-end gap-2.5">
						<Button variant="ghost" size="sm" sidebarResponsive>
							<LinkSimple/>
							Visitar
						</Button>
						<Button variant="outline" size="sm">
							<PencilSimple/>
							Editar
						</Button>
						<Button emphasis="destructive" size="sm">
							<Trash weight="fill"/>
							Eliminar
						</Button>
					</CardFooter>
				</Card>
			))}
		</>
	);
}

Index.layout = (page: any) => <DefaultLayout children={page} header="Mis publicaciones"/>;