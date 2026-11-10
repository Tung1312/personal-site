import type { ServerStatus } from "@/lib/types";

const BASE_URL = (process.env.GLANCES_URL ?? "http://127.0.0.1:61208").replace(
  /\/+$/,
  "",
);
const USERNAME = process.env.GLANCES_USER;
const PASSWORD = process.env.GLANCES_PASS;
const TIMEOUT_MS = 3_000;

const AUTH_HEADER =
  USERNAME && PASSWORD
    ? `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString("base64")}`
    : null;

function fetchGlances(path: string): Promise<Response> {
  return fetch(`${BASE_URL}/api/4/${path}`, {
    headers: AUTH_HEADER ? { Authorization: AUTH_HEADER } : undefined,
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
}

function parseUptime(raw: unknown): number | null {
  if (typeof raw === "number" && Number.isFinite(raw)) return raw;
  if (typeof raw !== "string") return null;

  const text = raw.trim();
  if (/^\d+(\.\d+)?$/.test(text)) return Number(text);

  let total = 0;
  let matched = false;

  const days = text.match(/(\d+)\s+day/i);
  if (days) {
    total += Number(days[1]) * 86_400;
    matched = true;
  }
  const hours = text.match(/(\d+)\s+hour/i);
  if (hours) {
    total += Number(hours[1]) * 3_600;
    matched = true;
  }
  const minutes = text.match(/(\d+)\s+minute/i);
  if (minutes) {
    total += Number(minutes[1]) * 60;
    matched = true;
  }
  const clock = text.match(/(\d+):(\d+):(\d+)/);
  if (clock) {
    total += Number(clock[1]) * 3_600;
    total += Number(clock[2]) * 60;
    total += Number(clock[3]);
    matched = true;
  }

  return matched ? total : null;
}

export async function getServerStatus(): Promise<ServerStatus> {
  const updatedAt = new Date().toISOString();
  const [health, uptime] = await Promise.allSettled([
    fetchGlances("status"),
    fetchGlances("uptime"),
  ]);

  const online = health.status === "fulfilled" && health.value.ok;

  let uptimeSeconds: number | null = null;
  if (uptime.status === "fulfilled" && uptime.value.ok) {
    try {
      uptimeSeconds = parseUptime(await uptime.value.json());
    } catch {
      uptimeSeconds = null;
    }
  }

  return { online, uptimeSeconds, updatedAt };
}
