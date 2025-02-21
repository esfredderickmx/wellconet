import { LucideIcon } from "lucide-react";
import { Icon } from "@phosphor-icons/react";
import { Button } from "@/Components/ui/button";
import { Card } from "@/Components/ui/card";

interface EmptyStateProps {
	icon: Icon | LucideIcon;
	header: string;
	description?: string;
	action?: {
		label: string
		onClick: () => void
	};
	variant: "table" | "cards" | "list";
}

export function EmptyState({icon: Icon, header, description, action, variant}: EmptyStateProps) {
	const renderContent = () => (
		<>
			<Icon className="w-16 h-16 mb-4 text-muted-foreground"/>
			<h3 className="text-lg font-semibold">{header}</h3>
			{description && <p className="text-sm text-muted-foreground mt-2 max-w-sm text-center">{description}</p>}
			{action && (
				<Button onClick={action.onClick} className="mt-4">
					{action.label}
				</Button>
			)}
		</>
	);

	switch (variant) {
		case "table":
			return (
				<div className="flex flex-col items-center justify-center h-[400px] border-2 border-dashed rounded-lg bg-muted/50">
					{renderContent()}
				</div>
			);
		case "cards":
			return (
				<Card className="flex flex-col items-center justify-center p-8 h-[300px] bg-linear-to-br from-muted to-muted/30">
					{renderContent()}
				</Card>
			);
		case "list":
			return (
				<div className="flex items-center justify-center h-[200px] border-2 border-dotted rounded-lg bg-muted/30">
					<div className="flex items-center space-x-4">
						<Icon className="w-12 h-12 text-muted-foreground"/>
						<div>
							<h3 className="font-semibold">{header}</h3>
							{description && <p className="text-sm text-muted-foreground mt-1">{description}</p>}
							{action && (
								<Button className="mt-2" onClick={action.onClick}>
									{action.label}
								</Button>
							)}
						</div>
					</div>
				</div>
			);
	}
}