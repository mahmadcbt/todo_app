import Image from "next/image";
import rocket from "@/assets/rocket.svg"

export function Header() {
  return (
    <header className="py-8">
      <div className="flex justify-center items-center gap-2 py-6 absolute top-16 left-0 right-0">
        <Image
          src={rocket}
          alt="Todo App Logo"
          width={24}
          height={36}
          className="w-6 h-9"
        />
        <h1 className="text-3xl font-black">
          <span className="text-[#2B7FDC]">Todo</span>
          <span className="text-[#7B61FF]">App</span>
        </h1>
      </div>
    </header>
  );
}
