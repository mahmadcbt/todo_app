"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Container } from "@/components/layout/container";
import { TaskForm } from "@/components/tasks/task-form";
import { mockTaskApi } from "@/lib/mock-data";

export default function CreateTaskPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (data: { title: string; color: string }) => {
    setIsSubmitting(true);
    try {
      await mockTaskApi.createTask({
        title: data.title,
        color: data.color,
        completed: false,
      });
      router.push("/");
    } catch (error) {
      console.error("Failed to create task:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <Container>
      <Header />
      <TaskForm
        onSubmit={handleSubmit}
        onBack={() => router.back()}
        mode="create"
      />
    </Container>
  );
}
