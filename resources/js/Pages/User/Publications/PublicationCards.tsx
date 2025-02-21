import { PostModel } from "@/types/models/PostModel";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { Button } from "@/Components/ui/button";
import { LinkSimple, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";

export function PublicationCards({posts}: { posts: PostModel[] }) {
	return (
		<>
			{posts.map((item, index) => (
				<Card key={index} className="flex flex-col h-full">
					<CardHeader className="p-2.5 pb-1">
						<div className="relative h-48 w-full overflow-hidden">
							<img
								src={item.picture_url ?? "/svg/placeholder.svg"}
								alt={item.title}
								className="w-full h-full object-cover rounded-md"
								loading="lazy"
								draggable="false"
							/>
						</div>
					</CardHeader>
					<CardContent className="flex-grow p-4 flex flex-col">
						<div className="flex justify-between items-start gap-4 mb-2">
							<CardTitle className="text-xl font-semibold line-clamp-2">{item.title}</CardTitle>
							<Badge variant={item.is_sketch ? "secondary" : "default"}>{item.is_sketch ? "Borrador" : "Publicada"}</Badge>
						</div>
						<CardDescription className="text-sm text-muted-foreground flex-grow mb-4">
							<p className="line-clamp-3">{item.description}</p>
						</CardDescription>
						<p className="text-xs text-muted-foreground text-right">
							Última actualización {formatDistanceToNow(item.updated_at, {addSuffix: true, locale: es})}
						</p>
					</CardContent>
					<CardFooter className="p-4 pt-0 flex items-end justify-end gap-2.5">
						<Button variant="ghost" size="sm" sidebarResponsive>
							<LinkSimple/>
							Ver
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