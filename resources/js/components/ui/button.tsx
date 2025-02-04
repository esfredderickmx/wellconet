import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/Components/ui/sidebar";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow hover:bg-primary/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
				outline:
					"border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default: "h-9 px-4 py-2",
				sm: "h-8 rounded-md px-3 text-xs",
				lg: "h-10 rounded-md px-8",
				icon: "h-9 w-9",
			},
			responsive: {
				true: "lg:px-4 lg:py-2 lg:w-auto w-9",
			},
			sidebarResponsive: {
				true: "transition-all duration-200",
			},
		},
		compoundVariants: [
			{
				responsive: true,
				size: "sm",
				class: "lg:px-3",
			},
			{
				responsive: true,
				size: "lg",
				class: "lg:px-8",
			},
		],
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	responsive?: boolean;
	sidebarResponsive?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({className, variant, size, responsive, sidebarResponsive, asChild = false, children, ...props}, ref) => {
		const Comp = asChild ? Slot : "button";
		const {state, isMobile} = sidebarResponsive ? useSidebar() : {};
		const isCollapsed = state === "collapsed" || isMobile;

		const sidebarResponsiveClasses = sidebarResponsive
			? isCollapsed
				? ""
				: size === "sm"
					? "w-8 px-0"
					: size === "lg"
						? "w-10 px-0"
						: "w-9 px-0"
			: "";

		return (
			<Comp
				className={cn(
					buttonVariants({variant, size, responsive, sidebarResponsive}),
					sidebarResponsiveClasses,
					className,
				)}
				ref={ref}
				{...props}
			>
				{sidebarResponsive ? (
					<>
						<span className={isCollapsed ? "hidden" : ""}>{React.Children.toArray(children)[0]}</span>
						<span className={isCollapsed ? "inline-flex items-center gap-2" : "hidden"}>{children}</span>
					</>
				) : responsive ? (
					<>
						<span className="lg:hidden">{React.Children.toArray(children)[0]}</span>
						<span className="hidden lg:inline-flex lg:items-center lg:gap-2">{children}</span>
					</>
				) : (
					children
				)}
			</Comp>
		);
	},
);
Button.displayName = "Button";

export { Button, buttonVariants };
