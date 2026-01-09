import { Clock, HardHat, LucideIcon, Shield, Users } from "lucide-react";
export type features = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export const FeaturesField: features[] = [
  {
    icon: HardHat,
    title: "Easy Borrowing",
    description:
      "Browse available helmets and borrow with just a few clicks. Simple and efficient process.",
  },
  {
    icon: Clock,
    title: "Track Deadlines",
    description:
      "Never miss a return date with automatic reminders and clear deadline tracking.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description:
      "All helmets are regularly inspected and maintained to ensure your safety.",
  },
  {
    icon: Users,
    title: "For Everyone",
    description:
      "Whether you're a worker, contractor, or visitor, we have the right helmet for you.",
  },
];

export default FeaturesField;
