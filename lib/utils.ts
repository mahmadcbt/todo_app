import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getTaskSummary = (tasks: Array<{ completed: boolean }>) => {
  const total = tasks.length;
  const completed = tasks.filter(task => task.completed).length;
  return { total, completed };
};

export const getColorClass = (color: string, isCompleted: boolean) => {
  if (!isCompleted) return "border-gray-600";

  const colorMap: Record<string, string> = {
    red: "border-[#FF3B30] bg-[#FF3B30]",
    orange: "border-[#FF9500] bg-[#FF9500]",
    yellow: "border-[#FFCC00] bg-[#FFCC00]",
    green: "border-[#34C759] bg-[#34C759]",
    blue: "border-[#007AFF] bg-[#007AFF]",
    indigo: "border-[#5856D6] bg-[#5856D6]",
    purple: "border-[#AF52DE] bg-[#AF52DE]",
    pink: "border-[#FF2D55] bg-[#FF2D55]",
    brown: "border-[#A2845E] bg-[#A2845E]",
  };

  return colorMap[color] || "border-[#007AFF] bg-[#007AFF]";
};