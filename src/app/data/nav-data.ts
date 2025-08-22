import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  FolderClosed,
  FolderPlus,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  //   SquareTerminal,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Manage Data",
      url: "#",
      icon: FolderClosed,
      isActive: true,
      items: [
        {
          title: "Products",
          url: "/dashboard/products",
        },
        {
          title: "Category",
          url: "/dashboard/categories",
        },
        {
          title: "Sub Category",
          url: "/dashboard/sub-categories",
        },
        {
          title: "Branchs",
          url: "/dashboard/branchs",
        },
        {
          title: "Website Info",
          url: "/dashboard/website-info",
        },
      ],
    },
    {
      title: "Create Data",
      url: "#",
      icon: FolderPlus,
      items: [
        {
          title: "Create Product",
          url: "/dashboard/create-product",
        },
        {
          title: "Create Customer",
          url: "/dashboard/create-customer",
        },
        {
          title: "Create Branch",
          url: "/dashboard/create-branch",
        },
        {
          title: "Create Member",
          url: "/dashboard/create-member",
        },
        {
          title: "Create Site-info",
          url: "/dashboard/create-site-info",
        },
      ],
    },
    {
      title: "Handle Users",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "All Users",
          url: "/dashboard/handle-users",
        },
        {
          title: "All Customer",
          url: "/dashboard/handle-customers",
        },
        {
          title: "Team members",
          url: "/dashboard/handle-teammembers",
        },
      ],
    },
    {
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Customer checker",
      url: "/dashboard/customer-checker",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
};
