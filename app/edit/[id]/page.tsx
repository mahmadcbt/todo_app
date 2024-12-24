"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { TaskForm } from "@/components/tasks/task-form";
import { useTasks } from "@/lib/tasks-context";
import { Task } from "@/types";

export default function EditTaskPage() {
  const router = useRouter();
  const params = useParams();
  const { updateTask, getTaskById } = useTasks();
  const [task, setTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadTask();
  }, [params.id]);

  const loadTask = async () => {
    try {
      const result = await getTaskById(Number(params.id));
      if (!result.success || !result.data) {
        router.push("/");
        return;
      }
      setTask(result.data);
    } catch (error) {
      console.error("Failed to load task:", error);
      router.push("/");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (data: { title: string; color: string }) => {
    if (!task) return;

    setIsSubmitting(true);
    try {
      await updateTask(task.id, {
        title: data.title,
        color: data.color,
        completed: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to update task:", error);
    } finally {
      setIsSubmitting(false);
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
    <div className="bg-[#1A1A1A]">
      <div className="h-[200px] bg-black flex justify-center items-center relative">
        <Header />
      </div>
      <Container>
        <TaskForm
          onSubmit={handleSubmit}
          onBack={() => router.back()}
          mode="edit"
          initialValues={{
            title: task.title,
            color: task.color,
          }}
          isSubmitting={isSubmitting}
        />
      </Container>
    </div>
  );
}
