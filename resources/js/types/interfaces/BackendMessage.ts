export interface BackendMessage {
	type: "default" | "destructive";
	message: string;
}