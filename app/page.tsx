"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskStats } from "@/components/tasks/task-stats";
import { mockTaskApi, type Task } from "@/lib/mock-data";
import { Plus } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const tasks = await mockTaskApi.getTasks();
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to load tasks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleTask = async (id: string) => {
    const task = tasks.find((t) => t.id === id);
    if (task) {
      try {
        await mockTaskApi.updateTask(id, { completed: !task.completed });
        setTasks(
          tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          )
        );
      } catch (error) {
        console.error("Failed to toggle task:", error);
      }
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await mockTaskApi.deleteTask(id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.completed).length,
  };

  if (isLoading) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <p>Loading tasks...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header />

      <Button className="mb-8" onClick={() => router.push("/create")}>
        Create Task
        <Plus className="w-5 h-5" />
      </Button>

      <TaskStats total={stats.total} completed={stats.completed} />

      <div className="mt-8 space-y-4">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              You don&apos;t have any tasks registered yet.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              completed={task.completed}
              onToggle={() => handleToggleTask(task.id)}
              onDelete={() => handleDeleteTask(task.id)}
            />
          ))
        )}
      </div>
    </Container>
  );
}
