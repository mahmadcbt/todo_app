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

export const getColorClass = (color: string) => {
  const colorMap = {
    red: 'bg-red-100 text-red-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
  };
  return colorMap[color as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
};