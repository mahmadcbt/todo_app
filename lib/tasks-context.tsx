"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";
import { Task, TasksContextType } from "@/types";

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [completed, setCompleted] = useState();
  const [total, setTotal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTaskList(response.data.data.tasks);
      setCompleted(response.data.data.completedTasks);
      setTotal(response.data.data.totalTasks);
    } catch (error) {
      setError("Failed to fetch tasks");
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ): Promise<void> => {
    try {
      const response = await axios.post(`${API_URL}/tasks`, task);
      setTaskList((prev) => [...prev, response.data]);
    } catch (error) {
      setError("Failed to add task");
    }
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    try {
      const response = await axios.put(`${API_URL}/tasks/${id}`, task);
      setTaskList((prev) => prev.map((t) => (t.id === id ? response.data : t)));
    } catch (error) {
      setError("Failed to update task");
    }
  };

  const getTaskById = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/tasks/${id}`);
      // Make sure the response matches the structure you're expecting in EditTaskPage
      // Currently you're using loadedTask.data in EditTaskPage
      return {
        data: response.data.data,
        success: true,
      };
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch task");
      return {
        data: null,
        success: false,
        error: "Failed to fetch task",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      setTaskList((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      setError("Failed to delete task");
    }
  };

  const toggleTaskStatus = async (id: number) => {
    const task = taskList.find((t) => t.id === id);
    if (task) {
      try {
        const response = await axios.put(`${API_URL}/tasks/${id}`, {
          completed: !task.completed,
        });
        setTaskList((prev) =>
          prev.map((t) => (t.id === id ? response.data.data : t))
        );
      } catch (error) {
        setError("Failed to toggle task status");
      }
    }
  };

  const value = {
    taskList,
    isLoading,
    error,
    fetchTasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    getTaskById,
    completed,
    total,
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
