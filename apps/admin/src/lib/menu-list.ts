import {
  Tag,
  Users,
  Settings,
  Bookmark,
  SquarePen,
  LayoutGrid,
  type LucideIcon,
  CalendarDays,
  Images,
  LifeBuoy
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
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: []
        }
      ]
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          href: "/events",
          label: "Events",
          icon: CalendarDays,
          // submenus: [
          //   {
          //     href: "/posts",
          //     label: "All Posts"
          //   },
          //   {
          //     href: "/posts/new",
          //     label: "New Post"
          //   }
          // ]
        },
        {
          href: "/Gallery",
          label: "Gallery",
          icon: Images
        },
        {
          href: "/spinning-wheel",
          label: "Spinning Wheel",
          icon: LifeBuoy
        }
      ]
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          href: "/staff",
          label: "Staff",
          icon: Users
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings
        }
      ]
    }
  ];
}
