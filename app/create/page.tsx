"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { TaskForm } from "@/components/tasks/task-form";
import { useTasks } from "@/lib/tasks-context";

export default function CreateTaskPage() {
  const router = useRouter();
  const { addTask } = useTasks();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { title: string; color: string }) => {
    setIsSubmitting(true);
    try {
      await addTask({
        title: data.title,
        color: data.color,
        completed: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to create task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#1A1A1A]">
      <div className="h-[200px] bg-black flex justify-center items-center relative">
        <Header />
      </div>
      <Container>
        <TaskForm
          onSubmit={handleSubmit}
          onBack={() => router.back()}
          mode="create"
          isSubmitting={isSubmitting}
        />
      </Container>
    </div>
  );
}
