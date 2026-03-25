import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "brand" | "teal"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-forest-300 disabled:pointer-events-none disabled:opacity-50 active:scale-95",
                    {
                        "bg-brand-orange-700 text-white hover:bg-brand-orange-600 shadow-lg hover:shadow-brand-orange/20": variant === "default" || variant === "brand",
                        "bg-brand-forest-700 text-white hover:bg-brand-forest-600 shadow-lg hover:shadow-brand-forest/20": variant === "teal",
                        "border-2 border-brand-white-400 bg-transparent text-brand-forest-700 hover:bg-brand-white-100 hover:border-brand-forest-300": variant === "outline",
                        "hover:bg-brand-forest-100 hover:text-brand-forest-700": variant === "ghost",
                        "text-brand-forest-700 underline-offset-4 hover:underline decoration-brand-orange-500": variant === "link",
                        "bg-red-600 text-white hover:bg-red-600/90": variant === "destructive",
                        "h-12 px-8": size === "default",
                        "h-9 px-4 text-xs": size === "sm",
                        "h-14 px-10 text-lg": size === "lg",
                        "h-10 w-10": size === "icon",
                    },
                    className
                )}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button }
