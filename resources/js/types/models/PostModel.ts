import { BaseModel } from "@/types/models/BaseModel";
import { UserModel } from "@/types/models/UserModel";

export interface PostModel extends BaseModel{
	title: string;
	description: string;
	body: string;
	picture_url: string;
	is_sketch: boolean;
	user: UserModel
}