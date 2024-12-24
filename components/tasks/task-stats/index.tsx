import { TaskStatsProps } from "@/types";

export function TaskStats({ total, completed }: TaskStatsProps) {
  return (
    <div className="flex justify-between items-center py-4 border-b border-gray-800">
      <div>
        <span className="text-[#2B7FDC]">Tasks</span>
        <span className="ml-2 bg-[#333333] px-2 py-0.5 rounded-lg text-sm text-white">
          {total}
        </span>
      </div>
      <div>
        <span className="text-[#7B61FF]">Completed</span>
        <span className="ml-2 bg-[#333333] px-2 py-0.5 rounded-lg text-sm text-white">
          {completed} of {total}
        </span>
      </div>
    </div>
  );
}
