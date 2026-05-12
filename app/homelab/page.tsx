"use client";

import { motion } from "framer-motion";
import { Server } from "lucide-react";
import { MotionCard, containerVariants, itemVariants } from "@/components/portfolio/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

const statusClasses = {
  Operational: "text-emerald-600 dark:text-emerald-400",
  Monitoring: "text-amber-600 dark:text-amber-400",
  Scaling: "text-sky-600 dark:text-sky-400",
} as const;

export default function HomelabPage() {
  return (
    <section className="space-y-6 pb-4">
      <motion.header
        className="space-y-2"
        variants={itemVariants}
        initial="hidden"
        animate="show"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Homelab</p>
        <h1 className="text-3xl font-semibold gradient-title">Infrastructure playground and service telemetry</h1>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        <MotionCard>
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Runtime status</span>
                <span className="text-lg">{siteData.homelab.uptime}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {siteData.homelab.services.map((service) => (
                <div
                  key={service.name}
                  className="flex items-center justify-between rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-950/30"
                >
                  <div>
                    <p className="font-medium text-zinc-900 dark:text-zinc-100">{service.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Latency: {service.latency}</p>
                  </div>
                  <p className={statusClasses[service.status]}>{service.status}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </MotionCard>

        <MotionCard>
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-4 w-4" />
                Platform stack
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {siteData.homelab.platform.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full border border-zinc-300/70 bg-white/65 px-3 py-1 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-900/70"
                >
                  {tool}
                </span>
              ))}
            </CardContent>
          </Card>
        </MotionCard>
      </motion.div>
    </section>
  );
}
