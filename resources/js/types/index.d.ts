import { User } from "@/types/models/User";
import { BackendMessage } from "@/types/interfaces/BackendMessage";
import { SelectOption } from "@/types/interfaces/SelectOption";
import { BackendNotification } from "@/types/interfaces/BackendNotification";

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: User;
	};
	flash: {
		message: BackendMessage;
		notification: BackendNotification;
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
