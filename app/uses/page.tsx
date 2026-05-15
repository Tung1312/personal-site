"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { Card, CardContent } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";
import { renderInline } from "@/lib/render-inline";

const { uses } = siteData.pages;

function Pill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`text-sm font-medium lowercase transition-colors ${
        active
          ? "text-zinc-900 dark:text-zinc-100"
          : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
      }`}
    >
      {label}
    </button>
  );
}

export default function UsesPage() {
  const [active, setActive] = useState<string | null>(null);

  const handlePillClick = (cat: string) => {
    setActive(active === cat ? null : cat);
  };

  const data = active ? siteData.uses[active as keyof typeof siteData.uses] : null;

  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {uses.title}
            </p>
            <TypewriterTitle words={[uses.subtitle]} cycle={false} />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            {uses.description}
          </p>
        </header>

        <div className="flex gap-6">
          {uses.categories.map((cat) => (
            <Pill
              key={cat}
              label={cat}
              active={active === cat}
              onClick={() => handlePillClick(cat)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active && data ? (
          <motion.div
            key={active}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.2, ease: "easeInOut", layout: { duration: 0.2 } }}
          >
            <Card className="glass-card card-hover-glow">
              {"description" in data ? (
                <CardContent className="space-y-5 pt-6">
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {renderInline(data.description)}
                    </p>

                    <div
                      className="relative w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900"
                      style={{ aspectRatio: `${data.image.width} / ${data.image.height}` }}
                    >
                      <Image
                        src={data.image.src}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        priority
                      />
                    </div>

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Phần cứng
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {data.specs.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-zinc-300/70 bg-white/65 px-3 py-1 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-900/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Hệ điều hành
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {data.os.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-zinc-300/70 bg-white/65 px-3 py-1 text-xs font-medium dark:border-zinc-700 dark:bg-zinc-900/70"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                        Tổng quan
                      </h4>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                        {data.overview.split("\n\n").map((paragraph, i) => (
                          <span key={i}>
                            {i > 0 && <><br /><br /></>}
                            {renderInline(paragraph)}
                          </span>
                        ))}
                      </p>
                    </div>

                  </CardContent>
              ) : "body" in data ? (
                <CardContent className="pt-6">
                  <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                    {(data as { body: string }).body.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{renderInline(paragraph)}</p>
                    ))}
                  </div>
                </CardContent>
              ) : (
                <CardContent className="pt-6">
                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-300">
                    {(data as { items: readonly string[] }).items.map((item) => (
                      <li key={item}>
                        {renderInline(item)}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
