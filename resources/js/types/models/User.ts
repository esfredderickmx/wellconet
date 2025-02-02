export interface User {
	name: string;
	email: string;
	job_position: string;
	picture: string;
	is_profile_complete: boolean;
	email_verified_at: string | null;
	department: {
		name: string;
	} | null;
	office: {
		name: string;
	} | null;
}