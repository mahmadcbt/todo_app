import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "icon";
}

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "relative w-full rounded-lg overflow-hidden",
        variant === "primary" && [
          "h-14 text-white font-medium",
          "before:absolute before:inset-0 before:bg-[#1A1A1A]",
          "after:absolute after:inset-0 after:bg-[#2B7FDC] after:opacity-50",
          "hover:after:opacity-60 transition-all",
        ],
        variant === "icon" && "p-2 text-gray-400 hover:text-gray-300",
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
}
