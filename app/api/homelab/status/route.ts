import { NextResponse } from "next/server";
import { getServerStatus } from "@/lib/homelab/glances";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  const status = await getServerStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
