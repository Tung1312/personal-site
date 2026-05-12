"use client";

import {
  Atom,
  Cloud,
  DatabaseZap,
  Flame,
  Layers,
  MonitorSmartphone,
  ServerCog,
  Waypoints,
} from "lucide-react";
import { motion } from "framer-motion";
import { siteData } from "@/lib/site-data";

const iconMap = {
  "Next.js": Waypoints,
  React: Atom,
  TypeScript: Layers,
  "Tailwind CSS": Flame,
  "Framer Motion": MonitorSmartphone,
  "Node.js": ServerCog,
  PostgreSQL: DatabaseZap,
  Docker: Cloud,
  Grafana: MonitorSmartphone,
} as const;

export function TechStackMarquee() {
  const chips = [...siteData.techStack, ...siteData.techStack];

  return (
    <div className="overflow-hidden rounded-xl border border-white/50 bg-white/50 px-2 py-3 dark:border-white/10 dark:bg-white/5">
      <motion.div
        className="flex w-max items-center gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      >
        {chips.map((stack, index) => {
          const Icon = iconMap[stack] ?? Layers;
          return (
            <div
              key={`${stack}-${index}`}
              className="flex min-w-fit items-center gap-2 rounded-full border border-zinc-200/70 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-200"
            >
              <Icon className="h-3.5 w-3.5" />
              <span>{stack}</span>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
