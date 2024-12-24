"use client"
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function Input({ label, className, ...props }: InputProps) {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-[#2B7FDC] text-sm font-medium">{label}</label>
      )}
      <input
        className={cn(
          "w-full bg-[#1A1A1A] rounded-lg border border-gray-800 px-4 py-3",
          "placeholder:text-gray-500 text-white",
          "focus:outline-none focus:ring-2 focus:ring-[#2B7FDC] focus:border-transparent",
          "transition-all duration-200",
          className
        )}
        {...props}
      />
    </div>
  );
}
