import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type PingRow = { ok: number };

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<PingRow[]>`SELECT 1 AS ok;`;
    const ok = Array.isArray(rows) && rows[0]?.ok === 1;
    return NextResponse.json({ ok, message: ok ? "DB reachable" : "Unexpected result" });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
