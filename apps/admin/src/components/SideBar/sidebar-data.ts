import { StaffRoles } from "@/types/enums/Roles";
import {
  CalendarDays,
  LifeBuoy,
  PartyPopper,
  Settings,
  UserCog,
  Users,
  UserStar,
  type LucideIcon,
} from "lucide-react";

export type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

export type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  roles?: StaffRoles[];
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
      roles: [StaffRoles.MEDIA_MANAGER],
      menus: [
        {
          href: "/events",
          label: "Events",
          icon: CalendarDays,
        },
      ],
    },
    {
      groupLabel: "Contents",
      roles: [StaffRoles.MEDIA_MANAGER],
      menus: [
        {
          href: "/ladies-night",
          label: "Ladies Night",
          icon: PartyPopper,
        },
        {
          href: "/spinning-wheel",
          label: "Spinning Wheel",
          icon: LifeBuoy,
        },
      ],
    },
    {
      groupLabel: "Settings",
      roles: [],
      menus: [
        {
          href: "/staff",
          label: "Staff",
          icon: UserCog,
        },

        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
    {
      groupLabel: "Management",
      roles: [StaffRoles.CASHIER],

      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/membership",
          label: "Membership",
          icon: UserStar,
        },
      ],
    },
  ];
}
