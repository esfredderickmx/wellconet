export interface BackendNotification {
	type?: "default" | "success" | "info" | "warning" | "error";
	duration?: number;
	message: string;
	description?: string;
}