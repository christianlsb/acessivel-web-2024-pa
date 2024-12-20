type Breakpoint = "mobile" | "tablet" | "notebook" | "desktop";

declare module "match-media";

interface Campaings {
  image: any;
  title: string;
  description: string;
}

interface Footer {
  title: string;
  link: string;
}

interface DashboardLink {
  title: string;
  link: string;
}
