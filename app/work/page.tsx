"use client";

import { BriefcaseBusiness } from "lucide-react";
import { MotionCard } from "@/components/portfolio/motion";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

export default function WorkPage() {
  return (
    <section className="space-y-6 pb-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Work
        </p>
        <TypewriterTitle words={["personal experiences"]} cycle={false} />
      </header>

      <div className="space-y-4">
        {siteData.work.map((entry) => (
          <MotionCard key={entry.company}>
            <Card className="glass-card card-hover-glow">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                      <BriefcaseBusiness className="h-3.5 w-3.5" />
                      {entry.period}
                    </span>
                  </div>
                  <CardTitle>{entry.role} · {entry.company}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                  {entry.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950/30"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
