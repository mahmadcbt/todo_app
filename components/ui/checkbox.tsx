"use client"
import { cn } from "@/lib/utils";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  checked?: boolean;
}

export function Checkbox({ checked, className, ...props }: CheckboxProps) {
  return (
    <div className="relative inline-flex items-center">
      <input
        type="checkbox"
        className={cn(
          "peer w-5 h-5 appearance-none rounded-full border-2 border-gray-600",
          "checked:bg-[#2B7FDC] checked:border-[#2B7FDC]",
          "transition-all duration-200",
          className
        )}
        checked={checked}
        {...props}
      />
      <svg
        className="absolute left-1 top-1 h-3 w-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
        fill="none"
        strokeWidth="2"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}