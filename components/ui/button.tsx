"use client"
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
  icon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  icon,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "w-full rounded-lg transition-all duration-200",
        variant === "primary" &&
          "bg-[#2B7FDC] hover:bg-[#2B7FDC]/90 text-white py-4 px-6 flex items-center justify-center gap-2",
        variant === "icon" && "p-2 hover:bg-gray-700/50 rounded-full",
        className
      )}
      {...props}
    >
      {icon && <span className="w-5 h-5">{icon}</span>}
      {children}
    </button>
  );
}
