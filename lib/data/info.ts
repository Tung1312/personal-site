import type { InfoPill } from "@/lib/types";

export const infoData = {
  aliases: ["Trần Quang Tùng", "Tùng Trần", "Tung1312"] as const,
  pills: [
    {
      text: "UET - VNU",
      icon: "/uet.svg",
      href: "https://uet.vnu.edu.vn/",
      iconClassName: "dark:brightness-0 dark:invert",
    },
    {
      text: "Hanoi, Vietnam",
      icon: "/hanoi.svg",
      iconClassName: "dark:brightness-0 dark:invert",
    },
    {
      text: "vi_VN/en_US",
      icon: "/language.svg",
      iconClassName: "dark:brightness-0 dark:invert",
    },
  ] satisfies InfoPill[],
  bioParagraph:
    "I'm majoring *Information Systems* at *University of Engineering and Technology - VNU*.\n\n I'm deeply interested in technology, self-hosting and home networking, open source community, DIY, and a minimalist lifestyle. I currently run my own *sysadmin* setup for @homelab at home.\n\nOn the side, I work as a *freelance video editor*. My projects are posted on @work.",
  tagline: "simplicity is the ultimate sophistication.",
} as const;
