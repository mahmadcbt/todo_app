import { TaskStatsProps } from "@/types";

export function TaskStats({ total, completed }: TaskStatsProps) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-800">
      <div className="text-[#2B7FDC]">
        Tasks{" "}
        <span className="ml-1 text-sm bg-[#1A1A1A] px-2 py-1 rounded">
          {total}
        </span>
      </div>
      <div className="text-[#5856D6]">
        Completed{" "}
        <span className="ml-1 text-sm bg-[#1A1A1A] px-2 py-1 rounded">
          {completed} of {total}
        </span>
      </div>
    </div>
  );
}
