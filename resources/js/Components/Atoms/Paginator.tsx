import { PaginationLinkModel } from "@/types/models/PaginationLinkModel";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Button, buttonVariants } from "@/Components/ui/button";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

interface PaginatorProps {
	links: PaginationLinkModel[]
	propsToReload?: string[]
}

export function Paginator({links, propsToReload}: PaginatorProps) {
	if (!links || links.length <= 1) return null;

	const renderPaginationItem = (item: PaginationLinkModel) => {
		if (!item.url || item.active) {
			if (item.label.includes("&laquo;")) return (
				<Button size="icon" variant="ghost" disabled>
					<CaretLeft/>
				</Button>
			);
			if (item.label.includes("&raquo;")) return (
				<Button size="icon" variant="ghost" disabled>
					<CaretRight/>
				</Button>
			);

			return (
				<div className={buttonVariants({variant: "default", size: "icon"})}>{item.label}</div>
			);
		}

		if (item.label.includes("&laquo;")) return (<PaginationPrevious href={item.url!} preserveState={true} only={propsToReload}/>);
		if (item.label.includes("&raquo;")) return (<PaginationNext href={item.url!} preserveState={true} only={propsToReload}/>);

		return (<PaginationLink href={item.url!} preserveState={true} only={propsToReload}>{item.label}</PaginationLink>);
	};

	return (
		<Pagination className="mt-6 flex justify-end">
			<PaginationContent>
				{links.map((link, index) => (
					<PaginationItem key={index}>{renderPaginationItem(link)}</PaginationItem>
				))}
			</PaginationContent>
		</Pagination>
	);
}