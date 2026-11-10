import { NextResponse } from "next/server";
import { getBtopFrame } from "@/lib/homelab/btop";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const frame = await getBtopFrame();

  return NextResponse.json(frame, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
