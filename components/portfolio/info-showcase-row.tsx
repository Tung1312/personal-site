"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const GITHUB_CARD_MIN_HEIGHT = 96;
const TECH_BOX_MIN_HEIGHT = 96;
const TECH_ICON_SLOT_SIZE = 64;
const TECH_ICON_SIZE = 48;

function shuffle<T>(items: readonly T[]): T[] {
  const output = [...items];
  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}

function StackIcon({ src, alt }: { src: string; alt: string }) {
  return (
    <span
      className="inline-flex items-center justify-center drop-shadow-[0_6px_12px_rgba(2,6,23,0.14)]"
      style={{ width: TECH_ICON_SLOT_SIZE, height: TECH_ICON_SLOT_SIZE }}
    >
      <Image
        src={src}
        alt={alt}
        width={TECH_ICON_SIZE}
        height={TECH_ICON_SIZE}
        className="object-contain"
        unoptimized
      />
    </span>
  );
}

export function InfoShowcaseRow({
  topIcons,
  bottomIcons,
}: {
  topIcons: string[];
  bottomIcons: string[];
}) {
  const [topRow, setTopRow] = useState<string[]>([]);
  const [bottomRow, setBottomRow] = useState<string[]>([]);

  useEffect(() => {
    const id = setTimeout(() => {
      setTopRow(shuffle(topIcons));
      setBottomRow(shuffle(bottomIcons));
    }, 0);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid grid-cols-2 gap-4">
      <a
        href="https://github.com/Tung1312"
        target="_blank"
        rel="noreferrer"
        className="card-hover-glow relative overflow-hidden rounded-2xl border border-white/28 bg-zinc-900 text-zinc-100"
        style={{ minHeight: GITHUB_CARD_MIN_HEIGHT }}
      >
        <Image
          src="/images/ghcat.jpg"
          alt=""
          fill
          aria-hidden
          className="object-cover opacity-35"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
        <div className="absolute inset-0 bg-zinc-900/74" />
        <div className="relative flex h-full flex-col justify-between p-5">
          <div className="flex items-center gap-2">
            <Image
              src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/svg/github.svg"
              alt="GitHub"
              width={24}
              height={24}
              className="h-6 w-6 brightness-0 invert"
            />
            <p className="text-l uppercase tracking-[0.2em] text-zinc-300">
              Github
            </p>
          </div>
          <p className="self-end text-xl font-light tracking-tight">
            my projects
          </p>
        </div>
      </a>

      <div
        className="tech-stack-float-box rounded-2xl"
        style={{ minHeight: TECH_BOX_MIN_HEIGHT }}
      >
        <div className="tech-stack-row tech-stack-row-ltr">
          {[...topRow, ...topRow].map((name, index) => (
            <StackIcon
              key={`top-${name}-${index}`}
              src={`/tech/top/${name}.svg`}
              alt={name}
            />
          ))}
        </div>
        <div className="tech-stack-row tech-stack-row-rtl">
          {[...bottomRow, ...bottomRow].map((name, index) => (
            <StackIcon
              key={`bottom-${name}-${index}`}
              src={`/tech/bottom/${name}.svg`}
              alt={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
