// lib/auth.ts
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { prisma } from "@/lib/db";

export async function getAuthUser() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}


export async function ensureUserRow() {
const user = await getAuthUser();
if (!user) return null;
// Upsert by auth id (UUID). Keep email in sync.
const dbUser = await prisma.user.upsert({
where: { id: user.id },
update: { email: user.email ?? undefined, name: (user.user_metadata as any)?.full_name ?? undefined },
create: {
id: user.id,
email: user.email ?? "",
name: (user.user_metadata as any)?.full_name ?? null,
},
});
return dbUser;
}

export async function requireUser() {
const user = await getAuthUser();
if (!user) redirect("/login");
const dbUser = await ensureUserRow();
return { authUser: user, dbUser };
}

export async function requireAdmin() {
const { authUser, dbUser } = await requireUser();
if (dbUser?.role !== "ADMIN") redirect("/");
return { authUser, dbUser };
}