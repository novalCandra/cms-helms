import { HardHat } from "lucide-react";
import React from "react";

export default function Navbar() {
  return (
    <>
      <nav className="border-b border-border sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500 text-white cursor-pointer">
              <HardHat className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground">HelmetHub</span>
          </div>
        </div>
      </nav>
    </>
  );
}
