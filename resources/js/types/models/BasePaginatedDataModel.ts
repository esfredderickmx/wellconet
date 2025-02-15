import { PaginationLinkModel } from "@/types/models/PaginationLinkModel";

export interface BasePaginatedDataModel<T> {
	data: T[];
	path: string;
	current_page: number;
	from: number;
	to: number;
	per_page: number;
	total: number;
	last_page: number;
	first_page_url: string;
	last_page_url: string;
	prev_page_url: string | null;
	next_page_url: string | null;
	links: PaginationLinkModel[];
}