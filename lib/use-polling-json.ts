"use client";

import { useEffect, useState } from "react";

export function usePollingJson<T>(url: string, intervalMs: number) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let controller: AbortController | null = null;

    const load = async () => {
      controller?.abort();
      controller = new AbortController();

      try {
        const response = await fetch(url, {
          cache: "no-store",
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }
        const payload = (await response.json()) as T;
        if (cancelled) return;
        setData(payload);
        setError(false);
      } catch (cause) {
        if (cancelled || (cause as Error).name === "AbortError") return;
        setError(true);
      }
    };

    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void load();
    };

    void load();
    const timer = window.setInterval(refreshWhenVisible, intervalMs);
    document.addEventListener("visibilitychange", refreshWhenVisible);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
      controller?.abort();
    };
  }, [intervalMs, url]);

  return { data, error };
}
