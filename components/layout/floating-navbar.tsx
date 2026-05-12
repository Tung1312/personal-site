"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

export function FloatingNavbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  const secondaryLinks = useMemo(() => siteData.nav.secondary, []);

  return (
    <header className="sticky top-4 z-40 pt-4">
      <div className="mx-auto flex w-fit flex-col items-center gap-2">
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

          <Button
            type="button"
            size="sm"
            variant="ghost"
            onClick={() => setExpanded((value) => !value)}
            className="h-9 rounded-full px-3 text-xs font-medium"
            aria-expanded={expanded}
            aria-controls="expanded-nav-links"
          >
            More
            <ChevronDown
              className={cn("h-4 w-4 transition-transform", expanded ? "rotate-180" : "rotate-0")}
            />
          </Button>

          <ThemeToggle />
        </motion.nav>

        <AnimatePresence>
          {expanded ? (
            <motion.div
              id="expanded-nav-links"
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              transition={{ duration: 0.25 }}
              className="glass-pill flex items-center gap-1 overflow-hidden rounded-2xl px-2 py-1.5"
            >
              {secondaryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-zinc-900 text-zinc-50 dark:bg-zinc-100 dark:text-zinc-900"
                      : "text-zinc-700 hover:bg-zinc-500/10 dark:text-zinc-300 dark:hover:bg-zinc-500/15",
                  )}
                  onClick={() => setExpanded(false)}
                >
                  {link.title}
                </Link>
              ))}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
