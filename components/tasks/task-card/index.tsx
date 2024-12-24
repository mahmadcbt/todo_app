"use client";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskCardProps } from "@/types";
import { useRouter } from "next/navigation";

export function TaskCard({
  title,
  completed,
  onToggle,
  onDelete,
  id,
}: TaskCardProps) {
  const router = useRouter();

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 flex items-center gap-4 cursor-pointer group">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0",
          completed ? "border-[#2B7FDC] bg-[#2B7FDC]" : "border-gray-600"
        )}
      >
        {completed && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M5 13l4 4L19 7"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <span
        className={cn(
          "flex-1 text-gray-100",
          completed && "line-through text-gray-500"
        )}
        onClick={(e) => router.push(`/edit/${id}`)}
      >
        {title}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        className="group-hover:opacity-100 text-gray-400 hover:text-gray-300 p-1"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}
