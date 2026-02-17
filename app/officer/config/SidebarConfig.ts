import { HardHat, Home, LucideIcon, Users } from "lucide-react";

type TypeSidebar = {
  id: number;
  label: string;
  icon: LucideIcon;
  url: string;
};

export const ConfigSidebar: TypeSidebar[] = [
  {
    id: 1,
    label: "Active Borrowers",
    icon: Home,
    url: "/petugas",
  },
  {
    id: 2,
    label: "Helmet Conditions",
    icon: HardHat,
    url: "/condition",
  },
  {
    id: 3,
    label: "Manage Users",
    icon: Users,
    url: "/users",
  },
];
