"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { renderInline } from "@/lib/render-inline";
import { usesData } from "@/lib/data/uses";

const { page: uses, content } = usesData;

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

  const data = active ? content[active as keyof typeof content] : null;

  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {uses.title}
          </p>
          <TypewriterTitle words={[uses.subtitle]} cycle={false} />
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
            <div>
              {"body" in data ? (
                <div className="p-6 pt-6">
                  <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                    {(data as { body: string }).body.split("\n\n").map((paragraph, i) => (
                      <p key={i}>{renderInline(paragraph)}</p>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6 pt-6">
                  <ul className="space-y-1.5 text-base text-zinc-700 dark:text-zinc-300">
                    {(data as { items: readonly string[] }).items.map((item) => (
                      <li key={item}>
                        {renderInline(item)}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
