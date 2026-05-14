"use client";

import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import { SiteFooter } from "./site-footer";

export function FooterWrapper() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { margin: "0px 0px 80px 0px" });

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <motion.div
        className="fixed bottom-0 left-1/2 z-30 w-full -translate-x-1/2 px-4 sm:px-6 lg:px-8 xl:w-[60vw]"
        animate={{ y: isInView ? 0 : 120, opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      >
        <SiteFooter />
      </motion.div>
    </>
  );
}
