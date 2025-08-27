"use server";

export async function sendSupport(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const errors: string[] = [];
  if (!email || !email.includes("@")) errors.push("Enter a valid email.");
  if (message.length < 10) errors.push("Please include more details (10+ chars).");

  if (errors.length) {
    // ✅ don’t throw; return a typed result the client can render
    return { ok: false as const, errors };
  }

  // TODO: send email / persist
  await new Promise((r) => setTimeout(r, 300));

  return { ok: true as const };
}
