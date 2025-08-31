export type NavItem = {
  title: string;
  href?: string;      // leaf items
  items?: NavItem[];  // groups
};

export const DOCS_NAV: NavItem[] = [
  { title: "Getting Started", href: "/docs/getting-started" },
  {
    title: "Core",
    items: [
      { title: "Theming", href: "/docs/theming" },
      { title: "Components", href: "/docs/components" },
      { title: "MDX Tips", href: "/docs/mdx" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Deployment", href: "/docs/deployment" },
      { title: "Search", href: "/docs/search" },
    ],
  },
];

// Flatten out the sidebar tree for linear prev/next navigation
export const DOCS_FLAT: NavItem[] = DOCS_NAV.flatMap((n) =>
  n.items ? n.items : [n]
).filter((n) => n.href);

