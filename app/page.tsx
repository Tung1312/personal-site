import fs from "fs";
import path from "path";
import Image from "next/image";
import { InfoShowcaseRow } from "@/components/portfolio/info-showcase-row";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";

const aliases = ["Trần Quang Tùng", "Tùng Trần", "Tung1312"] as const;

function getSvgNames(dir: string) {
  const dirPath = path.join(process.cwd(), "public", "tech", dir);
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.replace(/\.svg$/, ""));
}

const topIcons = getSvgNames("top");
const bottomIcons = getSvgNames("bottom");

export default function Home() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Hi, I&apos;m
          </p>
          <TypewriterTitle words={aliases} />
        </header>
        <div className="space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>19 / junior sysadmin · homelab hobbyist</p>
        <div className="flex flex-wrap gap-2 text-sm">
          <a
            href="https://uet.vnu.edu.vn/"
            target="_blank"
            rel="noreferrer"
            className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1 hover:bg-white dark:hover:bg-zinc-900"
          >
            <Image
              src="/uet.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden
              className="dark:brightness-0 dark:invert"
            />
            UET - VNU
          </a>
          <span className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <Image
              src="/hanoi.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden
              className="dark:brightness-0 dark:invert"
            />
            Hanoi
          </span>
          <span className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <Image
              src="/vietnam.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden
            />
            Vietnam
          </span>
          <span className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1">
            <Image
              src="/language.svg"
              alt=""
              width={14}
              height={14}
              aria-hidden
              className="dark:brightness-0 dark:invert"
            />
            vi_VN/en_US
          </span>
        </div>
        <p>
          I&apos;ve been tinkering with self-hosting and networking since age
          15. I&apos;m driven by open-source ethics, ethical tech, and
          minimalism.
        </p>
        <p className="text-sm font-light italic text-zinc-600 dark:text-zinc-400">
          Simplicity is the ultimate sophistication.
        </p>
        <InfoShowcaseRow topIcons={topIcons} bottomIcons={bottomIcons} />
        </div>
      </div>
    </section>
  );
}
