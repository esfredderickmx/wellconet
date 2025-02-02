import { User } from "@/types/models/User";
import { BackendMessage } from "@/types/interfaces/BackendMessage";
import { BackendNotification } from "@/types/interfaces/BackendNotification";
import { BaseDictionaryData } from "@/types/models/BaseDictionaryData";

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
	dictionaries: {
		departments: BaseDictionaryData[];
		offices: BaseDictionaryData[];
	};
	can: {
		write_posts: boolean;
		handle_announcements: boolean;
		handle_news: boolean;
		handle_communications: boolean;
		make_courses: boolean;
	};
};
