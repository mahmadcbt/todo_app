"use client"
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Task, TasksContextType } from "@/types";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTasks((prev) => [...prev, response.data]);
    } catch (error) {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: string, task: Partial<Task>) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, task);
      setTasks((prev) => prev.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      await updateTask(id, { completed: !task.completed });
    }
  };

  const value = {
    tasks,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
  };

  return (
    <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
  );
}

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error("useTasks must be used within a TasksProvider");
  }
  return context;
};
