export type NavLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type WorkEntry = {
  company: string;
  role: string;
  period: string;
  highlights: string[];
};

export type HomelabService = {
  name: string;
  status: "Operational" | "Monitoring" | "Scaling";
  latency: string;
};

const activityHeatmap = Array.from({ length: 98 }, (_, index) => {
  const wave = Math.sin(index * 0.52) + Math.cos(index * 0.21);
  const normalized = Math.floor(((wave + 2) / 4) * 5);
  return Math.min(4, Math.max(0, normalized));
});

export const siteData = {
  person: {
    name: "Trần Quang Tùng",
    pronouns: "he/him",
    role: "Senior Frontend Developer · Creative Technologist",
    bio: "19 / junior sysadmin · homelab hobbyist",
    location: "Ha Noi, Vietnam",
    availability: "Open to consulting and product collaborations",
    footerStatus: "nerd",
    email: "hello@tung.dev",
  },
  nav: {
    primary: [
      { title: "info", href: "/" },
      { title: "homelab", href: "/homelab" },
      { title: "uses", href: "/uses" },
      { title: "work", href: "/work" },
    ] satisfies NavLink[],
  },
  socials: [
    {
      label: "github",
      handle: "@github",
      href: "https://github.com/Tung1312",
    },
    {
      label: "youtube",
      handle: "@youtube",
      href: "https://www.youtube.com/@trantung1312",
    },
    {
      label: "Contact",
      handle: "@mail",
      href: "mailto:hello@tung.dev",
    },
  ] satisfies SocialLink[],
  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "Framer Motion",
    "Node.js",
    "PostgreSQL",
    "Docker",
    "Grafana",
  ],
  github: {
    username: "tung1312",
    yearlyContributions: 1492,
    currentStreakDays: 28,
    mergedPrs: 91,
    heatmap: activityHeatmap,
  },
  work: [
    {
      company: "Hyperlane Studio",
      role: "Senior Frontend Engineer",
      period: "2023 — Present",
      highlights: [
        "Led the redesign of a complex admin platform into a modular, component-driven system.",
        "Built interaction libraries and performance budgets adopted across three product teams.",
      ],
    },
    {
      company: "Nova Grid",
      role: "Frontend Engineer",
      period: "2021 — 2023",
      highlights: [
        "Implemented analytics-heavy interfaces for infrastructure monitoring at enterprise scale.",
        "Partnered with design on motion and accessibility standards for a new design system.",
      ],
    },
  ] satisfies WorkEntry[],
  uses: {
    editor: ["VS Code", "Neovim", "Raycast", "Arc Browser"],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "Vercel"],
    laptop: {
      name: "ASUS TUF Gaming A14 (2025)",
      image: "/images/tuf_a14.png",
      specs: [
        "Ryzen AI 7 350",
        "RTX 5060",
        "32GB RAM / 1TB SSD",
        '14" 2.5K',
        "CachyOS + Caelestia dots",
      ],
    },
  },
  homelab: {
    uptime: "99.982%",
    platform: ["Proxmox", "K3s", "Docker", "Tailscale", "Grafana"],
    services: [
      {
        name: "Traefik Gateway",
        status: "Operational",
        latency: "18ms",
      },
      {
        name: "Postgres Replica",
        status: "Monitoring",
        latency: "25ms",
      },
      {
        name: "CI Runners",
        status: "Scaling",
        latency: "31ms",
      },
    ] satisfies HomelabService[],
  },
} as const;

export type SiteData = typeof siteData;
