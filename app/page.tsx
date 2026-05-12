"use client";

import { TypewriterTitle } from "@/components/portfolio/typewriter-title";

const aliases = ["Trần Quang Tùng", "Tùng Trần", "Tung1312"] as const;

export default function Home() {
  return (
    <section className="space-y-6 pb-4">
      <header className="space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          Hi, I&apos;m
        </p>
        <TypewriterTitle words={aliases} />
      </header>
      <div className="max-w-2xl space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>19 / junior sysadmin · homelab hobbyist</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a
            href="https://uet.vnu.edu.vn/"
            target="_blank"
            rel="noreferrer"
            className="glass-pill pill-hover-glow inline-flex rounded-full px-3 py-1 hover:bg-white dark:hover:bg-zinc-900"
          >
            UET - VNU
          </a>
          <span className="glass-pill pill-hover-glow inline-flex rounded-full px-3 py-1">
            Hanoi, Vietnam
          </span>
          <span className="glass-pill pill-hover-glow inline-flex rounded-full px-3 py-1">
            VN/EN
          </span>
        </div>
        <p>
          I&apos;ve been tinkering with self-hosting and networking since age 15.
          I&apos;m driven by open-source ethics, ethical tech, and minimalism.
        </p>
        <p className="text-sm font-light italic text-zinc-600 dark:text-zinc-400">
          Simplicity is the ultimate sophistication.
        </p>
      </div>
    </section>
  );
}
