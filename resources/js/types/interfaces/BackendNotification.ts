export interface BackendNotification {
	type: "default" | "destructive";
	message: string;
}