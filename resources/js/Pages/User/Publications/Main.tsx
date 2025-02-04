import DefaultLayout from "@/Layouts/DefaultLayout";
import { Deferred, Head, Link } from "@inertiajs/react";
import { Button, buttonVariants } from "@/Components/ui/button";
import { Eye, NotePencil, Pen, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";
import { PostModel } from "@/types/models/PostModel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Badge } from "@/Components/ui/badge";
import { useSidebar } from "@/Components/ui/sidebar";
import { PublicationCardSkeleton } from "@/Components/Atoms/PublicationCardSkeleton";
import { EmptyState } from "@/Components/Atoms/EmptyState";

export default function Main({posts = []}: { posts: PostModel[] }) {
	const {open} = useSidebar();

	return (
		<>
			<Head title="Mis publicaciones"/>

			<Link className={buttonVariants({
				variant: "default",
				size: "lg",
			})} href={route("user.publications.new-post")}>
				<Pen/>
				Escribir una publicación
			</Link>

			<div className="mt-6">
				{!posts || posts.length === 0 ? (
					<EmptyState header="Sin publicaciones" description="Aún no has compartido nada con la empresa. Comienza escribiendo una publicación nueva." icon={NotePencil} variant="cards"/>
				) : (
					<div className={`grid grid-cols ${open ? "md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4" : "md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5"} gap-4`}>
						<Deferred data="posts" fallback={<PublicationCardSkeleton count={10}/>}>
							<DisplayPublicationCards posts={posts}/>
						</Deferred>
					</div>
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
							<Eye/>
							Ver
						</Button>
						<Button variant="outline" size="sm">
							<PencilSimple/>
							Editar
						</Button>
						<Button emphasis="destructive" size="sm">
							<Trash/>
							Eliminar
						</Button>
					</CardFooter>
				</Card>
			))}
		</>
	);
}

Main.layout = (page: any) => <DefaultLayout children={page} header="Mis publicaciones"/>;