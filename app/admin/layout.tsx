import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <main className="flex min-h-screen max-w-full">{children}</main>
    </SidebarProvider>
  );
}
