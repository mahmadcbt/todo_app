"use client";
import { Trash2, Loader2 } from "lucide-react";
import { cn, getColorClass } from "@/lib/utils";
import { TaskCardProps } from "@/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function TaskCard({
  title,
  color,
  completed,
  onToggle,
  onDelete,
  id,
  isLoading
}: TaskCardProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDeleting(true);
    try {
      await onDelete();
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 flex items-center gap-4 cursor-pointer group">
      <div
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={cn(
          "w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 transition-colors",
          getColorClass(color, completed)
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
        onClick={(e) => {
          e.stopPropagation();
          router.push(`/edit/${id}`);
        }}
      >
        {title}
      </span>

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="group-hover:opacity-100 text-gray-400 hover:text-gray-300 p-1 disabled:cursor-not-allowed"
      >
        {isDeleting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <Trash2 className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}
