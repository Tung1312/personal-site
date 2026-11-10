"use client";

import { usePollingJson } from "@/lib/use-polling-json";
import type { BtopFrame } from "@/lib/types";

const REFRESH_MS = 2_000;

const TERMINAL_FONT =
  '"JetBrainsMono Nerd Font Mono", "JetBrainsMono Nerd Font", "Symbols Nerd Font Mono", "Symbols Nerd Font", var(--font-geist-mono), monospace';

export function BtopCard() {
  const { data: frame, error } = usePollingJson<BtopFrame>(
    "/api/homelab/btop",
    REFRESH_MS,
  );

  const available = frame?.available === true && !error;
  const loading = frame === null && !error;

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-xl shadow-zinc-950/20">
      <div className="flex items-center gap-1.5 border-b border-zinc-800/80 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        <span className="ml-2 text-[10px] uppercase tracking-[0.16em] text-zinc-500">
          btop
        </span>
        <span className="ml-auto flex items-center gap-1.5 text-[10px] uppercase tracking-[0.16em] text-zinc-600">
          <span
            className={
              available
                ? "h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"
                : "h-1.5 w-1.5 rounded-full bg-zinc-600"
            }
          />
          live
        </span>
      </div>

      <div className="min-h-[402px] overflow-x-auto p-3">
        {available ? (
          <pre
            className="whitespace-pre text-[10.5px] leading-[1.2] text-zinc-300"
            style={{ fontFamily: TERMINAL_FONT }}
            dangerouslySetInnerHTML={{ __html: frame.html }}
          />
        ) : (
          <div className="flex h-[378px] items-center justify-center text-xs text-zinc-500">
            {loading
              ? "starting btop…"
              : "btop is not available on this host"}
          </div>
        )}
      </div>
    </div>
  );
}
