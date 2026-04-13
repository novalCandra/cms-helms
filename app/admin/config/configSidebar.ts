import {
  HardHat,
  LayoutGrid,
  LucideIcon,
  NotebookPen,
  Library,
  Users,
} from "lucide-react";

type TypeSidebar = {
  id: number;
  title: string;
  url: string;
  icon: LucideIcon;
};

const ConfigSidebar: TypeSidebar[] = [
  {
    id: 1,
    title: "Dashboard",
    url: "/admin",
    icon: LayoutGrid,
  },
  {
    id: 2,
    title: "Managaments Helments",
    url: "/admin/helments",
    icon: HardHat,
  },
  {
    id: 3,
    title: "Managements Users",
    url: "/admin/users",
    icon: Users,
  },
  {
    id: 4,
    title: "Borrowing Records",
    url: "/admin/record",
    icon: NotebookPen,
  },
  {
    id: 5,
    title: "Categories",
    url: "/admin/categories",
    icon: Library,
  },
];

export default ConfigSidebar;
