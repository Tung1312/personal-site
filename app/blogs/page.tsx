"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Newspaper } from "lucide-react";
import Link from "next/link";
import { containerVariants, itemVariants } from "@/components/portfolio/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

export default function BlogsPage() {
  return (
    <section className="space-y-6 pb-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Blogs</p>
        <h1 className="text-3xl font-semibold gradient-title">Writing on frontend craft and motion systems</h1>
      </header>

      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-4">
        {siteData.blogs.map((post) => (
          <motion.article key={post.title} variants={itemVariants} whileHover={{ y: -4 }}>
            <Card className="glass-card card-hover-glow">
              <CardHeader className="space-y-3">
                <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  <span className="inline-flex items-center gap-1.5">
                    <Newspaper className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                  <span>{post.publishedAt}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex items-end justify-between gap-4">
                <p className="max-w-3xl text-sm text-zinc-600 dark:text-zinc-300">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-200 dark:hover:text-zinc-50"
                >
                  Read
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
