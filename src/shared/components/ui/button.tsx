import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "xl" | "icon";
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-accent-purple text-white shadow-[0_0_20px_rgba(108,92,231,0.3)] hover:bg-accent-purple/90 border-transparent",
      secondary: "bg-accent-blue text-white shadow-[0_0_20px_rgba(79,156,247,0.3)] hover:bg-accent-blue/90 border-transparent",
      outline: "bg-white/5 text-white border-white/10 hover:bg-white/10",
      ghost: "bg-transparent text-dark-200 hover:text-white hover:bg-white/5 border-transparent",
      danger: "bg-accent-red/20 text-accent-red border-accent-red/20 hover:bg-accent-red/30",
      success: "bg-accent-green/20 text-accent-green border-accent-green/20 hover:bg-accent-green/30",
    };

    const sizes = {
      sm: "px-4 py-2 text-[10px]",
      md: "px-6 py-3 text-xs",
      lg: "px-8 py-4 text-sm",
      xl: "px-10 py-5 text-[11px]",
      icon: "p-2",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 rounded-2xl font-black uppercase tracking-widest transition-all duration-300 active:scale-95 border",
          variants[variant],
          sizes[size],
          (disabled || loading) && "opacity-50 cursor-not-allowed grayscale",
          className
        )}
        {...props}
      >
        {loading && (
          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
