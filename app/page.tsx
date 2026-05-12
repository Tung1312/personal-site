"use client";

import { motion } from "framer-motion";
import { CircleDot, MapPin } from "lucide-react";
import { GitHubStats } from "@/components/portfolio/github-stats";
import { MotionCard, containerVariants } from "@/components/portfolio/motion";
import { TechStackMarquee } from "@/components/portfolio/tech-stack-marquee";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

export default function Home() {
  return (
    <section className="space-y-5 pb-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-2 xl:grid-cols-4"
      >
        <MotionCard className="md:col-span-2">
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Intro
              </p>
              <CardTitle className="text-3xl leading-tight gradient-title">{siteData.person.name}</CardTitle>
              <CardDescription className="max-w-2xl text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                {siteData.person.bio}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3 text-sm text-zinc-600 dark:text-zinc-300">
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 px-3 py-1 dark:border-zinc-700">
                <CircleDot className="h-3.5 w-3.5 text-emerald-500" />
                {siteData.person.availability}
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 px-3 py-1 dark:border-zinc-700">
                <MapPin className="h-3.5 w-3.5 text-sky-500" />
                {siteData.person.location}
              </span>
            </CardContent>
          </Card>
        </MotionCard>

        <MotionCard>
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Tech Stack
              </p>
              <CardTitle>Current toolkit</CardTitle>
            </CardHeader>
            <CardContent>
              <TechStackMarquee />
            </CardContent>
          </Card>
        </MotionCard>

        <MotionCard>
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                GitHub
              </p>
              <CardTitle>Contribution pulse</CardTitle>
            </CardHeader>
            <CardContent>
              <GitHubStats />
            </CardContent>
          </Card>
        </MotionCard>

        <MotionCard className="xl:col-span-2">
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                Homelab
              </p>
              <CardTitle>Uptime & toolkit</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-end justify-between">
                <p className="text-sm text-zinc-600 dark:text-zinc-300">Current uptime</p>
                <p className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                  {siteData.homelab.uptime}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {siteData.homelab.platform.map((tool) => (
                  <span
                    key={tool}
                    className="rounded-full border border-zinc-300/70 bg-white/60 px-3 py-1 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-200"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </MotionCard>
      </motion.div>
    </section>
  );
}
