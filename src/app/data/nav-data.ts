import {
  AudioWaveform,
  Bot,
  Command,
  FolderClosed,
  FolderPlus,
  Frame,
  GalleryVerticalEnd,
  Home,
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
      title: "Manage Order",
      url: "#",
      icon: FolderClosed,
      items: [
        {
          title: "All Orders",
          url: "/dashboard/orders",
        },
        {
          title: "Steadfast Data",
          url: "/dashboard/steadfast",
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
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Calculator",
          url: "/dashboard/calculator",
        },
        {
          title: "Calendar",
          url: "/dashboard/calendar",
        },
        {
          title: "Personal Note",
          url: "/dashboard/personal-note",
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
      name: "Product Report",
      url: "/dashboard/product-report",
      icon: PieChart,
    },
    {
      name: "Home",
      url: "/",
      icon: Home,
    },
  ],
};
