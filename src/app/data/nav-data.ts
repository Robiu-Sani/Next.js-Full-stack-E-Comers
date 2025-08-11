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
      title: "Models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
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
      name: "Design Engineering",
      url: "#",
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
