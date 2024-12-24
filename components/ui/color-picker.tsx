import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value?: string;
  onChange?: (color: string) => void;
}

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  const colors = [
    { value: "red", class: "bg-[#FF3B30]" },
    { value: "orange", class: "bg-[#FF9500]" },
    { value: "yellow", class: "bg-[#FFCC00]" },
    { value: "green", class: "bg-[#34C759]" },
    { value: "blue", class: "bg-[#007AFF]" },
    { value: "indigo", class: "bg-[#5856D6]" },
    { value: "purple", class: "bg-[#AF52DE]" },
    { value: "pink", class: "bg-[#FF2D55]" },
    { value: "brown", class: "bg-[#A2845E]" },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onChange?.(color.value)}
          className={cn(
            "w-10 h-10 rounded-full transition-all duration-200",
            color.class,
            value === color.value &&
              "ring-2 ring-white ring-offset-2 ring-offset-[#121212]"
          )}
          type="button"
          aria-label={`Select ${color.value} color`}
        />
      ))}
    </div>
  );
}
