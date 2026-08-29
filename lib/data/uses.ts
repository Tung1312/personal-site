export const usesData = {
  page: {
    title: "Uses",
    subtitle: "software and hardware",
    categories: [
      "hardware",
      "software",
      "coding",
      "study",
      "website",
    ] as const,
  },
  content: {
    hardware: {
      items: [
        "*Laptop*: ASUS TUF Gaming A14 (2025)",
        "*Phone*: Samsung Galaxy S25FE",
        "*Watch*: Samsung Galaxy Watch 6",
        "*Earphone*: Ugreen HiTune Max5C",
        "*Earbuds*: Soundcore R50i NC",
        "*Keyboard*: AULA F75",
        "*Mouse*: VXE R1 SE",
      ],
    },
    software: {
      items: [
        "*OS*: CachyOS / Windows 11",
        "*Browser*: Helium",
        "*Video*: Youtube, Jellyfin",
        "*Music*: Gapless (local musics), Spotify + YT Music",
        "*Editing*: Adobe Premiere Pro",
      ],
    },
    coding: {
      items: [
        "*Terminal*: Foot + Fish shell",
        "*Text Editor*: Zed, VSCodium",
        "*Language*: C++, Java, Python, React, JS, TS, CSS",
        "*Agents, LLMs*: Gemini, OpenCode, Github Copilot",
      ],
    },
    study: {
      items: [
        "*Notes*: Obsidian",
        "*Databases*: MySQL + Workbench, DataGrip",
        "*Networking*: Cisco Packet Tracer, Wireshark",
      ],
    },
    website: {
      body: "This website it made with *Next.js*, *React*, *TypeScript*, *Tailwind CSS*, *Framer Motion* and is being hosted directly on my @homelab, using *Cloudflare Tunnels* with my own domain.\n\n*Credit*: directly inspired by @site from @0xn1nja.",
    },
  },
} as const;
