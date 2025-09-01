import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

// Prisma needs the Node runtime (not Edge)
export const runtime = "nodejs";

export async function GET() {
try {
const rows = await prisma.$queryRaw<any[]>`SELECT 1 AS ok;`;
const ok = Array.isArray(rows) && rows[0]?.ok === 1;
return NextResponse.json({ ok, message: ok ? "DB reachable" : "Unexpected result" });
} catch (e: any) {
return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
}
}