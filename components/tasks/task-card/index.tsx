import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TaskCardProps } from "@/types";

export function TaskCard({
  title,
  completed,
  onToggle,
  onDelete,
}: TaskCardProps) {
  return (
    <div className="bg-[#1A1A1A] rounded-lg p-4 flex items-center gap-4">
      <Checkbox checked={completed} onChange={onToggle} />
      <p
        className={cn(
          "flex-1 text-sm",
          completed && "text-gray-500 line-through"
        )}
      >
        {title}
      </p>
      <Button
        variant="icon"
        onClick={onDelete}
        className="text-gray-400 hover:text-white"
      >
        <Trash2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
