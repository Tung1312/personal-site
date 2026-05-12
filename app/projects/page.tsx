"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FolderKanban } from "lucide-react";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/components/portfolio/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

export default function ProjectsPage() {
  return (
    <section className="space-y-6 pb-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Projects</p>
        <h1 className="text-3xl font-semibold gradient-title">Selected work across software, games, and infra</h1>
      </header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 md:grid-cols-2"
      >
        {siteData.projects.map((project) => (
          <motion.article key={project.title} variants={itemVariants} whileHover={{ y: -5 }}>
            <Card className="glass-card card-hover-glow h-full">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/70 px-2.5 py-1 text-xs dark:border-zinc-700">
                    <FolderKanban className="h-3.5 w-3.5" />
                    {project.category}
                  </span>
                  <Link
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-zinc-100"
                  >
                    View
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </div>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">{project.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-300/70 bg-white/65 px-2.5 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-900/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
