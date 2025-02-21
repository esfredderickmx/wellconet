import * as React from "react"

import { cn } from "@/lib/utils"
import { LucideIcon } from "lucide-react";
import { Icon } from "@phosphor-icons/react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	containerClassName?: string
  icon?: LucideIcon | Icon
  iconPosition?: "left" | "right"
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ containerClassName, className, type, icon: Icon, iconPosition = "right", ...props }, ref) => {
    return (
	    <div className={cn("relative w-full", containerClassName)}>
		    <input
			    type={type}
			    className={cn(
				    "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm peer",
				    Icon && iconPosition === "left" && "pl-9",
				    Icon && iconPosition === "right" && "pr-9",
				    className,
			    )}
			    ref={ref}
			    {...props}
		    />
		    {Icon && (
			    <Icon 
				    weight="bold"
				    className={cn(
					    "absolute top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 peer-focus-visible:text-ring",
					    iconPosition === "left" && "left-3",
					    iconPosition === "right" && "right-3",
				    )}
			    />
		    )}
	    </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
