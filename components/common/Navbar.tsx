"use client";
import { Bell, HardHat, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
type Profile = {
  full_name: string;
  email: string;
  onLogout: () => void;
};
export default function Navbar({ profile }: { profile: Profile }) {
  return (
    <>
      <nav className="border-b border-border sticky top-0 z-50 bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-blue-500 text-white cursor-pointer">
              <HardHat className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-foreground">HelmetHub</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant={"ghost"}>
              <Bell />
            </Button>

            <div className="flex items-center cursor-pointer gap-4">
              <Avatar>
                <AvatarImage src="" alt="Foto" />
                <AvatarFallback>MK</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-foreground">
                  {profile.full_name}
                </p>
                <p className="text-xs text-muted-foreground">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                variant={"link"}
                className="cursor-pointer"
                onClick={profile.onLogout}
              >
                <LogOut />
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
