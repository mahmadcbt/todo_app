import Image from "next/image";
import rocket from "@/assets/rocket.svg"

export function Header() {
  return (
    <header className="py-8">
      <div className="flex items-center justify-center gap-2">
        <Image
          src={rocket}
          alt="Todo App Logo"
          width={32}
          height={32}
          className="w-8 h-8"
        />
        <h1 className="text-2xl font-bold">
          <span className="text-[#2B7FDC]">Todo</span>
          <span className="text-[#5856D6]">App</span>
        </h1>
      </div>
    </header>
  );
}
