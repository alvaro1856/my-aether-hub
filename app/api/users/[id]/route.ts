import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateUserSchema } from "@/lib/validators";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// GET /api/users/:id
export async function GET(_: Request, { params }: { params: { id: string } }) {
const user = await prisma.user.findUnique({ where: { id: params.id } });
if (!user) return NextResponse.json({ error: "Not found" }, { status: 404 });
return NextResponse.json(user);
}

// PATCH /api/users/:id
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
try {
const json = await req.json();
const data = updateUserSchema.parse(json);
const updated = await prisma.user.update({ where: { id: params.id }, data });
return NextResponse.json(updated);
} catch (e: any) {
return NextResponse.json({ error: e.message }, { status: 400 });
}
}

// DELETE /api/users/:id
export async function DELETE(_: Request, { params }: { params: { id: string } }) {
await prisma.user.delete({ where: { id: params.id } });
return NextResponse.json({ ok: true });
}