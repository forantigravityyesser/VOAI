import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "glass" | "solid" | "ghost";
  hoverEffect?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, children, variant = "glass", hoverEffect = true, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-[2.5rem] border transition-all duration-500 overflow-hidden relative",
          // Variants
          variant === "glass" && "glass-card",
          variant === "solid" && "bg-dark-800 border-white/5",
          variant === "ghost" && "bg-transparent border-transparent",
          // Hover
          hoverEffect && "glass-card-hover hover:border-accent-purple/30 shadow-2xl",
          className
        )}
        {...props}
      >
        {/* Subtle background glow for glass variant */}
        {variant === "glass" && (
          <div className="absolute top-0 right-0 w-32 h-32 bg-accent-purple/5 blur-[60px] rounded-full pointer-events-none -z-10" />
        )}
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export const CardHeader = ({ className, ...props }: CardHeaderProps) => (
  <div className={cn("p-8 pb-4 relative z-10", className)} {...props} />
);

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;
export const CardContent = ({ className, ...props }: CardContentProps) => (
  <div className={cn("p-8 pt-0 relative z-10", className)} {...props} />
);

type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;
export const CardFooter = ({ className, ...props }: CardFooterProps) => (
  <div className={cn("p-8 pt-4 flex items-center relative z-10", className)} {...props} />
);
