"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskStats } from "@/components/tasks/task-stats";
import { mockTaskApi, type Task } from "@/lib/mock-data";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen bg-[#121212]">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Header />

        <Button className="mb-8 rounded-[8px]" onClick={() => router.push("/create")}>
          Create Task <Plus className="w-5 h-5" />
        </Button>

        <TaskStats total={stats.total} completed={stats.completed} />

        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="mb-4">
              <svg
                className="w-12 h-12 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="text-gray-400 text-lg">
              You don&apos;t have any tasks registered yet.
            </p>
            <p className="text-gray-600 mt-2">
              Create tasks and organize your to-do items.
            </p>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                id={task.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
