import type { Metadata } from "next";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { ServerStatusLine } from "@/components/homelab/server-status-line";
import { BtopCard } from "@/components/homelab/btop-card";
import { homelabData as homelab } from "@/lib/data/homelab";

export const metadata: Metadata = {
  title: "Homelab",
};

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

        <ServerStatusLine />

        <BtopCard />
      </div>
    </section>
  );
}
