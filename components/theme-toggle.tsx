"use client";

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
      size="sm"
      variant="ghost"
      disabled={!hydrated}
      className="h-9 rounded-full px-3 text-xs font-medium"
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch theme (current: ${currentTheme})`}
      title={`Theme: ${currentTheme}`}
    >
      {icon}
      <span className="ml-2 hidden sm:inline">{currentTheme}</span>
    </Button>
  );
}
