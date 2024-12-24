"use client"
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <main className="container mx-auto px-4 py-8 max-w-3xl">{children}</main>
    </div>
  );
}
