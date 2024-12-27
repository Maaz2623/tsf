import {
  Calendar,
  CalendarCogIcon,
  LucideIcon,
  TicketIcon,
  TicketXIcon,
  UserIcon,
  Users,
  UsersIcon,
} from "lucide-react";
import { IconType } from "react-icons/lib";
import { FaUsers } from "react-icons/fa";

type SidebarItemsProps = {
  label: string;
  link: string;
  icon?: LucideIcon;
  animation?: string;
  tag: string;
};

type MobileSidebarProps = {
  label: string;
  link: string;
  icon?: IconType;
  animation?: string;
  tag: string;
};

export const sidebarGeneralItems: SidebarItemsProps[] = [
  {
    label: "Events",
    link: "/events",
    icon: Calendar,
    tag: "events",
  },
  {
    label: "Community",
    link: "/community",
    icon: Users,
    tag: "members",
  },
];

export const sidebarProfileItems: SidebarItemsProps[] = [
  {
    label: "Profile",
    link: "/my-profile",
    icon: UserIcon,
    tag: "profile",
  },
  {
    label: "Teams",
    link: "/my-teams",
    icon: UsersIcon,
    tag: "teams",
  },
  {
    label: "Tickets",
    link: "/my-tickets",
    icon: TicketIcon,
    tag: "tickets",
  },
];

export const sidebarBackendItems: SidebarItemsProps[] = [
  {
    label: "Event Management",
    link: "/admin/event-management",
    icon: CalendarCogIcon,
    tag: "event-management",
  },
  {
    label: "Ticket Burner",
    link: "/admin/ticket-burner",
    icon: TicketXIcon,
    tag: "ticket-burner",
  },
];

export const mobilebarItems: MobileSidebarProps[] = [
  {
    label: "Events",
    link: "/events",
    icon: Calendar,
    tag: "events",
  },
  {
    label: "Community",
    link: "/community",
    icon: Users,
    tag: "members",
  },
  {
    label: "Profile",
    link: "/my-profile",
    icon: UserIcon,
    tag: "profile",
  },
  {
    label: "Teams",
    link: "/my-teams",
    icon: FaUsers,
    tag: "teams",
  },
  {
    label: "Tickets",
    link: "/my-tickets",
    icon: TicketIcon,
    tag: "tickets",
  },
];
