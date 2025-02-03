import { UserModel } from "@/types/models/UserModel";
import { BackendMessage } from "@/types/interfaces/BackendMessage";
import { BackendNotification } from "@/types/interfaces/BackendNotification";
import { BaseDictionaryDataModel } from "@/types/models/BaseDictionaryDataModel";

export type PageProps<
	T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
	auth: {
		user: UserModel;
	};
	flash: {
		message: BackendMessage;
		notification: BackendNotification;
	};
	dictionaries: {
		departments: BaseDictionaryDataModel[];
		offices: BaseDictionaryDataModel[];
	};
	can: {
		write_posts: boolean;
		handle_announcements: boolean;
		handle_news: boolean;
		handle_communications: boolean;
		make_courses: boolean;
	};
};
