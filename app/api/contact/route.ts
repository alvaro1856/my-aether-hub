import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createContactSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/contact?page=1&limit=20
export async function GET(req: Request) {
const { searchParams } = new URL(req.url);
const page = Math.max(1, Number(searchParams.get("page") || 1));
const limit = Math.min(100, Math.max(1, Number(searchParams.get("limit") || 20)));
const skip = (page - 1) * limit;

const [items, total] = await Promise.all([
prisma.contactMessage.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
prisma.contactMessage.count(),
]);

return NextResponse.json({ items, page, limit, total });
}

// POST /api/contact
export async function POST(req: Request) {
try {
const json = await req.json();
const data = createContactSchema.parse(json);
const created = await prisma.contactMessage.create({ data });
return NextResponse.json(created, { status: 201 });
} catch (e: any) {
const msg = e?.issues?.[0]?.message || e?.message || "Invalid request";
return NextResponse.json({ error: msg }, { status: 400 });
}
}