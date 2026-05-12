"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

export function BackgroundFx() {
  const { resolvedTheme } = useTheme();
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: isDark ? "#0a0a0a" : "#f8fafc" }}
      />

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-0" : "opacity-100",
        )}
        style={{
          backgroundImage:
            "radial-gradient(at 18% 22%, rgba(167, 139, 250, 0.28), transparent 42%), radial-gradient(at 82% 16%, rgba(56, 189, 248, 0.18), transparent 40%), radial-gradient(at 74% 80%, rgba(251, 146, 60, 0.2), transparent 42%), radial-gradient(at 15% 74%, rgba(16, 185, 129, 0.18), transparent 45%)",
        }}
      />

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-100" : "opacity-0",
        )}
        style={{
          backgroundImage:
            "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          backgroundPosition: "-1px -1px",
        }}
      />

      <div
        className={cn(
          "absolute inset-0 transition-opacity duration-500",
          isDark ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: `radial-gradient(420px circle at ${cursor.x}px ${cursor.y}px, rgba(56, 189, 248, 0.14), transparent 62%)`,
        }}
      />
    </div>
  );
}
