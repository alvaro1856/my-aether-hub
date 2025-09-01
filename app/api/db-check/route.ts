// app/api/db-check/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs"; // ensure Node (not Edge)
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const rows = await prisma.$queryRaw<any[]>`SELECT 1 AS ok;`;
    const ok = Array.isArray(rows) && rows[0]?.ok === 1;
    return NextResponse.json({ ok, message: ok ? "DB reachable" : "Unexpected result" });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}
