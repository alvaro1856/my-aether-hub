import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createFeedbackSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/feedback?status=NEW&page=1&limit=20
export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const status = searchParams.get("status") as "NEW" | "REVIEWED" | "CLOSED" | null;
const page = Math.max(1, Number(searchParams.get("page") || 1));
const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));
const skip = (page - 1) * limit;

const where = status ? { status } : {};
const [items, total] = await Promise.all([
prisma.feedback.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
prisma.feedback.count({ where }),
]);

return NextResponse.json({ items, page, limit, total });
}

// POST /api/feedback
export async function POST(req: Request) {
try {
const json = await req.json();
const data = createFeedbackSchema.parse(json);
const created = await prisma.feedback.create({ data });
return NextResponse.json(created, { status: 201 });
} catch (e: any) {
const msg = e?.issues?.[0]?.message || e?.message || "Invalid request";
return NextResponse.json({ error: msg }, { status: 400 });
}
}