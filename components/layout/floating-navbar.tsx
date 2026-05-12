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
          transition={{ duration: 0.45 }}
          className="glass-pill flex items-center gap-1 rounded-full px-2 py-1.5 shadow-lg shadow-zinc-900/5 dark:shadow-black/30"
        >
          {siteData.nav.primary.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-500/10 dark:text-zinc-300 dark:hover:bg-zinc-500/15",
              )}
            >
              {link.title}
            </Link>
          ))}
        </motion.nav>
      </div>
    </header>
  );
}
