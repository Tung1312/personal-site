import { siteData } from "@/lib/site-data";
import { cn } from "@/lib/utils";

const levelClasses = [
  "bg-zinc-200 dark:bg-zinc-800",
  "bg-cyan-100 dark:bg-cyan-950",
  "bg-cyan-200 dark:bg-cyan-800",
  "bg-cyan-300 dark:bg-cyan-700",
  "bg-cyan-400 dark:bg-cyan-500",
];

export function GitHubStats() {
  const { github } = siteData;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3 text-xs">
        <Stat label="Contributions" value={github.yearlyContributions.toLocaleString()} />
        <Stat label="Streak" value={`${github.currentStreakDays}d`} />
        <Stat label="Merged PRs" value={github.mergedPrs.toString()} />
      </div>

      <div className="rounded-xl border border-white/50 bg-white/55 p-3 dark:border-white/10 dark:bg-white/5">
        <div className="grid grid-cols-14 gap-1.5">
          {github.heatmap.map((level, index) => (
            <span
              key={`heat-${index}`}
              className={cn(
                "h-2.5 w-2.5 rounded-[3px] transition-transform hover:scale-125",
                levelClasses[level],
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

type StatProps = {
  label: string;
  value: string;
};

function Stat({ label, value }: StatProps) {
  return (
    <div className="rounded-lg border border-white/40 bg-white/40 p-2 text-center dark:border-white/10 dark:bg-white/5">
      <p className="text-[11px] uppercase tracking-wide text-zinc-500 dark:text-zinc-400">{label}</p>
      <p className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{value}</p>
    </div>
  );
}
