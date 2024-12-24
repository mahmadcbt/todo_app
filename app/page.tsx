"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { TaskCard } from "@/components/tasks/task-card";
import { TaskStats } from "@/components/tasks/task-stats";
import { Plus } from "lucide-react";
import { useTasks } from "@/lib/tasks-context";
import { useRouter } from "next/navigation";
import { Task } from "@/types";

export default function HomePage() {
  const router = useRouter();
  const {
    fetchTasks,
    taskList,
    deleteTask,
    toggleTaskStatus,
    isLoading: contextLoading,
  } = useTasks();
  const [isLoading, setIsLoading] = useState(true);
  const [isToggling, setIsToggling] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTasks();
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleTask = async (id: number) => {
    try {
      setIsToggling(true);
      await toggleTaskStatus(id);
    } catch (error) {
      console.error("Failed to toggle task:", error);
    } finally {
      setIsToggling(false);
    }
  };

  const handleDeleteTask = async (id: number) => {
    try {
      await deleteTask(id);
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const stats = {
    total: taskList.length,
    completed: taskList.filter((t) => t.completed).length,
  };

  if (isLoading || contextLoading) {
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
    <div className="bg-[#1A1A1A]">
      <div className="h-[200px] bg-black flex justify-center items-center relative">
        <Header />
        <div className="px-4 py-8 absolute w-full max-w-3xl mx-auto top-[8.5rem]">
          <Button
            className="rounded-[8px]"
            onClick={() => router.push("/create")}
          >
            Create Task <Plus className="w-5 h-5" />
          </Button>
        </div>
      </div>

      <Container>
        <TaskStats total={stats.total} completed={stats.completed} />

        {taskList.length === 0 ? (
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
            {taskList.map((task: Task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                completed={task.completed}
                onToggle={() => handleToggleTask(task.id)}
                onDelete={() => handleDeleteTask(task.id)}
                id={task.id}
                color={task.color}
                isLoading={isToggling}
              />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
