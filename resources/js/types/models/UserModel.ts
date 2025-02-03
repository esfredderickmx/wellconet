import { BaseDictionaryDataModel } from "@/types/models/BaseDictionaryDataModel";

export interface UserModel {
	name: string;
	email: string;
	job_position: string;
	birth_date: Date
	picture: string;
	is_profile_complete: boolean;
	email_verified_at: string;
	department: BaseDictionaryDataModel;
	office: BaseDictionaryDataModel;
}