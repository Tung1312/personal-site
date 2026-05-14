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
    laptop: {
      name: "ASUS TUF Gaming A14 (2025)",
      image: { src: "/images/laptop.jpg", width: 1612, height: 1209 },
      description:
        "Laptop hiện tại mình sử dụng là ASUS TUF Gaming A14 (bản 2025). Mình mua nó vào ngày 11 tháng 9 (no jokes) năm 2025 với giá là ~37 triệu đồng. Hiện tại máy đang phục vụ rất tốt, thậm chí là thừa cho toàn bộ các nhu cầu học tập, làm việc và giải trí của mình.",
      specs: [
        "AMD Ryzen AI 7 350",
        "Radeon 860M",
        "RTX 5060",
        "32GB RAM",
        "1TB SSD",
        "14 2.5K 165Hz",
        "1.46kg",
        "73Whr",
        "200W + 100W PD",
      ],
      os: ["CachyOS", "Windows 11"],
      overview:
        "Máy siêu mỏng nhẹ và nhỏ gọn nên mang đi lại rất dễ dàng và tiện lợi. Build máy cực kì chắc chắn, dù cho thân dưới máy là nhựa nhưng chất liệu nhựa rất cao cấp và đầm nên không hề có hiện tượng ọp ẹp. Bàn phím gõ thích, hành trình phím sâu và touchpad phủ kính nên từ ngày mua máy thì mình sử dụng bàn phím cơ ngoài rất ít, đi học cũng hầu như không cần phải mang theo chuột. Màn hình 2.5K 165Hz siêu sắc nét và sẽ phục vụ tốt mọi nhu cầu giải trí. Tấm nền IPS là điểm cộng với mình chứ không cần phải là OLED vì khả năng chống chói và màu sắc vẫn đẹp và đủ tốt.\n\nHệ điều hành mình sử dụng hằng ngày là CachyOS với giao diện desktop Hyprland, sử dụng Caelestia dots cực kì đẹp và dễ tùy biến. Mình bắt đầu sử dụng combo này từ 01/2026 và đến hiện tại (4 tháng sau) vẫn thấy rất thích và tiếp tục tùy biến thêm được với bộ giao diện này. Setup hiện tại của mình cho thời gian sử dụng máy từ 8-10 tiếng cho 1 ngày đi học, vô cùng thoải mái và hầu như không cần mang theo sạc.\n\nMình dual boot thêm Windows 11 để phục vụ cho edit video freelance.\n\nVới mức giá thuộc phân khúc cao cấp, mình thực sự rất may mắn và biết ơn khi được sở hữu, sử dụng chiếc laptop. Đương nhiên rằng nó sẽ dư sức để đồng hành tốt với mình trong nhiều năm tới.",
    },
    phone: {
      name: "iPhone 15 Pro",
      specs: ["A17 Pro chip", "256GB storage", '6.1" OLED', "iOS 18"],
    },
    watch: {
      name: "Apple Watch Series 9",
      specs: ["S9 chip", "45mm case", "watchOS 11"],
    },
    misc: {
      items: [
        "AirPods Pro 2",
        "Logitech MX Master 3S",
        "Keychron Q1 Pro",
        "Dell U2723QE",
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
