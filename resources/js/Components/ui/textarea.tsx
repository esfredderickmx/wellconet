import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  autoResize?: boolean
}

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  TextareaProps
>(({ className, autoResize, ...props }, ref) => {
  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)

  React.useEffect(() => {
    if (autoResize && textareaRef.current) {
      const textarea = textareaRef.current
      const adjustHeight = () => {
        textarea.style.height = "auto"
        textarea.style.height = `${textarea.scrollHeight + 2}px`
      }

      textarea.addEventListener("input", adjustHeight)

      return () => textarea.removeEventListener("input", adjustHeight)
    }
  }, [autoResize])
  
  return (
    <textarea
      className={cn(
        "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={(node) => {
        if (typeof ref === "function") {
          ref(node)
        } else if (ref) {
          ref.current = node
        }
        textareaRef.current = node
      }}
      {...props}
    />
  )
})
Textarea.displayName = "Textarea"

export { Textarea }
