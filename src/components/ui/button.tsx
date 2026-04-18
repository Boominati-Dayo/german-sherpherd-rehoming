import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "outline" | "ghost" | "link" | "destructive" | "brand" | "copper"
    size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-black uppercase tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-copper-300 disabled:pointer-events-none disabled:opacity-50 active:scale-95 hover:scale-105",
                    {
                        "bg-brand-copper-700 text-white hover:bg-brand-copper-600 hover:-translate-y-1": variant === "default" || variant === "brand" || variant === "copper",
                        "bg-brand-black-900 text-white hover:bg-brand-black-800 hover:-translate-y-1": variant === "default" && false,
                        "border-2 border-brand-black-800 bg-transparent text-brand-black-900 hover:bg-brand-black-900 hover:text-white": variant === "outline",
                        "hover:bg-brand-black-100 hover:text-brand-black-900": variant === "ghost",
                        "text-brand-black-900 underline-offset-4 hover:underline decoration-brand-copper-500": variant === "link",
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
