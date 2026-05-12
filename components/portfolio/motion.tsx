"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.32 },
  },
};

type MotionCardProps = {
  children: ReactNode;
  className?: string;
};

export function MotionCard({ children, className }: MotionCardProps) {
  return (
    <motion.article
      variants={itemVariants}
      whileHover={{ y: -4, transition: { duration: 0.18 } }}
      className={className}
    >
      {children}
    </motion.article>
  );
}
