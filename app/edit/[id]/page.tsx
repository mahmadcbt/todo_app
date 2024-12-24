"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { TaskForm } from "@/components/tasks/task-form";
import { mockTaskApi, type Task } from "@/lib/mock-data";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTask();
  }, [params.id]);

  const loadTask = async () => {
    try {
      const loadedTask = await mockTaskApi.getTaskById(params.id as string);
      if (!loadedTask) {
        router.push("/");
        return;
      }
      setTask(loadedTask);
    } catch (error) {
      console.error("Failed to load task:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: { title: string; color: string }) => {
    if (!task) return;

    try {
      await mockTaskApi.updateTask(task.id, {
        title: data.title,
        color: data.color,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Header />
        <div className="flex justify-center items-center h-64">
          <p>Loading task...</p>
        </div>
      </Container>
    );
  }

  if (!task) {
    return null;
  }

  return (
    <Container>
      <Header />
      <TaskForm
        onSubmit={handleSubmit}
        onBack={() => router.back()}
        mode="edit"
        initialValues={{
          title: task.title,
          color: task.color,
        }}
      />
    </Container>
  );
}
