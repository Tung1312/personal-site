export type NavLink = {
  title: string;
  href: string;
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
};

export type Project = {
  title: string;
  summary: string;
  href: string;
  category: "Software" | "Game" | "Infra";
  tags: string[];
};

export type BlogEntry = {
  title: string;
  excerpt: string;
  href: string;
  publishedAt: string;
  readTime: string;
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
    name: "Tung Nguyen",
    pronouns: "He/Him",
    role: "Senior Frontend Developer · Creative Technologist",
    bio: "I design and ship premium web experiences with React, Next.js, and modern interaction design.",
    location: "Ho Chi Minh City, Vietnam",
    availability: "Open to consulting and product collaborations",
    footerStatus: "Building in public",
    email: "hello@tung.dev",
  },
  nav: {
    primary: [
      { title: "Home", href: "/" },
      { title: "Projects", href: "/projects" },
      { title: "Blogs", href: "/blogs" },
    ] satisfies NavLink[],
    secondary: [
      { title: "Work", href: "/work" },
      { title: "Uses", href: "/uses" },
      { title: "Homelab", href: "/homelab" },
    ] satisfies NavLink[],
  },
  socials: [
    {
      label: "GitHub",
      handle: "@tung1312",
      href: "https://github.com/tung1312",
    },
    {
      label: "LinkedIn",
      handle: "@tung-nguyen",
      href: "https://www.linkedin.com/in/tung-nguyen",
    },
    {
      label: "Contact",
      handle: "hello@tung.dev",
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
  projects: [
    {
      title: "Astra Control Plane",
      summary:
        "A multi-tenant dashboard for edge services with realtime observability and deployment orchestration.",
      href: "https://github.com/tung1312",
      category: "Software",
      tags: ["Next.js", "tRPC", "WebSockets"],
    },
    {
      title: "Signalforge",
      summary:
        "A narrative puzzle game prototype blending shader-driven visuals with browser-native game loops.",
      href: "https://github.com/tung1312",
      category: "Game",
      tags: ["React", "Three.js", "GSAP"],
    },
    {
      title: "Homelab Pulse",
      summary:
        "Status and telemetry layer for my homelab, with service health, latency snapshots, and alert routing.",
      href: "https://github.com/tung1312",
      category: "Infra",
      tags: ["Grafana", "Prometheus", "Docker"],
    },
    {
      title: "Neon Docs",
      summary:
        "A documentation platform with AI-assisted search and MDX authoring for engineering teams.",
      href: "https://github.com/tung1312",
      category: "Software",
      tags: ["MDX", "OpenAI", "Next.js"],
    },
  ] satisfies Project[],
  blogs: [
    {
      title: "Designing Motion Systems for Bento Interfaces",
      excerpt:
        "How I build nuanced card animations that stay elegant under real production constraints.",
      href: "#",
      publishedAt: "2026-03-04",
      readTime: "7 min read",
    },
    {
      title: "Theme Architecture in Next.js App Router",
      excerpt:
        "A practical deep dive into robust dark/light mode setup with visual continuity and no flashes.",
      href: "#",
      publishedAt: "2026-02-12",
      readTime: "9 min read",
    },
    {
      title: "From Glassmorphism to Clarity",
      excerpt:
        "Using translucency intentionally without sacrificing readability, contrast, or accessibility.",
      href: "#",
      publishedAt: "2025-12-22",
      readTime: "5 min read",
    },
  ] satisfies BlogEntry[],
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
