import { spawn, type ChildProcess } from "node:child_process";
import { Terminal } from "@xterm/headless";
import type { BtopFrame } from "@/lib/types";

// btop needs a real TTY. Run it under `script`, mirror the PTY output into a
// headless xterm buffer, and render that buffer to HTML for the web card.

const COLS = 102;
const ROWS = 30;
const FRAME_CACHE_MS = 1_000;
const FAILURE_CACHE_MS = 10_000;
const START_TIMEOUT_MS = 2_500;

const DEFAULT_FG = "#d4d4d8";
const DEFAULT_BG = "#09090b";

const BASE_PALETTE = [
  "#000000",
  "#cd3131",
  "#0dbc79",
  "#e5e510",
  "#2472c8",
  "#bc3fbc",
  "#11a8cd",
  "#e5e5e5",
  "#666666",
  "#f14c4c",
  "#23d18b",
  "#f5f543",
  "#3b8eea",
  "#d670d6",
  "#29b8db",
  "#e5e5e5",
];

type Session = {
  child: ChildProcess;
  term: Terminal;
  ready: Promise<boolean>;
  dead: boolean;
  cols: number;
  rows: number;
};

type GlobalStore = {
  __homelabBtopSession?: Session;
  __homelabBtopCleanup?: boolean;
};

const store = globalThis as unknown as GlobalStore;

let cache: { at: number; data: BtopFrame } | null = null;

function rgbToHex(value: number): string {
  return `#${value.toString(16).padStart(6, "0")}`;
}

function paletteColor(index: number): string {
  if (index < 16) return BASE_PALETTE[index] ?? DEFAULT_FG;
  if (index < 232) {
    const offset = index - 16;
    const r = Math.floor(offset / 36);
    const g = Math.floor((offset % 36) / 6);
    const b = offset % 6;
    const channel = (value: number) => (value === 0 ? 0 : 55 + value * 40);
    return rgbToHex((channel(r) << 16) | (channel(g) << 8) | channel(b));
  }
  const level = 8 + (index - 232) * 10;
  return rgbToHex((level << 16) | (level << 8) | level);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

type ActiveBuffer = Terminal["buffer"]["active"];
type TerminalLine = NonNullable<ReturnType<ActiveBuffer["getLine"]>>;
type TerminalCell = NonNullable<ReturnType<TerminalLine["getCell"]>>;

function cellStyle(cell: TerminalCell): string {
  let fg: string | null = null;
  let bg: string | null = null;

  if (cell.isFgRGB()) fg = rgbToHex(cell.getFgColor());
  else if (cell.isFgPalette()) fg = paletteColor(cell.getFgColor());

  if (cell.isBgRGB()) bg = rgbToHex(cell.getBgColor());
  else if (cell.isBgPalette()) bg = paletteColor(cell.getBgColor());

  if (cell.isInverse()) {
    const nextFg = bg ?? DEFAULT_BG;
    const nextBg = fg ?? DEFAULT_FG;
    fg = nextFg;
    bg = nextBg;
  }

  const parts: string[] = [];
  if (fg) parts.push(`color:${fg}`);
  if (bg) parts.push(`background-color:${bg}`);
  if (cell.isBold()) parts.push("font-weight:600");
  if (cell.isDim()) parts.push("opacity:.6");
  if (cell.isItalic()) parts.push("font-style:italic");
  if (cell.isUnderline()) parts.push("text-decoration:underline");

  return parts.join(";");
}

function renderScreen(term: Terminal): string {
  const buffer = term.buffer.active;
  const lines: string[] = [];

  for (let y = 0; y < ROWS; y += 1) {
    const line = buffer.getLine(y);
    if (!line) {
      lines.push("");
      continue;
    }

    let html = "";
    let pending = "";
    let currentStyle = "";

    const flush = () => {
      if (!pending) return;
      html += currentStyle
        ? `<span style="${currentStyle}">${pending}</span>`
        : pending;
      pending = "";
    };

    for (let x = 0; x < COLS; x += 1) {
      const cell = line.getCell(x);
      if (!cell) continue;
      if (cell.getWidth() === 0) continue;

      const style = cellStyle(cell);
      if (style !== currentStyle) {
        flush();
        currentStyle = style;
      }
      pending += escapeHtml(cell.getChars() || " ");
    }

    flush();
    lines.push(html);
  }

  return lines.join("\n");
}

function hasFrame(term: Terminal): boolean {
  const buffer = term.buffer.active;
  for (let y = 0; y < ROWS; y += 1) {
    const line = buffer.getLine(y);
    if (line && line.translateToString(true).trim().length > 0) return true;
  }
  return false;
}

function waitForFrame(term: Terminal): Promise<boolean> {
  return new Promise((resolve) => {
    const startedAt = Date.now();
    let settle: ReturnType<typeof setTimeout> | null = null;

    const tick = () => {
      if (hasFrame(term)) {
        if (!settle) {
          settle = setTimeout(() => resolve(true), 250);
        }
        return;
      }
      if (Date.now() - startedAt > START_TIMEOUT_MS) {
        resolve(false);
        return;
      }
      setTimeout(tick, 50);
    };

    tick();
  });
}

function createSession(): Session {
  const term = new Terminal({ cols: COLS, rows: ROWS, allowProposedApi: true });

  const child = spawn(
    "script",
    ["-qfc", `stty rows ${ROWS} cols ${COLS}; exec btop`, "/dev/null"],
    {
      env: {
        ...process.env,
        TERM: "xterm-256color",
        COLORTERM: "truecolor",
        LANG: "C.UTF-8",
        LC_ALL: "C.UTF-8",
      },
      stdio: ["ignore", "pipe", "pipe"],
      detached: true,
    },
  );

  const session: Session = {
    child,
    term,
    dead: false,
    ready: Promise.resolve(false),
    cols: COLS,
    rows: ROWS,
  };

  child.stdout?.on("data", (chunk: Buffer) => {
    term.write(chunk);
  });
  child.stderr?.resume();
  child.on("error", () => {
    session.dead = true;
  });
  child.on("exit", () => {
    session.dead = true;
    if (store.__homelabBtopSession === session) {
      store.__homelabBtopSession = undefined;
    }
  });

  session.ready = waitForFrame(term);

  if (!store.__homelabBtopCleanup) {
    store.__homelabBtopCleanup = true;
    process.once("exit", () => {
      const current = store.__homelabBtopSession;
      if (current?.child.pid) {
        try {
          process.kill(-current.child.pid, "SIGKILL");
        } catch {
          // already gone
        }
      }
    });
  }

  return session;
}

function stopSession(session: Session) {
  const pid = session.child.pid;
  if (!pid) return;
  try {
    process.kill(-pid, "SIGTERM");
  } catch {
    return;
  }
  setTimeout(() => {
    try {
      process.kill(-pid, "SIGKILL");
    } catch {
      // already gone
    }
  }, 500).unref();
}

function ensureSession(): Session {
  const existing = store.__homelabBtopSession;
  if (
    existing &&
    !existing.dead &&
    existing.cols === COLS &&
    existing.rows === ROWS
  ) {
    return existing;
  }

  if (existing && !existing.dead) stopSession(existing);

  const session = createSession();
  store.__homelabBtopSession = session;
  return session;
}

export async function getBtopFrame(): Promise<BtopFrame> {
  const now = Date.now();
  if (cache) {
    const maxAge = cache.data.available ? FRAME_CACHE_MS : FAILURE_CACHE_MS;
    if (now - cache.at < maxAge) return cache.data;
  }

  const session = ensureSession();
  const ready = await session.ready;

  if (!ready || session.dead) {
    if (store.__homelabBtopSession === session) {
      store.__homelabBtopSession = undefined;
    }
    stopSession(session);

    const data: BtopFrame = {
      available: false,
      html: "",
      cols: COLS,
      rows: ROWS,
      updatedAt: new Date().toISOString(),
    };
    cache = { at: Date.now(), data };
    return data;
  }

  const data: BtopFrame = {
    available: true,
    html: renderScreen(session.term),
    cols: COLS,
    rows: ROWS,
    updatedAt: new Date().toISOString(),
  };
  cache = { at: Date.now(), data };
  return data;
}
