"use client";

import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHydrated } from "@/lib/use-hydrated";

export function ThemeFavicon() {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();

  useEffect(() => {
    if (!hydrated) return;

    const href = resolvedTheme === "dark" ? "/favicon-dark.svg" : "/favicon-light.svg";
    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"][data-theme-favicon]');

    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      link.type = "image/svg+xml";
      link.setAttribute("data-theme-favicon", "true");
      document.head.appendChild(link);
    }

    link.href = href;
  }, [hydrated, resolvedTheme]);

  return null;
}
