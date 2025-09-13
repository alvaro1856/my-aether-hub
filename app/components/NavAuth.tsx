// components/NavAuth.tsx
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase-server";

export default async function NavAuth() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <form action="/logout" method="POST">
      <button className="border px-3 py-2">Sign out</button>
    </form>
  ) : (
    <Link className="border px-3 py-2" href="/login">
      Sign in
    </Link>
  );
}
