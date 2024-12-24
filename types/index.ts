export interface Task {
    id: string;
    title: string;
    color: "red" | "blue" | "green";
    completed: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface TasksContextType {
    tasks: Task[];
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<void>;
    addTask: (
        task: Omit<Task, "id" | "createdAt" | "updatedAt">
    ) => Promise<void>;
    updateTask: (id: string, task: Partial<Task>) => Promise<void>;
    deleteTask: (id: string) => Promise<void>;
    toggleTaskStatus: (id: string) => Promise<void>;
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
    id: string;
}

export interface TaskFormProps {
    onSubmit: (data: { title: string; color: string }) => void;
    onBack: () => void;
    initialValues?: { title: string; color: string };
    mode?: "create" | "edit";
}