"use client";

import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { homelabData as homelab } from "@/lib/data/homelab";
import { renderInline } from "@/lib/render-inline";

export default function HomelabPage() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {homelab.title}
          </p>
          <TypewriterTitle words={[homelab.subtitle]} cycle={false} />
        </header>
        <p className="text-center py-20 text-sm text-zinc-500 dark:text-zinc-400">
          {renderInline(homelab.placeholder)}
        </p>
      </div>
    </section>
  );
}
