"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { useHydrated } from "@/lib/use-hydrated";

export function BackgroundFx() {
  const { resolvedTheme } = useTheme();
  const hydrated = useHydrated();
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const pointerX = useSpring(0, { stiffness: 50, damping: 20, mass: 0.4 });
  const pointerY = useSpring(0, { stiffness: 50, damping: 20, mass: 0.4 });

  const lightLayerX = useTransform(pointerX, (value) => value * -28);
  const lightLayerY = useTransform(pointerY, (value) => value * -16);
  const darkLayerX = useTransform(pointerX, (value) => value * -18);
  const darkLayerY = useTransform(pointerY, (value) => value * -12);
  const lightScrollY = useTransform(scrollYProgress, [0, 1], [0, -48]);
  const darkScrollY = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const meshScrollY = useTransform(scrollYProgress, [0, 1], [0, -26]);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      pointerX.set((event.clientX - centerX) / centerX);
      pointerY.set((event.clientY - centerY) / centerY);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [pointerX, pointerY, prefersReducedMotion]);

  const isDark = hydrated && resolvedTheme === "dark";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-500"
        style={{ backgroundColor: isDark ? "#0a0a0a" : "#f8fafc" }}
      />
      {isDark ? (
        <>
          <motion.div
            className="absolute -inset-24 will-change-transform"
            style={{
              x: prefersReducedMotion ? 0 : darkLayerX,
              y: prefersReducedMotion ? 0 : darkLayerY,
              backgroundImage:
                "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
              backgroundSize: "42px 42px",
              backgroundPosition: "-1px -1px",
            }}
          />
          <motion.div
            className="absolute -inset-20 will-change-transform"
            style={{
              y: prefersReducedMotion ? 0 : darkScrollY,
              backgroundImage:
                "radial-gradient(circle at 20% 24%, rgba(14, 116, 144, 0.2), transparent 45%), radial-gradient(circle at 82% 74%, rgba(76, 29, 149, 0.18), transparent 45%)",
            }}
          />
          <motion.div
            className="absolute -inset-16 will-change-transform"
            style={{
              y: prefersReducedMotion ? 0 : meshScrollY,
              background:
                "radial-gradient(360px circle at 28% 34%, rgba(56, 189, 248, 0.12), transparent 62%)",
            }}
          />
        </>
      ) : (
        <>
          <motion.div
            className="absolute -inset-24 will-change-transform"
            style={{
              x: prefersReducedMotion ? 0 : lightLayerX,
              y: prefersReducedMotion ? 0 : lightLayerY,
              backgroundImage:
                "radial-gradient(at 18% 22%, rgba(167, 139, 250, 0.28), transparent 42%), radial-gradient(at 82% 16%, rgba(56, 189, 248, 0.18), transparent 40%), radial-gradient(at 74% 80%, rgba(251, 146, 60, 0.2), transparent 42%), radial-gradient(at 15% 74%, rgba(16, 185, 129, 0.18), transparent 45%)",
            }}
          />
          <motion.div
            className="absolute -inset-16 will-change-transform"
            style={{
              y: prefersReducedMotion ? 0 : lightScrollY,
              background:
                "radial-gradient(420px circle at 26% 28%, rgba(59, 130, 246, 0.18), transparent 62%)",
            }}
          />
        </>
      )}
    </div>
  );
}
