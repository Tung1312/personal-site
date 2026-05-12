"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FloatingNavbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-4 z-40 pt-4">
      <div className="mx-auto flex w-fit flex-col items-center">
        <motion.nav
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
          className="glass-pill flex items-center gap-1 rounded-full px-2 py-1.5 shadow-lg shadow-zinc-900/5 dark:shadow-black/30"
        >
          {siteData.nav.primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "relative rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-zinc-900 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-500/10 dark:text-zinc-300 dark:hover:bg-zinc-500/15",
              )}
            >
              {pathname === link.href ? (
                <motion.span
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 rounded-full bg-white shadow-[0_6px_18px_rgba(255,255,255,0.3)] dark:bg-white"
                  transition={{
                    type: "spring",
                    stiffness: 520,
                    damping: 36,
                    mass: 0.52,
                  }}
                />
              ) : null}
              <span className="relative z-10">{link.title}</span>
            </Link>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
