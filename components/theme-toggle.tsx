"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Monitor, MoonStar, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { useHydrated } from "@/lib/use-hydrated";

type ThemeOption = "light" | "dark" | "system";

const sequence: ThemeOption[] = ["light", "dark", "system"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const currentTheme: ThemeOption = (() => {
    if (!hydrated) {
      return "system";
    }

    if (theme === "light" || theme === "dark" || theme === "system") {
      return theme;
    }
    return "system";
  })();

  const currentIndex = sequence.indexOf(currentTheme);
  const nextTheme = sequence[(currentIndex + 1) % sequence.length];

  const icon =
    currentTheme === "light" ? (
      <Sun className="h-4 w-4" />
    ) : currentTheme === "dark" ? (
      <MoonStar className="h-4 w-4" />
    ) : (
      <Monitor className="h-4 w-4" />
    );

  return (
    <Button
      type="button"
      variant="ghost"
      disabled={!hydrated}
      className="h-9 w-9 rounded-full p-0"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch theme (current: ${currentTheme})`}
      title={`Theme: ${currentTheme}`}
    >
      <span className="relative h-4 w-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentTheme}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: 5, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -5, filter: "blur(3px)" }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            {icon}
          </motion.span>
        </AnimatePresence>
      </span>
    </Button>
  );
}
