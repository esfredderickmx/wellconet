export interface User {
	id: number;
	name: string;
	email: string;
	job_position: string;
	department_name?: string;
	office_name?: string;
	picture: string;
	is_profile_complete: boolean;
	email_verified_at?: string;
}