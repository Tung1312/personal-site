"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { siteData } from "@/lib/site-data";

const categories = ["laptop", "phone", "watch", "misc"] as const;

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
  const [active, setActive] = useState<string>("laptop");

  const data = siteData.uses[active as keyof typeof siteData.uses];

  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-3">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              Uses
            </p>
            <TypewriterTitle words={["software and hardware"]} cycle={false} />
          </div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            các công cụ và phần mềm mà mình sử dụng hằng ngày
          </p>
        </header>

        <div className="flex gap-6">
          {categories.map((cat) => (
            <Pill
              key={cat}
              label={cat}
              active={active === cat}
              onClick={() => setActive(cat)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <Card className="glass-card card-hover-glow">
              {"description" in data ? (
                <CardContent className="space-y-5 pt-6">
                    <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                      {data.description}
                    </p>

                    <Image
                      src={data.image}
                      alt=""
                      width={0}
                      height={0}
                      sizes="100vw"
                      className="h-auto w-full rounded-2xl"
                      priority
                    />

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
                        {data.overview}
                      </p>
                    </div>

                  </CardContent>
              ) : "specs" in data ? (
                <>
                  <CardHeader>
                    <CardTitle>{data.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                      {data.specs.map((item) => (
                        <li
                          key={item}
                          className="rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950/30"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </>
              ) : (
                <CardContent className="pt-6">
                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-300">
                    {data.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-lg border border-zinc-200/70 bg-white/50 px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950/30"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
