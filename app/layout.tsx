import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { TasksProvider } from "@/lib/tasks-context";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TODO - Your Task Manager",
  description: "Manage tasks from your browser",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`min-h-screen ${inter.className}`}
      >
        <TasksProvider>{children}</TasksProvider>
      </body>
    </html>
  );
}
