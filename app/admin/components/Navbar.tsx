import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <nav className=" border-b-gray-500 top-0 z-50">
      <div className="container mx-auto flex px-10 py-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant={"ghost"}>Assign Borrow</Button>
          <Button variant={"default"}>
            <Plus />
            Add Helments
          </Button>
        </div>
      </div>
    </nav>
  );
}
