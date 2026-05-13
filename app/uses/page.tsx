"use client";

import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { Card, CardContent } from "@/components/ui/card";

export default function UsesPage() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Uses
          </p>
          <TypewriterTitle words={["software and hardware"]} cycle={false} />
        </header>
        <Card className="glass-card card-hover-glow">
          <CardContent className="flex items-center justify-center py-20">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              work in progress.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
