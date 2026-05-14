import fs from "fs";
import path from "path";
import Image from "next/image";
import { InfoShowcaseRow } from "@/components/portfolio/info-showcase-row";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { siteData } from "@/lib/site-data";

function getSvgNames(dir: string) {
  const dirPath = path.join(process.cwd(), "public", "tech", dir);
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".svg"))
    .map((f) => f.replace(/\.svg$/, ""));
}

const topIcons = getSvgNames("top");
const bottomIcons = getSvgNames("bottom");

const { pages, person } = siteData;
const { info } = pages;

export default function Home() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            Hi, I&apos;m
          </p>
          <TypewriterTitle words={info.aliases} />
        </header>
        <div className="space-y-6 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
        <p>{person.bio}</p>
        <div className="flex flex-wrap gap-2 text-sm">
          {info.pills.map((pill) => {
            const content = (
              <>
                <Image
                  src={pill.icon}
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden
                  className={pill.iconClassName}
                />
                {pill.text}
              </>
            );
            return pill.href ? (
              <a
                key={pill.text}
                href={pill.href}
                target="_blank"
                rel="noreferrer"
                className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1 hover:bg-white dark:hover:bg-zinc-900"
              >
                {content}
              </a>
            ) : (
              <span
                key={pill.text}
                className="glass-pill pill-hover-glow inline-flex items-center gap-1.5 rounded-full px-3 py-1"
              >
                {content}
              </span>
            );
          })}
        </div>
        <p>{info.bioParagraph}</p>
        <p className="text-sm font-light italic text-zinc-600 dark:text-zinc-400">
          {info.tagline}
        </p>
        <InfoShowcaseRow topIcons={topIcons} bottomIcons={bottomIcons} />
        </div>
      </div>
    </section>
  );
}
