import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createContactSchema } from "@/lib/validators";
import { errorMessage } from "@/lib/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const ct = req.headers.get("content-type") || "";
    let payload: unknown;

    if (ct.includes("application/json")) {
      payload = await req.json();
    } else if (
      ct.includes("application/x-www-form-urlencoded") ||
      ct.includes("multipart/form-data")
    ) {
      const fd = await req.formData();
      payload = {
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        subject: String(fd.get("subject") ?? ""),
        message: String(fd.get("message") ?? ""),
      };
    } else {
      return NextResponse.json({ error: "Unsupported content type" }, { status: 415 });
    }

    const data = createContactSchema.parse(payload);
    const created = await prisma.contactMessage.create({ data });
    return NextResponse.json(created, { status: 201 });
  } catch (e: unknown) {
    return NextResponse.json({ error: errorMessage(e) }, { status: 400 });
  }
}
