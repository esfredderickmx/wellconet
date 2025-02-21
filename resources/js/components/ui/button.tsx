import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { useSidebar } from "@/Components/ui/sidebar";

const buttonVariants = cva(
	"inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
				outline:
					"border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
				secondary:
					"bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
				ghost: "hover:bg-accent hover:text-accent-foreground",
				link: "text-primary underline-offset-4 hover:underline",
			},
			emphasis: {
				affirmative:
					"bg-affirmative text-affirmative-foreground shadow-xs hover:bg-affirmative/90",
				informative:
					"bg-informative text-informative-foreground shadow-xs hover:bg-informative/90",
				preventive:
					"bg-preventive text-preventive-foreground shadow-xs hover:bg-preventive/90",
				destructive:
					"bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90",
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
				variant: "outline",
				emphasis: ["affirmative", "informative", "preventive", "destructive"],
				class: "bg-transparent text-foreground hover:text-accent-foreground",
			},
			{
				variant: "outline",
				emphasis: "affirmative",
				class: "border-affirmative/50 hover:bg-affirmative/20",
			},
			{
				variant: "outline",
				emphasis: "informative",
				class: "border-informative/50 hover:bg-informative/20",
			},
			{
				variant: "outline",
				emphasis: "preventive",
				class: "border-preventive/50 hover:bg-preventive/20",
			},
			{
				variant: "outline",
				emphasis: "destructive",
				class: "border-destructive/50 hover:bg-destructive/20",
			},
			{
				variant: "ghost",
				emphasis: ["affirmative", "informative", "preventive", "destructive"],
				class: "bg-transparent text-foreground shadow-none",
			},
			{
				variant: "ghost",
				emphasis: "affirmative",
				class: "hover:bg-affirmative/20",
			},
			{
				variant: "ghost",
				emphasis: "informative",
				class: "hover:bg-informative/20",
			},
			{
				variant: "ghost",
				emphasis: "preventive",
				class: "hover:bg-preventive/20",
			},
			{
				variant: "ghost",
				emphasis: "destructive",
				class: "hover:bg-destructive/20",
			},
			{
				variant: "link",
				emphasis: ["affirmative", "informative", "preventive", "destructive"],
				class: "bg-transparent shadow-none",
			},
			{
				variant: "link",
				emphasis: "affirmative",
				class: "text-affirmative hover:bg-transparent",
			},
			{
				variant: "link",
				emphasis: "informative",
				class: "text-informative hover:bg-transparent",
			},
			{
				variant: "link",
				emphasis: "preventive",
				class: "text-preventive hover:bg-transparent",
			},
			{
				variant: "link",
				emphasis: "destructive",
				class: "text-destructive hover:bg-transparent",
			},
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
	({className, variant, emphasis, size, responsive, sidebarResponsive, asChild = false, children, ...props}, ref) => {
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
					buttonVariants({variant, emphasis, size, responsive, sidebarResponsive}),
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
