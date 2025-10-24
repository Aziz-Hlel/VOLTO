import {
  Users,
  Settings,
  UserCog,
  type LucideIcon,
  CalendarDays,
  Images,
  LifeBuoy,
  PartyPopper,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Contents",
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
      menus: [
        {
          href: "/users",
          label: "Users",
          icon: Users,
        },
      ],
    },
  ];
}
