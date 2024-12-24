"use client"
export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white">
      <main className="container max-w-3xl mx-auto px-4 py-8 mt-8">
        {children}
      </main>
    </div>
  );
}
