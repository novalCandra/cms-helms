import {
  Clock,
  LucideIcon,
  ShieldBan,
  TriangleAlert,
  Users,
} from "lucide-react";

type StatType = {
  id: number;
  label: string;
  value: number;
  icon: LucideIcon;
};

export const StatsConfig: StatType[] = [
  {
    id: 1,
    label: "Total Users",
    icon: Users,
    value: 1,
  },
  {
    id: 2,
    label: "Active Borrows",
    icon: Clock,
    value: 1,
  },
  {
    id: 3,
    label: "Late Returns",
    icon: TriangleAlert,
    value: 1,
  },
  {
    id: 4,
    label: "Banned Users",
    icon: ShieldBan,
    value: 1,
  },
];
