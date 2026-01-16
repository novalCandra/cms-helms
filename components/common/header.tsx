import { HardHat } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-card/80 backdrop-blur-md border-b border-border z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10  rounded-sm  flex items-center justify-center bg-[#4988C4] text-white">
              <HardHat className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground">HelmetHub</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href={"/auth/login"}>
              <Button
                variant={"outline"}
                type="submit"
                className="cursor-pointer px-10 py-5 rounded-[5px]"
              >
                Login
              </Button>
            </Link>
            <Link href={"/auth/register"}>
              <Button
                variant={"secondary"}
                className="cursor-pointer px-10 py-5 rounded-[5px]"
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
