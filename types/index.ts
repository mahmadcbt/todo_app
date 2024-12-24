import { AxiosError, AxiosResponse } from "axios";

export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface TasksContextType {
  taskList: Task[];
  isLoading: boolean;
  error: string | null;
  fetchTasks: () => Promise<void>;
  addTask: (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => Promise<void>;
  updateTask: (id: number, task: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  toggleTaskStatus: (id: number) => Promise<void>;
  getTaskById: (id: number) => Promise<TaskResponse>;
}

export interface TaskStatsProps {
  total: number;
  completed: number;
}

export interface TaskCardProps {
  title: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
  id: number;
  color: string;
  isLoading?: boolean;
}

export interface TaskFormProps {
  onSubmit: (data: { title: string; color: string }) => void;
  onBack: () => void;
  initialValues?: { title: string; color: string };
  mode?: "create" | "edit";
  isSubmitting?: boolean;
}

type TaskResponse = {
  data: Task | null;
  success: boolean;
  error?: string;
};
