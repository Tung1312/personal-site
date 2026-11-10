"use client";

import { cn } from "@/lib/utils";
import { formatUptime } from "@/lib/format";
import { usePollingJson } from "@/lib/use-polling-json";
import type { ServerStatus } from "@/lib/types";

const REFRESH_MS = 20_000;

export function ServerStatusLine() {
  const { data: status, error } = usePollingJson<ServerStatus>(
    "/api/homelab/status",
    REFRESH_MS,
  );

  const loading = status === null && !error;
  const online = status?.online === true && !error;
  const uptime = online ? formatUptime(status?.uptimeSeconds ?? null) : "—";

  const label = loading
    ? "checking server"
    : online
      ? "server running"
      : "server offline";

  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-base leading-relaxed">
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          loading
            ? "animate-pulse bg-zinc-400 dark:bg-zinc-500"
            : online
              ? "bg-emerald-500"
              : "bg-rose-500",
        )}
      />
      <span
        className={cn(
          "font-medium",
          loading
            ? "text-zinc-500 dark:text-zinc-400"
            : online
              ? "text-emerald-600 dark:text-emerald-400"
              : "text-rose-600 dark:text-rose-400",
        )}
      >
        {label}
      </span>
      <span className="text-zinc-300 dark:text-zinc-700">·</span>
      <span className="tabular-nums text-zinc-500 dark:text-zinc-400">
        uptime {uptime}
      </span>
    </div>
  );
}
