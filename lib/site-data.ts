import type { NavLink, SocialLink } from "@/lib/types";

const activityHeatmap = Array.from({ length: 98 }, (_, index) => {
  const wave = Math.sin(index * 0.52) + Math.cos(index * 0.21);
  const normalized = Math.floor(((wave + 2) / 4) * 5);
  return Math.min(4, Math.max(0, normalized));
});

export const siteData = {
  person: {
    name: "Trần Quang Tùng",
    pronouns: "he/him",
    birthday: new Date("2006-12-13T00:00:00"),
    bio: (age: number) => `${age} / junior sysadmin · homelab hobbyist`,
    footerStatus: "nerd",
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
} as const;

export type SiteData = typeof siteData;
