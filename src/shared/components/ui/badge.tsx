import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "success" | "warning" | "destructive" | "info" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  const variants = {
    default: "bg-dark-700 text-dark-200 border-white/5",
    success: "bg-accent-green/10 text-accent-green border-accent-green/20",
    warning: "bg-accent-orange/10 text-accent-orange border-accent-orange/20",
    destructive: "bg-accent-red/10 text-accent-red border-accent-red/20",
    info: "bg-accent-blue/10 text-accent-blue border-accent-blue/20",
    outline: "bg-transparent text-white border-white/20",
  };

  return (
    <div
      className={cn(
        "px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-tighter border inline-flex items-center justify-center transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};
