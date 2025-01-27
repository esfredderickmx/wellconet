import { User } from "@/types/models/User";
import { BackendNotification } from "@/types/interfaces/BackendNotification";
import { SelectOption } from "@/types/interfaces/SelectOption";

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
	flash: {
		message: BackendNotification;
	};
	enums: {
		user_departments: SelectOption[];
		user_offices: SelectOption[];
	};
	can: {
		write_posts: boolean;
		handle_announcements: boolean;
		handle_news: boolean;
		handle_communications: boolean;
		make_courses: boolean;
	};
};
