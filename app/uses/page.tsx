"use client";

import Image from "next/image";
import { MotionCard } from "@/components/portfolio/motion";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

const sections = [
  { key: "editor", title: "Editor & Workflow" },
  { key: "stack", title: "Core Stack" },
] as const;

export default function UsesPage() {
  return (
    <section className="space-y-6 pb-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Uses
        </p>
        <TypewriterTitle words={["software and hardware"]} cycle={false} />
      </header>

      <div className="grid gap-4 md:grid-cols-3">
        {sections.map((section) => (
          <MotionCard key={section.key}>
            <Card className="glass-card card-hover-glow h-full">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {siteData.uses[section.key].map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950/30"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </MotionCard>
        ))}

        <MotionCard className="md:col-span-3">
          <Card className="glass-card card-hover-glow h-full">
            <CardHeader>
              <CardTitle>Laptop</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-3">
                <p className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                  {siteData.uses.laptop.name}
                </p>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {siteData.uses.laptop.specs.map((spec) => (
                    <li
                      key={spec}
                      className="rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950/30"
                    >
                      {spec}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-zinc-200/70 bg-white/40 p-4 dark:border-zinc-700 dark:bg-zinc-950/30">
                <div className="relative mx-auto h-44 w-full max-w-md">
                  <Image
                    src={siteData.uses.laptop.image}
                    alt={siteData.uses.laptop.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 420px"
                    priority
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </MotionCard>
      </div>
    </section>
  );
}
