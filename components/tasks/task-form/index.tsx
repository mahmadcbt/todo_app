"use client"
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ColorPicker } from "@/components/ui/color-picker";
import { ChevronLeft, Plus, Check } from "lucide-react";
import { TaskFormProps } from "@/types";

export function TaskForm({
  onSubmit,
  onBack,
  initialValues,
  mode = "create",
}: TaskFormProps) {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [color, setColor] = useState(initialValues?.color || "blue");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit({ title, color });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <button
        type="button"
        onClick={onBack}
        className="text-gray-400 hover:text-white"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <Input
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Ex. Brush your teeth"
        required
      />

      <div className="space-y-2">
        <label className="text-[#2B7FDC] text-sm font-medium">Color</label>
        <ColorPicker value={color} onChange={setColor} />
      </div>

      <Button type="submit">
        {mode === "create" ? (
          <>
            Add Task
            <Plus className="w-5 h-5" />
          </>
        ) : (
          <>
            Save
            <Check className="w-5 h-5" />
          </>
        )}
      </Button>
    </form>
  );
}
