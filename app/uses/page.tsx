import { TypewriterTitle } from "@/components/portfolio/typewriter-title";
import { renderInline } from "@/lib/render-inline";
import { usesData as uses } from "@/lib/data/uses";

export default function UsesPage() {
  return (
    <section className="pb-4">
      <div className="mx-auto max-w-2xl space-y-6">
        <header className="space-y-2">
          <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {uses.title}
          </p>
          <TypewriterTitle words={[uses.subtitle]} cycle={false} />
        </header>

        <ul className="space-y-1.5 text-base text-zinc-700 dark:text-zinc-300">
          {uses.items.map((item) => (
            <li key={item}>{renderInline(item)}</li>
          ))}
        </ul>

        {uses.body ? (
          <div className="space-y-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
            {uses.body.split("\n\n").map((paragraph, i) => (
              <p key={i}>{renderInline(paragraph)}</p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
