import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { updateFeedbackSchema } from "@/lib/validators";
import { errorMessage } from "@/lib/errors";
// import { requireAdmin } from "@/lib/auth"; // if you gated DELETE

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const item = await prisma.feedback.findUnique({ where: { id: params.id } });
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const json = (await req.json()) as unknown;
    const data = updateFeedbackSchema.parse(json);
    const updated = await prisma.feedback.update({ where: { id: params.id }, data });
    return NextResponse.json(updated);
  } catch (e: unknown) {
    return NextResponse.json({ error: errorMessage(e) }, { status: 400 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  // await requireAdmin();
  await prisma.feedback.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
