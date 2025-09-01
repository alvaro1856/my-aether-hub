import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
const body = await req.json().catch(() => ({}));
const handled = Boolean(body?.handled ?? true);
const updated = await prisma.contactMessage.update({ where: { id: params.id }, data: { handled } });
return NextResponse.json(updated);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
await prisma.contactMessage.delete({ where: { id: params.id } });
return NextResponse.json({ ok: true });
}